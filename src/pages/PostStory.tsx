import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { PenTool, Heart, Upload, ImagePlus, X } from "lucide-react";

const emotions = [
  { name: "Hope", color: "bg-emotion-hope text-white" },
  { name: "Sadness", color: "bg-emotion-sadness text-white" },
  { name: "Joy", color: "bg-emotion-joy text-white" },
  { name: "Fear", color: "bg-emotion-fear text-white" },
  { name: "Love", color: "bg-emotion-love text-white" },
  { name: "Anger", color: "bg-emotion-anger text-white" },
];

const PostStory = () => {
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [authorName, setAuthorName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEmotionToggle = (emotion: string) => {
    setSelectedEmotions(prev => 
      prev.includes(emotion)
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "Image too large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }
      
      setCoverImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCoverImage = () => {
    setCoverImage(null);
    setCoverImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !story.trim() || selectedEmotions.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and select at least one emotion.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate story submission (in real app, this would be an API call)
    setTimeout(() => {
      toast({
        title: "Story Shared Successfully! 🎉",
        description: "Thank you for sharing your story. It may help someone who needs to hear it.",
      });
      
      // Reset form
      setTitle("");
      setStory("");
      setSelectedEmotions([]);
      setAuthorName("");
      setCoverImage(null);
      setCoverImagePreview("");
      setIsSubmitting(false);
    }, 2000);
  };

  const wordCount = story.split(" ").filter(word => word.length > 0).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-background relative">
      <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/10 via-green-500/10 to-blue-500/10" />
      <div className="relative container mx-auto px-4 py-8 z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
            <PenTool className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
            Share Your Story
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your story matters. Share your journey and help others feel less alone in their struggles.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="text-primary" size={24} />
                Tell Us Your Story
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Author Name (Optional) */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Your Name (Optional)
                  </label>
                  <Input
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Anonymous (leave blank for anonymous posting)"
                    className="bg-background/50 border-border/50"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Leave blank to post anonymously
                  </p>
                </div>

                {/* Story Title */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Story Title *
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Give your story a meaningful title..."
                    className="bg-background/50 border-border/50"
                    required
                  />
                </div>

                {/* Cover Image Upload */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Cover Image (Optional)
                  </label>
                  <div className="space-y-4">
                    {!coverImagePreview ? (
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary-soft/10 transition-all duration-gentle"
                      >
                        <ImagePlus className="mx-auto mb-4 text-muted-foreground" size={48} />
                        <p className="text-muted-foreground mb-2">Click to upload a cover image</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                      </div>
                    ) : (
                      <div className="relative">
                        <img 
                          src={coverImagePreview} 
                          alt="Cover preview" 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={removeCoverImage}
                          className="absolute top-2 right-2"
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Add a meaningful image that represents your story
                  </p>
                </div>

                {/* Emotions */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    What emotions does your story contain? *
                  </label>
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
                        onClick={() => handleEmotionToggle(emotion.name)}
                      >
                        {emotion.name}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Select all emotions that apply to your story
                  </p>
                </div>

                {/* Story Content */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Your Story *
                  </label>
                  <Textarea
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    placeholder="Share your experience, journey, or message of hope. Your words might be exactly what someone else needs to hear today..."
                    className="min-h-[300px] bg-background/50 border-border/50 resize-none"
                    required
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-muted-foreground">
                      Write from your heart. There's no word limit.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {wordCount} words
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button 
                    type="submit"
                    disabled={isSubmitting || !title.trim() || !story.trim() || selectedEmotions.length === 0}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft hover:shadow-card transition-all duration-gentle hover:scale-105 px-8"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sharing...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2" size={20} />
                        Share Your Story
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Guidelines */}
          <Card className="mt-6 bg-accent/50 border-accent">
            <CardHeader>
              <CardTitle className="text-lg">Community Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Share your authentic experience with kindness and respect</p>
              <p>• Focus on your personal journey and avoid giving direct advice</p>
              <p>• Respect others' privacy and avoid sharing identifying details</p>
              <p>• Remember that your story could inspire and help someone in need</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostStory;