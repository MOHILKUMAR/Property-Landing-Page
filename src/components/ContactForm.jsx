import React, { useRef, useState } from "react";
import { INTERESTS, LIMITS, validateContact } from "../utils/contactValidation";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  interest: INTERESTS[0],
  message: "",
  company: "", // honeypot: real users never see or fill this
};

const FIELD_ORDER = ["name", "email", "phone", "interest", "message"];

const inputClass =
  "w-full rounded-lg border bg-white dark:bg-slate-900 px-4 py-2.5 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:border-transparent";
const validClass = "border-gray-300 dark:border-slate-600 focus:ring-green-500";
const invalidClass = "border-red-500 dark:border-red-400 focus:ring-red-500";

const labelClass = "block mb-1.5 text-sm font-medium text-gray-700 dark:text-slate-300";

const ContactForm = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");
  const formRef = useRef(null);

  // Re-check a single field against the shared rules
  const checkField = (name, values) => {
    const message = validateContact(values).errors[name];
    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[name] = message;
      else delete next[name];
      return next;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...form, [name]: value };
    setForm(next);
    // Once a field has shown an error, clear it as soon as it's fixed
    if (errors[name]) checkField(name, next);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    // Don't nag about empty required fields just because focus moved on
    if (form[name].trim() === "" && name !== "phone") return;
    checkField(name, form);
  };

  const focusField = (name) => formRef.current?.elements[name]?.focus();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    const { errors: found, isValid } = validateContact(form);
    setErrors(found);
    if (!isValid) {
      setStatus("idle");
      focusField(FIELD_ORDER.find((name) => found[name]));
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data.fields) {
          setErrors(data.fields);
          focusField(FIELD_ORDER.find((name) => data.fields[name]));
        }
        throw new Error(
          data.error || `Something went wrong (error ${res.status}). Please try again.`
        );
      }

      setStatus("success");
      setForm(initialForm);
      setErrors({});
    } catch (err) {
      setStatus("error");
      setError(err.message || "Network error. Please try again.");
    }
  };

  // Props shared by every validated field
  const fieldProps = (name) => ({
    id: name,
    name,
    value: form[name],
    onChange: handleChange,
    onBlur: handleBlur,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    className: `${inputClass} ${errors[name] ? invalidClass : validClass}`,
  });

  const fieldError = (name) =>
    errors[name] && (
      <p id={`${name}-error`} className="mt-1.5 text-sm text-red-600 dark:text-red-400">
        {errors[name]}
      </p>
    );

  return (
    <section id="contact" className="bg-white dark:bg-slate-950 py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div>
          <p className="text-xl font-bold text-green-500 mb-4">Contact Us</p>
          <h1 className="text-3xl sm:text-4xl mb-6 dark:text-white">Request to Connect</h1>
          <p className="text-gray-500 dark:text-slate-400 text-lg mb-8">
            Looking to buy, rent or sell? Share a few details and one of our
            realtors will get back to you within 24 hours.
          </p>
          <ul className="space-y-4 text-gray-700 dark:text-slate-300">
            <li>
              <span className="font-semibold text-green-600">Call:</span> +91-8077108275
            </li>
            <li>
              <span className="font-semibold text-green-600">Visit:</span> Suite 721 New York NY 10016
            </li>
            <li>
              <span className="font-semibold text-green-600">Hours:</span> 24/7 Customer Support
            </li>
          </ul>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          className="bg-neutral-100 dark:bg-slate-800 rounded-2xl shadow-md p-6 sm:p-8 space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className={labelClass}>Full name *</label>
              <input
                {...fieldProps("name")}
                type="text"
                required
                maxLength={LIMITS.name.max}
                autoComplete="name"
                placeholder="John Doe"
              />
              {fieldError("name")}
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>Email *</label>
              <input
                {...fieldProps("email")}
                type="email"
                required
                maxLength={LIMITS.email.max}
                autoComplete="email"
                placeholder="you@example.com"
              />
              {fieldError("email")}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="phone" className={labelClass}>Phone</label>
              <input
                {...fieldProps("phone")}
                type="tel"
                maxLength={LIMITS.phone.max}
                autoComplete="tel"
                placeholder="+91 98765 43210"
              />
              {fieldError("phone")}
            </div>
            <div>
              <label htmlFor="interest" className={labelClass}>I'm interested in</label>
              <select {...fieldProps("interest")}>
                {INTERESTS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {fieldError("interest")}
            </div>
          </div>

          <div>
            <label htmlFor="message" className={labelClass}>Message *</label>
            <textarea
              {...fieldProps("message")}
              required
              rows={5}
              maxLength={LIMITS.message.max}
              placeholder="Tell us what you're looking for..."
              className={`${fieldProps("message").className} resize-y`}
            />
            <div className="flex justify-between gap-4">
              <div>{fieldError("message")}</div>
              <p className="mt-1.5 text-xs text-gray-500 dark:text-slate-400 shrink-0">
                {form.message.length}/{LIMITS.message.max}
              </p>
            </div>
          </div>

          {/* Honeypot field, hidden from people and screen readers */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.company}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full sm:w-auto bg-green-500 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-mono font-medium py-3 px-8 rounded-lg transition-colors cursor-pointer"
          >
            {status === "sending" ? "Sending..." : "Send Request"}
          </button>

          <div aria-live="polite">
            {status === "success" && (
              <p className="rounded-lg bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 px-4 py-3">
                Thanks! Your request has been sent. We'll be in touch soon.
              </p>
            )}
            {status === "error" && (
              <p className="rounded-lg bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300 px-4 py-3">
                {error}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
