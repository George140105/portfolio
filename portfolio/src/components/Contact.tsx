"use client";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FaArrowRight, FaCheck, FaCopy, FaSpinner } from "react-icons/fa";
import Magnet from "~/components/ui/Magnet";

const EMAIL = "george05.amgad@gmail.com";

const links = [
  { href: `mailto:${EMAIL}`, label: "Email", value: EMAIL },
  { href: "https://github.com/George140105", label: "GitHub", value: "George140105" },
  {
    href: "https://www.linkedin.com/in/george-amgad-reyad/",
    label: "LinkedIn",
    value: "george-amgad-reyad",
  },
  { href: "/George_Amgad_Resume.pdf", label: "Resume", value: "View PDF" },
];

const inputClass =
  "w-full border-b border-foreground/30 bg-transparent py-3 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none transition-colors";

const ease = [0.22, 1, 0.36, 1] as const;

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"sent" | "error" | null>(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      await emailjs.send(
        "service_7h236yp",
        "template_0or6ykk",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        "bbG9o0rl9QRW9C6Qu"
      );
      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="relative px-4 pb-10 pt-24 sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="font-serif text-5xl leading-none sm:text-6xl md:text-8xl"
        >
          Say <span className="italic text-highlight">hello</span>
        </motion.h2>
        <p className="mt-5 max-w-xl text-muted-foreground sm:text-lg">
          I&apos;m open to internships, research positions and engineering roles. The quickest way
          to reach me is email, or leave a message here.
        </p>

        <div className="mt-14 grid gap-14 md:grid-cols-[1fr_0.8fr] md:gap-20">
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                key="sent"
                role="status"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease }}
                className="flex flex-col items-start gap-5"
              >
                <motion.span
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", bounce: 0.3, duration: 0.5, delay: 0.1 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground"
                >
                  <FaCheck size={16} />
                </motion.span>
                <div>
                  <h3 className="font-serif text-4xl">Message sent</h3>
                  <p className="mt-2 text-muted-foreground">
                    Thanks for reaching out. I&apos;ll get back to you within a couple of days.
                  </p>
                </div>
                <button
                  onClick={() => setStatus(null)}
                  className="text-sm text-primary underline underline-offset-4 transition-opacity active:opacity-60"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="space-y-6"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="font-mono text-xs text-muted-foreground">Name</span>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className={inputClass}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </label>
                <label className="block text-sm">
                  <span className="font-mono text-xs text-muted-foreground">Email</span>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={inputClass}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </label>
              </div>
              <label className="block text-sm">
                <span className="font-mono text-xs text-muted-foreground">Message</span>
                <textarea
                  rows={4}
                  required
                  placeholder="Hi George…"
                  className={`${inputClass} resize-none`}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </label>
              <Magnet>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex min-w-[10rem] items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-[background-color,color,transform] hover:bg-primary hover:text-primary-foreground active:scale-[0.97] active:duration-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" size={12} />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <FaArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </Magnet>
              <AnimatePresence>
                {status === "error" && (
                  <motion.p
                    role="alert"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-muted-foreground"
                  >
                    That didn&apos;t go through, but your message is still here. Try again, or{" "}
                    <button type="button" onClick={copyEmail} className="text-primary underline underline-offset-4">
                      {copied ? "email copied" : "copy my email"}
                    </button>
                    .
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.form>
            )}
          </AnimatePresence>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="border-t border-border"
          >
            {links.map(({ href, label, value }) => (
              <li key={label} className="flex items-center gap-2 border-b border-border">
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex min-w-0 flex-1 items-baseline justify-between gap-4 py-4 transition-opacity active:opacity-60"
                >
                  <span className="font-mono text-xs text-muted-foreground">{label}</span>
                  <span className="flex min-w-0 items-center gap-2 text-right">
                    <span className="truncate transition-colors group-hover:text-primary">{value}</span>
                    <FaArrowRight
                      size={10}
                      className="shrink-0 -rotate-45 text-muted-foreground transition-transform group-hover:rotate-0 group-hover:text-primary"
                    />
                  </span>
                </a>
                {/* mailto: does nothing on computers without a mail app, so offer a copy too. */}
                {label === "Email" && (
                  <button
                    onClick={copyEmail}
                    aria-label={copied ? "Email copied" : "Copy email address"}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-[background-color,color,transform] hover:bg-muted hover:text-foreground active:scale-90"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={copied ? "done" : "copy"}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        {copied ? <FaCheck size={12} className="text-primary" /> : <FaCopy size={12} />}
                      </motion.span>
                    </AnimatePresence>
                  </button>
                )}
              </li>
            ))}
          </motion.ul>
        </div>

        <p className="mt-24 flex flex-col gap-1 border-t border-border pt-6 font-mono text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <span>&copy; {new Date().getFullYear()} George Amgad</span>
          <span>Cairo, Egypt</span>
        </p>
      </div>
    </footer>
  );
};

export default Contact;
