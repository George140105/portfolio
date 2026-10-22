import { motion } from "framer-motion";

const Timeline = () => {
  const timelineData = [
    {
      period: "Expected June 2027",
      title: "Bachelor of Science in Computer Science",
      subtitle: "German University in Cairo – Cairo, Egypt",
      details: [
        "Pursuing a comprehensive computer science degree with focus on software engineering and systems design",
        "Maintaining academic excellence with scholarship recognition",
        "Actively participating in coding competitions and hackathons",
        "Developing practical skills through hands-on project work",
      ],
    },
    {
      period: "August 2025 - February 2026",
      title: "Part-Time Mobile Developer",
      subtitle: "Hiryo – Cairo, Egypt",
      details: [
        "Spearheaded the Android launch of Hiryo on the Google Play Store",
        "Revamped the onboarding flow to reduce user drop-off and improve retention",
        "Implemented real-time location tracking and SOS alert system features",
        "Optimized app performance and battery efficiency for background operations",
        "Conducted testing and quality assurance across multiple Android devices",
      ],
    },
    {
      period: "June - August 2025",
      title: "Mobile Development Intern",
      subtitle: "Hiryo – Cairo, Egypt",
      details: [
        "Developed Homebase, a collaborative household management app from concept to production",
        "Built real-time task sharing and notification systems using Firebase and React Native",
        "Designed intuitive UI/UX for family collaboration and event coordination",
        "Implemented secure document storage and member role management features",
      ],
    },
    {
      period: "August - December 2024",
      title: "Frontend Mobile Developer",
      subtitle: "KemitWare – Cairo, Egypt",
      details: [
        "Developed cross-platform mobile applications using React Native and TypeScript",
        "Created Mahsooly, an agricultural management platform connecting farmers with field inspectors",
        "Implemented multi-language support (Arabic/English) and user role management systems",
        "Built responsive UI components and integrated RESTful APIs for data synchronization",
      ],
    },
    {
      period: "July 2021 - June 2022",
      title: "Mathematics Teaching Assistant",
      subtitle: "Nefertari International Schools - Cairo, Egypt",
      details: [
        "Delivered comprehensive A-Level Mathematics instruction while pursuing studies",
        "Developed and implemented assessment materials to evaluate student progress",
        "Managed student records and provided detailed performance feedback",
        "Conducted targeted tutoring sessions to improve student achievement",
      ],
    },
    {
      period: "June 2022",
      title: "High School Diploma with Distinction",
      subtitle: "Nefertari International School IGCSE - Cairo, Egypt",
      details: [
        "Achieved exceptional IGCSE score of 124%",
        "Demonstrated outstanding academic performance across all subjects",
        "Received recognition for excellence in Mathematics and Sciences",
      ],
    },
  ];

  return (
    <section id="timeline" className="py-20 px-4 max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-10 text-center"
      >
        Personal Journey
      </motion.h2>
      <div className="relative">
        {/* Vertical line */}
        <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />

        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`flex flex-col sm:flex-row ${
              index % 2 === 0 ? "sm:flex-row-reverse" : ""
            } justify-center items-center mb-8`}
          >
            <div
              className={`w-full sm:w-5/12 ${
                index % 2 === 0 ? "sm:text-right" : "sm:text-left"
              } px-0 sm:px-4 mb-4 sm:mb-0`}
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <span className="text-primary font-semibold">
                  {item.period}
                </span>
                <h3 className="text-xl font-bold mt-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {item.subtitle}
                </p>
                <ul className="mt-4 space-y-2">
                  {item.details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-500 dark:text-gray-300"
                    >
                      • {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Timeline dot */}
            <div className="w-full sm:w-2/12 flex justify-center mb-4 sm:mb-0">
              <div className="w-4 h-4 bg-primary rounded-full relative z-10" />
            </div>
            <div className="hidden sm:block w-5/12" />{" "}
            {/* Empty space for alignment on desktop */}
          </motion.div>
        ))}
      </div>

      {/* Languages section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-20"
      >
        <h3 className="text-2xl font-bold mb-6 text-center">Languages</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { lang: "Arabic", level: "Native Proficiency" },
            { lang: "English", level: "Professional Working Proficiency" },
            { lang: "French", level: "Intermediate (B1)" },
            { lang: "German", level: "Elementary (A2)" },
          ].map((language, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center min-w-[200px]"
            >
              <h4 className="font-bold">{language.lang}</h4>
              <p className="text-gray-600 dark:text-gray-400">
                {language.level}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Timeline;
