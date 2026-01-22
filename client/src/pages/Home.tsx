import { useEffect, useState } from "react";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter, Code2, Database, Layout, Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { SiLinkedin, SiGithub, SiX } from "react-icons/si";
import { Navigation } from "@/components/Navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactForm } from "@/components/ContactForm";
import { useProjects } from "@/hooks/use-projects";
import { useSkills } from "@/hooks/use-skills";
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-[#F7F8FC]">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center gap-12"
        >
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-xl border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-4 bg-white px-6 py-3 rounded-full shadow-lg">
                <a href="#" className="text-[#0D21A1] hover:scale-110 transition-transform"><SiLinkedin size={20} /></a>
                <a href="#" className="text-[#0D21A1] hover:scale-110 transition-transform"><SiGithub size={20} /></a>
                <a href="#" className="text-[#0D21A1] hover:scale-110 transition-transform"><SiX size={20} /></a>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B0D12] mb-2 font-sans">About Me</h2>
            <h3 className="text-3xl font-bold text-[#0D21A1] mb-6 font-allura">Creative Developer</h3>
            <div className="space-y-4 text-gray-700 font-inter text-lg">
              <p>
                Hello! I'm a passionate developer with a deep love for creating beautiful, functional, and user-centric digital experiences. With a background in both design and engineering, I bridge the gap between aesthetics and functionality.
              </p>
              <p>
                My approach is driven by curiosity and a commitment to excellence. Whether I'm crafting complex backend systems or fine-tuning frontend animations, I strive for clean code and meaningful interactions that leave a lasting impression.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default function Home() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const { scrollY } = useScroll();
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] text-[#F7F8FC] font-sans selection:bg-[#0D21A1] selection:text-white overflow-hidden">
      <Navigation />

      {/* HERO SECTION */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] rounded-full bg-[#0D21A1]/10 blur-[120px]" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[100px]" />
        </div>

        <motion.div 
          className="container mx-auto px-6 relative z-10 text-center"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-allura text-4xl md:text-5xl text-[#0D21A1] block mb-4">Hello, I'm</span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 text-white font-sans">
              John Doe
            </h1>
            <h2 className="text-2xl md:text-3xl text-[#F7F8FC]/60 font-light mb-8 max-w-2xl mx-auto font-inter">
              Creative Developer crafting digital experiences with code and passion.
            </h2>
            
            <div className="flex justify-center gap-4 mb-12">
              <ScrollLink to="projects" smooth={true} duration={800} offset={-100}>
                <Button size="lg" className="rounded-full px-8 h-14 bg-[#0D21A1] text-white hover:bg-[#0D21A1]/90 shadow-lg shadow-[#0D21A1]/25 hover:shadow-xl hover:shadow-[#0D21A1]/30 transition-all hover:-translate-y-1">
                  View My Work
                </Button>
              </ScrollLink>
              <ScrollLink to="contact" smooth={true} duration={800}>
                <Button size="lg" variant="outline" className="rounded-full px-8 h-14 border-white/10 text-white hover:bg-white/5 hover:text-white hover:border-white/30 transition-all">
                  Contact Me
                </Button>
              </ScrollLink>
            </div>

            <div className="flex justify-center gap-6 text-[#F7F8FC]/60">
              <a href="#" className="hover:text-[#0D21A1] transition-colors transform hover:scale-110"><SiGithub size={24} /></a>
              <a href="#" className="hover:text-[#0D21A1] transition-colors transform hover:scale-110"><SiLinkedin size={24} /></a>
              <a href="#" className="hover:text-[#0D21A1] transition-colors transform hover:scale-110"><SiX size={24} /></a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="text-[#F7F8FC]/40" />
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <AboutSection />

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-24 relative overflow-hidden bg-[#0B0D12]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#0D21A1] font-allura text-3xl mb-2 block">My Work</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-sans">Featured Projects</h2>
          </motion.div>

          {projectsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-[450px] bg-[#1A1D26] rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects?.slice(0, 6).map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-24 bg-[#F7F8FC]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B0D12] mb-2 font-sans">Skills & Expertise</h2>
            <h3 className="text-3xl font-bold text-[#0D21A1] font-allura">What I bring to the table</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillsLoading ? (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 bg-white rounded-2xl animate-pulse shadow-sm" />
              ))
            ) : (
              Object.entries(
                (skills || []).reduce((acc, skill) => {
                  const category = skill.category;
                  if (!acc[category]) acc[category] = [];
                  acc[category].push(skill);
                  return acc;
                }, {} as Record<string, typeof skills>)
              ).map(([category, categorySkills], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIndex * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1.5 h-6 bg-[#0D21A1] rounded-full" />
                    <h3 className="text-xl font-bold text-[#0B0D12] font-sans">{category}</h3>
                  </div>
                  <div className="space-y-4">
                    {categorySkills.map((skill, skillIndex) => (
                      <div key={skill.id} className="space-y-1.5">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-[#0B0D12]">{skill.name}</span>
                          <span className="text-[#0D21A1]">{skill.proficiency}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 + (skillIndex * 0.1) }}
                            className="h-full bg-[#0D21A1] rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-[#0B0D12] relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 font-sans">Get In Touch</h2>
              <h3 className="text-3xl font-bold text-[#0D21A1] mb-8 font-allura">Let's build something great</h3>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-[#1A1D26] flex items-center justify-center text-[#0D21A1] border border-white/5 group-hover:bg-[#0D21A1] group-hover:text-white transition-all duration-300">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[#F7F8FC]/40 text-sm font-inter">Email</p>
                    <p className="text-white font-medium">hello@johndoe.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-[#1A1D26] flex items-center justify-center text-[#0D21A1] border border-white/5 group-hover:bg-[#0D21A1] group-hover:text-white transition-all duration-300">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[#F7F8FC]/40 text-sm font-inter">Phone</p>
                    <p className="text-white font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-[#1A1D26] flex items-center justify-center text-[#0D21A1] border border-white/5 group-hover:bg-[#0D21A1] group-hover:text-white transition-all duration-300">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[#F7F8FC]/40 text-sm font-inter">Location</p>
                    <p className="text-white font-medium">San Francisco, CA</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <p className="text-[#F7F8FC]/60 mb-6 font-inter italic">"Design is not just what it looks like and feels like. Design is how it works."</p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-[#1A1D26] flex items-center justify-center text-[#F7F8FC]/60 hover:bg-[#0D21A1] hover:text-white transition-all"><SiLinkedin size={18} /></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#1A1D26] flex items-center justify-center text-[#F7F8FC]/60 hover:bg-[#0D21A1] hover:text-white transition-all"><SiGithub size={18} /></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#1A1D26] flex items-center justify-center text-[#F7F8FC]/60 hover:bg-[#0D21A1] hover:text-white transition-all"><SiX size={18} /></a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0B0D12] pt-20 pb-10 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0D21A1] to-transparent opacity-30" />
        
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white font-sans tracking-tight">John<span className="text-[#0D21A1]">.</span>Doe</h3>
              <p className="text-[#F7F8FC]/40 font-inter leading-relaxed max-w-xs">
                Crafting digital excellence through code and design. Building products that matter.
              </p>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-white font-sans uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-3">
                {["Home", "About", "Projects", "Skills", "Contact"].map((item) => (
                  <li key={item}>
                    <ScrollLink 
                      to={item.toLowerCase()} 
                      smooth={true} 
                      duration={500} 
                      className="text-[#F7F8FC]/60 hover:text-[#0D21A1] cursor-pointer transition-colors font-inter"
                    >
                      {item}
                    </ScrollLink>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-white font-sans uppercase tracking-wider">Social</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-[#F7F8FC]/60 hover:text-[#0D21A1] transition-colors font-inter">LinkedIn</a></li>
                <li><a href="#" className="text-[#F7F8FC]/60 hover:text-[#0D21A1] transition-colors font-inter">GitHub</a></li>
                <li><a href="#" className="text-[#F7F8FC]/60 hover:text-[#0D21A1] transition-colors font-inter">X (Twitter)</a></li>
                <li><a href="#" className="text-[#F7F8FC]/60 hover:text-[#0D21A1] transition-colors font-inter">Dribbble</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[#F7F8FC]/20 text-sm font-inter">
              © {new Date().getFullYear()} John Doe. All rights reserved.
            </p>
            
            <AnimatePresence>
              {showBackToTop && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={scrollToTop}
                  className="w-12 h-12 rounded-full bg-[#1A1D26] border border-white/10 flex items-center justify-center text-[#0D21A1] hover:bg-[#0D21A1] hover:text-white transition-all shadow-xl"
                >
                  <ArrowUp size={24} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </footer>
    </div>
  );
}
