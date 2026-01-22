import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { type Project } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="group overflow-hidden bg-[#1A1D26] border-white/5 hover:border-[#0D21A1]/50 transition-all duration-500 h-full flex flex-col hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#0D21A1]/20">
        <div className="relative h-56 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/80 via-transparent to-transparent z-10 opacity-60" />
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" 
          />
        </div>
        
        <CardContent className="p-6 flex-grow flex flex-col">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge 
                key={tag} 
                className="bg-[#0D21A1] text-white hover:bg-[#0D21A1]/80 border-none text-[10px] uppercase tracking-wider font-bold py-0.5 px-2"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className="text-xl font-medium mb-3 text-white font-sans group-hover:text-[#0D21A1] transition-colors">{project.title}</h3>
          <p className="text-[#F7F8FC]/60 text-sm leading-relaxed font-inter line-clamp-3">{project.description}</p>
        </CardContent>
        
        <CardFooter className="p-6 pt-0 flex gap-4 mt-auto">
          <Button 
            asChild
            variant="outline" 
            className="w-full border-[#0D21A1]/30 text-white hover:bg-[#0D21A1] hover:border-[#0D21A1] transition-all duration-300 group/btn"
          >
            <a 
              href={project.projectUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              View Project <ExternalLink size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
