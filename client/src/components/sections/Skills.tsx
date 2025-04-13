import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { resumeData } from "@/data/resume";

export default function Skills() {
  const { skills } = resumeData;
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  
  // Group skills by category
  const frontend = skills.filter(skill => skill.category === "Frontend");
  const libraries = skills.filter(skill => skill.category === "Libraries & State");
  const tools = skills.filter(skill => skill.category === "Tools & Platforms");
  const testing = skills.filter(skill => skill.category === "Testing");
  const methodologies = skills.filter(skill => skill.category === "Methodologies");
  
  const skillsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(skillsRef, { once: true, margin: "-50px" });
  
  // Variants for staggered animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Variants for skill bar animation
  const skillVariants = {
    hidden: { width: 0 },
    show: (level: number) => ({
      width: `${level}%`,
      transition: { 
        duration: 1.2,
        ease: "easeOut"
      }
    })
  };
  
  // Variants for card animations
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        delay: 0.1 * custom,
        ease: "easeOut"
      }
    }),
    hover: { 
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3 }
    }
  };
  
  // Variants for tag animations
  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: { 
        delay: 0.03 * custom,
        duration: 0.4
      }
    }),
    hover: { 
      scale: 1.1, 
      backgroundColor: "var(--primary)",
      color: "white",
      transition: { duration: 0.2 }
    }
  };
  
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute -top-20 -right-20 w-60 h-60 bg-primary/5 rounded-full"
        animate={{ 
          x: [0, -30, 0],
          y: [0, 40, 0],
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 -left-40 w-80 h-80 bg-secondary/5 rounded-full"
        animate={{ 
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={titleVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            whileHover={{ scale: 1.02 }}
          >
            Technical Skills
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-primary mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            My expertise spans across various technologies and methodologies
          </p>
        </motion.div>
        
        <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Frontend Technologies */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
            custom={0}
          >
            <div className="flex items-center mb-6">
              <motion.div 
                className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 mr-4"
                whileHover={{ 
                  rotate: 5,
                  scale: 1.1,
                  backgroundColor: "var(--primary)",
                  color: "white"
                }}
              >
                <i className="ri-code-s-slash-line text-2xl"></i>
              </motion.div>
              <h3 className="text-xl font-semibold">Frontend</h3>
            </div>
            
            <motion.div 
              className="space-y-4"
              variants={container}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
            >
              {frontend.map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="skill-item"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    x: 5,
                    transition: { duration: 0.1 }
                  }}
                  onHoverStart={() => setSelectedSkill(skill.name)}
                  onHoverEnd={() => setSelectedSkill(null)}
                >
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <motion.span 
                      className="text-sm text-gray-600 dark:text-gray-400"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut" 
                      }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary rounded-full"
                      style={{ 
                        opacity: selectedSkill === skill.name ? 0.8 : 1 
                      }}
                      custom={skill.level}
                      variants={skillVariants}
                      initial="hidden"
                      animate={isInView ? "show" : "hidden"}
                      whileHover={{ filter: "brightness(1.1)" }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* State Management & UI Libraries */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
            custom={1}
          >
            <div className="flex items-center mb-6">
              <motion.div 
                className="w-12 h-12 rounded-lg bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center text-secondary-600 dark:text-secondary-400 mr-4"
                whileHover={{ 
                  rotate: -5,
                  scale: 1.1,
                  backgroundColor: "var(--secondary)",
                  color: "white"
                }}
              >
                <i className="ri-layout-masonry-line text-2xl"></i>
              </motion.div>
              <h3 className="text-xl font-semibold">Libraries & State</h3>
            </div>
            
            <motion.div 
              className="space-y-4"
              variants={container}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
            >
              {libraries.map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="skill-item"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    x: 5,
                    transition: { duration: 0.1 }
                  }}
                  onHoverStart={() => setSelectedSkill(skill.name)}
                  onHoverEnd={() => setSelectedSkill(null)}
                >
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <motion.span 
                      className="text-sm text-gray-600 dark:text-gray-400"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut" 
                      }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ 
                        opacity: selectedSkill === skill.name ? 0.8 : 1 
                      }}
                      custom={skill.level}
                      variants={skillVariants}
                      initial="hidden"
                      animate={isInView ? "show" : "hidden"}
                      whileHover={{ filter: "brightness(1.1)" }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Tools & Platforms */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
            custom={2}
          >
            <div className="flex items-center mb-6">
              <motion.div 
                className="w-12 h-12 rounded-lg bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center text-accent-600 dark:text-accent-400 mr-4"
                whileHover={{ 
                  rotate: 5,
                  scale: 1.1,
                  backgroundColor: "var(--accent)",
                  color: "white"
                }}
              >
                <i className="ri-tools-line text-2xl"></i>
              </motion.div>
              <h3 className="text-xl font-semibold">Tools & Platforms</h3>
            </div>
            
            <motion.div 
              className="space-y-4"
              variants={container}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
            >
              {tools.map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="skill-item"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    x: 5,
                    transition: { duration: 0.1 }
                  }}
                  onHoverStart={() => setSelectedSkill(skill.name)}
                  onHoverEnd={() => setSelectedSkill(null)}
                >
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <motion.span 
                      className="text-sm text-gray-600 dark:text-gray-400"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut" 
                      }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-green-500 rounded-full"
                      style={{ 
                        opacity: selectedSkill === skill.name ? 0.8 : 1 
                      }}
                      custom={skill.level}
                      variants={skillVariants}
                      initial="hidden"
                      animate={isInView ? "show" : "hidden"}
                      whileHover={{ filter: "brightness(1.1)" }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Testing Frameworks */}
        <motion.div 
          className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold mb-6">Testing Frameworks</h3>
          <motion.div 
            className="flex flex-wrap gap-3"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {testing.map((skill, index) => (
              <motion.span 
                key={index} 
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 cursor-pointer"
                variants={tagVariants}
                custom={index}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                {skill.name}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Methodologies */}
        <motion.div 
          className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold mb-6">Methodologies</h3>
          <motion.div 
            className="flex flex-wrap gap-3"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {methodologies.map((skill, index) => (
              <motion.span 
                key={index} 
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 cursor-pointer"
                variants={tagVariants}
                custom={index}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                {skill.name}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
