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
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Video Interface
interface Video {
  id: number;
  title: string;
  duration: string;
  views: string;
  category: string;
  client: string;
  thumbnail: string;
  tags: string[];
}

// Video Data
const videoProjects = [
  // Short Form
  { id: 1, title: "Short 1", duration: "0:30", views: "", category: "Short Form", client: "Luminex", thumbnail: "//i.ytimg.com/vi/1KTLmD7okxY/hqdefault.jpg", url: "https://www.youtube.com/embed/1KTLmD7okxY", tags: ["Shorts", "Creative"] },
  { id: 2, title: "Short 2", duration: "0:30", views: "", category: "Short Form", client: "Luminex", thumbnail: "//i.ytimg.com/vi/8CMyACDvgiw/hqdefault.jpg", url: "https://www.youtube.com/embed/8CMyACDvgiw", tags: ["Shorts", "Viral"] },
  { id: 3, title: "Short 3", duration: "0:30", views: "", category: "Short Form", client: "Luminex", thumbnail: "//i.ytimg.com/vi/c0o1mOpvWHg/hqdefault.jpg", url: "https://www.youtube.com/embed/c0o1mOpvWHg", tags: ["Shorts", "Edit"] },
  { id: 4, title: "Short 4", duration: "0:30", views: "", category: "Short Form", client: "Luminex", thumbnail: "//i.ytimg.com/vi/1zwTqSBPJYI/hqdefault.jpg", url: "https://www.youtube.com/embed/1zwTqSBPJYI", tags: ["Shorts", "Motion"] },
  { id: 5, title: "Short 5", duration: "0:30", views: "", category: "Short Form", client: "Luminex", thumbnail: "//i.ytimg.com/vi/ayAjLHOl-MQ/hqdefault.jpg", url: "https://www.youtube.com/embed/ayAjLHOl-MQ", tags: ["Shorts", "Visuals"] },
  { id: 6, title: "Short 6", duration: "0:30", views: "", category: "Short Form", client: "Luminex", thumbnail: "//i.ytimg.com/vi/Zw52Jgsf_NE/hqdefault.jpg", url: "https://www.youtube.com/embed/Zw52Jgsf_NE", tags: ["Shorts", "Story"] },
  // Long Form
  { id: 9, title: "Long Form 1", duration: "5:00", views: "", category: "Long Form", client: "Luminex", thumbnail: "//i.ytimg.com/vi/hg98fzJTKh4/hqdefault.jpg", url: "https://www.youtube.com/embed/hg98fzJTKh4", tags: ["Storytelling", "Cinematic"] },
  { id: 10, title: "Long Form 2", duration: "8:00", views: "", category: "Long Form", client: "Luminex", thumbnail: "//i.ytimg.com/vi/hxWDYQMgNn0/hqdefault.jpg", url: "https://www.youtube.com/embed/hxWDYQMgNn0", tags: ["Production", "Edit"] },
  { id: 11, title: "Long Form 3", duration: "10:00", views: "", category: "Long Form", client: "Luminex", thumbnail: "//i.ytimg.com/vi/IeM04ObtEbA/hqdefault.jpg", url: "https://www.youtube.com/embed/IeM04ObtEbA", tags: ["Creative", "VFX"] },
  { id: 12, title: "Long Form 4", duration: "12:00", views: "", category: "Long Form", client: "Luminex", thumbnail: "//i.ytimg.com/vi/L1Eo7fMj-vE/hqdefault.jpg", url: "https://www.youtube.com/embed/L1Eo7fMj-vE", tags: ["Branding", "Motion"] },
];

// Glassmorphic Card Component
const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
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
const GlassBadge = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
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
            Home
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
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-20">
      <div className="container mx-auto text-center relative z-10 space-y-12">
        {/* Hero Headline Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-white font-sans tracking-tight"
            whileHover={{
              background: "linear-gradient(45deg, #9d4edd, #c77dff, #7b2cbf)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            transition={{ duration: 0.3 }}
          >
            Muhammad Furqan Shahid
          </motion.h1>
          <motion.p
            className="text-3xl md:text-4xl text-[#c77dff] font-allura"
            animate={{
              textShadow: [
                "0 0 10px rgba(199, 125, 255, 0.5)",
                "0 0 20px rgba(199, 125, 255, 0.7)",
                "0 0 10px rgba(199, 125, 255, 0.5)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Co-Founder & CEO | Luminex Social
          </motion.p>
          <div className="max-w-4xl mx-auto space-y-6 text-xl md:text-2xl text-[#e0e0e0] font-inter leading-relaxed">
            <p>
              I help coaches, consultants, SaaS founders, and agency owners turn content into a scalable system that attracts leads, closes clients, and drives revenue across Instagram, LinkedIn, and YouTube.
            </p>
            <p>
              With 3+ years as a senior video editor and motion designer, I’ve partnered with top influencers and business owners to generate millions of views and real business results. I don’t just edit content — I manage the entire system behind it.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <ScrollLink to="portfolio" smooth={true} duration={800} offset={-80}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#9d4edd] to-[#7b2cbf] text-white px-10 py-6 rounded-full font-bold text-lg hover:from-[#7b2cbf] hover:to-[#9d4edd] transition-all hover:shadow-xl hover:shadow-[#9d4edd]/40"
              >
                Explore Work
              </Button>
            </ScrollLink>
            <ScrollLink to="contact" smooth={true} duration={800} offset={-80}>
              <Button
                size="lg"
                variant="outline"
                className="border-[#c77dff] text-[#c77dff] hover:bg-[#c77dff]/10 px-10 py-6 rounded-full font-bold text-lg transition-all"
              >
                Get In Touch
              </Button>
            </ScrollLink>
          </div>

          <motion.div
            className="pt-12 flex flex-wrap justify-center gap-12 text-[#c77dff]/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold text-white">3+</p>
              <p className="text-sm uppercase tracking-widest">Years</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold text-white">100+</p>
              <p className="text-sm uppercase tracking-widest">Projects</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold text-white">15+</p>
              <p className="text-sm uppercase tracking-widest">Clients</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Video Portfolio Section
const VideoPortfolioSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Work");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const categories = ["All Work", "Short Form", "Long Form"];

  const filteredVideos = selectedCategory === "All Work"
    ? videoProjects
    : videoProjects.filter(video => video.category === selectedCategory);

  return (
    <section id="portfolio" className="py-24 px-4 relative">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4 font-sans">Video Portfolio</h2>
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
            Crafting Visual Stories
          </motion.p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-[#9d4edd] to-[#7b2cbf] text-white shadow-lg"
                  : "bg-[#4a1a7f1a] backdrop-blur-sm border border-[#c77dff33] text-[#e0e0e0] hover:bg-[#c77dff20] hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Video Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          layout
        >
          <AnimatePresence>
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                <GlassCard className="overflow-hidden h-full">
                  <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Play Button Overlay */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="w-16 h-16 bg-[#9d4edd]/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Play size={24} className="text-white ml-1" />
                      </div>
                    </motion.div>
                    {/* Duration Badge */}
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-medium">
                      {video.duration}
                    </div>
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2 font-sans">{video.title}</h3>
                    <p className="text-[#c77dff] text-sm mb-3 font-inter">{video.client}</p>
                    <div className="flex flex-wrap gap-2">
                      {video.tags.map((tag, tagIndex) => (
                        <GlassBadge key={tagIndex} className="text-xs px-3 py-1">
                          {tag}
                        </GlassBadge>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Video Modal */}
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-6xl w-full bg-[#1a0b2e] border border-[#c77dff33] backdrop-blur-md p-0 overflow-hidden">
            <DialogTitle className="sr-only">
              {selectedVideo?.title || "Video Player"}
            </DialogTitle>
            {selectedVideo && (
              <div className="relative aspect-video bg-black">
                <iframe
                  src={`${selectedVideo.url}?autoplay=1&rel=0&modestbranding=1`}
                  title={selectedVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};


// Stats Counter Section
const StatsSection = () => {
  const stats = [
    { number: "3+", label: "Years Experience" },
    { number: "100+", label: "Projects Completed" },
    { number: "15+", label: "Global Clients" },
  ];

  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.34rem)]"
            >
              <GlassCard className="p-8 h-full flex flex-col items-center justify-center">
                <motion.div
                  className="text-4xl md:text-5xl font-bold text-white mb-2 font-sans"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3, type: "spring" }}
                >
                  {stat.number}
                </motion.div>
                <p className="text-[#c77dff] text-lg font-allura">{stat.label}</p>
                <div className="w-16 h-1 bg-gradient-to-r from-[#9d4edd] to-[#7b2cbf] mx-auto mt-4 rounded-full"></div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Client Logos Section
const ClientLogosSection = () => {
  const logos = [
    "Apple", "Nike", "Google", "Netflix", "Amazon", "Microsoft", "Adobe", "Spotify", "Tesla", "Coca-Cola", "Samsung", "Disney", "Meta", "Twitter", "YouTube"
  ];

  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold text-white mb-12 font-sans"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Trusted By Industry Leaders
        </motion.h2>

        <GlassCard className="p-8">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-8 items-center">
            {logos.map((logo, index) => (
              <motion.div
                key={logo}
                className="flex items-center justify-center h-16 grayscale hover:grayscale-0 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="text-2xl font-bold text-[#e0e0e0]">{logo}</div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Furqan's editing work transformed our brand video into something truly spectacular. His attention to detail and creative vision exceeded all expectations.",
      name: "Sarah Johnson",
      company: "TechCorp Inc.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      quote: "Working with Furqan was an absolute pleasure. His expertise in video editing and storytelling brought our documentary to life in ways we never imagined.",
      name: "Michael Chen",
      company: "Global Media",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          className="text-4xl font-bold text-white text-center mb-12 font-sans"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What Clients Say
        </motion.h2>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard className="p-8 text-center">
                <Quote className="w-12 h-12 text-[#c77dff] mx-auto mb-6" />
                <p className="text-lg text-[#e0e0e0] font-allura italic mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#c77dff]"
                  />
                  <div className="text-left">
                    <p className="text-white font-bold font-inter">{testimonials[currentTestimonial].name}</p>
                    <p className="text-[#c77dff] font-inter">{testimonials[currentTestimonial].company}</p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#c77dff] text-[#c77dff]" />
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentTestimonial ? "bg-[#c77dff]" : "bg-[#c77dff33]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Awards Section
const AwardsSection = () => {
  const awards = [
    { name: "Best Video Editor 2024", organization: "Video Awards International", icon: Award },
    { name: "Creative Excellence Award", organization: "Digital Media Society", icon: Award },
    { name: "Innovation in Editing", organization: "Film & Video Festival", icon: Award },
    { name: "Outstanding Achievement", organization: "Media Excellence Awards", icon: Award },
    { name: "Gold Standard Award", organization: "Creative Professionals", icon: Award },
    { name: "Editor's Choice Award", organization: "Video Production Guild", icon: Award },
  ];

  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto">
        <motion.h2
          className="text-4xl font-bold text-white text-center mb-12 font-sans"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Awards & Recognition
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard className="p-6 text-center">
                <award.icon className="w-12 h-12 text-[#c77dff] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2 font-sans">{award.name}</h3>
                <p className="text-[#e0e0e0] font-inter">{award.organization}</p>
                <div className="w-12 h-1 bg-gradient-to-r from-[#9d4edd] to-[#7b2cbf] mx-auto mt-4 rounded-full"></div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Featured In Section
const FeaturedInSection = () => {
  const publications = [
    "TechCrunch", "Forbes", "Creative Bloq", "VideoMaker", "Post-Production Magazine", "Digital Arts"
  ];

  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold text-white mb-12 font-sans"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          As Featured In
        </motion.h2>

        <GlassCard className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center">
            {publications.map((pub, index) => (
              <motion.div
                key={pub}
                className="flex items-center justify-center h-16 text-xl font-bold text-[#e0e0e0] grayscale hover:grayscale-0 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
              >
                {pub}
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

// Process Section
const ProcessSection = () => {
  const processes = [
    {
      title: "Discovery",
      description: "Understanding your vision, goals, and target audience through in-depth consultation and research.",
      icon: "🎯"
    },
    {
      title: "Pre-Production",
      description: "Planning and storyboarding the project, gathering assets, and creating a detailed production timeline.",
      icon: "📋"
    },
    {
      title: "Production",
      description: "Filming and capturing footage with professional equipment and creative techniques.",
      icon: "🎬"
    },
    {
      title: "Delivery",
      description: "Polished final product delivered on time with all requested formats and revisions included.",
      icon: "✅"
    }
  ];

  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4 font-sans">My Creative Process</h2>
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
            From Concept to Creation
          </motion.p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-full h-1 bg-gradient-to-r from-[#9d4edd] to-[#7b2cbf] hidden lg:block"></div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {processes.map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <GlassCard className="p-8 text-center h-full">
                  <div className="text-4xl mb-4">{process.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-4 font-sans">{process.title}</h3>
                  <p className="text-[#e0e0e0] font-inter leading-relaxed">{process.description}</p>
                </GlassCard>
                {/* Timeline Dot */}
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#c77dff] rounded-full hidden lg:block"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Skills Section (Updated for Video Editing)
const SkillsSection = () => {
  const skills = [
    // Software
    "Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "Final Cut Pro",
    // Skills
    "Color Grading", "Motion Graphics", "Sound Design", "VFX",
    // Styles
    "Cinematic", "Documentary", "Commercial", "Social Media"
  ];

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
          Technical Expertise
        </motion.h2>
        <motion.p
          className="text-[#c77dff] text-2xl mb-12 font-allura"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Tools & Techniques
        </motion.p>

        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <GlassBadge className="text-sm px-6 py-3">
                {skill}
              </GlassBadge>
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
                <p className="text-white font-medium">furqan@luminexsocial.com</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-full bg-[#4a1a7f1a] backdrop-blur-sm border border-[#c77dff33] flex items-center justify-center text-[#c77dff] group-hover:bg-[#c77dff20] group-hover:text-white transition-all">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-[#e0e0e0] text-sm font-inter">Phone</p>
                <p className="text-white font-medium">+92 3325058773</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-full bg-[#4a1a7f1a] backdrop-blur-sm border border-[#c77dff33] flex items-center justify-center text-[#c77dff] group-hover:bg-[#c77dff20] group-hover:text-white transition-all">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-[#e0e0e0] text-sm font-inter">Location</p>
                <p className="text-white font-medium">Islamabad, Pakistan</p>
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
        <VideoPortfolioSection />
        <StatsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <Footer />

      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[#0b0d12]"></div>
      </div>
    </div>
  );
}
