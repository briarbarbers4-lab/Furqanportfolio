import { useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter, Code2, Database, Layout } from "lucide-react";
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
  
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen bg-[hsl(var(--bg-dark))] text-foreground font-sans selection:bg-primary selection:text-white overflow-hidden">
      <Navigation />

      {/* HERO SECTION */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] rounded-full bg-primary/10 blur-[120px]" />
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
            <span className="font-display text-4xl md:text-5xl text-primary block mb-4">Hello, I'm</span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              John Doe
            </h1>
            <h2 className="text-2xl md:text-3xl text-muted-foreground font-light mb-8 max-w-2xl mx-auto">
              Creative Developer crafting digital experiences with code and passion.
            </h2>
            
            <div className="flex justify-center gap-4 mb-12">
              <ScrollLink to="projects" smooth={true} duration={800} offset={-100}>
                <Button size="lg" className="rounded-full px-8 h-14 bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-1">
                  View My Work
                </Button>
              </ScrollLink>
              <ScrollLink to="contact" smooth={true} duration={800}>
                <Button size="lg" variant="outline" className="rounded-full px-8 h-14 border-white/10 text-white hover:bg-white/5 hover:text-white hover:border-white/30 transition-all">
                  Contact Me
                </Button>
              </ScrollLink>
            </div>

            <div className="flex justify-center gap-6 text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors transform hover:scale-110"><Github size={24} /></a>
              <a href="#" className="hover:text-primary transition-colors transform hover:scale-110"><Linkedin size={24} /></a>
              <a href="#" className="hover:text-primary transition-colors transform hover:scale-110"><Twitter size={24} /></a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="text-muted-foreground opacity-50" />
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <AboutSection />

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-display text-3xl mb-2 block">My Work</span>
            <h2 className="text-4xl md:text-5xl font-bold">Featured Projects</h2>
          </motion.div>

          {projectsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[400px] bg-card/50 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects?.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-display text-3xl mb-2 block">Expertise</span>
            <h2 className="text-4xl md:text-5xl font-bold">Skills & Tools</h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {skillsLoading ? (
              <div className="h-40 bg-card/50 rounded-2xl animate-pulse" />
            ) : (
              <div className="flex flex-wrap justify-center gap-4">
                {skills?.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative"
                  >
                    <div className="px-6 py-3 rounded-xl bg-card border border-white/5 hover:border-primary hover:shadow-[0_0_15px_rgba(13,33,161,0.3)] transition-all duration-300">
                      <span className="font-medium text-muted-foreground group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-bottom-right" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-display text-4xl mb-4 block">Let's Connect</span>
              <h2 className="text-5xl md:text-6xl font-bold mb-6">Have a project in mind?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                I'm currently available for freelance projects and open to full-time opportunities. 
                If you have an idea you want to bring to life, let's talk!
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-muted-foreground hover:text-white transition-colors">
                  <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-white/10">
                    <Github size={20} />
                  </div>
                  <span>github.com/johndoe</span>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground hover:text-white transition-colors">
                  <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-white/10">
                    <Linkedin size={20} />
                  </div>
                  <span>linkedin.com/in/johndoe</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-white/5 bg-[hsl(var(--bg-dark))]">
        <div className="container mx-auto px-6 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} John Doe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
