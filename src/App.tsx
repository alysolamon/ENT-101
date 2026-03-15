import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { 
  Search, ChevronLeft, CheckCircle2, Star, Paperclip, 
  Image as ImageIcon, Plus, MessageCircle, ArrowRight, Zap, ChevronDown, Send, FileText,
  ArrowUp, ArrowDown, Users, ArrowBigUp, ArrowBigDown, MessageSquare, Share, Volume2, Mic, MicOff, Video, MonitorUp, PhoneOff, Megaphone, Hash
} from 'lucide-react';

type Screen = 'splash' | 'home' | 'thread' | 'booking' | 'new_post' | 'course_hub' | 'ai_chat';

const screenVariants = {
  initial: { x: '100%', opacity: 0.5 },
  animate: { x: 0, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 200 } },
  exit: { x: '-20%', opacity: 0, transition: { duration: 0.2, ease: 'easeOut' } }
};

const MOCK_DISCUSSIONS: Record<string, any> = {
  '1': {
    id: '1', courseId: 'ENT101', type: 'live', title: 'Live Tutoring: Market Size & TAM/SAM/SOM',
    content: 'We are currently discussing the Market Size section of the final pitch rubric. Join us to ask questions and get real-time help from peers and AI.',
    author: 'ENT 101 Study Group', time: 'Started 12 mins ago', votes: 12, comments: 15, isAnonymous: false,
    activeParticipants: 8, isPremium: true, tutor: 'Andrea S.', price: 15,
    replies: [
      { id: 'r1', author: 'Anonymous Student', isAI: false, time: '12 mins ago', content: 'Does the "Market Size" section require a TAM/SAM/SOM breakdown or just a total number? Prof didn\'t clarify in class.', votes: 5 },
      { id: 'r2', author: 'Study Buddy AI', isAI: true, time: '11 mins ago', content: 'According to the Syllabus (v2.1, pg 14), the "Market Analysis" section mentions "quantitative evidence of scale." TAM/SAM/SOM is highly recommended for full marks.', votes: 10 },
      { id: 'r3', author: 'Andrea S.', isVerified: true, time: '10 mins ago', content: '"Just to add to what AI said: Prof actually emphasized in week 4 that SAM (Serviceable Addressable Market) is the *most* important for the rubric. I aced this last semester!"', votes: 8 }
    ]
  },
  '2': {
    id: '2', courseId: 'ENT101', type: 'student', title: 'Tips for final pitch delivery?',
    content: 'I get really nervous during presentations. Does anyone have tips for the final pitch? Are we allowed to use notecards? I really want to do well but public speaking is not my strong suit.',
    author: 'Sarah M.', time: '1 hour ago', votes: 24, comments: 8, isAnonymous: false,
    replies: [
      { id: 'r3', author: 'Mike T.', isAI: false, time: '45 mins ago', content: 'Notecards are allowed but try not to read off them. Practice in front of a mirror! It really helps to just have bullet points rather than full sentences.', votes: 12 },
      { id: 'r4', author: 'Jessica L.', isAI: false, time: '30 mins ago', content: 'I recommend recording yourself. It feels weird but it helps you catch filler words like "um" and "like".', votes: 7 }
    ]
  },
  '3': {
    id: '3', courseId: 'ENT101', type: 'professor', title: 'Official Guide: Final Project Rubric v2.1 Breakdown',
    content: '# Final Project Expectations\n\nPlease find the updated rubric for the final project. Note the changes in the Market Analysis section. We will be grading strictly on the SAM calculation.\n\n## Key Areas of Focus\n1. **Problem/Solution Fit**: Ensure your solution directly addresses the pain points identified in your customer interviews.\n2. **Market Size (TAM/SAM/SOM)**: As discussed, SAM is the most critical metric here. Show your math.\n3. **Business Model**: How will you make money? Be specific about pricing and costs.\n\n*Please review this carefully before your final submission.*',
    author: 'Prof. Smith', time: '2 days ago', votes: 45, comments: 0, isAnonymous: false,
    replies: []
  }
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);

  const handleOpenThread = (id: string) => {
    setSelectedThreadId(id);
    setCurrentScreen('thread');
  };

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] relative flex flex-col">
      <AnimatePresence>
        {currentScreen === 'splash' && <Splash key="splash" onNext={() => setCurrentScreen('home')} />}
        {currentScreen === 'home' && <Home key="home" onOpenCourse={(id) => { setSelectedCourse(id); setCurrentScreen('course_hub'); }} onOpenThread={handleOpenThread} onNewPost={() => setCurrentScreen('new_post')} />}
        {currentScreen === 'course_hub' && <CourseHub key="course_hub" courseId={selectedCourse} onBack={() => setCurrentScreen('home')} onOpenThread={handleOpenThread} onOpenAIChat={() => setCurrentScreen('ai_chat')} />}
        {currentScreen === 'ai_chat' && <AIChat key="ai_chat" onBack={() => setCurrentScreen('course_hub')} />}
        {currentScreen === 'thread' && <Thread key="thread" threadId={selectedThreadId} onBack={() => setCurrentScreen('course_hub')} onBook={() => setCurrentScreen('booking')} />}
        {currentScreen === 'booking' && <Booking key="booking" onBack={() => setCurrentScreen('thread')} onConfirm={() => setCurrentScreen('home')} />}
        {currentScreen === 'new_post' && <NewPost key="new_post" onCancel={() => setCurrentScreen('home')} onPost={() => setCurrentScreen('home')} />}
      </AnimatePresence>
    </div>
  );
}

function Splash({ onNext, key }: { onNext: () => void, key?: string }) {
  return (
    <motion.div variants={screenVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 w-full h-full overflow-y-auto flex flex-col p-8 pt-16 bg-[#0A0A0A] z-10">
      <div className="flex items-center gap-4 mb-20">
        <div className="w-14 h-14 rounded-full bg-[#118AB2] flex items-center justify-center shadow-[0_0_30px_rgba(17,138,178,0.4)]">
          <span className="text-[#FFD166] font-bold text-2xl tracking-tighter">CS</span>
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Circle Study</h1>
          <p className="text-gray-400 text-sm">By TMU Students</p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-5xl font-bold tracking-tight leading-[1.1] mb-6">
          Stuck at<br/>
          <span className="text-[#FFD166]">midnight</span>
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed max-w-[280px]">
          Get instantly unblocked on specific course assignments by AI and verified peers.
        </p>
      </div>

      <div className="bg-[#121212] border border-white/5 rounded-full p-2 pr-4 flex items-center gap-3 w-fit mb-auto">
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-[#121212]"></div>
          <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-[#121212]"></div>
          <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-[#121212] flex items-center justify-center text-[10px] font-bold">+3k</div>
        </div>
        <span className="text-sm font-medium text-gray-300">Students active now</span>
      </div>

      <motion.button 
        whileTap={{ scale: 0.95 }} 
        onClick={onNext}
        className="w-full bg-white text-black font-bold text-lg py-4 rounded-full mb-6 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
      >
        Continue with TMU Email
      </motion.button>
      
      <p className="text-center text-sm text-gray-400">
        Not from TMU? <span className="text-white underline underline-offset-4 cursor-pointer">Explore Demo</span>
      </p>
    </motion.div>
  );
}

function Home({ onOpenCourse, onOpenThread, onNewPost, key }: { onOpenCourse: (id: string) => void, onOpenThread: (id: string) => void, onNewPost: () => void, key?: string }) {
  return (
    <motion.div variants={screenVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 w-full h-full overflow-y-auto flex flex-col p-6 pt-12 bg-[#0A0A0A] z-10">
      <div className="max-w-7xl mx-auto w-full flex flex-col h-full flex-grow">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-gray-400 text-sm mb-1">Thursday, Oct 12</p>
            <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-0.5 shadow-lg">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="Sarah" className="w-full h-full rounded-full object-cover" />
          </div>
        </div>

        <div className="bg-[#121212] border border-white/5 rounded-[24px] p-5 mb-8">
          <p className="text-lg font-medium mb-4">What are you stuck on?</p>
          <div className="bg-[#0A0A0A] rounded-full p-4 flex items-center gap-3 border border-white/5 focus-within:border-white/20 transition-colors">
            <Search className="text-gray-500 w-5 h-5" />
            <input type="text" placeholder="Course code, topic, or question..." className="bg-transparent outline-none flex-1 text-white placeholder:text-gray-600 text-sm" />
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-medium">Your Courses</h3>
            <span className="text-blue-400 text-sm font-medium cursor-pointer hover:text-blue-300 transition-colors">Edit</span>
          </div>
          <div className="flex overflow-x-auto no-scrollbar gap-4 pb-4 -mx-6 px-6 md:mx-0 md:px-0">
            <motion.div whileTap={{ scale: 0.98 }} onClick={() => onOpenCourse('ENT101')} className="min-w-[240px] bg-gradient-to-b from-[#0A1929] to-[#050505] border border-blue-900/30 rounded-[24px] p-5 relative cursor-pointer hover:border-blue-500/50 transition-colors">
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#FFD166] shadow-[0_0_10px_rgba(255,209,102,0.8)]" />
              <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full inline-block mb-4">ENT 101</div>
              <h4 className="font-semibold text-lg leading-tight mb-1">Entrepreneurship</h4>
              <p className="text-gray-400 text-sm mb-6">12.4k Students</p>
              <div className="bg-black/40 rounded-[16px] p-3 flex items-center justify-between border border-white/5">
                <span className="text-sm font-medium leading-tight">3 Active<br/>Bounties</span>
                <ArrowRight className="w-4 h-4 text-[#FFD166]" />
              </div>
            </motion.div>
            
            <motion.div whileTap={{ scale: 0.98 }} onClick={() => onOpenCourse('BUS800')} className="min-w-[240px] bg-[#121212] border border-white/5 rounded-[24px] p-5 relative cursor-pointer hover:border-white/20 transition-colors">
              <div className="bg-white/10 text-gray-300 text-xs font-bold px-3 py-1.5 rounded-full inline-block mb-4">BUS 800</div>
              <h4 className="font-semibold text-lg leading-tight mb-1">Strategic Mgmt</h4>
              <p className="text-gray-400 text-sm">8.2k Students</p>
            </motion.div>
          </div>
        </div>

        <div className="flex-grow">
          <h3 className="text-xl font-medium mb-4">Live Rooms in your courses</h3>
          <div className="flex flex-col gap-4">
            {Object.values(MOCK_DISCUSSIONS).filter(d => d.type === 'live').map(d => (
              <DiscussionCard 
                key={d.id} 
                id={d.id} 
                title={d.title} 
                content={d.content}
                type={d.type} 
                author={d.author}
                time={d.time}
                courseId={d.courseId}
                activeParticipants={d.activeParticipants}
                votes={d.votes} 
                comments={d.comments} 
                isAnonymous={d.isAnonymous} 
                onClick={onOpenThread} 
              />
            ))}
          </div>
        </div>

        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={onNewPost}
          className="fixed bottom-8 right-8 w-14 h-14 bg-[#FFD166] rounded-full shadow-[0_0_20px_rgba(255,209,102,0.4)] flex items-center justify-center text-black z-50 hover:scale-105 transition-transform"
        >
          <Plus className="w-6 h-6 stroke-[3]" />
        </motion.button>
      </div>
    </motion.div>
  );
}

function AIChat({ onBack, key }: { onBack: () => void, key?: string }) {
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Hi! I am your ENT 101 AI Study Buddy. How can I help you with your assignment?' }]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }, { role: 'ai', text: 'That is a great question about ENT 101! Based on the course materials, you should focus on the TAM/SAM/SOM model for your market analysis.' }]);
    setInput('');
  };

  return (
    <motion.div variants={screenVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 w-full h-full overflow-y-auto flex flex-col bg-[#050505] z-20">
      <div className="border-b border-white/5 bg-[#0A1929]">
        <div className="max-w-4xl mx-auto w-full p-6 pt-12 flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center border border-white/5 hover:bg-black/40 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)]">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold leading-tight">AI Study Buddy</h2>
              <p className="text-blue-400 text-xs">ENT 101 Context Active</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="max-w-4xl mx-auto w-full space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-4 max-w-[85%] ${m.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
              {m.role === 'ai' ? (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0 p-0.5">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="User" className="w-full h-full rounded-full object-cover" />
                </div>
              )}
              <div className={`p-4 rounded-[20px] ${m.role === 'user' ? 'bg-blue-600 rounded-tr-sm' : 'bg-[#0A1929] border border-blue-900/50 rounded-tl-sm'}`}>
                <p className={`text-sm leading-relaxed ${m.role === 'user' ? 'text-white' : 'text-gray-200'}`}>{m.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-[#050505] border-t border-white/5">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex gap-2 bg-[#121212] rounded-full p-2 border border-white/10 focus-within:border-white/30 transition-colors">
            <button className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-transparent px-2 text-sm outline-none text-white placeholder:text-gray-600" 
              placeholder="Ask about ENT 101..." 
            />
            <button onClick={handleSend} className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
              <Send className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function VoteWidget({ initialVotes, size = 'md' }: { initialVotes: number, size?: 'sm' | 'md' | 'lg' }) {
  const [vote, setVote] = useState<number>(0);
  
  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVote(v => v === 1 ? 0 : 1);
  };

  const handleDownvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVote(v => v === -1 ? 0 : -1);
  };

  const iconClasses = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';
  const btnClasses = size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-10 h-10' : 'w-8 h-8';
  const textClasses = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm';

  return (
    <div className={`flex items-center gap-1 bg-white/5 border border-white/10 rounded-full ${size === 'sm' ? 'px-1 py-0.5' : 'px-1 py-1'}`}>
      <button onClick={handleUpvote} className={`${btnClasses} rounded-full flex items-center justify-center transition-colors ${vote === 1 ? 'text-orange-500 bg-orange-500/20' : 'text-gray-400 hover:bg-white/10 hover:text-orange-500'}`}>
        <ArrowBigUp className={iconClasses} />
      </button>
      <span className={`${textClasses} font-bold ${vote === 1 ? 'text-orange-500' : vote === -1 ? 'text-blue-500' : 'text-white'}`}>
        {initialVotes + vote}
      </span>
      <button onClick={handleDownvote} className={`${btnClasses} rounded-full flex items-center justify-center transition-colors ${vote === -1 ? 'text-blue-500 bg-blue-500/20' : 'text-gray-400 hover:bg-white/10 hover:text-blue-500'}`}>
        <ArrowBigDown className={iconClasses} />
      </button>
    </div>
  );
}

function DiscussionCard({ id, title, author, type, time, content, courseId, onClick, votes, activeParticipants, comments }: any) {
  if (type === 'student') {
    return (
      <div onClick={() => onClick(id)} className="bg-[#0B1416] border border-white/10 rounded-xl p-0 flex flex-col cursor-pointer hover:border-white/20 transition-colors overflow-hidden">
        <div className="p-3 pb-2">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
            <div className="w-5 h-5 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold text-[8px]">
              {courseId?.substring(0,2) || 'C'}
            </div>
            <span className="font-bold text-gray-200">c/{courseId}</span>
            <span>•</span>
            <span>u/{author.replace(' ', '').toLowerCase()}</span>
            <span>•</span>
            <span>{time}</span>
          </div>
          <h3 className="text-base font-semibold text-white mb-2 leading-tight">{title}</h3>
          <p className="text-sm text-gray-400 line-clamp-3 mb-3">{content}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 flex-wrap">
          <VoteWidget initialVotes={votes || 24} size="sm" />
          <div className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1 whitespace-nowrap">
            <MessageSquare className="w-4 h-4 text-gray-300" />
            <span className="text-xs font-medium text-gray-300">{comments || 0} Comments</span>
          </div>
          <div className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1 whitespace-nowrap">
            <Share className="w-4 h-4 text-gray-300" />
            <span className="text-xs font-medium text-gray-300">Share</span>
          </div>
        </div>
      </div>
    );
  } else if (type === 'live') {
    return (
      <div onClick={() => onClick(id)} className="bg-[#2B2D31] border border-[#1E1F22] rounded-xl p-4 cursor-pointer hover:bg-[#313338] transition-colors">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-green-400" />
            <h3 className="text-base font-bold text-white">{title}</h3>
          </div>
          <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Study Room</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex -space-x-2">
            <div className="w-7 h-7 rounded-full bg-indigo-500 border-2 border-[#2B2D31] flex items-center justify-center text-[10px] font-bold text-white">JD</div>
            <div className="w-7 h-7 rounded-full bg-rose-500 border-2 border-[#2B2D31] flex items-center justify-center text-[10px] font-bold text-white">AS</div>
            <div className="w-7 h-7 rounded-full bg-emerald-500 border-2 border-[#2B2D31] flex items-center justify-center text-[10px] font-bold text-white">MR</div>
          </div>
          <div className="text-xs text-gray-400 font-medium bg-[#1E1F22] px-2 py-1 rounded-md">{activeParticipants || 5} / 25 Connected</div>
        </div>
      </div>
    );
  } else {
    return (
      <div onClick={() => onClick(id)} className="bg-gradient-to-br from-yellow-900/20 to-amber-900/10 border border-yellow-500/30 rounded-xl p-4 cursor-pointer hover:border-yellow-500/50 transition-colors">
        <div className="flex items-center gap-2 text-yellow-500 mb-3">
          <Megaphone className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Official Announcement</span>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-300 line-clamp-2">{content}</p>
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
          <div className="w-5 h-5 rounded-full bg-yellow-600 flex items-center justify-center text-white font-bold text-[8px]">P</div>
          <span>{author}</span>
          <span>•</span>
          <span>{time}</span>
        </div>
      </div>
    );
  }
}

function CourseHub({ onBack, onOpenThread, onOpenAIChat, courseId, key }: { onBack: () => void, onOpenThread: (id: string) => void, onOpenAIChat: () => void, courseId: string | null, key?: string }) {
  const [activeTab, setActiveTab] = useState<'all' | 'announcements' | 'discussions' | 'rooms'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const courseData = {
    'ENT101': { name: 'Entrepreneurship', description: 'ENT 101 Hub' },
    'BUS800': { name: 'Strategic Mgmt', description: 'BUS 800 Hub' }
  };
  const course = courseId ? courseData[courseId as keyof typeof courseData] : { name: 'Course', description: 'Course Hub' };

  const discussions = Object.values(MOCK_DISCUSSIONS).filter(d => d.courseId === courseId || !courseId);

  const filteredDiscussions = discussions.filter(d => {
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'announcements' && d.type === 'professor') || 
      (activeTab === 'discussions' && d.type === 'student') ||
      (activeTab === 'rooms' && d.type === 'live');
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) || d.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <motion.div variants={screenVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 w-full h-full overflow-y-auto flex flex-col bg-[#050505] p-6 pt-12 z-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="w-10 h-10 bg-[#121212] rounded-full flex items-center justify-center border border-white/5 hover:bg-white/5 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-semibold">{course.description}</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Feed Column */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Mobile Pinned Guides (Hidden on Desktop) */}
            <div className="lg:hidden bg-[#121212] border border-white/5 rounded-[24px] p-5">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> Announcements & Guides
              </h3>
              <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2 -mx-5 px-5">
                {discussions.filter(d => d.type === 'professor').map(d => (
                  <div key={d.id} onClick={() => onOpenThread(d.id)} className="min-w-[200px] bg-[#1A1A1A] border border-white/5 rounded-[16px] p-3 cursor-pointer hover:border-white/20 transition-colors">
                    <p className="text-xs text-gray-300 font-medium truncate mb-1">{d.title}</p>
                    <p className="text-[10px] text-gray-500">{d.author}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div className="bg-[#121212] border border-white/5 rounded-full p-3 flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-500 ml-2" />
              <input 
                type="text" 
                placeholder="Search discussions, rooms, or announcements..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none flex-1 text-sm text-white placeholder:text-gray-600" 
              />
            </div>

            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-[#121212] rounded-full border border-white/5 w-fit overflow-x-auto no-scrollbar max-w-full">
              {(['all', 'announcements', 'discussions', 'rooms'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab as any)} className={`px-6 py-2 rounded-full text-xs font-semibold capitalize whitespace-nowrap transition-colors ${activeTab === tab ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}>
                  {tab}
                </button>
              ))}
            </div>

            {/* Feed List */}
            <div className="flex flex-col gap-4">
              {filteredDiscussions.map(d => (
                <DiscussionCard 
                  key={d.id} 
                  id={d.id} 
                  title={d.title} 
                  content={d.content}
                  type={d.type} 
                  author={d.author}
                  time={d.time}
                  courseId={d.courseId}
                  activeParticipants={d.activeParticipants}
                  votes={d.votes} 
                  comments={d.comments} 
                  isAnonymous={d.isAnonymous} 
                  onClick={onOpenThread} 
                />
              ))}
              {filteredDiscussions.length === 0 && (
                <div className="text-center py-12 text-gray-500 text-sm">
                  No discussions found matching your criteria.
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* AI Buddy Widget */}
            <div className="bg-gradient-to-br from-blue-900/20 to-[#121212] border border-blue-500/30 rounded-[24px] p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <Zap className="w-8 h-8 text-blue-400 mb-4 relative z-10" />
              <h3 className="text-lg font-semibold mb-2 relative z-10">AI Study Buddy</h3>
              <p className="text-sm text-gray-400 mb-6 relative z-10">Get instant, course-specific answers trained on your {course.name} syllabus and lectures.</p>
              <button onClick={onOpenAIChat} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-full transition-colors relative z-10">
                Start Chat
              </button>
            </div>

            {/* Pinned Guides Widget */}
            <div className="hidden lg:block bg-[#121212] border border-white/5 rounded-[24px] p-6">
              <h3 className="text-md font-semibold mb-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> Announcements & Guides
              </h3>
              <div className="space-y-3">
                {discussions.filter(d => d.type === 'professor').map(d => (
                  <div key={d.id} onClick={() => onOpenThread(d.id)} className="cursor-pointer group">
                    <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">{d.title}</p>
                    <p className="text-[10px] text-gray-500 mt-1">{d.author}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Thread({ threadId, onBack, onBook, key }: { threadId: string | null, onBack: () => void, onBook: () => void, key?: string }) {
  const thread = threadId && MOCK_DISCUSSIONS[threadId] ? MOCK_DISCUSSIONS[threadId] : MOCK_DISCUSSIONS['1'];
  
  const replyInputRef = React.useRef<HTMLInputElement>(null);
  const [replyText, setReplyText] = useState('');

  const handleReplyClick = (author: string) => {
    setReplyText(`@${author.replace(' ', '').toLowerCase()} `);
    replyInputRef.current?.focus();
  };

  // ---------------------------------------------------------------------------
  // DISCORD-STYLE LIVE ROOM
  // ---------------------------------------------------------------------------
  if (thread.type === 'live') {
    const [hasJoined, setHasJoined] = useState(false);

    return (
      <motion.div variants={screenVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 w-full h-full overflow-y-auto flex flex-col bg-[#1E1F22] z-30">
        {/* Header */}
        <div className="p-4 flex items-center gap-4 bg-[#2B2D31] z-10 border-b border-[#1E1F22] shadow-sm">
          <button onClick={onBack} className="w-8 h-8 rounded flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#3F4147] transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-gray-400" />
            <span className="font-bold text-white text-base">{thread.title}</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Users className="w-5 h-5 text-gray-400" />
            <span className="text-gray-400 font-medium text-sm">{thread.activeParticipants}</span>
          </div>
        </div>

        {/* Video/Voice Grid */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#1E1F22] flex flex-col relative">
          
          <div className="max-w-4xl mx-auto mb-6 w-full">
            {/* Screen Share */}
            <div className="aspect-video bg-black rounded-xl border border-white/10 relative overflow-hidden mb-4">
              <img src="https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&q=80" alt="Screen Share" className="w-full h-full object-cover opacity-50" />
              <div className="absolute top-4 left-4 bg-black/60 px-3 py-1.5 rounded-lg text-xs text-white font-medium flex items-center gap-2 backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> LIVE: Market Size Breakdown
              </div>
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-green-500 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop" alt="Tutor" className="w-full h-full object-cover" />
                </div>
                <div className="bg-black/60 px-2 py-1 rounded text-xs text-white font-medium flex items-center gap-1 backdrop-blur-md">
                  <Mic className="w-3 h-3 text-green-400" /> {thread.tutor || 'Tutor'}
                </div>
              </div>
            </div>
            
            {/* Other Participants */}
            <div className="grid grid-cols-4 gap-4">
              <div className="aspect-video bg-[#2B2D31] rounded-xl relative flex items-center justify-center overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-xl font-bold text-white mb-4">JD</div>
                <div className="absolute bottom-1 left-1 bg-black/60 px-1.5 py-0.5 rounded text-[10px] text-white font-medium flex items-center gap-1">
                  <MicOff className="w-2 h-2 text-red-400" /> John
                </div>
              </div>
              <div className="aspect-video bg-[#2B2D31] rounded-xl relative flex items-center justify-center overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-xl font-bold text-white mb-4">MR</div>
                <div className="absolute bottom-1 left-1 bg-black/60 px-1.5 py-0.5 rounded text-[10px] text-white font-medium flex items-center gap-1">
                  <MicOff className="w-2 h-2 text-red-400" /> Mike
                </div>
              </div>
              <div className="aspect-video bg-[#2B2D31] rounded-xl relative flex items-center justify-center overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold text-white mb-4">SL</div>
                <div className="absolute bottom-1 left-1 bg-black/60 px-1.5 py-0.5 rounded text-[10px] text-white font-medium flex items-center gap-1">
                  <MicOff className="w-2 h-2 text-red-400" /> Sarah
                </div>
              </div>
              <div className="aspect-video bg-[#2B2D31] rounded-xl relative flex items-center justify-center overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-xl font-bold text-white mb-4">+{thread.activeParticipants - 4}</div>
              </div>
            </div>
          </div>

          {/* Text Chat Area */}
          <div className="max-w-4xl mx-auto w-full bg-[#313338] rounded-xl p-4 min-h-[300px] flex flex-col mb-8 relative">
            <div className="flex items-center gap-2 border-b border-[#1E1F22] pb-3 mb-4">
              <Hash className="w-5 h-5 text-gray-400" />
              <span className="font-bold text-white">room-chat</span>
            </div>
            <div className="flex-1 space-y-4">
              {thread.replies.map((reply: any) => (
                <div key={reply.id} className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold shrink-0">
                    {reply.author.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-medium text-white hover:underline cursor-pointer">{reply.author}</span>
                      <span className="text-xs text-gray-400">{reply.time}</span>
                    </div>
                    <p className="text-gray-300 text-sm mt-0.5">{reply.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Spacer for paywall */}
          {thread.isPremium && !hasJoined && <div className="h-48"></div>}
        </div>

        {/* Paywall Overlay if premium and not joined */}
        {thread.isPremium && !hasJoined && (
          <div className="absolute bottom-20 left-0 right-0 z-20 bg-gradient-to-t from-[#1E1F22] via-[#1E1F22]/95 to-transparent pt-32 pb-8 px-6 flex flex-col items-center text-center pointer-events-none">
            <div className="pointer-events-auto flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FFD166] to-yellow-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <Star className="w-8 h-8 text-white fill-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Premium Tutoring Session</h3>
              <p className="text-gray-300 text-sm max-w-md mb-6">{thread.tutor} is currently breaking down the final project rubric. Join the voice channel to ask questions and view the high-res screen share.</p>
              <button onClick={() => { setHasJoined(true); onBook(); }} className="bg-[#FFD166] text-black font-bold text-lg px-8 py-3 rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,209,102,0.3)]">
                Join Session • ${thread.price}
              </button>
              <p className="text-gray-500 text-xs mt-4">Previewing as spectator</p>
            </div>
          </div>
        )}

        {/* Discord-style Controls */}
        <div className="bg-[#2B2D31] p-4 flex items-center justify-center gap-4 z-20">
          <button disabled={thread.isPremium && !hasJoined} className="w-12 h-12 rounded-full bg-[#313338] flex items-center justify-center text-gray-300 hover:bg-[#3F4147] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <Video className="w-5 h-5" />
          </button>
          <button disabled={thread.isPremium && !hasJoined} className="w-12 h-12 rounded-full bg-[#313338] flex items-center justify-center text-gray-300 hover:bg-[#3F4147] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <MonitorUp className="w-5 h-5" />
          </button>
          <button disabled={thread.isPremium && !hasJoined} className="w-12 h-12 rounded-full bg-[#313338] flex items-center justify-center text-gray-300 hover:bg-[#3F4147] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <Mic className="w-5 h-5" />
          </button>
          <button onClick={onBack} className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors">
            <PhoneOff className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    );
  }

  // ---------------------------------------------------------------------------
  // REDDIT-STYLE STUDENT DISCUSSION
  // ---------------------------------------------------------------------------
  if (thread.type === 'student') {
    return (
      <motion.div variants={screenVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 w-full h-full overflow-y-auto flex flex-col bg-[#0B1416] z-30">
        {/* Header */}
        <div className="p-3 flex items-center gap-4 bg-[#0B1416] z-10 border-b border-white/10 sticky top-0">
          <button onClick={onBack} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-300 hover:bg-white/10 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="font-bold text-white text-sm">c/{thread.courseId}</span>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* Main Post */}
          <div className="p-4 bg-[#0B1416] border-b border-white/10">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
              <div className="w-6 h-6 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold text-[10px]">
                {thread.courseId.substring(0,2)}
              </div>
              <span className="font-bold text-gray-200">c/{thread.courseId}</span>
              <span>•</span>
              <span>u/{thread.author.replace(' ', '').toLowerCase()}</span>
              <span>•</span>
              <span>{thread.time}</span>
            </div>
            <h1 className="text-xl font-bold text-white mb-3">{thread.title}</h1>
            <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap mb-4">
              {thread.content}
            </p>
             {/* Action Bar */}
            <div className="flex items-center gap-2 flex-wrap">
              <VoteWidget initialVotes={thread.votes} size="md" />
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-gray-300 hover:bg-white/10 cursor-pointer transition-colors whitespace-nowrap">
                <MessageSquare className="w-4 h-4" />
                <span className="text-xs font-bold">{thread.comments}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-gray-300 hover:bg-white/10 cursor-pointer transition-colors whitespace-nowrap">
                <Share className="w-4 h-4" />
                <span className="text-xs font-bold">Share</span>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="p-4 bg-[#0B1416] pb-24">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-gray-400 text-sm font-bold">Sort by:</span>
              <span className="text-white text-sm font-bold flex items-center gap-1 cursor-pointer">Best <ChevronDown className="w-4 h-4" /></span>
            </div>

            <div className="space-y-4">
              {thread.replies.map((reply: any) => (
                <div key={reply.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    {reply.isAI ? (
                      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                        <Zap className="w-3 h-3 text-white" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-xs shrink-0">
                        {reply.author.charAt(0)}
                      </div>
                    )}
                    <div className="w-0.5 h-full bg-white/10 mt-2 rounded-full"></div>
                  </div>
                  
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-bold ${reply.isAI ? 'text-blue-400' : 'text-gray-300'}`}>
                        {reply.isAI ? 'StudyBuddy_AI' : `u/${reply.author.replace(' ', '').toLowerCase()}`}
                      </span>
                      {reply.isAI && <span className="text-[10px] font-bold text-blue-400 bg-blue-900/30 px-1.5 py-0.5 rounded">BOT</span>}
                      {reply.isVerified && <span className="text-[10px] font-bold text-green-400 bg-green-900/30 px-1.5 py-0.5 rounded">VERIFIED TUTOR</span>}
                      <span className="text-xs text-gray-500">• {reply.time}</span>
                    </div>
                    <p className="text-gray-200 text-sm leading-relaxed mb-2">
                      {reply.content}
                    </p>
                    <div className="flex items-center gap-4 text-gray-400">
                      <VoteWidget initialVotes={reply.votes || 1} size="sm" />
                      <button onClick={() => handleReplyClick(reply.author)} className="text-xs font-bold flex items-center gap-1 hover:bg-white/5 px-2 py-1 rounded">
                        <MessageSquare className="w-4 h-4" /> Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reddit-style Add Comment Bar */}
        <div className="p-3 bg-[#0B1416] border-t border-white/10 z-20">
          <div className="max-w-4xl mx-auto w-full">
            <div className="flex gap-2 bg-[#1A282D] rounded-full p-1.5 border border-white/5 focus-within:border-white/20 transition-colors">
              <input 
                ref={replyInputRef}
                type="text" 
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 bg-transparent px-4 text-sm outline-none text-white placeholder:text-gray-500" 
                placeholder="Add a comment..." 
              />
              <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <ImageIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // ---------------------------------------------------------------------------
  // PROFESSOR ANNOUNCEMENT / GUIDE
  // ---------------------------------------------------------------------------
  return (
    <motion.div variants={screenVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col h-full bg-[#050505]">
      <div className="p-6 pt-12 flex items-center gap-4 bg-[#050505] z-10 border-b border-white/5 max-w-3xl mx-auto w-full">
        <button onClick={onBack} className="w-10 h-10 bg-[#121212] rounded-full flex items-center justify-center border border-white/5 shrink-0 hover:bg-white/5 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 text-yellow-500">
          <Megaphone className="w-5 h-5" />
          <span className="font-bold uppercase tracking-wider text-xs">Official Announcement</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 pt-8 pb-24 max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-white mb-6 leading-tight">{thread.title}</h1>
        
        <div className="flex items-center gap-3 mb-8 pb-8 border-b border-white/10">
          <div className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center text-white font-bold text-sm">
            {thread.author.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-medium text-white">{thread.author}</span>
              <CheckCircle2 className="w-4 h-4 text-yellow-500" />
            </div>
            <span className="text-gray-500 text-xs">{thread.time} • {thread.courseId}</span>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="text-gray-200 leading-relaxed text-base">
            <ReactMarkdown>{thread.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Booking({ onBack, onConfirm, key }: { onBack: () => void, onConfirm: () => void, key?: string }) {
  return (
    <motion.div variants={screenVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 w-full h-full overflow-y-auto flex flex-col bg-[#050505] p-6 pt-12 z-40">
      <div className="max-w-md mx-auto w-full flex flex-col h-full">
        <button onClick={onBack} className="w-10 h-10 bg-[#121212] rounded-full flex items-center justify-center mb-8 border border-white/5 hover:bg-white/5 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div className="flex flex-col items-center mb-10">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FFD166] to-yellow-600 p-1">
              <div className="w-full h-full rounded-full bg-[#121212] flex items-center justify-center text-3xl font-bold">AS</div>
            </div>
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-[#050505] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
          </div>
          <h2 className="text-2xl font-bold mb-1">Andrea S.</h2>
          <p className="text-green-500 text-sm font-medium">ENT 101 Alumni Specialist</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[#121212] rounded-[24px] p-5 border border-white/5">
            <p className="text-gray-400 text-xs mb-1">Rate</p>
            <p className="text-xl font-bold">$15 <span className="text-sm text-gray-500 font-normal">/ 30m</span></p>
          </div>
          <div className="bg-[#121212] rounded-[24px] p-5 border border-white/5">
            <p className="text-gray-400 text-xs mb-1">Rating</p>
            <p className="text-xl font-bold flex items-center gap-1">4.9 <Star className="w-5 h-5 text-[#FFD166] fill-[#FFD166]" /></p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Urgent Availability</h3>
            <span className="text-xs text-gray-400">Tonight</span>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 bg-[#FFD166] text-black font-bold py-3 rounded-full shadow-[0_0_15px_rgba(255,209,102,0.3)] hover:scale-105 transition-transform">1:15 AM</button>
            <button className="flex-1 bg-[#121212] border border-white/5 text-gray-300 font-medium py-3 rounded-full hover:bg-white/5 transition-colors">1:45 AM</button>
            <button className="flex-1 bg-[#121212] border border-white/5 text-gray-300 font-medium py-3 rounded-full hover:bg-white/5 transition-colors">2:15 AM</button>
          </div>
        </div>

        <div className="bg-[#1A1500] border border-yellow-900/50 rounded-[24px] p-5 mb-auto relative">
          <MessageCircle className="w-5 h-5 text-[#FFD166] absolute top-5 left-5" />
          <p className="text-yellow-100/80 text-sm pl-8 leading-relaxed italic">
            "I can jump on a quick Zoom right now to walk you through the TAM/SAM/SOM breakdown. Takes 10 mins."
          </p>
        </div>

        <motion.button whileTap={{ scale: 0.95 }} onClick={onConfirm} className="w-full bg-white text-black font-bold text-lg py-4 rounded-full mt-6 hover:bg-gray-200 transition-colors">
          Confirm $15 Session
        </motion.button>
      </div>
    </motion.div>
  );
}

function NewPost({ onCancel, onPost, key }: { onCancel: () => void, onPost: () => void, key?: string }) {
  const [isAnonymous, setIsAnonymous] = useState(false);

  return (
    <motion.div variants={screenVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 w-full h-full overflow-y-auto flex flex-col bg-[#050505] p-6 pt-12 z-40">
      <div className="max-w-2xl mx-auto w-full flex flex-col h-full">
        <div className="flex justify-between items-center mb-8">
          <button onClick={onCancel} className="text-gray-400 font-medium hover:text-white transition-colors">Cancel</button>
          <h2 className="font-semibold text-lg">New Request</h2>
          <button className="text-gray-400 font-medium hover:text-white transition-colors">Draft</button>
        </div>

        <div className="mb-6">
          <label className="text-xs text-gray-500 font-bold tracking-wider uppercase mb-2 block">Post To</label>
          <div className="bg-[#121212] border border-white/5 rounded-full p-2 pr-4 flex items-center justify-between cursor-pointer hover:border-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded-full">ENT</div>
              <span className="font-medium">ENT 101</span>
            </div>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="mb-6">
          <label className="text-xs text-gray-500 font-bold tracking-wider uppercase mb-2 block">Your Question</label>
          <div className="bg-[#121212] border border-white/5 rounded-[20px] p-5 focus-within:border-white/20 transition-colors">
            <textarea 
              className="w-full bg-transparent outline-none text-white resize-none h-32 placeholder:text-gray-600 text-sm leading-relaxed"
              placeholder="What are you stuck on?"
            />
            <div className="flex gap-3 mt-4">
              <button className="bg-[#0A1929] border border-blue-900/50 text-blue-400 text-xs font-medium px-4 py-2 rounded-full flex items-center gap-2 hover:bg-blue-900/30 transition-colors">
                <Paperclip className="w-3 h-3" /> Syllabus.pdf
              </button>
              <button className="bg-[#1A1A1A] border border-white/5 text-gray-300 text-xs font-medium px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/5 transition-colors">
                <ImageIcon className="w-3 h-3" /> Screenshot
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8 p-4 bg-[#121212] rounded-[20px] border border-white/5">
          <span className="text-sm font-medium">Post Anonymously</span>
          <button 
            onClick={() => setIsAnonymous(!isAnonymous)}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${isAnonymous ? 'bg-blue-600' : 'bg-[#1A1A1A]'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isAnonymous ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        <div className="mt-auto mb-6">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h3 className="font-semibold text-lg">Add a Bounty</h3>
              <p className="text-xs text-gray-400 mt-1">You only pay if an Alumni verified answer unblocks you.</p>
            </div>
            <span className="text-[10px] font-bold text-[#FFD166] border border-[#FFD166]/30 bg-[#FFD166]/10 px-2 py-1 rounded-full">FASTER ANSWERS</span>
          </div>
          
          <div className="flex gap-3">
            <button className="flex-1 bg-[#121212] border border-white/5 text-white font-semibold py-4 rounded-[20px] hover:bg-white/5 transition-colors">$2</button>
            <div className="flex-1 relative">
              <div className="absolute -inset-1 bg-[#FFD166]/40 blur-md rounded-[20px]"></div>
              <button className="w-full relative bg-[#FFD166] text-black font-bold py-4 rounded-[20px] flex flex-col items-center justify-center hover:bg-[#FFD166]/90 transition-colors">
                <span className="absolute -top-2.5 bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">POPULAR</span>
                $5
              </button>
            </div>
            <button className="flex-1 bg-[#121212] border border-white/5 text-white font-semibold py-4 rounded-[20px] hover:bg-white/5 transition-colors">$10</button>
            <button className="flex-1 bg-[#121212] border border-white/5 text-white font-semibold py-4 rounded-[20px] hover:bg-white/5 transition-colors">$20</button>
          </div>
        </div>

        <motion.button whileTap={{ scale: 0.95 }} onClick={onPost} className="w-full bg-white text-black font-bold text-lg py-4 rounded-full flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
          Post with $5 Bounty <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}
