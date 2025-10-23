'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Brain,
  Accessibility,
  Leaf,
  Cube,
  Mic,
  Eye,
  Palette,
  Zap,
  Code,
  Search,
  Settings,
  Download,
  Share2,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  XCircle,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Smartphone,
  Monitor,
  Tablet,
  Headphones,
  Camera,
  Globe,
  Shield,
  Heart,
  Star,
  Filter,
  Upload,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from 'lucide-react';

// Types and Interfaces
interface AnalysisResult {
  id: string;
  category:
    | 'accessibility'
    | 'performance'
    | 'sustainability'
    | 'ai'
    | 'spatial'
    | 'voice'
    | 'zero-ui';
  title: string;
  titleAr: string;
  score: number;
  status: 'excellent' | 'good' | 'needs-improvement' | 'critical';
  description: string;
  descriptionAr: string;
  recommendations: string[];
  recommendationsAr: string[];
  icon: React.ReactNode;
  color: string;
  gradient: string;
}

interface DesignMetrics {
  accessibility: {
    wcagLevel: 'A' | 'AA' | 'AAA';
    contrastRatio: number;
    keyboardNavigation: boolean;
    screenReaderSupport: boolean;
    overallScore: number;
  };
  performance: {
    loadingSpeed: number;
    carbonFootprint: number;
    energyEfficiency: number;
    mobileOptimization: number;
    overallScore: number;
  };
  aiPersonalization: {
    adaptiveLayouts: boolean;
    predictiveUI: boolean;
    userBehaviorAnalysis: boolean;
    contentPersonalization: boolean;
    overallScore: number;
  };
  spatialDesign: {
    threeDElements: boolean;
    arVrSupport: boolean;
    spatialAnchoring: boolean;
    gestureIntegration: boolean;
    overallScore: number;
  };
  voiceUI: {
    voiceCommands: string[];
    multilingualSupport: boolean;
    conversationalFlow: boolean;
    speechSynthesis: boolean;
    overallScore: number;
  };
  zeroUI: {
    contextAwareness: boolean;
    ambientComputing: boolean;
    predictiveActions: boolean;
    seamlessHandoffs: boolean;
    overallScore: number;
  };
}

interface AdvancedAnalyzerProps {
  initialCode?: string;
  onAnalysisComplete?: (
    results: AnalysisResult[],
    metrics: DesignMetrics
  ) => void;
  theme?: 'light' | 'dark' | 'auto';
  language?: 'en' | 'ar';
  enableVoiceControl?: boolean;
  enable3DPreview?: boolean;
}

const AdvancedAnalyzer: React.FC<AdvancedAnalyzerProps> = ({
  initialCode = '',
  onAnalysisComplete,
  theme = 'auto',
  language = 'ar',
  enableVoiceControl = true,
  enable3DPreview = false,
}) => {
  // State Management
  const [code, setCode] = useState(initialCode);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [metrics, setMetrics] = useState<DesignMetrics | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [currentDevice, setCurrentDevice] = useState<
    'mobile' | 'tablet' | 'desktop'
  >('desktop');
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [voiceCommand, setVoiceCommand] = useState('');
  const [previewMode, setPreviewMode] = useState<'2d' | '3d' | 'ar'>('2d');

  // Refs
  const codeEditorRef = useRef<HTMLTextAreaElement>(null);
  const analysisRef = useRef<HTMLDivElement>(null);
  const voiceRecognitionRef = useRef<any>(null);
  const isInView = useInView(analysisRef, { once: true });

  // Effects
  useEffect(() => {
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDarkMode(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  useEffect(() => {
    if (enableVoiceControl && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language === 'ar' ? 'ar-SA' : 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map(result => result.transcript)
          .join('');

        setVoiceCommand(transcript);
        handleVoiceCommand(transcript);
      };

      voiceRecognitionRef.current = recognition;
    }
  }, [enableVoiceControl, language]);

  // Analysis Functions
  const analyzeCode = useCallback(async () => {
    if (!code.trim()) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    try {
      // Simulate comprehensive analysis
      const analysisSteps = [
        { step: 'Analyzing accessibility...', progress: 15 },
        { step: 'Checking performance...', progress: 30 },
        { step: 'Evaluating sustainability...', progress: 45 },
        { step: 'Testing AI personalization...', progress: 60 },
        { step: 'Validating spatial design...', progress: 75 },
        { step: 'Assessing voice UI...', progress: 90 },
        { step: 'Finalizing Zero UI analysis...', progress: 100 },
      ];

      for (const step of analysisSteps) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setAnalysisProgress(step.progress);
      }

      // Generate mock analysis results based on 2024-2025 trends
      const results: AnalysisResult[] = [
        {
          id: 'accessibility',
          category: 'accessibility',
          title: 'Accessibility Analysis',
          titleAr: 'تحليل إمكانية الوصول',
          score: 92,
          status: 'excellent',
          description:
            'WCAG 2.2 AA compliant with excellent contrast ratios and keyboard navigation',
          descriptionAr:
            'متوافق مع معايير WCAG 2.2 AA مع نسب تباين ممتازة وتنقل لوحة مفاتيح',
          recommendations: [
            'Add more ARIA labels for better screen reader support',
            'Implement skip navigation links',
            'Enhance focus indicators',
          ],
          recommendationsAr: [
            'أضف المزيد من تسميات ARIA لدعم أفضل لقارئات الشاشة',
            'طبق روابط تخطي التنقل',
            'حسن مؤشرات التركيز',
          ],
          icon: <Accessibility className='w-6 h-6' />,
          color: 'from-blue-500 to-cyan-500',
          gradient: 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10',
        },
        {
          id: 'performance',
          category: 'performance',
          title: 'Performance & Sustainability',
          titleAr: 'الأداء والاستدامة',
          score: 88,
          status: 'good',
          description:
            'Good loading performance with low carbon footprint and energy efficiency',
          descriptionAr:
            'أداء تحميل جيد مع بصمة كربونية منخفضة وكفاءة في الطاقة',
          recommendations: [
            'Optimize images for better compression',
            'Implement lazy loading for non-critical resources',
            'Use CDN for faster content delivery',
          ],
          recommendationsAr: [
            'حسن الصور للضغط الأفضل',
            'طبق التحميل الكسول للموارد غير الحرجة',
            'استخدم CDN لتوصيل محتوى أسرع',
          ],
          icon: <Leaf className='w-6 h-6' />,
          color: 'from-green-500 to-emerald-500',
          gradient: 'bg-gradient-to-r from-green-500/10 to-emerald-500/10',
        },
        {
          id: 'ai-personalization',
          category: 'ai',
          title: 'AI Personalization',
          titleAr: 'التخصيص بالذكاء الاصطناعي',
          score: 76,
          status: 'good',
          description: 'Adaptive layouts with basic user behavior analysis',
          descriptionAr: 'تخطيطات تكيفية مع تحليل أساسي لسلوك المستخدم',
          recommendations: [
            'Implement advanced ML algorithms for better predictions',
            'Add more personalization touchpoints',
            'Enhance user preference learning',
          ],
          recommendationsAr: [
            'طبق خوارزميات تعلم آلي متقدمة للتنبؤات الأفضل',
            'أضف المزيد من نقاط التخصيص',
            'حسن تعلم تفضيلات المستخدم',
          ],
          icon: <Brain className='w-6 h-6' />,
          color: 'from-purple-500 to-pink-500',
          gradient: 'bg-gradient-to-r from-purple-500/10 to-pink-500/10',
        },
        {
          id: 'spatial-design',
          category: 'spatial',
          title: 'Spatial Computing',
          titleAr: 'الحوسبة المكانية',
          score: 45,
          status: 'needs-improvement',
          description: 'Limited 3D elements, no AR/VR support detected',
          descriptionAr: 'عناصر ثلاثية أبعاد محدودة، لم يتم اكتشاف دعم AR/VR',
          recommendations: [
            'Add interactive 3D elements using Three.js',
            'Implement WebXR for AR/VR experiences',
            'Optimize for Apple Vision Pro',
          ],
          recommendationsAr: [
            'أضف عناصر ثلاثية أبعاد تفاعلية باستخدام Three.js',
            'طبق WebXR لتجارب AR/VR',
            'حسن لـ Apple Vision Pro',
          ],
          icon: <Cube className='w-6 h-6' />,
          color: 'from-orange-500 to-red-500',
          gradient: 'bg-gradient-to-r from-orange-500/10 to-red-500/10',
        },
        {
          id: 'voice-ui',
          category: 'voice',
          title: 'Voice User Interface',
          titleAr: 'واجهة المستخدم الصوتية',
          score: 32,
          status: 'needs-improvement',
          description: 'No voice commands or speech synthesis detected',
          descriptionAr: 'لم يتم اكتشاف أوامر صوتية أو تركيب كلام',
          recommendations: [
            'Integrate Web Speech API for voice commands',
            'Add multilingual voice support',
            'Implement conversational flows',
          ],
          recommendationsAr: [
            'ادمج Web Speech API للأوامر الصوتية',
            'أضف دعم صوتي متعدد اللغات',
            'طبق التدفقات المحادثية',
          ],
          icon: <Mic className='w-6 h-6' />,
          color: 'from-violet-500 to-purple-500',
          gradient: 'bg-gradient-to-r from-violet-500/10 to-purple-500/10',
        },
        {
          id: 'zero-ui',
          category: 'zero-ui',
          title: 'Zero UI Concepts',
          titleAr: 'مفاهيم الواجهة الصفرية',
          score: 28,
          status: 'critical',
          description:
            'Limited context awareness and ambient computing features',
          descriptionAr: 'وعي سياقي محدود وميزات حوسبة محيطة',
          recommendations: [
            'Implement context-aware interactions',
            'Add ambient computing features',
            'Enable predictive user actions',
          ],
          recommendationsAr: [
            'طبق التفاعلات الواعية للسياق',
            'أضف ميزات الحوسبة المحيطة',
            'فعل إجراءات المستخدم التنبئية',
          ],
          icon: <Eye className='w-6 h-6' />,
          color: 'from-cyan-500 to-teal-500',
          gradient: 'bg-gradient-to-r from-cyan-500/10 to-teal-500/10',
        },
      ];

      // Generate metrics
      const generatedMetrics: DesignMetrics = {
        accessibility: {
          wcagLevel: 'AA',
          contrastRatio: 4.8,
          keyboardNavigation: true,
          screenReaderSupport: true,
          overallScore: 92,
        },
        performance: {
          loadingSpeed: 1.2,
          carbonFootprint: 0.15,
          energyEfficiency: 88,
          mobileOptimization: 85,
          overallScore: 88,
        },
        aiPersonalization: {
          adaptiveLayouts: true,
          predictiveUI: false,
          userBehaviorAnalysis: true,
          contentPersonalization: false,
          overallScore: 76,
        },
        spatialDesign: {
          threeDElements: false,
          arVrSupport: false,
          spatialAnchoring: false,
          gestureIntegration: false,
          overallScore: 45,
        },
        voiceUI: {
          voiceCommands: [],
          multilingualSupport: false,
          conversationalFlow: false,
          speechSynthesis: false,
          overallScore: 32,
        },
        zeroUI: {
          contextAwareness: false,
          ambientComputing: false,
          predictiveActions: false,
          seamlessHandoffs: false,
          overallScore: 28,
        },
      };

      setAnalysisResults(results);
      setMetrics(generatedMetrics);

      if (onAnalysisComplete) {
        onAnalysisComplete(results, generatedMetrics);
      }
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
      setAnalysisProgress(0);
    }
  }, [code, onAnalysisComplete]);

  // Voice Command Handler
  const handleVoiceCommand = useCallback(
    (command: string) => {
      const lowerCommand = command.toLowerCase();

      if (lowerCommand.includes('analyze') || lowerCommand.includes('تحليل')) {
        analyzeCode();
      } else if (
        lowerCommand.includes('clear') ||
        lowerCommand.includes('مسح')
      ) {
        setCode('');
        setAnalysisResults([]);
        setMetrics(null);
      } else if (
        lowerCommand.includes('dark') ||
        lowerCommand.includes('مظلم')
      ) {
        setIsDarkMode(true);
      } else if (
        lowerCommand.includes('light') ||
        lowerCommand.includes('فاتح')
      ) {
        setIsDarkMode(false);
      }
    },
    [analyzeCode]
  );

  // Toggle Voice Recognition
  const toggleVoice = useCallback(() => {
    if (!enableVoiceControl || !voiceRecognitionRef.current) return;

    if (isVoiceActive) {
      voiceRecognitionRef.current.stop();
      setIsVoiceActive(false);
    } else {
      voiceRecognitionRef.current.start();
      setIsVoiceActive(true);
    }
  }, [enableVoiceControl, isVoiceActive]);

  // Filter results by category
  const filteredResults = analysisResults.filter(
    result => selectedCategory === 'all' || result.category === selectedCategory
  );

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'good':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'needs-improvement':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'critical':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className='w-4 h-4' />;
      case 'good':
        return <CheckCircle className='w-4 h-4' />;
      case 'needs-improvement':
        return <AlertTriangle className='w-4 h-4' />;
      case 'critical':
        return <XCircle className='w-4 h-4' />;
      default:
        return <Activity className='w-4 h-4' />;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
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
      <div className='sticky top-0 z-40 backdrop-blur-xl border-b border-white/10'>
        <div className='max-w-7xl mx-auto px-6 py-4'>
          <div className='flex flex-col lg:flex-row gap-4 items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <motion.div
                animate={{ rotate: isAnalyzing ? 360 : 0 }}
                transition={{ duration: 2, repeat: isAnalyzing ? Infinity : 0 }}
                className='w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center'
              >
                <BarChart3 className='w-6 h-6 text-white' />
              </motion.div>
              <div>
                <h1 className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                  محلل التصميم المتقدم
                </h1>
                <p className='text-sm opacity-70'>
                  Advanced UX/UI Design Analyzer 2024-2025
                </p>
              </div>
            </div>

            <div className='flex items-center space-x-3'>
              {/* Device Preview Selector */}
              <div className='flex bg-white/10 rounded-2xl p-1 backdrop-blur-sm'>
                {[
                  { key: 'mobile', icon: Smartphone },
                  { key: 'tablet', icon: Tablet },
                  { key: 'desktop', icon: Monitor },
                ].map(({ key, icon: Icon }) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentDevice(key as any)}
                    className={`p-2 rounded-xl transition-all ${
                      currentDevice === key
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                    }`}
                  >
                    <Icon className='w-4 h-4' />
                  </motion.button>
                ))}
              </div>

              {/* Voice Control */}
              {enableVoiceControl && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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
              )}

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-3 rounded-2xl transition-all ${
                  isDarkMode
                    ? 'bg-gray-800 text-yellow-400'
                    : 'bg-white/70 text-gray-700'
                } backdrop-blur-sm border border-white/20`}
              >
                {isDarkMode ? (
                  <Volume2 className='w-5 h-5' />
                ) : (
                  <VolumeX className='w-5 h-5' />
                )}
              </motion.button>

              {/* Analyze Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={analyzeCode}
                disabled={isAnalyzing || !code.trim()}
                className='px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2'
              >
                {isAnalyzing ? (
                  <RefreshCw className='w-5 h-5 animate-spin' />
                ) : (
                  <Search className='w-5 h-5' />
                )}
                <span>{isAnalyzing ? 'جاري التحليل...' : 'تحليل متقدم'}</span>
              </motion.button>
            </div>
          </div>

          {/* Progress Bar */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className='mt-4'
              >
                <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${analysisProgress}%` }}
                    className='h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full'
                  />
                </div>
                <p className='text-sm text-center mt-2 opacity-70'>
                  تحليل شامل للاتجاهات المتقدمة... {analysisProgress}%
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-6 py-8'>
        <div className='grid grid-cols-1 xl:grid-cols-3 gap-8'>
          {/* Code Input Section */}
          <div className='xl:col-span-1'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`rounded-3xl p-6 border backdrop-blur-xl ${
                isDarkMode
                  ? 'bg-gray-800/50 border-gray-700'
                  : 'bg-white/70 border-white/30'
              }`}
            >
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-xl font-bold flex items-center space-x-2'>
                  <Code className='w-6 h-6 text-purple-600' />
                  <span>كود التصميم</span>
                </h2>
                <div className='flex space-x-2'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  >
                    <Upload className='w-4 h-4' />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCode('')}
                    className='p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  >
                    <RefreshCw className='w-4 h-4' />
                  </motion.button>
                </div>
              </div>

              <textarea
                ref={codeEditorRef}
                value={code}
                onChange={e => setCode(e.target.value)}
                placeholder='الصق الكود هنا للتحليل المتقدم...'
                className={`w-full h-96 p-4 rounded-2xl border font-mono text-sm resize-none transition-all focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode
                    ? 'bg-gray-900/50 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />

              {/* Quick Actions */}
              <div className='mt-4 grid grid-cols-2 gap-3'>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className='p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-200 dark:border-blue-800 flex items-center space-x-2 text-blue-600'
                >
                  <Palette className='w-4 h-4' />
                  <span className='text-sm font-medium'>مثال تصميم</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className='p-3 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-200 dark:border-green-800 flex items-center space-x-2 text-green-600'
                >
                  <Globe className='w-4 h-4' />
                  <span className='text-sm font-medium'>استيراد من URL</span>
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Analysis Results Section */}
          <div className='xl:col-span-2' ref={analysisRef}>
            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className='mb-6'
            >
              <div className='flex flex-wrap gap-3'>
                {[
                  { key: 'all', label: 'الكل', icon: Filter },
                  {
                    key: 'accessibility',
                    label: 'إمكانية الوصول',
                    icon: Accessibility,
                  },
                  { key: 'performance', label: 'الأداء', icon: Zap },
                  { key: 'ai', label: 'الذكاء الاصطناعي', icon: Brain },
                  { key: 'spatial', label: 'التصميم المكاني', icon: Cube },
                  { key: 'voice', label: 'الواجهة الصوتية', icon: Mic },
                  { key: 'zero-ui', label: 'الواجهة الصفرية', icon: Eye },
                ].map(({ key, label, icon: Icon }) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(key)}
                    className={`px-4 py-2 rounded-2xl font-medium transition-all flex items-center space-x-2 ${
                      selectedCategory === key
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : isDarkMode
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          : 'bg-white/70 text-gray-700 hover:bg-white border border-gray-200'
                    }`}
                  >
                    <Icon className='w-4 h-4' />
                    <span className='text-sm'>{label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Analysis Results */}
            <AnimatePresence mode='wait'>
              {analysisResults.length > 0 ? (
                <motion.div
                  key='results'
                  variants={containerVariants}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  className='space-y-6'
                >
                  {/* Overall Score Card */}
                  <motion.div
                    variants={itemVariants}
                    className={`rounded-3xl p-8 border backdrop-blur-xl ${
                      isDarkMode
                        ? 'bg-gray-800/50 border-gray-700'
                        : 'bg-white/70 border-white/30'
                    }`}
                  >
                    <div className='flex items-center justify-between mb-6'>
                      <h2 className='text-2xl font-bold flex items-center space-x-3'>
                        <TrendingUp className='w-8 h-8 text-purple-600' />
                        <span>النتيجة الإجمالية</span>
                      </h2>
                      {metrics && (
                        <div className='text-right'>
                          <div className='text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                            {Math.round(
                              (metrics.accessibility.overallScore +
                                metrics.performance.overallScore +
                                metrics.aiPersonalization.overallScore +
                                metrics.spatialDesign.overallScore +
                                metrics.voiceUI.overallScore +
                                metrics.zeroUI.overallScore) /
                                6
                            )}
                            %
                          </div>
                          <p className='text-sm opacity-70'>من 100</p>
                        </div>
                      )}
                    </div>

                    {metrics && (
                      <div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
                        {[
                          {
                            key: 'accessibility',
                            label: 'إمكانية الوصول',
                            score: metrics.accessibility.overallScore,
                            color: 'text-blue-600',
                          },
                          {
                            key: 'performance',
                            label: 'الأداء',
                            score: metrics.performance.overallScore,
                            color: 'text-green-600',
                          },
                          {
                            key: 'ai',
                            label: 'الذكاء الاصطناعي',
                            score: metrics.aiPersonalization.overallScore,
                            color: 'text-purple-600',
                          },
                          {
                            key: 'spatial',
                            label: 'التصميم المكاني',
                            score: metrics.spatialDesign.overallScore,
                            color: 'text-orange-600',
                          },
                          {
                            key: 'voice',
                            label: 'الواجهة الصوتية',
                            score: metrics.voiceUI.overallScore,
                            color: 'text-red-600',
                          },
                          {
                            key: 'zeroui',
                            label: 'الواجهة الصفرية',
                            score: metrics.zeroUI.overallScore,
                            color: 'text-cyan-600',
                          },
                        ].map(({ key, label, score, color }) => (
                          <div key={key} className='text-center'>
                            <div className={`text-2xl font-bold ${color}`}>
                              {score}%
                            </div>
                            <p className='text-sm opacity-70'>{label}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>

                  {/* Individual Analysis Cards */}
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    {filteredResults.map((result, index) => (
                      <motion.div
                        key={result.id}
                        variants={itemVariants}
                        custom={index}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className={`rounded-3xl p-6 border backdrop-blur-xl transition-all cursor-pointer ${
                          isDarkMode
                            ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70'
                            : 'bg-white/70 border-white/30 hover:bg-white/90'
                        } ${result.gradient}`}
                      >
                        <div className='flex items-center justify-between mb-4'>
                          <div className='flex items-center space-x-3'>
                            <div
                              className={`p-3 rounded-2xl bg-gradient-to-r ${result.color} text-white shadow-lg`}
                            >
                              {result.icon}
                            </div>
                            <div>
                              <h3 className='text-lg font-bold'>
                                {result.titleAr}
                              </h3>
                              <p className='text-sm opacity-70'>
                                {result.title}
                              </p>
                            </div>
                          </div>
                          <div className='text-right'>
                            <div className='text-2xl font-bold'>
                              {result.score}%
                            </div>
                            <div
                              className={`inline-flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-semibold ${getStatusColor(result.status)}`}
                            >
                              {getStatusIcon(result.status)}
                              <span>
                                {result.status === 'excellent'
                                  ? 'ممتاز'
                                  : result.status === 'good'
                                    ? 'جيد'
                                    : result.status === 'needs-improvement'
                                      ? 'يحتاج تحسين'
                                      : 'حرج'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className='text-sm mb-4 leading-relaxed opacity-80'>
                          {language === 'ar'
                            ? result.descriptionAr
                            : result.description}
                        </p>

                        {showRecommendations &&
                          result.recommendationsAr.length > 0 && (
                            <div className='border-t border-current/10 pt-4'>
                              <h4 className='text-sm font-semibold mb-2 flex items-center space-x-2'>
                                <Star className='w-4 h-4 text-yellow-500' />
                                <span>التوصيات</span>
                              </h4>
                              <ul className='space-y-1'>
                                {(language === 'ar'
                                  ? result.recommendationsAr
                                  : result.recommendations
                                )
                                  .slice(0, 3)
                                  .map((rec, idx) => (
                                    <li
                                      key={idx}
                                      className='text-xs opacity-70 flex items-start space-x-2'
                                    >
                                      <ChevronRight className='w-3 h-3 mt-0.5 flex-shrink-0' />
                                      <span>{rec}</span>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          )}

                        <div className='flex items-center justify-between mt-4 pt-4 border-t border-current/10'>
                          <div className='flex space-x-2'>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className='p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                            >
                              <Download className='w-4 h-4' />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className='p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                            >
                              <Share2 className='w-4 h-4' />
                            </motion.button>
                          </div>
                          <div className='text-xs opacity-50'>
                            تحليل متقدم • 2024-2025
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <motion.div
                    variants={itemVariants}
                    className='flex flex-col sm:flex-row gap-4 justify-center pt-8'
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className='px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold shadow-lg flex items-center space-x-2'
                    >
                      <Download className='w-5 h-5' />
                      <span>تصدير التقرير الشامل</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setShowRecommendations(!showRecommendations)
                      }
                      className={`px-8 py-4 rounded-2xl font-semibold border-2 transition-all flex items-center space-x-2 ${
                        isDarkMode
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                          : 'border-gray-300 text-gray-700 hover:bg-white/50'
                      }`}
                    >
                      <Settings className='w-5 h-5' />
                      <span>
                        {showRecommendations
                          ? 'إخفاء التوصيات'
                          : 'إظهار التوصيات'}
                      </span>
                    </motion.button>
                  </motion.div>
                </motion.div>
              ) : !isAnalyzing ? (
                <motion.div
                  key='empty'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`text-center py-20 rounded-3xl border-2 border-dashed ${
                    isDarkMode ? 'border-gray-700' : 'border-gray-300'
                  }`}
                >
                  <div className='w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl flex items-center justify-center'>
                    <Search className='w-12 h-12 text-purple-600' />
                  </div>
                  <h3 className='text-2xl font-bold mb-3'>
                    جاهز للتحليل المتقدم
                  </h3>
                  <p className='text-lg opacity-70 max-w-md mx-auto mb-8'>
                    الصق كود التصميم في المربع المقابل واضغط "تحليل متقدم" لبدء
                    التحليل الشامل وفقاً لاتجاهات 2024-2025
                  </p>
                  <div className='flex flex-wrap justify-center gap-4'>
                    {[
                      { label: 'إمكانية الوصول WCAG 2.2', icon: Accessibility },
                      { label: 'الاستدامة البيئية', icon: Leaf },
                      { label: 'الذكاء الاصطناعي', icon: Brain },
                      { label: 'التصميم المكاني', icon: Cube },
                      { label: 'الواجهات الصوتية', icon: Mic },
                      { label: 'الحوسبة المحيطة', icon: Eye },
                    ].map(({ label, icon: Icon }) => (
                      <div
                        key={label}
                        className='flex items-center space-x-2 text-sm opacity-60'
                      >
                        <Icon className='w-4 h-4' />
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Voice Command Display */}
      <AnimatePresence>
        {isVoiceActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className='fixed bottom-8 right-8 z-50'
          >
            <div className='bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-2xl shadow-2xl max-w-xs'>
              <div className='flex items-center space-x-3 mb-2'>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className='w-3 h-3 bg-white rounded-full'
                />
                <span className='font-semibold'>مساعد صوتي نشط</span>
              </div>
              <p className='text-sm opacity-90'>
                {voiceCommand || 'قل "تحليل" لبدء التحليل...'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Preview Modal (if enabled) */}
      <AnimatePresence>
        {enable3DPreview && previewMode === '3d' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center'
            onClick={() => setPreviewMode('2d')}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className='bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-4xl w-full mx-4 max-h-[80vh] overflow-auto'
            >
              <div className='flex items-center justify-between mb-6'>
                <h3 className='text-2xl font-bold'>معاينة ثلاثية الأبعاد</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setPreviewMode('2d')}
                  className='p-2 rounded-xl bg-gray-100 dark:bg-gray-800'
                >
                  <XCircle className='w-6 h-6' />
                </motion.button>
              </div>
              <div className='h-96 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 to-pink-900 rounded-2xl flex items-center justify-center'>
                <motion.div
                  animate={{ rotateY: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className='w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl shadow-2xl'
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: 'perspective(1000px) rotateX(-10deg)',
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedAnalyzer;
