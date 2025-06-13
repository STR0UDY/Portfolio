'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownIcon, ArrowUpIcon, ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useState, useEffect, useRef } from 'react';
import { Toaster, toast } from 'sonner';
import Card from './components/Card';
import { FaCss3, FaHtml5, FaReact, FaUserAlt } from 'react-icons/fa';
import { FaJs } from 'react-icons/fa6';
import Image from 'next/image';

export default function Home() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Mathew's AI assistant. Feel free to ask me anything about his work, skills, or projects!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      setIsAtTop(scrollPosition < 100);
      setIsAtBottom(scrollPosition + windowHeight >= documentHeight - 100);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initialize on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateBotResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();

    // Simple responses based on keywords
    if (message.includes('skills') || message.includes('technology') || message.includes('tech')) {
      return "Mathew is skilled in TypeScript, React, Next.js, Tailwind CSS, HTML, CSS, and Solid JS. He also has experience with CFX scripting for game development, particularly in GTA V and Red Dead Redemption 2 environments.";
    } else if (message.includes('projects') || message.includes('work')) {
      return "Mathew has worked on several CFX projects including StellarRP (his personal project at stellarrp.com), RedemptionRP for Red Dead Redemption 2, DefinitionRP, and TwitchParadiseRP. He focuses on creating immersive roleplay experiences.";
    } else if (message.includes('experience') || message.includes('background')) {
      return "Mathew is a Full Stack Developer with a passion for creating user-friendly and efficient web applications. He has experience in game development through CFX scripting and has worked on multiple roleplay projects.";
    } else if (message.includes('contact') || message.includes('reach') || message.includes('hire')) {
      return "You can get in touch with Mathew through the contact section on this website. He's always open to new opportunities and collaborations!";
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! I'm here to help you learn more about Mathew Stroud. What would you like to know about his work, skills, or projects?";
    } else if (message.includes('cfx') || message.includes('fivem') || message.includes('redm')) {
      return "Mathew specializes in CFX script development for both GTA V (FiveM) and Red Dead Redemption 2 (RedM) environments. He creates immersive roleplay experiences and has worked on multiple successful projects in this space.";
    } else {
      return "That's a great question! Mathew is a passionate developer who loves creating web applications and game scripts. Feel free to ask me about his skills, projects, or experience, or you can reach out to him directly through the contact section!";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      // Call the API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const botResponse = {
        id: messages.length + 2,
        text: data.message,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);

      // Fallback to local response
      const fallbackResponse = {
        id: messages.length + 2,
        text: generateBotResponse(currentMessage),
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <Toaster position="top-center" richColors className="z-50" />

      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xl font-bold text-blue-400"
            >
              <Image
                src={`https://na.ui-avatars.com/api/?name=MS&background=0D8ABC&color=fff`}
                alt="MS"
                width={32}
                height={32}
                className="rounded-full"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:flex space-x-8"
            >
              <button onClick={() => scrollToSection('hero')} className="text-gray-300 hover:cursor-pointer hover:text-blue-400 transition-colors">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:cursor-pointer hover:text-blue-400 transition-colors">About</button>
              <button onClick={() => scrollToSection('projects')} className="text-gray-300 hover:cursor-pointer hover:text-blue-400 transition-colors">Projects</button>
              <button onClick={() => scrollToSection('skills')} className="text-gray-300 hover:cursor-pointer hover:text-blue-400 transition-colors">Skills</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:cursor-pointer hover:text-blue-400 transition-colors">Contact</button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
          >
            Mathew <span className="text-blue-400">Stroud</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-2 mb-8"
          >
            <p className="text-xl md:text-2xl text-gray-300 font-light">
              Full Stack Developer
            </p>
            <p className="text-lg md:text-xl text-gray-400">
              Games Enthusiast • CFX Script Developer
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg"
            >
              View More
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="border border-gray-600 hover:border-blue-400 text-gray-300 hover:text-blue-400 px-8 py-3 rounded-lg text-lg font-medium transition-all duration-200 hover:scale-105"
            >
              Get In Touch
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-gray-400 text-sm flex flex-col items-center space-y-2"
          >
            <span>Scroll to explore</span>
            <ArrowDownIcon className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold mb-12 text-center">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-gray-300 text-lg">
              I am a developer with a passion for creating user-friendly and efficient web applications.
              I have a strong background in the underlying technologies that make web applications work, such as HTML, CSS, and TypeScript.
              My passion for web development has led me to create many projects, including this website.
            </p>
            <p className="text-gray-300 text-lg">
              I am currently working on a project within the CFX Environment, called "RedemptionRP".
              I have worked on previous projects within the CFX Environment, such as "DefinitionRP", "TwitchParadiseRP" and a few others.
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            {/* Add your image or illustration here */}
            IMAGE PLACEHOLDER
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">My Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card title="StellarRP" icon={<FaUserAlt />}>
              A CFX project focused on immersive roleplay within the GTA V Universe.
              <br />
              <span className="text-gray-300 text-sm">This is my own personal project.</span>
              <br />
              <a href="https://stellarrp.com" target="_blank" rel="noopener noreferrer">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 shadow-lg">
                  View Project
                </button>
              </a>
            </Card>
            <Card title="RedemptionRP" icon={<FaUserAlt />}>
              A CFX project focused on immersive roleplay within the Red Dead Redemption 2 Universe.
            </Card>
            <Card title="DefinitionRP" icon={<FaUserAlt />}>
              A CFX project focused on immersive roleplay within the GTA V Universe.
            </Card>
            <Card title="TwitchParadiseRP" icon={<FaUserAlt />}>
              A CFX project focused on immersive roleplay within the GTA V Universe.
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Skills & Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Card title="TypeScript" icon={<FaJs />}>
              A programming language that allows for the creation of complex and efficient web applications.
            </Card>
            <Card title="React" icon={<FaReact />}>
              A library for building user interfaces.
            </Card>
            <Card title="Solid JS" icon={<FaJs />}>
              A library for building user interfaces.
            </Card>
            <Card title="Next.js" icon={<FaReact />}>
              A framework for building server-side rendered web applications.
            </Card>
            <Card title="Tailwind CSS" icon={<FaCss3 />}>
              A utility-first CSS framework for rapidly building custom designs.
            </Card>
            <Card title="HTML" icon={<FaHtml5 />}>
              A markup language for creating web pages.
            </Card>
            <Card title="CSS" icon={<FaCss3 />}>
              A styling language for creating web pages.
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
          <p className="text-gray-300 text-lg mb-10">
            I'm always open to new opportunities and collaborations.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full text-lg font-semibold transition-colors mb-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => {
              toast.success('Thank you for reaching out! I will get back to you soon.');
            }}
          >
            Contact Me
          </motion.button>
        </div>
      </section>
      {/* Floating Arrow - moved outside main content flow */}
      <AnimatePresence>
        {!(isAtTop && isAtBottom) && (
          <motion.div
            key={isAtTop ? 'down' : 'up'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed left-10 -translate-x-1/2 bottom-8 z-50"
          >
            <button
              aria-label={isAtTop ? 'Scroll Down' : 'Scroll Up'}
              onClick={() => scrollToSection(isAtTop ? 'about' : 'hero')}
              className="bg-gray-800 bg-opacity-80 hover:bg-blue-600 transition-colors rounded-full p-4 shadow-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {isAtTop ? (
                <ArrowDownIcon className="h-8 w-8 text-gray-200" />
              ) : (
                <ArrowUpIcon className="h-8 w-8 text-gray-200" />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Bot */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-4 w-80 h-96 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 z-50 flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <ChatBubbleLeftRightIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">AI Assistant</h3>
                  <p className="text-gray-400 text-xs">Ask me about Mathew</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${message.isBot
                      ? 'bg-slate-700 text-gray-200 rounded-tl-sm'
                      : 'bg-blue-600 text-white rounded-tr-sm'
                      }`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${message.isBot ? 'text-gray-400' : 'text-blue-200'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-slate-700 text-gray-200 p-3 rounded-2xl rounded-tl-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-slate-700">
              <div className="flex space-x-2 items-end">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about Mathew..."
                  className="flex-1 bg-slate-700 text-white placeholder-gray-400 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-20"
                  rows={1}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                >
                  <PaperAirplaneIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Bot Icon */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-4 right-4 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg border-2 border-blue-500 z-50 flex items-center justify-center transition-all duration-200"
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {isChatOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <XMarkIcon className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChatBubbleLeftRightIcon className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat notification indicator */}
        {!isChatOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-900"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-full h-full bg-red-500 rounded-full"
            />
          </motion.div>
        )}
      </motion.button>
    </main>
  );
}
