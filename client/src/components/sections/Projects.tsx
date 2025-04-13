import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resumeData } from "@/data/resume";

export default function Projects() {
  const { projects } = resumeData;
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  
  const allCategories: string[] = Array.from(
    new Set(projects.flatMap(project => project.keywords))
  );
  
  const filteredProjects = selectedFilter 
    ? projects.filter(project => project.keywords.includes(selectedFilter))
    : projects;
  
  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const filterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.05,
        duration: 0.4
      }
    })
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const projectVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: custom * 0.1
      }
    }),
    exit: { 
      opacity: 0,
      y: 50,
      transition: { duration: 0.3 }
    }
  };
  
  const imageVariants = {
    normal: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: 1,
      transition: { duration: 0.4 }
    }
  };
  
  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-800/20 relative overflow-hidden">
      {/* Background animated elements */}
      <motion.div 
        className="absolute top-40 -right-20 w-40 sm:w-60 h-40 sm:h-60 bg-secondary/5 rounded-full hidden sm:block"
        animate={{ 
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="mb-8 sm:mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={titleVariants}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
            whileHover={{ scale: 1.02 }}
          >
            Featured Projects
          </motion.h2>
          <motion.div 
            className="w-16 sm:w-20 h-1 bg-primary mx-auto mb-4 sm:mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-10 text-sm sm:text-base">
            Explore some of my recent work and personal projects
          </p>
          
          {/* Category filters */}
          <motion.div 
            className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.button
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 
                ${!selectedFilter 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              onClick={() => setSelectedFilter(null)}
              variants={filterVariants}
              custom={0}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All Projects
            </motion.button>
            
            {allCategories.slice(0, 6).map((category, idx) => (
              <motion.button
                key={idx}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300
                  ${selectedFilter === category 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                onClick={() => setSelectedFilter(
                  selectedFilter === category ? null : category
                )}
                variants={filterVariants}
                custom={idx + 1}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.name}
                className="project-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300"
                variants={projectVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={index}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                onHoverStart={() => setHoveredProject(index)}
                onHoverEnd={() => setHoveredProject(null)}
                layout
              >
                <div className="h-40 sm:h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
                  <motion.img 
                    src={project.image} 
                    className="w-full h-full object-cover transition-all duration-300" 
                    alt={project.name}
                    variants={imageVariants}
                    initial="normal"
                    animate={hoveredProject === index ? "hover" : "normal"}
                  />
                  
                  {/* Hover overlay - visible on hover for desktop, always visible with lower opacity on mobile */}
                  <motion.div 
                    className="absolute inset-0 bg-primary/60 flex items-center justify-center"
                    initial={{ opacity: 0.1 }}
                    animate={{ 
                      opacity: hoveredProject === index ? 1 : 0.1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.url && (
                      <motion.a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-primary"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ scale: 0.8 }}
                        animate={{ 
                          scale: hoveredProject === index ? 1 : 0.8,
                          opacity: hoveredProject === index ? 1 : 0.7,
                          transition: { delay: 0.1 } 
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
                          className="sm:w-6 sm:h-6"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </motion.a>
                    )}
                  </motion.div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-2">
                    <motion.h3 
                      className="text-lg sm:text-xl font-bold"
                      whileHover={{ x: 3 }}
                    >
                      {project.name}
                    </motion.h3>
                    
                    <motion.div 
                      className="text-2xs sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-primary/10 text-primary rounded-full"
                      whileHover={{ scale: 1.1 }}
                    >
                      {project.type}
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {project.keywords.slice(0, 3).map((keyword, idx) => (
                      <motion.span 
                        key={idx}
                        className={`text-2xs sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full cursor-pointer
                          ${selectedFilter === keyword 
                            ? 'bg-primary text-white' 
                            : 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-800/50'
                          }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFilter(
                            selectedFilter === keyword ? null : keyword
                          )
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {keyword}
                      </motion.span>
                    ))}
                    {project.keywords.length > 3 && (
                      <motion.span 
                        className="text-2xs sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        +{project.keywords.length - 3}
                      </motion.span>
                    )}
                  </motion.div>
                  
                  <motion.p 
                    className="text-gray-700 dark:text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {project.description}
                  </motion.p>
                  
                  {project.url && (
                    <motion.a 
                      href={project.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center text-primary hover:text-primary-700 dark:hover:text-primary-300 font-medium text-xs sm:text-sm"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>View Project</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="14" 
                        height="14" 
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
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredProjects.length === 0 && (
          <motion.div 
            className="text-center py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="inline-block p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4"
              animate={{ 
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-gray-500"
              >
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </motion.div>
            <h3 className="text-xl font-bold mb-2">No projects found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try selecting a different category
            </p>
            <motion.button
              className="mt-4 px-4 py-2 bg-primary text-white rounded-full text-sm font-medium"
              onClick={() => setSelectedFilter(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Show all projects
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
