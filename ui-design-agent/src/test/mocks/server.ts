import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

// Mock data for testing
const mockAnalysisResult = {
  id: 'analysis-1',
  accessibility_score: 92,
  performance_score: 88,
  sustainability_score: 85,
  user_experience_score: 90,
  ai_personalization_potential: 87,
  spatial_design_readiness: 45,
  voice_ui_compatibility: 32,
  gesture_support_level: 28,
  zero_ui_potential: 25,
  recommendations: [
    'Add more ARIA labels for better screen reader support',
    'Optimize images for better performance',
    'Implement lazy loading for non-critical resources',
    'Add voice command support for accessibility'
  ],
  trends_compliance: {
    ai_driven_design: true,
    interactive_3d: false,
    voice_gesture_control: false,
    accessibility_first: true,
    sustainable_design: true,
    spatial_computing: false
  }
};

const mockProject = {
  id: 'project-1',
  name: 'E-commerce Platform Redesign',
  nameAr: 'إعادة تصميم منصة التجارة الإلكترونية',
  description: 'Complete redesign of the e-commerce platform with AI personalization',
  descriptionAr: 'إعادة تصميم شاملة لمنصة التجارة الإلكترونية مع التخصيص بالذكاء الاصطناعي',
  status: 'development',
  priority: 'high',
  category: 'web',
  tags: ['e-commerce', 'ai', 'responsive', 'accessibility'],
  progress: 75,
  isFavorite: true,
  createdAt: new Date('2024-01-15').toISOString(),
  updatedAt: new Date('2024-02-10').toISOString(),
  analytics: mockAnalysisResult
};

const mockDesignTrends = [
  {
    id: 'ai-personalization',
    title: 'AI Personalization',
    titleAr: 'التخصيص بالذكاء الاصطناعي',
    description: 'Intelligent adaptive interfaces that learn from user behavior',
    descriptionAr: 'واجهات تكيفية ذكية تتعلم من سلوك المستخدم',
    implemented: true,
    score: 90
  },
  {
    id: 'accessibility-first',
    title: 'Accessibility First',
    titleAr: 'إمكانية الوصول أولاً',
    description: 'WCAG 2.2 compliant inclusive design for everyone',
    descriptionAr: 'تصميم شامل متوافق مع معايير WCAG 2.2 للجميع',
    implemented: true,
    score: 92
  },
  {
    id: 'spatial-design',
    title: 'Spatial Computing',
    titleAr: 'الحوسبة المكانية',
    description: '3D interactions optimized for Apple Vision Pro',
    descriptionAr: 'تفاعلات ثلاثية الأبعاد محسنة لـ Apple Vision Pro',
    implemented: false,
    score: 45
  }
];

// API handlers
export const handlers = [
  // Health check endpoint
  http.get('/api/health', () => {
    return HttpResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  }),

  // Design analysis endpoints
  http.post('/api/analyze/component', async ({ request }) => {
    const body = await request.json();

    if (!body || typeof body !== 'object') {
      return HttpResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Simulate analysis processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    return HttpResponse.json({
      success: true,
      analysis: mockAnalysisResult,
      timestamp: new Date().toISOString()
    });
  }),

  http.post('/api/analyze/accessibility', async ({ request }) => {
    const body = await request.json();

    return HttpResponse.json({
      success: true,
      wcag_level: 'AA',
      score: 92,
      issues: [
        {
          type: 'contrast',
          severity: 'medium',
          message: 'Low contrast ratio on secondary text',
          element: '.secondary-text',
          recommendation: 'Increase contrast ratio to at least 4.5:1'
        }
      ],
      recommendations: [
        'Add more ARIA labels',
        'Improve keyboard navigation',
        'Enhance focus indicators'
      ]
    });
  }),

  http.post('/api/analyze/performance', async ({ request }) => {
    return HttpResponse.json({
      success: true,
      metrics: {
        loading_speed: 1.2,
        carbon_footprint: 0.15,
        energy_efficiency: 88,
        mobile_optimization: 85
      },
      recommendations: [
        'Optimize images',
        'Enable compression',
        'Use CDN'
      ]
    });
  }),

  // AI service endpoints
  http.post('/api/ai/generate', async ({ request }) => {
    const body = await request.json();

    // Simulate different AI responses based on request type
    const responses = {
      'component': `
// Generated React component
import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={\`px-4 py-2 rounded-lg font-semibold transition-all \${
        variant === 'primary'
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      }\`}
      onClick={onClick}
      aria-label={typeof children === 'string' ? children : 'Button'}
    >
      {children}
    </motion.button>
  );
};
      `,
      'analysis': 'This design shows good accessibility practices with proper ARIA labels and semantic HTML structure.',
      'suggestion': 'Consider adding micro-interactions to enhance user engagement and provide better feedback.'
    };

    return HttpResponse.json({
      success: true,
      content: responses[body.type as keyof typeof responses] || responses.suggestion,
      model: 'gpt-4',
      tokens_used: 150
    });
  }),

  // Design trends endpoints
  http.get('/api/trends', () => {
    return HttpResponse.json({
      success: true,
      trends: mockDesignTrends,
      last_updated: new Date().toISOString()
    });
  }),

  http.get('/api/trends/:trendId', ({ params }) => {
    const trend = mockDesignTrends.find(t => t.id === params.trendId);

    if (!trend) {
      return HttpResponse.json(
        { error: 'Trend not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      success: true,
      trend,
      examples: [
        {
          title: 'Example Implementation',
          description: 'How to implement this trend effectively',
          code: '// Example code here',
          image: '/mock-image.jpg'
        }
      ]
    });
  }),

  // Project management endpoints
  http.get('/api/projects', () => {
    return HttpResponse.json({
      success: true,
      projects: [mockProject],
      total: 1,
      page: 1,
      per_page: 20
    });
  }),

  http.get('/api/projects/:projectId', ({ params }) => {
    if (params.projectId === 'project-1') {
      return HttpResponse.json({
        success: true,
        project: mockProject
      });
    }

    return HttpResponse.json(
      { error: 'Project not found' },
      { status: 404 }
    );
  }),

  http.post('/api/projects', async ({ request }) => {
    const body = await request.json();

    const newProject = {
      ...mockProject,
      id: 'project-' + Date.now(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return HttpResponse.json({
      success: true,
      project: newProject
    }, { status: 201 });
  }),

  http.put('/api/projects/:projectId', async ({ params, request }) => {
    const body = await request.json();

    const updatedProject = {
      ...mockProject,
      id: params.projectId,
      ...body,
      updatedAt: new Date().toISOString()
    };

    return HttpResponse.json({
      success: true,
      project: updatedProject
    });
  }),

  http.delete('/api/projects/:projectId', ({ params }) => {
    return HttpResponse.json({
      success: true,
      message: `Project ${params.projectId} deleted successfully`
    });
  }),

  // File upload endpoints
  http.post('/api/upload', async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return HttpResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return HttpResponse.json(
        { error: 'File too large. Maximum size is 10MB' },
        { status: 413 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/', 'text/', '.fig', '.sketch', '.xd'];
    const isValidType = allowedTypes.some(type =>
      file.type.startsWith(type) || file.name.endsWith(type.replace('.', ''))
    );

    if (!isValidType) {
      return HttpResponse.json(
        { error: 'Invalid file type' },
        { status: 415 }
      );
    }

    return HttpResponse.json({
      success: true,
      file: {
        id: 'file-' + Date.now(),
        name: file.name,
        size: file.size,
        type: file.type,
        url: `/uploads/${file.name}`,
        uploaded_at: new Date().toISOString()
      }
    });
  }),

  // Design system endpoints
  http.get('/api/design-system/components', () => {
    return HttpResponse.json({
      success: true,
      components: [
        {
          id: 'button',
          name: 'Button',
          category: 'Form',
          variants: ['primary', 'secondary', 'outline'],
          props: [
            { name: 'children', type: 'ReactNode', required: true },
            { name: 'variant', type: 'string', default: 'primary' },
            { name: 'onClick', type: 'function' }
          ]
        },
        {
          id: 'input',
          name: 'Input',
          category: 'Form',
          variants: ['default', 'error', 'success'],
          props: [
            { name: 'value', type: 'string' },
            { name: 'placeholder', type: 'string' },
            { name: 'onChange', type: 'function' }
          ]
        }
      ]
    });
  }),

  // Voice UI endpoints
  http.post('/api/voice/synthesize', async ({ request }) => {
    const body = await request.json();

    return HttpResponse.json({
      success: true,
      audio_url: '/mock-audio.mp3',
      duration: 2.5,
      language: body.language || 'en-US',
      voice: body.voice || 'default'
    });
  }),

  http.post('/api/voice/recognize', async ({ request }) => {
    return HttpResponse.json({
      success: true,
      transcript: 'تحليل هذا التصميم',
      confidence: 0.95,
      language: 'ar-SA'
    });
  }),

  // Analytics endpoints
  http.get('/api/analytics/dashboard', () => {
    return HttpResponse.json({
      success: true,
      metrics: {
        total_projects: 25,
        active_projects: 8,
        completed_projects: 17,
        avg_accessibility_score: 87.5,
        avg_performance_score: 84.2,
        total_analyses: 156,
        trends_adoption: {
          'ai_personalization': 78,
          'accessibility_first': 92,
          'spatial_design': 34,
          'voice_ui': 23,
          'sustainable_design': 67
        }
      },
      period: '30d'
    });
  }),

  // Error simulation endpoints for testing error handling
  http.get('/api/error/500', () => {
    return HttpResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }),

  http.get('/api/error/404', () => {
    return HttpResponse.json(
      { error: 'Not found' },
      { status: 404 }
    );
  }),

  http.get('/api/error/403', () => {
    return HttpResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    );
  }),

  // Rate limit simulation
  http.get('/api/error/429', () => {
    return HttpResponse.json(
      {
        error: 'Rate limit exceeded',
        retry_after: 60
      },
      {
        status: 429,
        headers: {
          'Retry-After': '60'
        }
      }
    );
  }),

  // Timeout simulation
  http.get('/api/slow', async () => {
    await new Promise(resolve => setTimeout(resolve, 5000));
    return HttpResponse.json({ message: 'Slow response' });
  }),

  // Figma integration endpoints
  http.get('https://api.figma.com/v1/files/:fileId', ({ params }) => {
    return HttpResponse.json({
      name: 'Design System',
      lastModified: new Date().toISOString(),
      thumbnailUrl: '/mock-thumbnail.jpg',
      version: '1.2.3',
      document: {
        id: params.fileId,
        name: 'Page 1',
        type: 'DOCUMENT',
        children: []
      }
    });
  }),

  // External AI service mocks
  http.post('https://api.openai.com/v1/chat/completions', async ({ request }) => {
    const body = await request.json();

    return HttpResponse.json({
      id: 'chatcmpl-mock',
      object: 'chat.completion',
      created: Date.now(),
      model: 'gpt-4',
      choices: [{
        index: 0,
        message: {
          role: 'assistant',
          content: 'This is a mock response for OpenAI API'
        },
        finish_reason: 'stop'
      }],
      usage: {
        prompt_tokens: 10,
        completion_tokens: 20,
        total_tokens: 30
      }
    });
  }),

  http.post('https://api.anthropic.com/v1/messages', async () => {
    return HttpResponse.json({
      id: 'msg-mock',
      type: 'message',
      role: 'assistant',
      content: [{
        type: 'text',
        text: 'This is a mock response from Claude'
      }],
      model: 'claude-3-sonnet-20240229',
      stop_reason: 'end_turn',
      usage: {
        input_tokens: 15,
        output_tokens: 25
      }
    });
  }),

  // Default handler for unmatched requests
  http.all('*', ({ request }) => {
    console.warn(`Unhandled ${request.method} request to ${request.url}`);
    return HttpResponse.json(
      { error: `Unhandled request: ${request.method} ${request.url}` },
      { status: 404 }
    );
  })
];

// Create and configure the server
export const server = setupServer(...handlers);

// Server event listeners for debugging
server.events.on('request:start', ({ request }) => {
  console.log(`MSW intercepted: ${request.method} ${request.url}`);
});

server.events.on('request:match', ({ request }) => {
  console.log(`MSW matched: ${request.method} ${request.url}`);
});

server.events.on('request:unhandled', ({ request }) => {
  console.warn(`MSW unhandled: ${request.method} ${request.url}`);
});
