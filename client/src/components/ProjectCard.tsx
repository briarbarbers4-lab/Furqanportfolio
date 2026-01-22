import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { type Project } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden bg-card border-white/5 hover:border-primary/50 transition-all duration-500 h-full flex flex-col hover:shadow-2xl hover:shadow-primary/10">
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* HTML Comment for Image Replacement if URL breaks */}
          {/* Project Image: {project.title} */}
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" 
          />
        </div>
        
        <CardContent className="p-6 flex-grow">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="bg-primary/10 text-primary hover:bg-primary/20 border-none text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
        </CardContent>
        
        <CardFooter className="p-6 pt-0 flex gap-4">
          {project.projectUrl && (
            <a 
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
          <a 
            href="#" 
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors"
          >
            <Github size={16} /> Source
          </a>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
