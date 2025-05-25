"use client";
import { motion } from "framer-motion";
import About from "~/components/About";
import Contact from "~/components/Contact";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import Projects from "~/components/Projects";
import Timeline from "~/components/Timeline";
export default function Home() {
  return (
    <div className="flex">
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-red-100 text-foreground scroll-smooth ml-36 md:ml-48 w-[calc(100%-9rem)] md:w-[calc(100%-12rem)]"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <About />
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Timeline />
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Projects />
        </motion.div>

        <Footer />
      </motion.main>
    </div>
  );
}
