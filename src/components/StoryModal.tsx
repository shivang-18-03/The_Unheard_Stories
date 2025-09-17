import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Clock, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StoryModalProps {
  story: {
    id: number;
    title: string;
    content: string;
    emotions: string[];
    author: string;
    timeAgo: string;
    image: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const getEmotionColor = (emotion: string) => {
  const colors: Record<string, string> = {
    Hope: "bg-emotion-hope text-white",
    Sadness: "bg-emotion-sadness text-white",
    Joy: "bg-emotion-joy text-white",
    Fear: "bg-emotion-fear text-white",
    Love: "bg-emotion-love text-white",
    Anger: "bg-emotion-anger text-white",
    Anxiety: "bg-emotion-fear text-white",
  };
  return colors[emotion] || "bg-muted text-muted-foreground";
};

const StoryModal = ({ story, isOpen, onClose }: StoryModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-full max-h-[95vh] h-full overflow-y-auto bg-gradient-card border-border/50 p-0">
        <div className="p-6">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <DialogTitle className="text-3xl font-bold text-foreground leading-tight pr-8">
              {story.title}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm"
            >
              <X size={24} />
            </Button>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User size={14} />
              <span>{story.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{story.timeAgo}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {story.emotions.map((emotion) => (
              <Badge 
                key={emotion} 
                variant="secondary"
                className={`text-xs ${getEmotionColor(emotion)}`}
              >
                {emotion}
              </Badge>
            ))}
          </div>
        </DialogHeader>
        
        <div className="mt-6">
          <div className="aspect-video relative overflow-hidden rounded-lg mb-6">
            <img 
              src={story.image} 
              alt={story.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-foreground leading-relaxed text-base whitespace-pre-wrap">
              {story.content}
            </p>
          </div>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryModal;