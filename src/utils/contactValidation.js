// Validation rules for the "Request to Connect" form, shared by the browser
// (instant feedback) and api/contact.js (enforcement). The server check is the
// one that protects the service: anything done in the browser can be skipped
// by calling the API directly.

export const INTERESTS = ["Buying", "Renting", "Selling", "Investing", "Other"];

export const LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  phone: { max: 20 },
  message: { min: 10, max: 2000 },
};

const MAX_LINKS = 2;

// Letters in any language, with spaces, dots, apostrophes and hyphens
const NAME_RE = /^\p{L}[\p{L}\p{M} .'-]*$/u;
const EMAIL_RE =
  /^[^\s@<>()[\]\\,;:"]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;
const PHONE_RE = /^\+?[\d\s()-]+$/;
const LINK_RE = /(https?:\/\/|www\.)/gi;

const hasControlChars = (value, allowNewlines = false) =>
  [...value].some((ch) => {
    if (allowNewlines && (ch === "\n" || ch === "\r" || ch === "\t")) return false;
    const code = ch.charCodeAt(0);
    return code < 32 || code === 127;
  });

const text = (value) => (typeof value === "string" ? value.trim() : "");

// Returns the cleaned-up values plus a { field: message } map of problems.
export const validateContact = (input) => {
  const source = input && typeof input === "object" ? input : {};
  const data = {
    name: text(source.name).replace(/\s+/g, " "),
    email: text(source.email),
    phone: text(source.phone),
    interest: text(source.interest),
    message: text(source.message),
  };
  const errors = {};

  if (data.name.length < LIMITS.name.min) {
    errors.name = "Please enter your full name.";
  } else if (data.name.length > LIMITS.name.max) {
    errors.name = `Name must be ${LIMITS.name.max} characters or fewer.`;
  } else if (!NAME_RE.test(data.name)) {
    errors.name = "Name can only contain letters, spaces, dots, apostrophes and hyphens.";
  }

  if (!data.email) {
    errors.email = "Please enter your email address.";
  } else if (
    data.email.length > LIMITS.email.max ||
    hasControlChars(data.email) ||
    !EMAIL_RE.test(data.email)
  ) {
    errors.email = "Please enter a valid email address.";
  }

  if (data.phone) {
    const digits = data.phone.replace(/\D/g, "").length;
    if (
      data.phone.length > LIMITS.phone.max ||
      !PHONE_RE.test(data.phone) ||
      digits < 7 ||
      digits > 15
    ) {
      errors.phone = "Please enter a valid phone number.";
    }
  }

  if (!INTERESTS.includes(data.interest)) {
    errors.interest = "Please choose an option from the list.";
  }

  if (data.message.length < LIMITS.message.min) {
    errors.message = `Please write at least ${LIMITS.message.min} characters.`;
  } else if (data.message.length > LIMITS.message.max) {
    errors.message = `Message must be ${LIMITS.message.max} characters or fewer.`;
  } else if (hasControlChars(data.message, true)) {
    errors.message = "Message contains invalid characters.";
  } else if ((data.message.match(LINK_RE)?.length ?? 0) > MAX_LINKS) {
    errors.message = `Please include no more than ${MAX_LINKS} links.`;
  }

  return { data, errors, isValid: Object.keys(errors).length === 0 };
};
