import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { resumeData } from "@/data/resume";

export default function Hero() {
  const { basics } = resumeData;
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position for image parallax effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform mouse position into image movement (subtle effect)
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);
  
  // Handle mouse move for interactive parallax effect
  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }
  
  // Typing animation for the job title/label
  const [displayedLabel, setDisplayedLabel] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < basics.label.length) {
      const timeout = setTimeout(() => {
        setDisplayedLabel(prev => prev + basics.label[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, basics.label]);
  
  // Variant for the staggered text animation
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 0.1 * custom
      }
    })
  };
  
  // Variants for the floating animation of the image
  const floatVariants = {
    normal: { 
      y: 0,
      transition: { 
        yoyo: Infinity, 
        duration: 3,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center py-12 sm:py-16 md:py-20 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center relative">
        {/* Animated background elements */}
        <motion.div 
          className="absolute -top-20 -left-20 w-40 h-40 bg-primary/10 rounded-full hidden sm:block"
          animate={{ 
            x: [0, 30, 0],
            y: [0, 50, 0],
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        
        <motion.div 
          className="absolute -bottom-40 -right-20 w-60 h-60 bg-blue-500/10 rounded-full hidden sm:block"
          animate={{ 
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        
        {/* Text content */}
        <motion.div 
          className="w-full lg:w-1/2 mb-12 lg:mb-0 z-10 text-center lg:text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            Hi, I'm <motion.span 
              className="text-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {basics.name.split(' ')[0]}
            </motion.span>
          </motion.h1>
          
          <motion.h2 
            className="text-xl sm:text-2xl md:text-3xl mb-12 text-gray-700 dark:text-gray-300 h-8 mx-auto lg:mx-0"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <span className="relative">
              {displayedLabel}
              <AnimatePresence>
                {currentIndex < basics.label.length && (
                  <motion.span 
                    className="absolute right-0 top-0 h-full w-0.5 bg-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  />
                )}
              </AnimatePresence>
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            {basics.summary}
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <a href="#projects">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="gap-2">
                  <i className="ri-folder-line"></i> 
                  <span className="hidden sm:inline">View</span> Projects
                </Button>
              </motion.div>
            </a>
            <a href="#skills">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" size="lg" className="gap-2">
                  <i className="ri-tools-line"></i> My Skills
                </Button>
              </motion.div>
            </a>
          </motion.div>
          
          <motion.div 
            className="flex gap-4 mt-8 justify-center lg:justify-start"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            {basics.profiles.map((profile, index) => (
              <motion.a 
                key={index}
                href={profile.url} 
                target="_blank" 
                rel="noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400 transition-all duration-300"
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 5,
                  color: "var(--primary)" 
                }}
                whileTap={{ scale: 0.9 }}
              >
                <i className={`${profile.icon} text-2xl sm:text-3xl`}></i>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Image section with parallax */}
        <motion.div 
          className="w-full lg:w-1/2 flex justify-center z-10"
          style={{ perspective: 1000 }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div 
            className="relative w-full max-w-md"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            {/* Image with parallax effect */}
            <motion.div
              style={{ 
                rotateX, 
                rotateY,
                transformStyle: "preserve-3d",
              }}
              animate={isHovered ? "hover" : "normal"}
              variants={floatVariants}
              className="relative"
            >
              <motion.img 
                src="https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Professional workspace with computer" 
                className="rounded-2xl shadow-lg w-full h-auto object-cover cursor-pointer select-none"
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
                whileHover={{ scale: 1.03 }}
                drag
                dragConstraints={{
                  top: -10,
                  right: 10,
                  bottom: 10,
                  left: -10,
                }}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
              />
              
              {/* Subtle image shadow/highlight effect */}
              <motion.div 
                className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/10 to-transparent opacity-60"
                whileHover={{ opacity: 0.8 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
