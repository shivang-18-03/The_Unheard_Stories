import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";

interface StoryCardProps {
  title: string;
  content: string;
  emotions: string[];
  author: string;
  timeAgo: string;
  image: string;
}

const getEmotionColor = (emotion: string) => {
  const colors: Record<string, string> = {
    Hope: "bg-emotion-hope text-white",
    Sadness: "bg-emotion-sadness text-white",
    Joy: "bg-emotion-joy text-white",
    Fear: "bg-emotion-fear text-white",
    Love: "bg-emotion-love text-white",
    Anger: "bg-emotion-anger text-white",
  };
  return colors[emotion] || "bg-muted text-muted-foreground";
};

const StoryCard = ({ title, content, emotions, author, timeAgo, image }: StoryCardProps) => {
  return (
    <Card className="group hover:shadow-card transition-all duration-smooth hover:-translate-y-1 bg-gradient-card border-border/50">
      <div className="aspect-video relative overflow-hidden rounded-t-lg">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-smooth group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-gentle">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pb-3">
        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
          {content}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {emotions.map((emotion) => (
            <Badge 
              key={emotion} 
              variant="secondary"
              className={`text-xs ${getEmotionColor(emotion)}`}
            >
              {emotion}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 text-xs text-muted-foreground">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-1">
            <User size={14} />
            <span>{author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{timeAgo}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default StoryCard;