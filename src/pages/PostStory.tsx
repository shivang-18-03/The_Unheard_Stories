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
    <div className="min-h-screen bg-gradient-to-br from-orange-900/20 via-amber-900/15 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-900/20 via-orange-900/10 to-transparent" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      
      {/* Floating elements */}
      <div className="absolute top-10 right-20 w-80 h-80 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-20 w-96 h-96 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative container mx-auto px-4 py-12 z-10">
        {/* Redesigned Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto shadow-2xl ring-4 ring-orange-500/20">
              <PenTool className="text-white" size={40} />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Share Your Story
            </h1>
            <p className="text-xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Your story matters. Share your journey and help others feel less alone in their struggles.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-white/20 shadow-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border-b border-white/10 py-8">
              <CardTitle className="flex items-center gap-3 text-2xl text-white">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl">
                  <Heart size={28} />
                </div>
                Tell Us Your Story
                <Badge variant="outline" className="ml-auto border-orange-500/50 text-orange-400 bg-orange-500/10">
                  Sharing Space
                </Badge>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Author Name Section */}
                <div className="bg-gradient-to-r from-white/5 to-white/10 p-6 rounded-xl border border-white/10">
                  <label className="text-lg font-semibold text-white mb-3 block flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    Your Name (Optional)
                  </label>
                  <Input
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Anonymous (leave blank for anonymous posting)"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 h-12"
                  />
                  <p className="text-sm text-muted-foreground/70 mt-2 flex items-center gap-2">
                    <div className="w-1 h-1 bg-current rounded-full" />
                    Leave blank to post anonymously
                  </p>
                </div>

                {/* Story Title Section */}
                <div className="bg-gradient-to-r from-white/5 to-white/10 p-6 rounded-xl border border-white/10">
                  <label className="text-lg font-semibold text-white mb-3 block flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    Story Title *
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Give your story a meaningful title..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 h-12"
                    required
                  />
                </div>

                {/* Cover Image Upload Section */}
                <div className="bg-gradient-to-r from-white/5 to-white/10 p-6 rounded-xl border border-white/10">
                  <label className="text-lg font-semibold text-white mb-3 block flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    Cover Image (Optional)
                  </label>
                  <div className="space-y-4">
                    {!coverImagePreview ? (
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-white/30 rounded-xl p-10 text-center cursor-pointer hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300 bg-white/5"
                      >
                        <ImagePlus className="mx-auto mb-4 text-orange-400" size={56} />
                        <p className="text-white mb-2 text-lg">Click to upload a cover image</p>
                        <p className="text-sm text-muted-foreground/70">PNG, JPG up to 5MB • Recommended: 1200x800px</p>
                      </div>
                    ) : (
                      <div className="relative">
                        <img 
                          src={coverImagePreview} 
                          alt="Cover preview" 
                          className="w-full h-60 object-cover rounded-xl border border-white/20"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={removeCoverImage}
                          className="absolute top-3 right-3 rounded-full"
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
                  <p className="text-sm text-muted-foreground/70 mt-3 flex items-center gap-2">
                    <div className="w-1 h-1 bg-current rounded-full" />
                    Add a meaningful image that represents your story
                  </p>
                </div>

                {/* Emotions Section */}
                <div className="bg-gradient-to-r from-white/5 to-white/10 p-6 rounded-xl border border-white/10">
                  <label className="text-lg font-semibold text-white mb-4 block flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    What emotions does your story contain? *
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {emotions.map((emotion) => (
                      <Badge
                        key={emotion.name}
                        variant={selectedEmotions.includes(emotion.name) ? "default" : "outline"}
                        className={`cursor-pointer transition-all duration-300 hover:scale-110 text-base px-4 py-2 ${
                          selectedEmotions.includes(emotion.name) 
                            ? emotion.color + " shadow-lg" 
                            : "hover:bg-orange-500/20 hover:border-orange-500/50 border-white/30 text-white bg-white/5"
                        }`}
                        onClick={() => handleEmotionToggle(emotion.name)}
                      >
                        {emotion.name}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground/70 mt-3 flex items-center gap-2">
                    <div className="w-1 h-1 bg-current rounded-full" />
                    Select all emotions that apply to your story
                  </p>
                </div>

                {/* Story Content Section */}
                <div className="bg-gradient-to-r from-white/5 to-white/10 p-6 rounded-xl border border-white/10">
                  <label className="text-lg font-semibold text-white mb-4 block flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    Your Story *
                  </label>
                  <Textarea
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    placeholder="Share your experience, journey, or message of hope. Your words might be exactly what someone else needs to hear today..."
                    className="min-h-[320px] bg-white/10 border-white/20 text-white placeholder:text-white/50 resize-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 text-base leading-relaxed"
                    required
                  />
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                    <p className="text-sm text-muted-foreground/70 flex items-center gap-2">
                      <div className="w-1 h-1 bg-current rounded-full" />
                      Write from your heart. There's no word limit.
                    </p>
                    <p className="text-sm text-orange-400 font-medium">
                      {wordCount} words
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <Button 
                    type="submit"
                    disabled={isSubmitting || !title.trim() || !story.trim() || selectedEmotions.length === 0}
                    size="lg"
                    className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-xl shadow-orange-500/25 transition-all duration-300 hover:scale-105 px-8 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Sharing Your Story...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-3" size={22} />
                        Share Your Story
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Guidelines */}
          <Card className="mt-8 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border-white/20 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-b border-white/10">
              <CardTitle className="text-xl text-white flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
                  <Heart size={20} />
                </div>
                Community Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-white/80 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                <p>Share your authentic experience with kindness and respect</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                <p>Focus on your personal journey and avoid giving direct advice</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                <p>Respect others' privacy and avoid sharing identifying details</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                <p>Remember that your story could inspire and help someone in need</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostStory;