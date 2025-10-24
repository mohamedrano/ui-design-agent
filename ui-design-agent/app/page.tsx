'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Brain,
  Palette,
  Accessibility,
  Leaf,
  Cube,
  Mic,
  Eye,
  Zap,
  Globe,
  Moon,
  Sun,
  Play,
  ChevronRight,
  Star,
  TrendingUp,
  Shield,
  Heart,
} from 'lucide-react';

interface DesignTrend {
  id: string;
  title: string;
  titleAr: string;
  icon: React.ReactNode;
  description: string;
  descriptionAr: string;
  color: string;
  gradient: string;
  implemented: boolean;
}

interface AnalyticsCard {
  label: string;
  value: string;
  change: string;
  color: string;
}

const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [selectedTrend, setSelectedTrend] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const designTrends: DesignTrend[] = [
    {
      id: 'ai-personalization',
      title: 'AI Personalization',
      titleAr: 'التخصيص بالذكاء الاصطناعي',
      icon: <Brain className='w-6 h-6' />,
      description:
        'Intelligent adaptive interfaces that learn from user behavior',
      descriptionAr: 'واجهات تكيفية ذكية تتعلم من سلوك المستخدم',
      color: 'from-purple-500 to-pink-500',
      gradient: 'bg-gradient-to-r from-purple-500/10 to-pink-500/10',
      implemented: true,
    },
    {
      id: 'accessibility-first',
      title: 'Accessibility First',
      titleAr: 'إمكانية الوصول أولاً',
      icon: <Accessibility className='w-6 h-6' />,
      description: 'WCAG 2.2 compliant inclusive design for everyone',
      descriptionAr: 'تصميم شامل متوافق مع معايير WCAG 2.2 للجميع',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10',
      implemented: true,
    },
    {
      id: 'spatial-design',
      title: 'Spatial Computing',
      titleAr: 'الحوسبة المكانية',
      icon: <Cube className='w-6 h-6' />,
      description: '3D interactions optimized for Apple Vision Pro',
      descriptionAr: 'تفاعلات ثلاثية الأبعاد محسنة لـ Apple Vision Pro',
      color: 'from-emerald-500 to-teal-500',
      gradient: 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10',
      implemented: false,
    },
    {
      id: 'voice-ui',
      title: 'Voice Interfaces',
      titleAr: 'الواجهات الصوتية',
      icon: <Mic className='w-6 h-6' />,
      description: 'Conversational UX with multilingual support',
      descriptionAr: 'تجربة محادثية مع دعم متعدد اللغات',
      color: 'from-orange-500 to-red-500',
      gradient: 'bg-gradient-to-r from-orange-500/10 to-red-500/10',
      implemented: false,
    },
    {
      id: 'zero-ui',
      title: 'Zero UI',
      titleAr: 'الواجهة الصفرية',
      icon: <Eye className='w-6 h-6' />,
      description: 'Context-aware ambient computing experiences',
      descriptionAr: 'تجارب حوسبة محيطة تدرك السياق',
      color: 'from-violet-500 to-purple-500',
      gradient: 'bg-gradient-to-r from-violet-500/10 to-purple-500/10',
      implemented: false,
    },
    {
      id: 'sustainable-design',
      title: 'Green Design',
      titleAr: 'التصميم الأخضر',
      icon: <Leaf className='w-6 h-6' />,
      description: 'Carbon-neutral interfaces with energy efficiency',
      descriptionAr: 'واجهات محايدة الكربون مع كفاءة في الطاقة',
      color: 'from-green-500 to-emerald-500',
      gradient: 'bg-gradient-to-r from-green-500/10 to-emerald-500/10',
      implemented: true,
    },
  ];

  const analyticsData: AnalyticsCard[] = [
    {
      label: 'Accessibility Score',
      value: '96%',
      change: '+12%',
      color: 'text-blue-600',
    },
    {
      label: 'Performance',
      value: '94ms',
      change: '-23%',
      color: 'text-green-600',
    },
    {
      label: 'Carbon Footprint',
      value: '0.12kg',
      change: '-45%',
      color: 'text-emerald-600',
    },
    {
      label: 'User Satisfaction',
      value: '4.8/5',
      change: '+8%',
      color: 'text-purple-600',
    },
  ];

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
    if (!isVoiceActive) {
      // Simulate voice activation
      setTimeout(() => setIsVoiceActive(false), 3000);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  const trendVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode
          ? 'bg-gray-900 text-white'
          : 'bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-900'
      }`}
    >
      {/* Header */}
      <header className='relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10'></div>
        <nav className='relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className='flex items-center space-x-4'
          >
            <div className='w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center'>
              <Sparkles className='w-6 h-6 text-white' />
            </div>
            <div>
              <h1 className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                UI Design Agent
              </h1>
              <p className='text-sm opacity-70'>
                {currentTime.toLocaleTimeString('ar-SA')} - وكيل التصميم الذكي
              </p>
            </div>
          </motion.div>

          <div className='flex items-center space-x-4'>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleVoice}
              className={`p-3 rounded-2xl transition-all ${
                isVoiceActive
                  ? 'bg-red-500 text-white animate-pulse'
                  : isDarkMode
                    ? 'bg-gray-800 text-gray-300'
                    : 'bg-white/70 text-gray-700'
              } backdrop-blur-sm border border-white/20`}
            >
              <Mic className='w-5 h-5' />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-3 rounded-2xl transition-all ${
                isDarkMode
                  ? 'bg-gray-800 text-yellow-400'
                  : 'bg-white/70 text-gray-700'
              } backdrop-blur-sm border border-white/20`}
            >
              {isDarkMode ? (
                <Sun className='w-5 h-5' />
              ) : (
                <Moon className='w-5 h-5' />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold shadow-lg shadow-purple-600/25 border border-white/20 backdrop-blur-sm'
            >
              ابدأ التحليل
            </motion.button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className='relative z-10 max-w-7xl mx-auto px-6 py-20'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center'
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className='w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl'
            >
              <Brain className='w-12 h-12 text-white' />
            </motion.div>

            <h1 className='text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent'>
              مستقبل التصميم
            </h1>

            <p className='text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-80 leading-relaxed'>
              وكيل ذكي متقدم يدمج أحدث اتجاهات UX/UI لعام 2024-2025
              <br />
              مع الذكاء الاصطناعي والتصميم المكاني والاستدامة البيئية
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold text-lg shadow-2xl shadow-purple-600/25 flex items-center space-x-2'
              >
                <Play className='w-5 h-5' />
                <span>ابدأ التجربة</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-2xl font-semibold text-lg border-2 transition-all ${
                  isDarkMode
                    ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                } flex items-center space-x-2`}
              >
                <TrendingUp className='w-5 h-5' />
                <span>اكتشف الاتجاهات</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Analytics Dashboard */}
      <section className='max-w-7xl mx-auto px-6 py-16'>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16'
        >
          {analyticsData.map((item, index) => (
            <motion.div
              key={item.label}
              variants={cardVariants}
              initial='hidden'
              whileInView='visible'
              whileHover='hover'
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-3xl shadow-xl border ${
                isDarkMode
                  ? 'bg-gray-800/50 border-gray-700 backdrop-blur-xl'
                  : 'bg-white/70 border-white/30 backdrop-blur-xl'
              }`}
            >
              <div className='flex justify-between items-start mb-4'>
                <h3 className='text-sm font-medium opacity-70'>{item.label}</h3>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-lg ${item.color} bg-current/10`}
                >
                  {item.change}
                </span>
              </div>
              <p className={`text-3xl font-bold ${item.color}`}>{item.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Design Trends Bento Grid */}
      <section className='max-w-7xl mx-auto px-6 py-16'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
            اتجاهات التصميم 2024-2025
          </h2>
          <p className='text-xl opacity-80 max-w-3xl mx-auto'>
            اكتشف أحدث الابتكارات في عالم تجربة المستخدم والتصميم التفاعلي
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {designTrends.map((trend, index) => (
            <motion.div
              key={trend.id}
              custom={index}
              variants={trendVariants}
              initial='hidden'
              whileInView='visible'
              whileHover={{ scale: 1.02, y: -5 }}
              viewport={{ once: true }}
              onClick={() => setSelectedTrend(trend.id)}
              className={`relative p-8 rounded-3xl cursor-pointer transition-all duration-300 border ${
                selectedTrend === trend.id
                  ? 'ring-2 ring-purple-500 ring-offset-2'
                  : ''
              } ${
                isDarkMode
                  ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70'
                  : 'bg-white/70 border-white/30 hover:bg-white/90'
              } backdrop-blur-xl shadow-xl hover:shadow-2xl ${trend.gradient}`}
            >
              <div className='flex items-center justify-between mb-6'>
                <div
                  className={`p-3 rounded-2xl bg-gradient-to-r ${trend.color} text-white shadow-lg`}
                >
                  {trend.icon}
                </div>
                <div className='flex items-center space-x-2'>
                  {trend.implemented ? (
                    <div className='flex items-center space-x-1 text-green-600'>
                      <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                      <span className='text-xs font-semibold'>مطبق</span>
                    </div>
                  ) : (
                    <div className='flex items-center space-x-1 text-orange-600'>
                      <div className='w-2 h-2 bg-orange-500 rounded-full'></div>
                      <span className='text-xs font-semibold'>قيد التطوير</span>
                    </div>
                  )}
                </div>
              </div>

              <h3 className='text-2xl font-bold mb-2'>{trend.titleAr}</h3>
              <p className='text-sm font-medium opacity-70 mb-4'>
                {trend.title}
              </p>
              <p className='opacity-80 leading-relaxed mb-6'>
                {trend.descriptionAr}
              </p>

              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-1'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < (trend.implemented ? 5 : 3)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <ChevronRight className='w-5 h-5 opacity-50' />
              </div>

              {selectedTrend === trend.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className='mt-6 pt-6 border-t border-current/10'
                >
                  <p className='text-sm opacity-70'>{trend.description}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className='max-w-7xl mx-auto px-6 py-20'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={`relative overflow-hidden rounded-3xl p-12 text-center ${
            isDarkMode
              ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/50'
              : 'bg-gradient-to-r from-purple-600/10 to-pink-600/10'
          } border border-white/20 backdrop-blur-xl`}
        >
          <div className='absolute inset-0 bg-gradient-to-r from-purple-600/20 via-transparent to-pink-600/20'></div>
          <div className='relative z-10'>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className='w-16 h-16 mx-auto mb-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center'
            >
              <Heart className='w-8 h-8 text-white' />
            </motion.div>

            <h2 className='text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
              انضم إلى مستقبل التصميم
            </h2>

            <p className='text-xl mb-8 max-w-2xl mx-auto opacity-80'>
              كن جزءاً من ثورة التصميم الذكي واكتشف إمكانيات لا محدودة مع الذكاء
              الاصطناعي والتقنيات المتطورة
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold shadow-2xl'
              >
                ابدأ مجاناً الآن
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-2xl font-semibold border-2 transition-all ${
                  isDarkMode
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                    : 'border-gray-300 text-gray-700 hover:bg-white/50'
                }`}
              >
                اعرف المزيد
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        className={`border-t ${
          isDarkMode ? 'border-gray-800' : 'border-gray-200'
        } py-12`}
      >
        <div className='max-w-7xl mx-auto px-6'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='flex items-center space-x-4 mb-4 md:mb-0'>
              <div className='w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center'>
                <Globe className='w-4 h-4 text-white' />
              </div>
              <div>
                <p className='font-semibold'>UI Design Agent</p>
                <p className='text-sm opacity-70'>
                  Powered by AI • Built for the Future
                </p>
              </div>
            </div>

            <div className='flex items-center space-x-6'>
              <span className='text-sm opacity-70'>
                © 2024 - صنع بـ ❤️ للمستقبل
              </span>
              <div className='flex space-x-4'>
                {[Shield, Heart, Leaf, Zap].map((Icon, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    className='w-6 h-6 text-gray-400 hover:text-purple-600 transition-colors cursor-pointer'
                  >
                    <Icon className='w-full h-full' />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Voice Assistant Overlay */}
      <AnimatePresence>
        {isVoiceActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center'
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className='bg-gradient-to-r from-red-500 to-pink-500 p-8 rounded-3xl text-white text-center'
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className='w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center'
              >
                <Mic className='w-8 h-8' />
              </motion.div>
              <h3 className='text-xl font-bold mb-2'>المساعد الصوتي نشط</h3>
              <p className='opacity-90'>قل "مرحبا" لبدء المحادثة...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
