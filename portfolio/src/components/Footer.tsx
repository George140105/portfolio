"use client";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaFileDownload,
  FaSpinner,
} from "react-icons/fa";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useModal } from "~/providers/ModalProvider";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
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
    } catch (error) {
      showModal("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      id="contact"
      className="from-slate-100 via-slate-50 to-slate-100 py-12 relative"
    >
      <div className="absolute inset-0 bg-primary/5"></div>
      <div className="container mx-auto px-14 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Get in Touch
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="name" className="block text-sm text-foreground">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full px-4 py-1.5 bg-card rounded-lg border border-primary/20 focus:border-primary/40 focus:outline-none text-foreground"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="block text-sm text-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-1.5 bg-card rounded-lg border border-primary/20 focus:border-primary/40 focus:outline-none text-foreground"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="message"
                  className="block text-sm text-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-1.5 bg-card rounded-lg border border-primary/20 focus:border-primary/40 focus:outline-none text-foreground"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
              >
                {isSubmitting ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Connect
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/George140105"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-card rounded-full hover:bg-muted transition-colors"
                >
                  <FaGithub className="text-2xl text-foreground" />
                </a>
                <a
                  href="https://www.linkedin.com/in/george-amgad-reyad/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-card rounded-full hover:bg-muted transition-colors"
                >
                  <FaLinkedin className="text-2xl text-foreground" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Resume
              </h3>
              <a
                href="/George_Amgad_Frontend_Dev.pdf"
                download
                className="inline-flex items-center px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/50 transition-colors "
              >
                <FaFileDownload className="mr-2" />
                Download CV
              </a>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 pt-6 border-t border-primary/10 text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} George Amgad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
