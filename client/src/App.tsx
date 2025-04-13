import { Route, Switch } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Animated cursor component
function CustomCursor() {
  return (
    <motion.div
      className="fixed w-6 h-6 rounded-full pointer-events-none z-50 flex items-center justify-center mix-blend-difference"
      style={{ 
        backgroundColor: "white",
        boxShadow: "0 0 20px 5px rgba(255, 255, 255, 0.3)",
      }}
      animate={{
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        scale: [1, 1.2, 1],
      }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 300,
        mass: 0.5,
      }}
    >
      <motion.div 
        className="w-2 h-2 bg-transparent rounded-full border border-white"
        animate={{ scale: [0.5, 1, 0.5] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
    </motion.div>
  );
}

function App() {
  // Controls the animated cursor
  const handleMouseMove = (e: React.MouseEvent) => {
    const cursor = document.querySelector('.custom-cursor') as HTMLElement;
    if (cursor) {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    }
  };

  return (
    <div 
      className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-x-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 dark:to-primary/10 pointer-events-none" />
      
      {/* Animated particles */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/20 dark:bg-primary/30"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, Math.random() * 0.5 + 0.8, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Custom cursor - hidden on mobile */}
      <div className="custom-cursor hidden md:block">
        <CustomCursor />
      </div>

      <Header />
      
      <main className="pt-16 relative">
        <AnimatePresence mode="wait">
          <Switch>
            <Route path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </AnimatePresence>
      </main>
      
      <Footer />
      
      {/* Scroll to top button */}
      <motion.button
        className="fixed right-6 bottom-6 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg z-40"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.3 }
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        whileTap={{ scale: 0.95 }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="m18 15-6-6-6 6"/>
        </svg>
      </motion.button>
    </div>
  );
}

export default App;
