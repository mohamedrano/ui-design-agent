'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Share2,
  Download,
  Upload,
  Eye,
  Copy,
  Archive,
  Star,
  StarOff,
  Calendar,
  Clock,
  Users,
  Activity,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Folder,
  FolderOpen,
  Grid,
  List,
  SortAsc,
  SortDesc,
  Settings,
  Brain,
  Accessibility,
  Leaf,
  Cube,
  Mic,
  Palette,
  Code,
  Globe,
  Shield,
  Heart,
  Zap,
  Target,
  Award,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  ChevronRight,
  ChevronDown,
  RefreshCw,
  ExternalLink,
  BookOpen,
  Tag,
  GitBranch,
  MessageCircle,
  Bell,
  Bookmark,
} from 'lucide-react';

// Types and Interfaces
interface Project {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  status: 'planning' | 'development' | 'testing' | 'completed' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'web' | 'mobile' | 'desktop' | 'ar-vr' | 'voice' | 'ai';
  tags: string[];
  owner: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  collaborators: Array<{
    id: string;
    name: string;
    avatar: string;
    role: string;
    permissions: string[];
  }>;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  progress: number;
  isFavorite: boolean;
  isPublic: boolean;
  analytics: {
    accessibilityScore: number;
    performanceScore: number;
    sustainabilityScore: number;
    aiPersonalizationScore: number;
    spatialDesignScore: number;
    voiceUIScore: number;
    zeroUIScore: number;
    overallScore: number;
    lastAnalyzed: Date;
  };
  designTrends: {
    aiPersonalization: boolean;
    accessibility: boolean;
    spatialDesign: boolean;
    voiceUI: boolean;
    zeroUI: boolean;
    sustainableDesign: boolean;
    modernVisuals: boolean;
  };
  files: Array<{
    id: string;
    name: string;
    type: 'design' | 'code' | 'documentation' | 'asset';
    size: number;
    url: string;
    createdAt: Date;
  }>;
  comments: Array<{
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    content: string;
    createdAt: Date;
    replies: Array<{
      id: string;
      userId: string;
      userName: string;
      userAvatar: string;
      content: string;
      createdAt: Date;
    }>;
  }>;
}

interface ProjectManagerProps {
  theme?: 'light' | 'dark' | 'auto';
  language?: 'en' | 'ar';
  onProjectSelect?: (project: Project) => void;
  onProjectCreate?: (project: Partial<Project>) => void;
  onProjectUpdate?: (projectId: string, updates: Partial<Project>) => void;
  onProjectDelete?: (projectId: string) => void;
  enableCollaboration?: boolean;
  enableAnalytics?: boolean;
  enableAI?: boolean;
}

const ProjectManager: React.FC<ProjectManagerProps> = ({
  theme = 'auto',
  language = 'ar',
  onProjectSelect,
  onProjectCreate,
  onProjectUpdate,
  onProjectDelete,
  enableCollaboration = true,
  enableAnalytics = true,
  enableAI = true,
}) => {
  // State Management
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'score' | 'priority'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');
  const [isLoading, setIsLoading] = useState(true);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [draggedProject, setDraggedProject] = useState<string | null>(null);
  const [currentFolder, setCurrentFolder] = useState<string>('root');
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['root']);

  // Mock Data Generation
  const generateMockProjects = useCallback((): Project[] => {
    const mockProjects: Project[] = [
      {
        id: '1',
        name: 'E-commerce Platform Redesign',
        nameAr: 'إعادة تصميم منصة التجارة الإلكترونية',
        description: 'Complete redesign of the e-commerce platform with AI personalization',
        descriptionAr: 'إعادة تصميم شاملة لمنصة التجارة الإلكترونية مع التخصيص بالذكاء الاصطناعي',
        status: 'development',
        priority: 'high',
        category: 'web',
        tags: ['e-commerce', 'ai', 'responsive', 'accessibility'],
        owner: {
          id: 'user1',
          name: 'أحمد محمد',
          avatar: '/avatars/user1.jpg',
          role: 'Senior UX Designer'
        },
        collaborators: [
          {
            id: 'user2',
            name: 'فاطمة علي',
            avatar: '/avatars/user2.jpg',
            role: 'UI Designer',
            permissions: ['view', 'edit', 'comment']
          },
          {
            id: 'user3',
            name: 'محمد الشريف',
            avatar: '/avatars/user3.jpg',
            role: 'Developer',
            permissions: ['view', 'comment']
          }
        ],
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-02-10'),
        dueDate: new Date('2024-03-15'),
        progress: 75,
        isFavorite: true,
        isPublic: false,
        analytics: {
          accessibilityScore: 92,
          performanceScore: 88,
          sustainabilityScore: 85,
          aiPersonalizationScore: 90,
          spatialDesignScore: 45,
          voiceUIScore: 30,
          zeroUIScore: 25,
          overallScore: 79,
          lastAnalyzed: new Date('2024-02-10')
        },
        designTrends: {
          aiPersonalization: true,
          accessibility: true,
          spatialDesign: false,
          voiceUI: false,
          zeroUI: false,
          sustainableDesign: true,
          modernVisuals: true
        },
        files: [
          {
            id: 'file1',
            name: 'homepage-design.fig',
            type: 'design',
            size: 2500000,
            url: '/files/homepage-design.fig',
            createdAt: new Date('2024-01-20')
          }
        ],
        comments: [
          {
            id: 'comment1',
            userId: 'user2',
            userName: 'فاطمة علي',
            userAvatar: '/avatars/user2.jpg',
            content: 'التصميم ممتاز! هل يمكن إضافة المزيد من التفاعلات الدقيقة؟',
            createdAt: new Date('2024-02-08'),
            replies: [
              {
                id: 'reply1',
                userId: 'user1',
                userName: 'أحمد محمد',
                userAvatar: '/avatars/user1.jpg',
                content: 'بالتأكيد، سأعمل على إضافة المزيد من التأثيرات التفاعلية',
                createdAt: new Date('2024-02-08')
              }
            ]
          }
        ]
      },
      {
        id: '2',
        name: 'AR Shopping Experience',
        nameAr: 'تجربة تسوق بالواقع المعزز',
        description: 'Immersive AR shopping experience with spatial computing',
        descriptionAr: 'تجربة تسوق غامرة بالواقع المعزز مع الحوسبة المكانية',
        status: 'planning',
        priority: 'medium',
        category: 'ar-vr',
        tags: ['ar', 'spatial', 'shopping', '3d'],
        owner: {
          id: 'user2',
          name: 'فاطمة علي',
          avatar: '/avatars/user2.jpg',
          role: 'AR/VR Designer'
        },
        collaborators: [
          {
            id: 'user1',
            name: 'أحمد محمد',
            avatar: '/avatars/user1.jpg',
            role: 'Senior UX Designer',
            permissions: ['view', 'edit', 'comment']
          }
        ],
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-05'),
        dueDate: new Date('2024-04-01'),
        progress: 25,
        isFavorite: false,
        isPublic: true,
        analytics: {
          accessibilityScore: 70,
          performanceScore: 65,
          sustainabilityScore: 60,
          aiPersonalizationScore: 80,
          spatialDesignScore: 95,
          voiceUIScore: 70,
          zeroUIScore: 85,
          overallScore: 75,
          lastAnalyzed: new Date('2024-02-05')
        },
        designTrends: {
          aiPersonalization: true,
          accessibility: false,
          spatialDesign: true,
          voiceUI: true,
          zeroUI: true,
          sustainableDesign: false,
          modernVisuals: true
        },
        files: [],
        comments: []
      },
      {
        id: '3',
        name: 'Voice Assistant Dashboard',
        nameAr: 'لوحة تحكم المساعد الصوتي',
        description: 'Conversational UI for voice assistant management',
        descriptionAr: 'واجهة محادثية لإدارة المساعد الصوتي',
        status: 'testing',
        priority: 'high',
        category: 'voice',
        tags: ['voice', 'ai', 'conversation', 'dashboard'],
        owner: {
          id: 'user3',
          name: 'محمد الشريف',
          avatar: '/avatars/user3.jpg',
          role: 'Voice UI Designer'
        },
        collaborators: [],
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-02-12'),
        dueDate: new Date('2024-02-28'),
        progress: 90,
        isFavorite: true,
        isPublic: false,
        analytics: {
          accessibilityScore: 88,
          performanceScore: 90,
          sustainabilityScore: 95,
          aiPersonalizationScore: 85,
          spatialDesignScore: 20,
          voiceUIScore: 98,
          zeroUIScore: 90,
          overallScore: 81,
          lastAnalyzed: new Date('2024-02-12')
        },
        designTrends: {
          aiPersonalization: true,
          accessibility: true,
          spatialDesign: false,
          voiceUI: true,
          zeroUI: true,
          sustainableDesign: true,
          modernVisuals: true
        },
        files: [],
        comments: []
      }
    ];

    return mockProjects;
  }, []);

  // Initialize projects
  useEffect(() => {
    const mockProjects = generateMockProjects();
    setProjects(mockProjects);
    setIsLoading(false);
  }, [generateMockProjects]);

  // Theme management
  useEffect(() => {
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDarkMode(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  // Filtered and sorted projects
  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = searchQuery === '' ||
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.nameAr.includes(searchQuery) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
      const matchesCategory = filterCategory === 'all' || project.category === filterCategory;

      return matchesSearch && matchesStatus && matchesCategory;
    });

    // Sort projects
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = (language === 'ar' ? a.nameAr : a.name).localeCompare(
            language === 'ar' ? b.nameAr : b.name
          );
          break;
        case 'date':
          comparison = a.updatedAt.getTime() - b.updatedAt.getTime();
          break;
        case 'score':
          comparison = a.analytics.overallScore - b.analytics.overallScore;
          break;
        case 'priority':
          const priorityOrder = { low: 1, medium: 2, high: 3, critical: 4 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [projects, searchQuery, filterStatus, filterCategory, sortBy, sortOrder, language]);

  // Project CRUD operations
  const handleCreateProject = useCallback((projectData: Partial<Project>) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: projectData.name || 'New Project',
      nameAr: projectData.nameAr || 'مشروع جديد',
      description: projectData.description || '',
      descriptionAr: projectData.descriptionAr || '',
      status: 'planning',
      priority: 'medium',
      category: 'web',
      tags: [],
      owner: {
        id: 'current-user',
        name: 'المستخدم الحالي',
        avatar: '/avatars/current-user.jpg',
        role: 'Designer'
      },
      collaborators: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      progress: 0,
      isFavorite: false,
      isPublic: false,
      analytics: {
        accessibilityScore: 0,
        performanceScore: 0,
        sustainabilityScore: 0,
        aiPersonalizationScore: 0,
        spatialDesignScore: 0,
        voiceUIScore: 0,
        zeroUIScore: 0,
        overallScore: 0,
        lastAnalyzed: new Date()
      },
      designTrends: {
        aiPersonalization: false,
        accessibility: false,
        spatialDesign: false,
        voiceUI: false,
        zeroUI: false,
        sustainableDesign: false,
        modernVisuals: false
      },
      files: [],
      comments: [],
      ...projectData
    };

    setProjects(prev => [...prev, newProject]);
    setIsCreateModalOpen(false);

    if (onProjectCreate) {
      onProjectCreate(newProject);
    }
  }, [onProjectCreate]);

  const handleUpdateProject = useCallback((projectId: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project =>
      project.id === projectId
        ? { ...project, ...updates, updatedAt: new Date() }
        : project
    ));

    if (onProjectUpdate) {
      onProjectUpdate(projectId, updates);
    }
  }, [onProjectUpdate]);

  const handleDeleteProject = useCallback((projectId: string) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
    setIsDeleteModalOpen(false);
    setSelectedProject(null);

    if (onProjectDelete) {
      onProjectDelete(projectId);
    }
  }, [onProjectDelete]);

  const handleToggleFavorite = useCallback((projectId: string) => {
    handleUpdateProject(projectId, {
      isFavorite: !projects.find(p => p.id === projectId)?.isFavorite
    });
  }, [projects, handleUpdateProject]);

  // Drag and drop
  const handleDragStart = useCallback((projectId: string) => {
    setDraggedProject(projectId);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedProject(null);
  }, []);

  // Utility functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'development': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'testing': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';
      case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'archived': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-gray-600';
      case 'medium': return 'text-blue-600';
      case 'high': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web': return <Globe className="w-4 h-4" />;
      case 'mobile': return <Zap className="w-4 h-4" />;
      case 'desktop': return <Monitor className="w-4 h-4" />;
      case 'ar-vr': return <Cube className="w-4 h-4" />;
      case 'voice': return <Mic className="w-4 h-4" />;
      case 'ai': return <Brain className="w-4 h-4" />;
      default: return <Folder className="w-4 h-4" />;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode
        ? 'bg-gray-900 text-white'
        : 'bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-900'
    }`}>
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center"
              >
                <Folder className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  مدير المشاريع
                </h1>
                <p className="text-sm opacity-70">
                  Project Manager • {filteredProjects.length} من {projects.length} مشروع
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="بحث في المشاريع..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-2xl border transition-all focus:ring-2 focus:ring-purple-500 ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white/70 border-gray-300 text-gray-900 placeholder-gray-500'
                  } backdrop-blur-sm`}
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-white/10 rounded-2xl p-1 backdrop-blur-sm">
                {[
                  { key: 'grid', icon: Grid },
                  { key: 'list', icon: List }
                ].map(({ key, icon: Icon }) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode(key as 'grid' | 'list')}
                    className={`p-2 rounded-xl transition-all ${
                      viewMode === key
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.button>
                ))}
              </div>

              {/* Filters */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`p-3 rounded-2xl transition-all ${
                  showAdvancedFilters
                    ? 'bg-purple-600 text-white'
                    : isDarkMode
                      ? 'bg-gray-800 text-gray-300'
                      : 'bg-white/70 text-gray-700'
                } backdrop-blur-sm border border-white/20`}
              >
                <Filter className="w-5 h-5" />
              </motion.button>

              {/* Create Project */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCreateModalOpen(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold shadow-lg flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>مشروع جديد</span>
              </motion.button>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showAdvancedFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Status Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">الحالة</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className={`w-full p-2 rounded-xl border ${
                        isDarkMode
                          ? 'bg-gray-800 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="all">جميع الحالات</option>
                      <option value="planning">التخطيط</option>
                      <option value="development">التطوير</option>
                      <option value="testing">الاختبار</option>
                      <option value="completed">مكتمل</option>
                      <option value="archived">مؤرشف</option>
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">الفئة</label>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className={`w-full p-2 rounded-xl border ${
                        isDarkMode
                          ? 'bg-gray-800 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="all">جميع الفئات</option>
                      <option value="web">ويب</option>
                      <option value="mobile">جوال</option>
                      <option value="desktop">سطح المكتب</option>
                      <option value="ar-vr">واقع معزز/افتراضي</option>
                      <option value="voice">واجهة صوتية</option>
                      <option value="ai">ذكاء اصطناعي</option>
                    </select
