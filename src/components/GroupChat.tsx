import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Users, Send, ArrowLeft, Hash, Heart, Smile, Coffee, BookOpen, Dumbbell, Music, Palette } from 'lucide-react';

export interface ChatMessage {
  id: string;
  content: string;
  timestamp: number;
  groupId: string;
  isOwn: boolean;
}

export interface ChatGroup {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  memberCount: number;
}

const CHAT_GROUPS: ChatGroup[] = [
  {
    id: 'general',
    name: 'General Support',
    description: 'Share your thoughts and get support from the community',
    icon: MessageCircle,
    color: 'blue',
    memberCount: 42
  },
  {
    id: 'anxiety',
    name: 'Anxiety Support',
    description: 'Connect with others managing anxiety',
    icon: Heart,
    color: 'pink',
    memberCount: 28
  },
  {
    id: 'motivation',
    name: 'Daily Motivation',
    description: 'Share wins and motivate each other',
    icon: Smile,
    color: 'yellow',
    memberCount: 35
  },
  {
    id: 'mindfulness',
    name: 'Mindfulness & Meditation',
    description: 'Discuss meditation and mindfulness practices',
    icon: Coffee,
    color: 'green',
    memberCount: 19
  },
  {
    id: 'learning',
    name: 'Learning & Growth',
    description: 'Share resources and learning experiences',
    icon: BookOpen,
    color: 'purple',
    memberCount: 23
  },
  {
    id: 'fitness',
    name: 'Mental Health & Fitness',
    description: 'Discuss the connection between physical and mental health',
    icon: Dumbbell,
    color: 'orange',
    memberCount: 31
  },
  {
    id: 'creative',
    name: 'Creative Expression',
    description: 'Share art, music, and creative outlets',
    icon: Palette,
    color: 'indigo',
    memberCount: 16
  },
  {
    id: 'music',
    name: 'Music & Mood',
    description: 'Share music that helps with your mental health',
    icon: Music,
    color: 'teal',
    memberCount: 27
  }
];

export default function GroupChat() {
  const [selectedGroup, setSelectedGroup] = useState<ChatGroup | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedGroup) {
      loadMessages(selectedGroup.id);
    }
  }, [selectedGroup]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = (groupId: string) => {
    const savedMessages = localStorage.getItem(`anchor-chat-${groupId}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Initialize with welcome messages
      const welcomeMessages: ChatMessage[] = [
        {
          id: 'welcome-1',
          content: `Welcome to ${CHAT_GROUPS.find(g => g.id === groupId)?.name}! 👋`,
          timestamp: Date.now() - 300000,
          groupId,
          isOwn: false
        },
        {
          id: 'welcome-2',
          content: 'This is a safe space to share and connect. Remember to be kind and supportive! 💙',
          timestamp: Date.now() - 240000,
          groupId,
          isOwn: false
        }
      ];
      setMessages(welcomeMessages);
      saveMessages(groupId, welcomeMessages);
    }
  };

  const saveMessages = (groupId: string, messages: ChatMessage[]) => {
    localStorage.setItem(`anchor-chat-${groupId}`, JSON.stringify(messages));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedGroup) return;

    const message: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random()}`,
      content: newMessage.trim(),
      timestamp: Date.now(),
      groupId: selectedGroup.id,
      isOwn: true
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    saveMessages(selectedGroup.id, updatedMessages);
    setNewMessage('');

    // Simulate other users typing and responding
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        const responses = [
          "Thanks for sharing! I can relate to that 💙",
          "That's really helpful, thank you!",
          "I'm going through something similar. You're not alone 🤗",
          "Great perspective! This community is amazing",
          "Sending positive vibes your way ✨",
          "I appreciate you opening up about this",
          "This really resonates with me. Thank you for sharing"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const responseMessage: ChatMessage = {
          id: `response-${Date.now()}-${Math.random()}`,
          content: randomResponse,
          timestamp: Date.now(),
          groupId: selectedGroup.id,
          isOwn: false
        };

        const finalMessages = [...updatedMessages, responseMessage];
        setMessages(finalMessages);
        saveMessages(selectedGroup.id, finalMessages);
        setIsTyping(false);
      }, 2000);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-500 text-white',
      pink: 'bg-pink-500 text-white',
      yellow: 'bg-yellow-500 text-white',
      green: 'bg-green-500 text-white',
      purple: 'bg-purple-500 text-white',
      orange: 'bg-orange-500 text-white',
      indigo: 'bg-indigo-500 text-white',
      teal: 'bg-teal-500 text-white'
    };
    return colorMap[color] || 'bg-blue-500 text-white';
  };

  if (!selectedGroup) {
    return (
      <div className="min-h-screen p-4 pt-8 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-4 w-16 h-16 bg-blue-200/20 rounded-full animate-pulse" />
        <div className="absolute top-32 right-8 w-12 h-12 bg-purple-200/20 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-8 w-20 h-20 bg-pink-200/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

        <div className="max-w-md mx-auto space-y-6 relative z-10">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center relative">
                <MessageCircle className="text-white" size={24} />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Peer Support</h1>
                <p className="text-sm text-blue-600 font-medium">Connect anonymously with others</p>
              </div>
            </div>
          </div>

          {/* Group Selection */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <span>Choose a Support Group</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            </h2>

            <div className="space-y-3">
              {CHAT_GROUPS.map((group) => {
                const IconComponent = group.icon;
                return (
                  <button
                    key={group.id}
                    onClick={() => setSelectedGroup(group)}
                    className="w-full p-4 rounded-2xl bg-white/80 backdrop-blur-lg border border-white/20 hover:scale-[1.02] shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full -mr-8 -mt-8 group-hover:scale-110 transition-transform" />
                    <div className="flex items-center space-x-4 relative z-10">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center relative ${getColorClasses(group.color)}`}>
                        <IconComponent size={24} />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full animate-pulse" />
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                          <span>{group.name}</span>
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <Users size={12} />
                            <span>{group.memberCount}</span>
                          </div>
                        </h3>
                        <p className="text-sm text-gray-600">{group.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Safety Notice */}
          <div className="bg-blue-50/80 backdrop-blur-lg rounded-2xl p-4 border border-blue-200/50">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="text-blue-600" size={16} />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 text-sm">Safe Space Guidelines</h3>
                <p className="text-xs text-blue-700 mt-1">
                  This is an anonymous, supportive community. Be kind, respectful, and remember that everyone is here to support each other.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      {/* Chat Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-white/20 p-4 sticky top-0 z-10">
        <div className="max-w-md mx-auto flex items-center space-x-4">
          <button
            onClick={() => setSelectedGroup(null)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="text-gray-600" size={20} />
          </button>
          
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getColorClasses(selectedGroup.color)}`}>
            <selectedGroup.icon size={20} />
          </div>
          
          <div className="flex-1">
            <h1 className="font-semibold text-gray-900">{selectedGroup.name}</h1>
            <p className="text-sm text-gray-500">{selectedGroup.memberCount} members</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="max-w-md mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-2xl ${
                  message.isOwn
                    ? 'bg-blue-500 text-white rounded-br-md'
                    : 'bg-white/80 backdrop-blur-lg text-gray-900 rounded-bl-md border border-white/20'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.isOwn ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/80 backdrop-blur-lg text-gray-900 rounded-2xl rounded-bl-md border border-white/20 px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white/80 backdrop-blur-lg border-t border-white/20 p-4 sticky bottom-0">
        <div className="max-w-md mx-auto flex space-x-3">
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Hash className="text-gray-400" size={16} />
            </div>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`p-3 rounded-2xl transition-all ${
              newMessage.trim()
                ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
