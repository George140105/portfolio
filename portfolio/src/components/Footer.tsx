"use client";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFileDownload } from "react-icons/fa";
import { useState } from "react";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your email sending logic here
    // You can use services like EmailJS, SendGrid, or your own API
    console.log("Form submitted:", formData);
  };

  return (
    <footer
      id="contact"
      className="bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 py-20 relative"
    >
      <div className="absolute inset-0 bg-blue-500/5"></div>
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 bg-zinc-800 rounded-lg border border-blue-500/20 focus:border-blue-500/40 focus:outline-none text-gray-300"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 bg-zinc-800 rounded-lg border border-blue-500/20 focus:border-blue-500/40 focus:outline-none text-gray-300"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full px-4 py-2 bg-zinc-800 rounded-lg border border-blue-500/20 focus:border-blue-500/40 focus:outline-none text-gray-300"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Connect</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/George140105"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors"
                >
                  <FaGithub className="text-2xl text-gray-300" />
                </a>
                <a
                  href="https://www.linkedin.com/in/george-amgad-reyad/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors"
                >
                  <FaLinkedin className="text-2xl text-gray-300" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Resume</h3>
              <a
                href="/George_Amgad_Resume[1].pdf"
                download
                className="inline-flex items-center px-6 py-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors text-gray-300"
              >
                <FaFileDownload className="mr-2" />
                Download CV
              </a>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} George Amgad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
