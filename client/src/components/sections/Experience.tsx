import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resumeData } from "@/data/resume";

export default function Experience() {
  const { work } = resumeData;
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  
  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
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
  
  const highlightVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.4,
        delay: 0.1 * custom
      }
    })
  };
  
  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800/50 relative overflow-hidden">
      {/* Background animated elements */}
      <motion.div 
        className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/5 rounded-full"
        animate={{ 
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ 
          duration: 20, 
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
            Professional Experience
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-primary mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            My journey through various roles and responsibilities
          </p>
        </motion.div>
        
        <motion.div 
          className="relative timeline-container pl-8 md:pl-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {work.map((job, index) => {
            // Format date ranges
            const startDate = new Date(job.startDate);
            const endDate = job.endDate ? new Date(job.endDate) : null;
            const dateRange = `${startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - ${endDate ? endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}`;
            
            const isSelected = selectedJob === index;
            
            return (
              <motion.div 
                key={index}
                className="mb-12 md:grid md:grid-cols-9"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                layoutId={`job-${index}`}
              >
                <motion.div 
                  className="md:col-span-3 hidden md:block"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="h-full flex items-center justify-end mr-8">
                    <div className="text-right">
                      <motion.h3 
                        className="font-semibold"
                        animate={{ 
                          color: isSelected ? "var(--primary)" : "currentColor"
                        }}
                      >
                        {dateRange}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-600 dark:text-gray-400"
                        whileHover={{ x: -3 }}
                      >
                        <a href={job.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary dark:hover:text-primary-400">
                          {job.company}
                        </a>
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="md:col-span-6 md:border-l-2 md:border-gray-300 dark:md:border-gray-700 md:pl-8 relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {/* Animated timeline dot */}
                  <motion.div 
                    className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-primary hidden md:block border-4 border-white dark:border-gray-800"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.5 }}
                    animate={{
                      boxShadow: isSelected 
                        ? '0 0 0 5px rgba(var(--primary), 0.3)' 
                        : '0 0 0 0px rgba(var(--primary), 0)'
                    }}
                  />
                  
                  <motion.div 
                    className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transform transition-all duration-300 ${isSelected ? 'ring-2 ring-primary' : ''}`}
                    whileHover={{ 
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    onClick={() => setSelectedJob(isSelected ? null : index)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <motion.h3 
                        className="text-xl font-bold"
                        whileHover={{ x: 3 }}
                      >
                        {job.position}
                      </motion.h3>
                      
                      <motion.button
                        className="text-gray-400 hover:text-primary"
                        whileHover={{ scale: 1.2, rotate: 180 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedJob(isSelected ? null : index);
                        }}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="20" 
                          height="20" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          style={{
                            transform: isSelected ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease'
                          }}
                        >
                          <path d="m6 9 6 6 6-6"/>
                        </svg>
                      </motion.button>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 md:hidden">{dateRange} | {job.company}</p>
                    
                    <AnimatePresence>
                      {(isSelected || typeof window !== 'undefined' && window.innerWidth < 768) && (
                        <motion.ul 
                          className="space-y-3 text-gray-700 dark:text-gray-300"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {job.highlights.map((highlight, idx) => (
                            <motion.li 
                              key={idx}
                              className="flex items-start"
                              variants={highlightVariants}
                              initial="hidden"
                              animate="visible"
                              custom={idx}
                            >
                              <motion.svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="18" 
                                height="18" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                                className="text-primary mr-2 mt-1 flex-shrink-0"
                                whileHover={{ scale: 1.2, rotate: 10 }}
                              >
                                <polyline points="9 11 12 14 22 4"></polyline>
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                              </motion.svg>
                              <span>{highlight}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                    
                    {!isSelected && typeof window !== 'undefined' && window.innerWidth >= 768 && (
                      <motion.div
                        className="text-primary text-sm font-medium mt-2 cursor-pointer inline-flex items-center"
                        whileHover={{ x: 5 }}
                        onClick={() => setSelectedJob(index)}
                      >
                        View Details
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className="ml-1"
                        >
                          <path d="m9 18 6-6-6-6"/>
                        </svg>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
