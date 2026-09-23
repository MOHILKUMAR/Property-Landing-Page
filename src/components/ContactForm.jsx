import React, { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  interest: "Buying",
  message: "",
  company: "", // honeypot: real users never see or fill this
};

const interests = ["Buying", "Renting", "Selling", "Investing", "Other"];

const inputClass =
  "w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent";

const labelClass = "block mb-1.5 text-sm font-medium text-gray-700 dark:text-slate-300";

const ContactForm = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setError(err.message || "Network error. Please try again.");
    }
  };

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
          onSubmit={handleSubmit}
          className="bg-neutral-100 dark:bg-slate-800 rounded-2xl shadow-md p-6 sm:p-8 space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className={labelClass}>Full name *</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                maxLength={100}
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="phone" className={labelClass}>Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                maxLength={30}
                autoComplete="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="interest" className={labelClass}>I'm interested in</label>
              <select
                id="interest"
                name="interest"
                value={form.interest}
                onChange={handleChange}
                className={inputClass}
              >
                {interests.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className={labelClass}>Message *</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              maxLength={5000}
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us what you're looking for..."
              className={`${inputClass} resize-y`}
            />
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
