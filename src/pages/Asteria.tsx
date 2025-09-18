import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Send, Settings, Heart, Sparkles, Mic, MicOff } from "lucide-react";
import asteriaImage from "@/assets/asteria-ai.jpg";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Asteria = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello, I'm Asteria. I'm here to listen without judgment and support you through whatever you're feeling. How are you doing today?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [aiName, setAiName] = useState("Asteria");
  const [voiceType, setVoiceType] = useState("female");
  const [showSettings, setShowSettings] = useState(false);

  // Voice input using Web Speech API
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const startListening = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      toast({
        title: "Voice input not supported",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive",
      });
      return;
    }

    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInputMessage((prev) => (prev ? prev + " " : "") + transcript.trim());
    };

    recognition.onerror = () => {
      toast({
        title: "Voice input error",
        description: "Please try again.",
        variant: "destructive",
      });
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop?.();
    setIsListening(false);
  };

  const toggleListening = () => {
    if (isListening) stopListening();
    else startListening();
  };

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop?.();
    };
  }, []);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response (in real app, this would be an API call)
    setTimeout(() => {
      const aiResponses = [
        "I hear you, and what you're feeling is completely valid. Thank you for sharing that with me.",
        "It sounds like you're going through something difficult. Would you like to tell me more about what's on your mind?",
        "I'm here to listen. Sometimes just expressing our thoughts can help us process them better.",
        "Your feelings matter, and I'm honored that you're sharing them with me. How can I best support you right now?",
        "That takes courage to share. Remember that healing isn't linear, and it's okay to take things one day at a time.",
      ];

      const aiMessage: Message = {
        id: messages.length + 2,
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    }, 1000);

    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900/20 via-purple-900/15 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-blue-900/10 to-transparent" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative container mx-auto px-4 py-12 z-10">
        {/* Redesigned Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-8">
            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden shadow-2xl ring-4 ring-white/10 backdrop-blur-sm">
              <img src={asteriaImage} alt="Asteria AI" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-background animate-pulse" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              Meet {aiName}
            </h1>
            <p className="text-xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Your personal AI companion for emotional support. Share your feelings in a safe, judgment-free space.
            </p>
            
            <div className="flex items-center justify-center gap-3 mt-6">
              <Badge variant="secondary" className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border-purple-500/30 px-4 py-2">
                <Heart size={16} className="mr-2" />
                Empathetic AI
              </Badge>
              <Badge variant="secondary" className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-200 border-blue-500/30 px-4 py-2">
                <Sparkles size={16} className="mr-2" />
                24/7 Support
              </Badge>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Redesigned Settings Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl text-white">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <Settings size={20} />
                  </div>
                  Customize
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground/90 block">
                    AI Assistant Name
                  </label>
                  <Input
                    value={aiName}
                    onChange={(e) => setAiName(e.target.value)}
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                    placeholder="Enter AI name..."
                  />
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground/70">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    AI is online and ready to help
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Redesigned Chat Interface */}
          <div className="lg:col-span-4">
            <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-white/20 shadow-2xl h-[700px] flex flex-col overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-b border-white/10 py-6">
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse" />
                  Chat with {aiName}
                  <Badge variant="outline" className="ml-auto border-green-500/50 text-green-400 bg-green-500/10">
                    Active
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              {/* Redesigned Messages */}
              <CardContent className="flex-1 overflow-y-auto space-y-6 p-6 bg-gradient-to-b from-black/20 to-black/40">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
                        message.isUser
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                          : "bg-gradient-to-r from-white/10 to-white/5 text-white border border-white/20 backdrop-blur-sm"
                      }`}
                    >
                      <p className="leading-relaxed text-sm">{message.text}</p>
                      <p className="text-xs mt-3 opacity-70 flex items-center gap-1">
                        <div className="w-1 h-1 bg-current rounded-full" />
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: "2-digit", 
                          minute: "2-digit" 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Redesigned Input */}
              <div className="p-6 border-t border-white/10 bg-gradient-to-r from-black/20 to-black/30 backdrop-blur-sm">
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <Textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Share what's on your mind..."
                      className={`min-h-[70px] bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 resize-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 rounded-xl transition-all duration-300 ${isListening ? "ring-2 ring-purple-500/50" : ""}`}
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      onClick={toggleListening}
                      variant="secondary"
                      size="lg"
                      className={`bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 rounded-xl ${isListening ? "ring-2 ring-purple-500/50 bg-purple-500/20" : ""}`}
                      title={isListening ? "Stop voice input" : "Start voice input"}
                    >
                      {isListening ? <MicOff size={22} /> : <Mic size={22} />}
                      {isListening && (
                        <span className="ml-2 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                      )}
                    </Button>
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-105 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={22} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Asteria;