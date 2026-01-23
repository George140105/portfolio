"use client";
import { motion } from "framer-motion";
import { FaPython, FaJava, FaReact } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiC, SiNextdotjs } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

const About = () => {
  return (
    <section id="about" className="py-32 bg-background mt-10">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-5xl font-medium text-foreground">
            Hi there! I'm
          </span>
          <h1 className="text-6xl md:text-7xl py-4 font-extrabold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent my-3">
            George Amgad
          </h1>
          <span className="text-3xl font-bold text-foreground block mt-2">
            Mobile App Developer & Software Engineer
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl"
        >
          <p className="text-2xl text-foreground mb-12 leading-relaxed">
            I am a passionate mobile app developer specializing in React Native and cross-platform development. 
            With a strong foundation in software engineering, I create intuitive, performant mobile applications 
            that deliver seamless user experiences across iOS and Android platforms. I enjoy building apps that 
            solve real-world problems and bring value to users' daily lives.
          </p>
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Skills</h3>
            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-semibold text-blue-400 mb-3">
                  Mobile Development
                </h4>
                <ul className="flex flex-wrap gap-3">
                  <li className="flex items-center px-4 py-2 rounded-full bg-zinc-800 border border-blue-500/40 hover:border-blue-500/60 transition-colors shadow-lg shadow-blue-500/20">
                    <TbBrandReactNative className="mr-2 text-blue-400 text-xl" />
                    <span className="text-gray-300 font-semibold">React Native</span>
                  </li>
                  <li className="flex items-center px-4 py-2 rounded-full bg-zinc-800 border border-blue-500/40 hover:border-blue-500/60 transition-colors shadow-lg shadow-blue-500/20">
                    <SiTypescript className="mr-2 text-blue-400" />
                    <span className="text-gray-300 font-semibold">TypeScript</span>
                  </li>
                  <li className="flex items-center px-4 py-2 rounded-full bg-zinc-800 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                    <span className="text-gray-300">iOS & Android</span>
                  </li>
                  <li className="flex items-center px-4 py-2 rounded-full bg-zinc-800 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                    <span className="text-gray-300">Cross-Platform</span>
                  </li>
                  <li className="flex items-center px-4 py-2 rounded-full bg-zinc-800 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                    <span className="text-gray-300">Push Notifications</span>
                  </li>
                  <li className="flex items-center px-4 py-2 rounded-full bg-zinc-800 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                    <span className="text-gray-300">Firebase</span>
                  </li>
                  <li className="flex items-center px-4 py-2 rounded-full bg-zinc-800 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                    <span className="text-gray-300">Geolocation APIs</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-blue-400 mb-3">
                  Web Development
                </h4>
                <ul className="flex flex-wrap gap-3">
                  <li className="flex items-center px-4 py-2 rounded-full bg-zinc-800 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                    <FaReact className="mr-2 text-blue-400" />
                    <span className="text-gray-300">React</span>
                  </li>
                  <li className="flex items-center px-4 py-2 rounded-full bg-zinc-800 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                    <SiNextdotjs className="mr-2 text-blue-400" />
                    <span className="text-gray-300">Next.js</span>
                  </li>
                  <li className="flex items-center px-4 py-2 rounded-full bg-zinc-800 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                    <SiTailwindcss className="mr-2 text-blue-400" />
                    <span className="text-gray-300">Tailwind CSS</span>
                  </li>
                  <li className="flex items-center px-4 py-2 rounded-full bg-zinc-800 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                    <span className="text-gray-300">Node.js</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-blue-400 mb-3">
                  Programming Languages
                </h4>
                <ul className="flex flex-wrap gap-3">
                  <li className="flex items-center px-4 py-2 rounded-full bg-zinc-800 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                    <FaJava className="mr-2 text-blue-400" />
                    <span className="text-gray-300">Java</span>
                  </li>
                  <li className="flex items-center px-4 py-2 rounded-full bg-zinc-800 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                    <FaPython className="mr-2 text-blue-400" />
                    <span className="text-gray-300">Python</span>
                  </li>
                  <li className="flex items-center px-4 py-2 rounded-full bg-zinc-800 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                    <SiC className="mr-2 text-blue-400" />
                    <span className="text-gray-300">C</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
