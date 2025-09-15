import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface EmotionFilterProps {
  selectedEmotions: string[];
  onEmotionToggle: (emotion: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const emotions = [
  { name: "Hope", color: "bg-emotion-hope text-white" },
  { name: "Sadness", color: "bg-emotion-sadness text-white" },
  { name: "Joy", color: "bg-emotion-joy text-white" },
  { name: "Fear", color: "bg-emotion-fear text-white" },
  { name: "Love", color: "bg-emotion-love text-white" },
  { name: "Anger", color: "bg-emotion-anger text-white" },
];

const EmotionFilter = ({ 
  selectedEmotions, 
  onEmotionToggle, 
  searchTerm, 
  onSearchChange 
}: EmotionFilterProps) => {
  return (
    <div className="bg-gradient-card rounded-xl p-6 shadow-card">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="Search stories by title or content..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-background/50 border-border/50 focus:border-primary transition-colors duration-gentle"
          />
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Filter by emotions</h3>
          <div className="flex flex-wrap gap-2">
            {emotions.map((emotion) => (
              <Badge
                key={emotion.name}
                variant={selectedEmotions.includes(emotion.name) ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-gentle hover:scale-105 ${
                  selectedEmotions.includes(emotion.name) 
                    ? emotion.color 
                    : "hover:bg-primary-soft hover:border-primary"
                }`}
                onClick={() => onEmotionToggle(emotion.name)}
              >
                {emotion.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionFilter;