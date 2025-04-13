import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface GithubUser {
  login: string;
  avatar_url: string;
  name: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
}

export default function GitHub() {
  const username = "bimalendu04";
  const [hoveredRepo, setHoveredRepo] = useState<number | null>(null);

  // Mock data for development and demonstration purposes
  const mockUser: GithubUser = {
    login: "bimalendu04",
    name: "Bimalendu Sarkar",
    avatar_url: "https://avatars.githubusercontent.com/u/10000000?v=4",
    public_repos: 24,
    followers: 48,
    following: 32,
    html_url: "https://github.com/bimalendu04"
  };
  
  const mockRepos: GithubRepo[] = [
    {
      id: 1,
      name: "portfolio-website",
      description: "Modern React portfolio website with theme switching and animations",
      html_url: "https://github.com/bimalendu04/portfolio-website",
      language: "TypeScript",
      stargazers_count: 21,
      forks_count: 5
    },
    {
      id: 2,
      name: "react-component-library",
      description: "Reusable React components with TypeScript and Storybook",
      html_url: "https://github.com/bimalendu04/react-component-library",
      language: "JavaScript",
      stargazers_count: 15,
      forks_count: 3
    },
    {
      id: 3,
      name: "nextjs-ecommerce",
      description: "E-commerce application built with Next.js and Stripe",
      html_url: "https://github.com/bimalendu04/nextjs-ecommerce",
      language: "TypeScript",
      stargazers_count: 12,
      forks_count: 2
    },
    {
      id: 4,
      name: "playwright-test-framework",
      description: "Modern E2E testing framework with Playwright",
      html_url: "https://github.com/bimalendu04/playwright-test-framework",
      language: "TypeScript",
      stargazers_count: 8,
      forks_count: 1
    },
    {
      id: 5,
      name: "node-express-api",
      description: "RESTful API with Node.js, Express, and TypeScript",
      html_url: "https://github.com/bimalendu04/node-express-api",
      language: "JavaScript",
      stargazers_count: 7,
      forks_count: 1
    },
    {
      id: 6,
      name: "data-visualization-dashboard",
      description: "Interactive dashboard with React, D3.js, and Recharts",
      html_url: "https://github.com/bimalendu04/data-visualization-dashboard",
      language: "JavaScript",
      stargazers_count: 5,
      forks_count: 0
    }
  ];

  // Use the API for real data or fall back to mock data
  const { data: userData, isLoading: userLoading, error: userError } = useQuery<GithubUser>({
    queryKey: [`https://api.github.com/users/${username}`],
    refetchOnWindowFocus: false,
  });

  const { data: reposData, isLoading: reposLoading, error: reposError } = useQuery<GithubRepo[]>({
    queryKey: [`https://api.github.com/users/${username}/repos?sort=stars&per_page=6`],
    refetchOnWindowFocus: false,
  });

  // Function to get color for language
  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      JavaScript: "#f1e05a",
      TypeScript: "#2b7489",
      HTML: "#e34c26",
      CSS: "#563d7c",
      Python: "#3572A5",
      Java: "#b07219",
      "C#": "#178600",
      PHP: "#4F5D95",
      Ruby: "#701516",
    };
    
    return colors[language] || "#8b949e";
  };

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const repoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        delay: custom * 0.1
      }
    }),
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { 
        duration: 0.3
      }
    }
  };

  // Use actual data or fallback to mock
  const user = userData || mockUser;
  const repos = reposData || mockRepos;

  return (
    <section id="github" className="py-20 bg-gray-50 dark:bg-gray-800/50 relative overflow-hidden">
      {/* Background animated elements */}
      <motion.div 
        className="absolute -bottom-10 -right-20 w-60 h-60 bg-blue-500/5 rounded-full"
        animate={{ 
          x: [0, -20, 0],
          y: [0, 10, 0],
        }}
        transition={{ 
          duration: 17, 
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
            GitHub Portfolio
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-primary mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Explore my open-source contributions and featured GitHub repositories
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* GitHub Profile Card */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg col-span-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex flex-col items-center text-center">
              {userLoading ? (
                <Skeleton className="w-24 h-24 rounded-full mb-4" />
              ) : userError ? (
                <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
                  <span className="text-gray-500 dark:text-gray-400">Error</span>
                </div>
              ) : (
                <motion.div 
                  className="relative mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary relative z-10">
                    <img 
                      src={user.avatar_url} 
                      alt={`${user.name}'s GitHub Avatar`} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <motion.div 
                    className="absolute inset-0 bg-primary/20 rounded-full blur-md"
                    animate={{ 
                      scale: [0.8, 1.1, 0.8],
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }}
                  />
                </motion.div>
              )}
              
              {userLoading ? (
                <div className="space-y-2 w-full">
                  <Skeleton className="h-6 w-32 mx-auto" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </div>
              ) : userError ? (
                <div className="text-red-500">
                  Error loading profile
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold mb-1">{user.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">@{user.login}</p>
                </>
              )}
              
              <div className="grid grid-cols-3 gap-2 w-full mb-6">
                {userLoading ? (
                  <>
                    <Skeleton className="h-14 rounded-lg" />
                    <Skeleton className="h-14 rounded-lg" />
                    <Skeleton className="h-14 rounded-lg" />
                  </>
                ) : userError ? null : (
                  <>
                    <motion.div 
                      className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg text-center"
                      whileHover={{ y: -3 }}
                    >
                      <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        {user.public_repos}
                      </div>
                      <div className="text-xs text-blue-700 dark:text-blue-300">Repos</div>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg text-center"
                      whileHover={{ y: -3 }}
                    >
                      <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                        {user.followers}
                      </div>
                      <div className="text-xs text-purple-700 dark:text-purple-300">Followers</div>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg text-center"
                      whileHover={{ y: -3 }}
                    >
                      <div className="text-xl font-bold text-green-600 dark:text-green-400">
                        {user.following}
                      </div>
                      <div className="text-xs text-green-700 dark:text-green-300">Following</div>
                    </motion.div>
                  </>
                )}
              </div>
              
              {!userLoading && !userError && (
                <motion.a 
                  href={user.html_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                    <path d="M9 18c-4.51 2-5-2-7-2"/>
                  </svg>
                  View GitHub Profile
                </motion.a>
              )}
            </div>
          </motion.div>
          
          {/* Repository Grid */}
          <div className="col-span-1 lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reposLoading ? (
                Array(6).fill(0).map((_, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md h-[180px]">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-3" />
                    <Skeleton className="h-4 w-5/6 mb-3" />
                    <Skeleton className="h-4 w-2/3 mb-3" />
                    <div className="flex justify-between mt-auto">
                      <Skeleton className="h-4 w-16" />
                      <div className="flex gap-3">
                        <Skeleton className="h-4 w-8" />
                        <Skeleton className="h-4 w-8" />
                      </div>
                    </div>
                  </div>
                ))
              ) : reposError ? (
                <div className="col-span-2 text-center py-12">
                  <div className="inline-block p-4 bg-red-50 dark:bg-red-900/20 rounded-full mb-4">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="32" 
                      height="32" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="text-red-500"
                    >
                      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-red-600 dark:text-red-400">Error loading repositories</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Unable to fetch GitHub repositories at this time
                  </p>
                </div>
              ) : repos.length === 0 ? (
                <div className="col-span-2 text-center py-12">
                  <div className="text-gray-500 dark:text-gray-400">
                    No repositories found
                  </div>
                </div>
              ) : (
                repos.map((repo, index) => (
                  <motion.div 
                    key={repo.id} 
                    className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md h-[180px] flex flex-col relative overflow-hidden"
                    variants={repoVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true }}
                    custom={index}
                    onHoverStart={() => setHoveredRepo(index)}
                    onHoverEnd={() => setHoveredRepo(null)}
                  >
                    {/* Background accent */}
                    <div 
                      className="absolute top-0 left-0 h-1 w-full"
                      style={{ 
                        backgroundColor: repo.language ? getLanguageColor(repo.language) : "#8b949e" 
                      }}
                    ></div>
                    
                    <h4 className="font-semibold text-lg truncate">
                      <a 
                        href={repo.html_url}
                        className="hover:text-primary dark:hover:text-primary"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {repo.name}
                      </a>
                    </h4>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2 flex-grow">
                      {repo.description || "No description provided"}
                    </p>
                    
                    <div className="flex items-center justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
                      {repo.language && (
                        <div className="flex items-center">
                          <span 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: getLanguageColor(repo.language) }}
                          ></span>
                          <span>{repo.language}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
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
                            className="mr-1"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                          </svg>
                          <span>{repo.stargazers_count}</span>
                        </div>
                        
                        <div className="flex items-center">
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
                            className="mr-1"
                          >
                            <path d="M7 18l6-6-6-6"/>
                            <path d="M17 6v12"/>
                          </svg>
                          <span>{repo.forks_count}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover overlay with view button */}
                    <AnimatePresence>
                      {hoveredRepo === index && (
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-end justify-center p-5"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.a
                            href={repo.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2 bg-white text-gray-900 rounded-md font-medium flex items-center gap-2"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                          >
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
                            >
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                              <polyline points="15 3 21 3 21 9"/>
                              <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                            View Repository
                          </motion.a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
