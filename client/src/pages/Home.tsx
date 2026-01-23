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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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
  { id: 1, title: "Viral Product Launch - 45s", duration: "0:45", views: "5.2M views", category: "Short Form", client: "Tech Brand", thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07eab495?w=400&h=225&fit=crop", tags: ["Motion Graphics", "Color Grading"] },
  { id: 2, title: "Behind the Scenes Reel - 30s", duration: "0:30", views: "890K views", category: "Short Form", client: "Personal", thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=225&fit=crop", tags: ["VFX", "Sound Design"] },
  { id: 3, title: "Quick Tips Series Ep.1 - 60s", duration: "1:00", views: "2.1M views", category: "Short Form", client: "YouTube", thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop", tags: ["Color Grading", "2D Animation"] },
  { id: 4, title: "Brand Story Teaser - 15s", duration: "0:15", views: "1.3M views", category: "Short Form", client: "Social Media", thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=225&fit=crop", tags: ["Motion Graphics"] },
  { id: 5, title: "Trending Audio Edit - 25s", duration: "0:25", views: "8.7M views", category: "Short Form", client: "TikTok", thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop", tags: ["Sound Design", "VFX"] },
  { id: 6, title: "Daily Vlog Highlight - 40s", duration: "0:40", views: "450K views", category: "Short Form", client: "Instagram", thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=225&fit=crop", tags: ["Color Grading"] },
  { id: 7, title: "Product Demo Loop - 20s", duration: "0:20", views: "320K views", category: "Short Form", client: "Twitter", thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop", tags: ["Motion Graphics", "2D Animation"] },
  { id: 8, title: "Motivational Quote Edit - 35s", duration: "0:35", views: "180K views", category: "Short Form", client: "LinkedIn", thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop", tags: ["VFX", "Sound Design"] },
  // Long Form
  { id: 9, title: "Brand Documentary - 8:45", duration: "8:45", views: "3.5M views", category: "Long Form", client: "Fortune 500", thumbnail: "https://images.unsplash.com/photo-1489599735734-79b4dfe3b22a?w=400&h=225&fit=crop", tags: ["Color Grading", "Sound Design"] },
  { id: 10, title: "Company Culture Video - 5:20", duration: "5:20", views: "120K views", category: "Long Form", client: "Corporate", thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop", tags: ["Motion Graphics", "VFX"] },
  { id: 11, title: "Creative Process Breakdown - 12:30", duration: "12:30", views: "890K views", category: "Long Form", client: "YouTube", thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07eab495?w=400&h=225&fit=crop", tags: ["2D Animation", "Color Grading"] },
  { id: 12, title: "Client Success Story - 6:15", duration: "6:15", views: "250K views", category: "Long Form", client: "Case Study", thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=225&fit=crop", tags: ["Motion Graphics", "Sound Design"] },
  { id: 13, title: "Tutorial: Advanced Color Grading - 15:00", duration: "15:00", views: "1.2M views", category: "Long Form", client: "Education", thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop", tags: ["Color Grading", "VFX"] },
  { id: 14, title: "Event Coverage Highlight - 10:30", duration: "10:30", views: "85K views", category: "Long Form", client: "Corporate", thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=225&fit=crop", tags: ["Motion Graphics"] },
  { id: 15, title: "Interview Series Ep.3 - 7:45", duration: "7:45", views: "340K views", category: "Long Form", client: "Podcast", thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop", tags: ["Sound Design", "Color Grading"] },
  { id: 16, title: "Product Launch Campaign - 4:20", duration: "4:20", views: "2.8M views", category: "Long Form", client: "Commercial", thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop", tags: ["Motion Graphics", "VFX"] },
  { id: 17, title: "Cinematic Travel Film - 9:00", duration: "9:00", views: "650K views", category: "Long Form", client: "Personal", thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop", tags: ["Color Grading", "Sound Design"] },
  { id: 18, title: "Explainer Video - 3:30", duration: "3:30", views: "1.1M views", category: "Long Form", client: "Animation", thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=225&fit=crop", tags: ["2D Animation", "Motion Graphics"] },
  // Commercials
  { id: 19, title: "Luxury Brand Campaign - 2:15", duration: "2:15", views: "4.2M views", category: "Commercials", client: "Fashion", thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=225&fit=crop", tags: ["Color Grading", "VFX"] },
  { id: 20, title: "Tech Product Demo - 1:30", duration: "1:30", views: "6.8M views", category: "Commercials", client: "Tech", thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=225&fit=crop", tags: ["Motion Graphics", "Sound Design"] },
  // Music Videos
  { id: 21, title: "Indie Artist Music Video - 4:00", duration: "4:00", views: "2.5M views", category: "Music Videos", client: "Music", thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop", tags: ["Color Grading", "VFX", "2D Animation"] },
  { id: 22, title: "Electronic Track Visualizer - 3:45", duration: "3:45", views: "1.8M views", category: "Music Videos", client: "Music", thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=225&fit=crop", tags: ["Motion Graphics", "Sound Design"] },
  // Corporate
  { id: 23, title: "Annual Report Video - 6:30", duration: "6:30", views: "95K views", category: "Corporate", client: "Finance", thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop", tags: ["Motion Graphics", "Color Grading"] },
  { id: 24, title: "Employee Training Series - 8:00", duration: "8:00", views: "75K views", category: "Corporate", client: "Corporate", thumbnail: "https://images.unsplash.com/photo-1489599735734-79b4dfe3b22a?w=400&h=225&fit=crop", tags: ["2D Animation", "Sound Design"] },
];

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

// Hero Section with Demo Reel
const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-20">
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
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#c77dff] rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto text-center relative z-10 space-y-16">
        {/* Demo Reel Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl mx-auto"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-white mb-4 font-sans tracking-tight"
            style={{ fontSize: '64px' }}
            animate={{
              textShadow: [
                "0 0 10px rgba(199, 125, 255, 0.5)",
                "0 0 20px rgba(199, 125, 255, 0.8)",
                "0 0 10px rgba(199, 125, 255, 0.5)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            2025 SHOWREEL
          </motion.h2>
          <motion.p
            className="text-2xl md:text-3xl text-[#c77dff] mb-8 font-allura"
            style={{ fontSize: '28px' }}
          >
            60 Seconds of Excellence
          </motion.p>

          {/* Video Player Container */}
          <GlassCard className="w-full max-w-4xl mx-auto p-4 relative overflow-hidden">
            <motion.div
              className="relative w-full aspect-video bg-gradient-to-br from-[#1a0b2e] to-[#0b0d12] rounded-2xl overflow-hidden"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(157, 78, 221, 0.3)",
                  "0 0 40px rgba(157, 78, 221, 0.6)",
                  "0 0 20px rgba(157, 78, 221, 0.3)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Video Thumbnail Placeholder */}
              <img
                src="https://images.unsplash.com/photo-1492691527719-9d1e07eab495?w=1200&h=675&fit=crop"
                alt="Showreel Thumbnail"
                className="w-full h-full object-cover"
              />
              {/* Play Button Overlay */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <motion.button
                  className="w-24 h-24 bg-gradient-to-r from-[#9d4edd] to-[#7b2cbf] rounded-full flex items-center justify-center shadow-2xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 20px rgba(157, 78, 221, 0.5)",
                      "0 0 40px rgba(157, 78, 221, 0.8)",
                      "0 0 20px rgba(157, 78, 221, 0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Play size={40} className="text-white ml-1" />
                </motion.button>
              </motion.div>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>
          </GlassCard>

          <motion.p
            className="text-lg text-[#e0e0e0] mt-6 font-inter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            50+ Projects | 10M+ Views | Award-Winning Editor
          </motion.p>
        </motion.div>

        {/* Hero Headline Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-8"
        >
          <motion.h1
            className="text-6xl md:text-7xl font-bold text-white font-sans tracking-tight"
            style={{ fontSize: '72px' }}
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
            className="text-2xl md:text-3xl text-[#c77dff] font-allura"
            animate={{
              textShadow: [
                "0 0 10px rgba(199, 125, 255, 0.5)",
                "0 0 20px rgba(199, 125, 255, 0.7)",
                "0 0 10px rgba(199, 125, 255, 0.5)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            CEO & Creative Director | Crafting Visual Stories
          </motion.p>
          <div className="max-w-4xl mx-auto space-y-4 text-lg md:text-xl text-[#e0e0e0] font-inter leading-relaxed">
            <p>
              With over a decade of experience in video production and editing, I specialize in transforming raw footage into compelling visual narratives that captivate audiences and drive results.
            </p>
            <p>
              From high-energy commercials to intimate documentaries, my work spans across industries, delivering cinematic quality that elevates brands and tells unforgettable stories.
            </p>
            <p>
              Let's collaborate to bring your vision to life with cutting-edge editing techniques and creative storytelling.
            </p>
          </div>

          <ScrollLink to="portfolio" smooth={true} duration={800} offset={-80}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#9d4edd] to-[#7b2cbf] text-white px-8 py-4 rounded-full font-semibold hover:from-[#7b2cbf] hover:to-[#9d4edd] transition-all hover:shadow-lg hover:shadow-[#9d4edd]/30"
            >
              View My Portfolio
            </Button>
          </ScrollLink>
        </motion.div>
      </div>
    </section>
  );
};

// Video Portfolio Section
const VideoPortfolioSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Work");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const categories = ["All Work", "Short Form", "Long Form", "Commercials", "Music Videos", "Corporate"];

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
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="w-16 h-16 bg-[#9d4edd]/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Play size={24} className="text-white ml-1" />
                      </div>
                    </motion.div>
                    {/* Duration Badge */}
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-medium">
                      {video.duration}
                    </div>
                    {/* View Count Badge */}
                    <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-medium">
                      {video.views}
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
          <DialogContent className="max-w-6xl w-full bg-[#1a0b2e] border border-[#c77dff33] backdrop-blur-md">
            {selectedVideo && (
              <div className="space-y-6">
                {/* Video Player */}
                <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
                  <img
                    src={selectedVideo.thumbnail}
                    alt={selectedVideo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      className="w-20 h-20 bg-[#9d4edd]/80 backdrop-blur-sm rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Play size={32} className="text-white ml-2" />
                    </motion.button>
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-4 font-sans">{selectedVideo.title}</h3>
                    <div className="space-y-4 text-[#e0e0e0] font-inter">
                      <div className="flex items-center gap-4">
                        <span className="text-[#c77dff] font-medium">Client:</span>
                        <span>{selectedVideo.client}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[#c77dff] font-medium">Duration:</span>
                        <span>{selectedVideo.duration}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[#c77dff] font-medium">Views:</span>
                        <span>{selectedVideo.views}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[#c77dff] font-medium">Role:</span>
                        <span>Director | Editor | Colorist</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <h4 className="text-xl font-bold text-white mb-3 font-sans">Description</h4>
                      <p className="text-[#e0e0e0] font-inter leading-relaxed">
                        This project showcases innovative editing techniques and creative storytelling to deliver a compelling visual experience that resonates with the target audience.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-white mb-3 font-sans">Tech Stack Used</h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedVideo.tags.map((tag, index) => (
                        <GlassBadge key={index} className="px-4 py-2">
                          {tag}
                        </GlassBadge>
                      ))}
                    </div>

                    <h4 className="text-xl font-bold text-white mb-3 font-sans">Results</h4>
                    <ul className="space-y-2 text-[#e0e0e0] font-inter">
                      <li>• 10M+ views achieved</li>
                      <li>• 150% engagement increase</li>
                      <li>• Award-winning recognition</li>
                    </ul>

                    <div className="mt-6 flex gap-4">
                      <Button className="bg-gradient-to-r from-[#9d4edd] to-[#7b2cbf] text-white px-6 py-3 rounded-full font-semibold">
                        Next Project
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="border-[#c77dff33] text-[#c77dff] hover:bg-[#c77dff20]">
                          <SiLinkedin size={18} />
                        </Button>
                        <Button variant="outline" size="icon" className="border-[#c77dff33] text-[#c77dff] hover:bg-[#c77dff20]">
                          <SiYoutube size={18} />
                        </Button>
                        <Button variant="outline" size="icon" className="border-[#c77dff33] text-[#c77dff] hover:bg-[#c77dff20]">
                          <span className="text-sm">🔗</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
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
    { number: "10+", label: "Years Experience" },
    { number: "150+", label: "Projects Completed" },
    { number: "50+", label: "Global Clients" },
    { number: "25+", label: "Industry Awards" },
  ];

  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <GlassCard className="p-8">
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
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <GlassBadge className="px-6 py-3 text-sm">
                {skill}
              </GlassBadge>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto text-center">
        <GlassCard className="p-12 max-w-4xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-6 font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Let's Create Something Amazing
          </motion.h2>
          <motion.p
            className="text-lg text-[#e0e0e0] mb-8 font-inter max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Have a project in mind? Let's discuss how we can bring your vision to life with cutting-edge video editing and storytelling.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#9d4edd] to-[#7b2cbf] text-white px-8 py-4 rounded-full font-semibold hover:from-[#7b2cbf] hover:to-[#9d4edd] transition-all hover:shadow-lg hover:shadow-[#9d4edd]/30"
            >
              Start a Project
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#c77dff33] text-[#c77dff] hover:bg-[#c77dff20] hover:text-white px-8 py-4 rounded-full font-semibold backdrop-blur-sm"
            >
              View My Services
            </Button>
          </motion.div>
        </GlassCard>
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
        <VideoPortfolioSection />
        <StatsSection />
        <ClientLogosSection />
        <TestimonialsSection />
        <AwardsSection />
        <FeaturedInSection />
        <ProcessSection />
        <SkillsSection />
        <CTASection />
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
