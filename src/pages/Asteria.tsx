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
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-card">
            <img src={asteriaImage} alt="Asteria AI" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
            Meet {aiName}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your personal AI companion for emotional support. Share your feelings in a safe, judgment-free space.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Badge variant="secondary" className="bg-primary-soft text-primary">
              <Heart size={14} className="mr-1" />
              Empathetic
            </Badge>
            <Badge variant="secondary" className="bg-primary-soft text-primary">
              <Sparkles size={14} className="mr-1" />
              AI Companion
            </Badge>
          </div>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-b from-card/90 to-card/70 backdrop-blur-md border-border/30 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Settings size={20} />
                  Customize
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    AI Name
                  </label>
                  <Input
                    value={aiName}
                    onChange={(e) => setAiName(e.target.value)}
                    className="bg-background/80 backdrop-blur-sm border-border/50 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="bg-gradient-to-b from-card/90 to-card/70 backdrop-blur-md border-border/30 shadow-elegant h-[600px] flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle>Chat with {aiName}</CardTitle>
              </CardHeader>
              
              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto space-y-4 mb-4 bg-gradient-to-b from-background/20 to-background/40 backdrop-blur-sm">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-xl transition-all duration-gentle ${
                        message.isUser
                          ? "bg-primary text-primary-foreground shadow-soft"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      <p className="leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-2 opacity-70`}>
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: "2-digit", 
                          minute: "2-digit" 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Input */}
              <div className="p-4 border-t border-border/30 bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-sm">
                <div className="flex gap-3">
                  <Textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Share what's on your mind..."
                    className={`flex-1 min-h-[60px] bg-background/80 backdrop-blur-sm border-border/50 resize-none focus:ring-2 focus:ring-primary/50 transition-all duration-gentle ${isListening ? "ring-2 ring-primary" : ""}`}
                  />
                  <Button
                    type="button"
                    onClick={toggleListening}
                    variant="secondary"
                    className={`relative transition-all duration-gentle hover:scale-105 bg-background/80 backdrop-blur-sm ${isListening ? "ring-2 ring-primary/60" : ""}`}
                    title={isListening ? "Stop voice input" : "Start voice input"}
                    aria-label={isListening ? "Stop voice input" : "Start voice input"}
                  >
                    {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                    {isListening && (
                      <span
                        className="ml-2 h-2 w-2 rounded-full bg-primary pulse"
                        aria-hidden="true"
                      />
                    )}
                  </Button>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-elegant transition-all duration-gentle hover:scale-105"
                  >
                    <Send size={20} />
                  </Button>
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