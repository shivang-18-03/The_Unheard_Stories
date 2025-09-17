import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EmotionFilter from "@/components/EmotionFilter";
import StoryCard from "@/components/StoryCard";
import StoryModal from "@/components/StoryModal";
import storyHopeImage from "@/assets/story-hope.jpg";
import storySadnessImage from "@/assets/story-sadness.jpg";

// Mock data for all stories - in real app this would come from database
const allStories = [
  {
    id: 1,
    title: "Finding Light in the Darkness",
    content: "After months of feeling lost and disconnected, I never thought I'd find my way back to happiness. The journey began on a rainy Tuesday when I decided to take a different route home from work. That small change led to discovering a community garden where strangers became friends, and gardening became my therapy. Every seed I planted was a step toward healing. Watching things grow reminded me that life always finds a way to flourish, even in the most unlikely places. Today, I tend not just to plants, but to the hope that had been dormant in my heart for so long.",
    emotions: ["Hope", "Sadness", "Joy"],
    author: "Anonymous",
    timeAgo: "2 hours ago",
    image: storyHopeImage,
  },
  {
    id: 2,
    title: "The Weight of Goodbye",
    content: "Saying goodbye to my childhood home wasn't just about leaving a house; it was about closing a chapter of my life that held every memory I treasured. As I walked through each room one last time, I could hear echoes of birthday parties, family dinners, and quiet moments of comfort. The walls seemed to whisper stories of a lifetime. While my heart feels heavy with the weight of this goodbye, I'm learning that carrying these memories with me is what makes them eternal. Home isn't just a place—it's the love that lives within us.",
    emotions: ["Sadness", "Love"],
    author: "Maria S.",
    timeAgo: "1 day ago",
    image: storySadnessImage,
  },
  {
    id: 3,
    title: "Courage in Small Steps",
    content: "Public speaking used to terrify me to the point where I'd avoid any situation that required me to speak up. But last week, I raised my hand in a meeting and shared an idea that had been bubbling inside me for months. My voice shook, my palms were sweaty, but I did it. The idea was well-received, and for the first time in years, I felt proud of my courage. Sometimes bravery isn't about grand gestures—it's about taking one small, scary step at a time.",
    emotions: ["Fear", "Hope", "Joy"],
    author: "Alex P.",
    timeAgo: "3 days ago",
    image: storyHopeImage,
  },
  {
    id: 4,
    title: "Unexpected Friendship",
    content: "At 45, I thought I was too old to make new close friends. Then I met Janet at the grocery store when we both reached for the last bunch of bananas. We laughed, decided to split them, and ended up talking for two hours in the parking lot. Six months later, she's become one of my closest friends. She's taught me that connections can happen at any age, in any place, when we're open to the magic of human kindness.",
    emotions: ["Love", "Joy", "Hope"],
    author: "David K.",
    timeAgo: "1 week ago",
    image: storyHopeImage,
  },
  {
    id: 5,
    title: "Learning to Let Go",
    content: "For years, I held onto anger like it was protecting me from getting hurt again. But anger became a prison where I was both the guard and the prisoner. Learning to forgive—not for others, but for my own peace—has been the most challenging and liberating journey of my life. Forgiveness doesn't mean forgetting or excusing; it means choosing freedom over resentment. Today, my heart feels lighter than it has in years.",
    emotions: ["Anger", "Sadness", "Hope"],
    author: "Sarah M.",
    timeAgo: "2 weeks ago",
    image: storySadnessImage,
  },
  {
    id: 6,
    title: "First Day Fears",
    content: "Starting over at 35 felt impossible. New job, new city, new everything. I sat in my car outside the office building for twenty minutes, wondering if I'd made a terrible mistake. But as I walked through those doors and met my new colleagues, I realized that sometimes what feels like an ending is actually a beginning in disguise. Change is scary, but it's also where growth lives.",
    emotions: ["Fear", "Hope", "Anxiety"],
    author: "James L.",
    timeAgo: "3 weeks ago",
    image: storyHopeImage,
  },
];

const Stories = () => {
  const navigate = useNavigate();
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStory, setSelectedStory] = useState<typeof allStories[0] | null>(null);

  const filteredStories = allStories.filter((story) => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEmotions = selectedEmotions.length === 0 || 
                           selectedEmotions.some(emotion => story.emotions.includes(emotion));
    return matchesSearch && matchesEmotions;
  });

  const handleEmotionToggle = (emotion: string) => {
    setSelectedEmotions(prev => 
      prev.includes(emotion)
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    );
  };

  const handleStoryClick = (story: typeof allStories[0]) => {
    setSelectedStory(story);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
              Explore All Stories
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover heartfelt stories shared by our community. Filter by emotions or search for specific themes.
            </p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <EmotionFilter
            selectedEmotions={selectedEmotions}
            onEmotionToggle={handleEmotionToggle}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <div key={story.id} onClick={() => handleStoryClick(story)} className="cursor-pointer">
              <StoryCard {...story} />
            </div>
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No stories found matching your criteria. Try adjusting your filters or search terms.
            </p>
          </div>
        )}

        {/* Story Modal */}
        {selectedStory && (
          <StoryModal
            story={selectedStory}
            isOpen={!!selectedStory}
            onClose={() => setSelectedStory(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Stories;