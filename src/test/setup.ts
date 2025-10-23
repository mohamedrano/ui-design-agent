import '@testing-library/jest-dom';
import { vi, beforeAll, afterAll, afterEach, expect } from 'vitest';
import { cleanup } from '@testing-library/react';
import { server } from './mocks/server';

// Extend Vitest's expect with jest-dom matchers
expect.extend({});

// Mock environment variables for testing
vi.mock('../lib/env', () => ({
  env: {
    NODE_ENV: 'test',
    GOOGLE_GENAI_API_KEY: 'test-key',
    OPENAI_API_KEY: 'test-key',
    ANTHROPIC_API_KEY: 'test-key',
    HUGGINGFACE_API_KEY: 'test-key',
    FIGMA_ACCESS_TOKEN: 'test-token',
    ENABLE_ANALYTICS: false,
    ENABLE_VOICE_FEATURES: false,
    ENABLE_3D_PREVIEW: false,
    ENABLE_AI_SUGGESTIONS: true,
    RATE_LIMIT_REQUESTS_PER_MINUTE: 1000,
    RATE_LIMIT_BURST_SIZE: 2000,
    CACHE_TTL_SECONDS: 3600,
    MAX_FILE_SIZE_MB: 10,
    ALLOWED_FILE_TYPES: 'image/*,text/*,.fig,.sketch,.xd',
    CORS_ORIGINS: '*',
    SKIP_ENV_VALIDATION: true,
  },
  isDevelopment: false,
  isProduction: false,
  isTest: true,
  features: {
    analytics: false,
    voice: false,
    preview3D: false,
    aiSuggestions: true,
  },
  apiConfig: {
    rateLimit: {
      requestsPerMinute: 1000,
      burstSize: 2000,
    },
    cache: {
      ttlSeconds: 3600,
      redisUrl: undefined,
    },
    upload: {
      maxFileSizeMB: 10,
      allowedTypes: ['image/*', 'text/*', '.fig', '.sketch', '.xd'],
    },
    cors: {
      origins: true,
    },
  },
}));

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
    getAll: vi.fn(),
    has: vi.fn(),
    keys: vi.fn(),
    values: vi.fn(),
    entries: vi.fn(),
    forEach: vi.fn(),
    toString: vi.fn(() => ''),
  }),
  usePathname: () => '/',
}));

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  },
}));

// Mock Framer Motion for testing
vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (target, prop) => {
        const Component = ({ children, ...props }: any) => {
          return <div {...props}>{children}</div>;
        };
        return Component;
      },
    }
  ),
  AnimatePresence: ({ children }: any) => children,
  useInView: () => true,
  useAnimation: () => ({
    start: vi.fn(),
    stop: vi.fn(),
    set: vi.fn(),
  }),
  useMotionValue: () => ({
    get: vi.fn(),
    set: vi.fn(),
    onChange: vi.fn(),
  }),
}));

// Mock Web APIs that might not be available in jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock Web Speech API
Object.defineProperty(window, 'webkitSpeechRecognition', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    start: vi.fn(),
    stop: vi.fn(),
    abort: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    continuous: true,
    interimResults: true,
    lang: 'en-US',
    onresult: vi.fn(),
    onerror: vi.fn(),
    onend: vi.fn(),
  })),
});

// Mock Speech Synthesis
Object.defineProperty(window, 'speechSynthesis', {
  writable: true,
  value: {
    speak: vi.fn(),
    cancel: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    getVoices: vi.fn(() => []),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  },
});

// Mock File API
global.File = class MockFile {
  constructor(
    public chunks: BlobPart[],
    public name: string,
    public options: FilePropertyBag = {}
  ) {}

  get size() {
    return this.chunks.reduce((size, chunk) => {
      if (typeof chunk === 'string') return size + chunk.length;
      if (chunk instanceof ArrayBuffer) return size + chunk.byteLength;
      return size + chunk.size;
    }, 0);
  }

  get type() {
    return this.options.type || '';
  }

  get lastModified() {
    return this.options.lastModified || Date.now();
  }
};

// Mock FileReader
global.FileReader = class MockFileReader {
  result: string | ArrayBuffer | null = null;
  error: DOMException | null = null;
  readyState: number = 0;
  onload: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null = null;
  onerror: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null = null;
  onloadend: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null = null;

  readAsDataURL(file: Blob) {
    setTimeout(() => {
      this.result = `data:${file.type};base64,mock-base64-data`;
      this.readyState = 2;
      if (this.onload) {
        this.onload({} as ProgressEvent<FileReader>);
      }
      if (this.onloadend) {
        this.onloadend({} as ProgressEvent<FileReader>);
      }
    }, 0);
  }

  readAsText(file: Blob) {
    setTimeout(() => {
      this.result = 'mock file content';
      this.readyState = 2;
      if (this.onload) {
        this.onload({} as ProgressEvent<FileReader>);
      }
      if (this.onloadend) {
        this.onloadend({} as ProgressEvent<FileReader>);
      }
    }, 0);
  }

  abort() {
    this.readyState = 2;
  }

  addEventListener() {}
  removeEventListener() {}
  dispatchEvent() {
    return true;
  }
} as any;

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock sessionStorage
Object.defineProperty(window, 'sessionStorage', {
  value: localStorageMock,
});

// Mock URL.createObjectURL
global.URL.createObjectURL = vi.fn(() => 'mock-object-url');
global.URL.revokeObjectURL = vi.fn();

// Mock performance API
Object.defineProperty(window, 'performance', {
  value: {
    now: vi.fn(() => Date.now()),
    mark: vi.fn(),
    measure: vi.fn(),
    getEntriesByName: vi.fn(() => []),
    getEntriesByType: vi.fn(() => []),
  },
});

// Mock crypto API
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: () => 'mock-uuid-' + Math.random().toString(36).substr(2, 9),
    getRandomValues: (array: any) => {
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
      return array;
    },
  },
});

// Mock console methods to reduce noise in tests
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeAll(() => {
  // Start MSW server
  server.listen({ onUnhandledRequest: 'error' });

  // Suppress console errors/warnings in tests unless explicitly needed
  console.error = vi.fn((message, ...args) => {
    // Allow specific error messages through
    if (typeof message === 'string' &&
        (message.includes('Warning') ||
         message.includes('Error') ||
         message.includes('Failed'))) {
      return;
    }
    originalConsoleError(message, ...args);
  });

  console.warn = vi.fn((message, ...args) => {
    // Allow specific warning messages through
    if (typeof message === 'string' && message.includes('Warning')) {
      return;
    }
    originalConsoleWarn(message, ...args);
  });
});

afterEach(() => {
  // Clean up DOM
  cleanup();

  // Reset MSW handlers
  server.resetHandlers();

  // Clear all mocks
  vi.clearAllMocks();

  // Clear localStorage/sessionStorage
  localStorageMock.clear();
});

afterAll(() => {
  // Clean up MSW server
  server.close();

  // Restore console methods
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});

// Custom render function with providers
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

// Test utilities
export const createMockFile = (
  name: string,
  content: string,
  type: string = 'text/plain'
): File => {
  return new File([content], name, { type });
};

export const createMockImage = (
  name: string = 'test.jpg',
  width: number = 100,
  height: number = 100
): File => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(0, 0, width, height);
  }

  return new Promise<File>((resolve) => {
    canvas.toBlob((blob) => {
      resolve(new File([blob!], name, { type: 'image/jpeg' }));
    }, 'image/jpeg');
  }) as any;
};

export const waitForLoadingToFinish = () => {
  return new Promise(resolve => setTimeout(resolve, 0));
};

// Mock successful API responses
export const mockApiResponse = (data: any, status = 200) => {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => data,
    text: async () => JSON.stringify(data),
  };
};

// Mock error API responses
export const mockApiError = (message: string, status = 500) => {
  return {
    ok: false,
    status,
    json: async () => ({ error: message }),
    text: async () => JSON.stringify({ error: message }),
  };
};

// Global test timeout
vi.setConfig({
  testTimeout: 10000,
  hookTimeout: 10000,
});
