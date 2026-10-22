"use client";
import emailjs from "@emailjs/browser";
import { motion } from "motion/react";
import { useState } from "react";
import { FaArrowRight, FaSpinner } from "react-icons/fa";
import Magnet from "~/components/ui/Magnet";
import { useModal } from "~/providers/ModalProvider";

const EMAIL = "george05.amgad@gmail.com";

const links = [
  { href: `mailto:${EMAIL}`, label: "Email", value: EMAIL },
  { href: "https://github.com/George140105", label: "GitHub", value: "George140105" },
  {
    href: "https://www.linkedin.com/in/george-amgad-reyad/",
    label: "LinkedIn",
    value: "george-amgad-reyad",
  },
  { href: "/George_Amgad_Resume.pdf", label: "Resume", value: "Download PDF", download: true },
];

const inputClass =
  "w-full border-b border-border bg-transparent py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none transition-colors";

const ease = [0.22, 1, 0.36, 1] as const;

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showModal } = useModal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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
      showModal("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      showModal("error");
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
          Say <span className="italic text-primary">hello</span>
        </motion.h2>
        <p className="mt-5 max-w-xl text-muted-foreground sm:text-lg">
          I&apos;m open to internships, research positions and engineering roles. The quickest way
          to reach me is email, or leave a message here.
        </p>

        <div className="mt-14 grid gap-14 md:grid-cols-[1fr_0.8fr] md:gap-20">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
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
                className="group inline-flex min-w-[10rem] items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <>
                    Send message
                    <FaArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </Magnet>
          </motion.form>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="border-t border-border"
          >
            {links.map(({ href, label, value, download }) => (
              <li key={label}>
                <a
                  href={href}
                  download={download || undefined}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-4 border-b border-border py-4"
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
