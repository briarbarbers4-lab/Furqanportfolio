import { useEffect, useState } from "react";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Linkedin, Instagram, ArrowUp, Mail, Phone, MapPin, Play, Pause, Volume2, VolumeX, Maximize, Minimize, X, ChevronLeft, ChevronRight, Award, Star, Quote } from "lucide-react";
import { SiLinkedin, SiInstagram, SiYoutube, SiVimeo } from "react-icons/si";
import { Navigation } from "@/components/Navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactForm } from "@/components/ContactForm";
import { useProjects } from "@/hooks/use-projects";
import { useSkills } from "@/hooks/use-skills";
import { Button } from "@/components/ui/button";

// Glassmorphic Card Component
const GlassCard = ({ children, className = "" }) => {
  return (
    <motion.div
      className={`bg-[#4a1a7f1a] backdrop-blur-md border border-[#c77dff33] rounded-3xl shadow-2xl ${className}`}
      whileHover={{ y: -5, boxShadow: "0 15px 40px rgba(157, 78, 221, 0.3)" }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// Glassmorphic Badge Component
const GlassBadge = ({ children, className = "" }) => {
  return (
    <motion.span
      className={`inline-block px-4 py-2 bg-[#4a1a7f1a] backdrop-blur-sm border border-[#c77dff33] rounded-full text-sm text-white ${className}`}
      whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(157, 78, 221, 0.2)" }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.span>
  );
};

// Floating Header Component
const FloatingHeader = () => {
  return (
    <motion.header
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard className="px-6 py-3 flex items-center gap-8">
        <ScrollLink to="home" smooth={true} duration={500}>
          <Button
            variant="ghost"
            className="text-white hover:text-[#c77dff] hover:bg-transparent px-4 py-2 rounded-full transition-all"
          >
            Hom
          </Button>
        </ScrollLink>
        <ScrollLink to="contact" smooth={true} duration={500} offset={-80}>
          <Button
            variant="ghost"
            className="text-white hover:text-[#c77dff] hover:bg-transparent px-4 py-2 rounded-full transition-all"
          >
            Contact
          </Button>
        </ScrollLink>
      </GlassCard>
    </motion.header>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-[#9d4edd] to-[#7b2cbf] rounded-full opacity-20 blur-3xl"
          animate={{ 
            x: [0, 50, 0], 
            y: [0, 30, 0], 
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-[#c77dff] to-[#9d4edd] rounded-full opacity-20 blur-2xl"
          animate={{ 
            x: [0, -40, 0], 
            y: [0, -20, 0], 
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 font-sans tracking-tight">
            Muhammad Furqan Shahid
          </h1>
          <motion.p
            className="text-2xl md:text-3xl text-[#c77dff] mb-8 font-allura"
            animate={{ 
              textShadow: [
                "0 0 10px rgba(199, 125, 255, 0.5)",
                "0 0 20px rgba(199, 125, 255, 0.7)",
                "0 0 10px rgba(199, 125, 255, 0.5)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Creative Developer & Designer
          </motion.p>
          <p className="text-lg md:text-xl text-[#e0e0e0] max-w-3xl mx-auto mb-12 font-inter leading-relaxed">
            Crafting digital excellence through code and design. Building products that matter with passion and precision.
          </p>

          <ScrollLink to="about" smooth={true} duration={800} offset={-80}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#9d4edd] to-[#7b2cbf] text-white px-8 py-4 rounded-full font-semibold hover:from-[#7b2cbf] hover:to-[#9d4edd] transition-all hover:shadow-lg hover:shadow-[#9d4edd]/30"
            >
              Explore My Work
            </Button>
          </ScrollLink>
        </motion.div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
          {/* Profile Image */}
          <motion.div
            className="w-full lg:w-1/3 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-4 w-64 h-64">
              <div className="w-full h-full rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </GlassCard>
          </motion.div>

          {/* About Content */}
          <motion.div
            className="w-full lg:w-2/3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6 font-sans">About Me</h2>
            <motion.p
              className="text-[#c77dff] text-2xl mb-6 font-allura"
              animate={{ 
                textShadow: [
                  "0 0 5px rgba(199, 125, 255, 0.3)",
                  "0 0 10px rgba(199, 125, 255, 0.5)",
                  "0 0 5px rgba(199, 125, 255, 0.3)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              Creative Developer
            </motion.p>

            <div className="space-y-4 text-[#e0e0e0] font-inter text-base leading-relaxed">
              <p>
                Hello! I'm a passionate developer with a deep love for creating beautiful, functional, and user-centric digital experiences. With a background in both design and engineering, I bridge the gap between aesthetics and functionality.
              </p>
              <p>
                My approach is driven by curiosity and a commitment to excellence. Whether I'm crafting complex backend systems or fine-tuning frontend animations, I strive for clean code and meaningful interactions that leave a lasting impression.
              </p>
              <p>
                I specialize in modern web technologies and enjoy working on projects that challenge me to grow and innovate. When I'm not coding, you can find me exploring new design trends or contributing to open-source projects.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-8">
              <a
                href="https://www.linkedin.com/in/muhammad-furqan-shahid-13a051363/"
                className="w-12 h-12 rounded-full bg-[#4a1a7f1a] backdrop-blur-sm border border-[#c77dff33] flex items-center justify-center text-[#c77dff] hover:bg-[#c77dff20] hover:text-white transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiLinkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/furqan.luminex/"
                className="w-12 h-12 rounded-full bg-[#4a1a7f1a] backdrop-blur-sm border border-[#c77dff33] flex items-center justify-center text-[#c77dff] hover:bg-[#c77dff20] hover:text-white transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiInstagram size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Skills Section
const SkillsSection = () => {
  const { data: skills, isLoading: skillsLoading } = useSkills();

  // Sample skills data if loading or empty
  const sampleSkills = [
    { id: 1, name: "React", category: "Frontend", proficiency: 95 },
    { id: 2, name: "TypeScript", category: "Frontend", proficiency: 90 },
    { id: 3, name: "Node.js", category: "Backend", proficiency: 85 },
    { id: 4, name: "Tailwind CSS", category: "Frontend", proficiency: 92 },
    { id: 5, name: "Express", category: "Backend", proficiency: 88 },
    { id: 6, name: "PostgreSQL", category: "Database", proficiency: 80 },
    { id: 7, name: "Framer Motion", category: "Animation", proficiency: 90 },
    { id: 8, name: "Vite", category: "Tooling", proficiency: 85 },
  ];

  const displaySkills = skillsLoading ? sampleSkills : skills || sampleSkills;

  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold text-white mb-4 font-sans"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My Skills
        </motion.h2>
        <motion.p
          className="text-[#c77dff] text-2xl mb-12 font-allura"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          What I bring to the table
        </motion.p>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {displaySkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <GlassBadge>
                {skill.name}
              </GlassBadge>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Section
const ProjectsSection = () => {
  const { data: projects, isLoading: projectsLoading } = useProjects();

  // Sample projects data if loading or empty
  const sampleProjects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Modern online store with React, TypeScript, and Node.js backend.",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      technologies: ["React", "TypeScript", "Node.js", "Express"]
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "Personal portfolio showcasing projects and skills.",
      imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
      technologies: ["Vite", "React", "Tailwind", "Framer Motion"]
    },
    {
      id: 3,
      title: "Task Management App",
      description: "Productivity application with drag-and-drop interface.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      technologies: ["React", "TypeScript", "Firebase", "DnD"]
    },
  ];

  const displayProjects = projectsLoading ? sampleProjects : projects || sampleProjects;

  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold text-white mb-4 font-sans"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </motion.h2>
        <motion.p
          className="text-[#c77dff] text-2xl mb-12 font-allura"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          My best work
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayProjects.slice(0, 3).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <GlassCard className="overflow-hidden h-full">
                <div className="h-48 overflow-hidden rounded-t-2xl">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 font-sans">{project.title}</h3>
                  <p className="text-[#e0e0e0] text-sm mb-4 font-inter">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <GlassBadge key={techIndex} className="text-xs px-3 py-1">
                        {tech}
                      </GlassBadge>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4 font-sans">Get In Touch</h2>
          <motion.p
            className="text-[#c77dff] text-2xl font-allura"
            animate={{ 
              textShadow: [
                "0 0 5px rgba(199, 125, 255, 0.3)",
                "0 0 10px rgba(199, 125, 255, 0.5)",
                "0 0 5px rgba(199, 125, 255, 0.3)"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Let's build something great
          </motion.p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-start"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-full bg-[#4a1a7f1a] backdrop-blur-sm border border-[#c77dff33] flex items-center justify-center text-[#c77dff] group-hover:bg-[#c77dff20] group-hover:text-white transition-all">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-[#e0e0e0] text-sm font-inter">Email</p>
                <p className="text-white font-medium">hello@furqanshahid.com</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-full bg-[#4a1a7f1a] backdrop-blur-sm border border-[#c77dff33] flex items-center justify-center text-[#c77dff] group-hover:bg-[#c77dff20] group-hover:text-white transition-all">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-[#e0e0e0] text-sm font-inter">Phone</p>
                <p className="text-white font-medium">+92 300 1234567</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-full bg-[#4a1a7f1a] backdrop-blur-sm border border-[#c77dff33] flex items-center justify-center text-[#c77dff] group-hover:bg-[#c77dff20] group-hover:text-white transition-all">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-[#e0e0e0] text-sm font-inter">Location</p>
                <p className="text-white font-medium">Lahore, Pakistan</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <p className="text-[#e0e0e0] text-sm font-inter mb-4">Connect with me</p>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/muhammad-furqan-shahid-13a051363/"
                  className="w-10 h-10 rounded-full bg-[#4a1a7f1a] backdrop-blur-sm border border-[#c77dff33] flex items-center justify-center text-[#c77dff] hover:bg-[#c77dff20] hover:text-white transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiLinkedin size={18} />
                </a>
                <a
                  href="https://www.instagram.com/furqan.luminex/"
                  className="w-10 h-10 rounded-full bg-[#4a1a7f1a] backdrop-blur-sm border border-[#c77dff33] flex items-center justify-center text-[#c77dff] hover:bg-[#c77dff20] hover:text-white transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiInstagram size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <GlassCard className="p-8">
            <ContactForm />
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

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
    <footer className="py-12 px-4 relative mt-24">
      <div className="container mx-auto text-center">
        <motion.p
          className="text-[#e0e0e0] text-sm font-inter mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          © {new Date().getFullYear()} Muhammad Furqan Shahid. All rights reserved.
        </motion.p>

        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full bg-[#4a1a7f1a] backdrop-blur-sm border border-[#c77dff33] flex items-center justify-center text-[#c77dff] hover:bg-[#c77dff20] hover:text-white transition-all mx-auto"
            >
              <ArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </footer>
  );
};

// Main Component
export default function Home() {
  const { scrollY } = useScroll();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] to-[#0b0d12] text-white font-sans selection:bg-[#9d4edd] selection:text-white overflow-x-hidden">
      <FloatingHeader />

      <main className="pt-24">
        <HeroSection />
        <AboutSection />
        <MyWorkSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Global Background Effects */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] to-[#0b0d12]"></div>
        <motion.div
          className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#9d4edd] to-[#7b2cbf] rounded-full opacity-5 blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}
