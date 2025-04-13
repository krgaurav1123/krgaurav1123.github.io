import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";

export default function About() {
  const { basics } = resumeData;
  
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div 
            className="md:w-2/5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80" 
              alt="Developer workspace" 
              className="rounded-2xl shadow-lg w-full" 
            />
          </motion.div>
          
          <div className="md:w-3/5">
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Who am I?</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {basics.summary}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                My expertise includes state management with React Context and Redux-toolkit, building responsive interfaces, and creating maintainable code architecture. I'm passionate about creating efficient, user-friendly interfaces that deliver exceptional user experiences.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <i className="ri-map-pin-line mr-2 text-primary"></i> Location
                </h4>
                <p className="text-gray-700 dark:text-gray-300">{basics.location.address}</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <i className="ri-mail-line mr-2 text-primary"></i> Email
                </h4>
                <p className="text-gray-700 dark:text-gray-300">{basics.email}</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <i className="ri-phone-line mr-2 text-primary"></i> Phone
                </h4>
                <p className="text-gray-700 dark:text-gray-300">{basics.phone}</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <i className="ri-graduation-cap-line mr-2 text-primary"></i> Education
                </h4>
                <p className="text-gray-700 dark:text-gray-300">{resumeData.education[0].studyType} in {resumeData.education[0].area} ({resumeData.education[0].startDate.substring(0, 4)}-{resumeData.education[0].endDate.substring(0, 4)})</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
