import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import EmotionFilter from "@/components/EmotionFilter";
import StoryCard from "@/components/StoryCard";
import StoryModal from "@/components/StoryModal";
import { ArrowRight } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import storyHope from "@/assets/story-hope.jpg";
import storySadness from "@/assets/story-sadness.jpg";

const sampleStories = [
  {
    id: 1,
    title: "Finding Light After Dark Days",
    content: "After months of feeling lost and overwhelmed, I discovered that small daily rituals of self-care began to shift my perspective. It wasn't instant, but each sunrise brought a tiny spark of hope that eventually grew into genuine joy.",
    emotions: ["Hope", "Sadness"],
    author: "Anonymous",
    timeAgo: "2 hours ago",
    image: storyHope,
  },
  {
    id: 2,
    title: "The Beauty in Letting Go",
    content: "Learning to release control and trust the process has been the most challenging yet rewarding journey of my life. Sometimes the most beautiful transformations happen when we stop fighting the current.",
    emotions: ["Hope", "Fear"],
    author: "A Survivor",
    timeAgo: "5 hours ago", 
    image: storySadness,
  },
  {
    id: 3,
    title: "Embracing Vulnerability",
    content: "Opening my heart to love again after betrayal felt impossible. But I learned that vulnerability isn't weakness—it's the birthplace of courage, compassion, and connection.",
    emotions: ["Love", "Fear"],
    author: "Heart Healer",
    timeAgo: "1 day ago",
    image: storyHope,
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStory, setSelectedStory] = useState<typeof sampleStories[0] | null>(null);

  const handleEmotionToggle = (emotion: string) => {
    setSelectedEmotions(prev => 
      prev.includes(emotion) 
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    );
  };

  const handleStoryClick = (story: typeof sampleStories[0]) => {
    setSelectedStory(story);
  };

  const filteredStories = sampleStories.filter(story => {
    const matchesSearch = searchTerm === "" || 
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEmotions = selectedEmotions.length === 0 ||
      selectedEmotions.some(emotion => story.emotions.includes(emotion));
    
    return matchesSearch && matchesEmotions;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background" />
        
        <div className="relative container mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent leading-tight">
            The Unheard Stories
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            A safe space to share your journey, connect with others, and find healing through storytelling
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft hover:shadow-card transition-all duration-gentle hover:scale-105"
            onClick={() => navigate("/stories")}
          >
            Explore Stories <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>
      </section>

      {/* Filter Section */}
      <section className="container mx-auto px-4 py-12">
        <EmotionFilter
          selectedEmotions={selectedEmotions}
          onEmotionToggle={handleEmotionToggle}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </section>

      {/* Stories Section */}
      <section className="bg-gradient-to-br from-primary-soft/30 via-accent/20 to-background py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {filteredStories.length > 0 ? "Recommended Stories" : "No Stories Found"}
            </h2>
            <p className="text-muted-foreground">
              {filteredStories.length > 0 
                ? "Stories that resonate with hearts and heal souls"
                : "Try adjusting your filters to find more stories"
              }
            </p>
          </div>
        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <div key={story.id} onClick={() => handleStoryClick(story)} className="cursor-pointer">
                <StoryCard {...story} />
              </div>
            ))}
          </div>

          {/* Story Modal */}
          {selectedStory && (
            <StoryModal
              story={selectedStory}
              isOpen={!!selectedStory}
              onClose={() => setSelectedStory(null)}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;