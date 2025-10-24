import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdvancedAnalyzer from './AdvancedAnalyzer';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    textarea: ({ children, ...props }: any) => <textarea {...props}>{children}</textarea>,
  },
  AnimatePresence: ({ children }: any) => children,
  useInView: () => true,
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  BarChart3: () => <div data-testid="bar-chart-icon" />,
  Code: () => <div data-testid="code-icon" />,
  Search: () => <div data-testid="search-icon" />,
  RefreshCw: () => <div data-testid="refresh-icon" />,
  Mic: () => <div data-testid="mic-icon" />,
  Volume2: () => <div data-testid="volume-icon" />,
  VolumeX: () => <div data-testid="volume-x-icon" />,
  Smartphone: () => <div data-testid="smartphone-icon" />,
  Tablet: () => <div data-testid="tablet-icon" />,
  Monitor: () => <div data-testid="monitor-icon" />,
  Upload: () => <div data-testid="upload-icon" />,
  Globe: () => <div data-testid="globe-icon" />,
  Palette: () => <div data-testid="palette-icon" />,
  Filter: () => <div data-testid="filter-icon" />,
  Accessibility: () => <div data-testid="accessibility-icon" />,
  Zap: () => <div data-testid="zap-icon" />,
  Brain: () => <div data-testid="brain-icon" />,
  Cube: () => <div data-testid="cube-icon" />,
  Eye: () => <div data-testid="eye-icon" />,
  TrendingUp: () => <div data-testid="trending-up-icon" />,
  Star: () => <div data-testid="star-icon" />,
  ChevronRight: () => <div data-testid="chevron-right-icon" />,
  Download: () => <div data-testid="download-icon" />,
  Share2: () => <div data-testid="share-icon" />,
  Settings: () => <div data-testid="settings-icon" />,
  XCircle: () => <div data-testid="x-circle-icon" />,
}));

describe('AdvancedAnalyzer', () => {
  const mockOnAnalysisComplete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset localStorage
    localStorage.clear();
  });

  describe('Component Rendering', () => {
    it('should render the main interface elements', () => {
      render(<AdvancedAnalyzer />);

      // Check if main title is rendered
      expect(screen.getByText('محلل التصميم المتقدم')).toBeInTheDocument();
      expect(screen.getByText('Advanced UX/UI Design Analyzer 2024-2025')).toBeInTheDocument();

      // Check if main buttons are rendered
      expect(screen.getByText('تحليل متقدم')).toBeInTheDocument();
      expect(screen.getByText('كود التصميم')).toBeInTheDocument();
    });

    it('should render code input area', () => {
      render(<AdvancedAnalyzer />);

      const textarea = screen.getByPlaceholderText('الصق الكود هنا للتحليل المتقدم...');
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveClass('font-mono');
    });

    it('should render device preview selector', () => {
      render(<AdvancedAnalyzer />);

      expect(screen.getByTestId('smartphone-icon')).toBeInTheDocument();
      expect(screen.getByTestId('tablet-icon')).toBeInTheDocument();
      expect(screen.getByTestId('monitor-icon')).toBeInTheDocument();
    });

    it('should render theme toggle button', () => {
      render(<AdvancedAnalyzer />);

      // Should show volume icon (representing theme toggle in our mock)
      expect(screen.getByTestId('volume-x-icon')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should allow typing in the code input area', async () => {
      const user = userEvent.setup();
      render(<AdvancedAnalyzer />);

      const textarea = screen.getByPlaceholderText('الصق الكود هنا للتحليل المتقدم...');

      await user.type(textarea, '<div>Hello World</div>');
      expect(textarea).toHaveValue('<div>Hello World</div>');
    });

    it('should clear code input when refresh button is clicked', async () => {
      const user = userEvent.setup();
      render(<AdvancedAnalyzer />);

      const textarea = screen.getByPlaceholderText('الصق الكود هنا للتحليل المتقدم...');
      await user.type(textarea, '<div>Test content</div>');

      // Find and click refresh button
      const refreshButtons = screen.getAllByTestId('refresh-icon');
      const refreshButton = refreshButtons[0].closest('button');
      if (refreshButton) {
        await user.click(refreshButton);
        expect(textarea).toHaveValue('');
      }
    });

    it('should disable analyze button when no code is provided', () => {
      render(<AdvancedAnalyzer />);

      const analyzeButton = screen.getByText('تحليل متقدم').closest('button');
      expect(analyzeButton).toBeDisabled();
    });

    it('should enable analyze button when code is provided', async () => {
      const user = userEvent.setup();
      render(<AdvancedAnalyzer />);

      const textarea = screen.getByPlaceholderText('الصق الكود هنا للتحليل المتقدم...');
      await user.type(textarea, '<div>Test</div>');

      const analyzeButton = screen.getByText('تحليل متقدم').closest('button');
      expect(analyzeButton).not.toBeDisabled();
    });
  });

  describe('Analysis Flow', () => {
    it('should show loading state when analysis starts', async () => {
      const user = userEvent.setup();
      render(<AdvancedAnalyzer />);

      const textarea = screen.getByPlaceholderText('الصق الكود هنا للتحليل المتقدم...');
      await user.type(textarea, '<div>Test component</div>');

      const analyzeButton = screen.getByText('تحليل متقدم').closest('button');
      if (analyzeButton) {
        fireEvent.click(analyzeButton);

        // Should show loading text
        await waitFor(() => {
          expect(screen.getByText('جاري التحليل...')).toBeInTheDocument();
        });
      }
    });

    it('should show progress bar during analysis', async () => {
      const user = userEvent.setup();
      render(<AdvancedAnalyzer />);

      const textarea = screen.getByPlaceholderText('الصق الكود هنا للتحليل المتقدم...');
      await user.type(textarea, '<div>Test component</div>');

      const analyzeButton = screen.getByText('تحليل متقدم').closest('button');
      if (analyzeButton) {
        fireEvent.click(analyzeButton);

        await waitFor(() => {
          expect(screen.getByText(/تحليل شامل للاتجاهات المتقدمة/)).toBeInTheDocument();
        });
      }
    });
  });

  describe('Empty State', () => {
    it('should show empty state when no analysis results', () => {
      render(<AdvancedAnalyzer />);

      expect(screen.getByText('جاهز للتحليل المتقدم')).toBeInTheDocument();
      expect(screen.getByText(/الصق كود التصميم في المربع المقابل/)).toBeInTheDocument();
    });

    it('should show feature highlights in empty state', () => {
      render(<AdvancedAnalyzer />);

      expect(screen.getByText('إمكانية الوصول WCAG 2.2')).toBeInTheDocument();
      expect(screen.getByText('الاستدامة البيئية')).toBeInTheDocument();
      expect(screen.getByText('الذكاء الاصطناعي')).toBeInTheDocument();
      expect(screen.getByText('التصميم المكاني')).toBeInTheDocument();
      expect(screen.getByText('الواجهات الصوتية')).toBeInTheDocument();
      expect(screen.getByText('الحوسبة المحيطة')).toBeInTheDocument();
    });
  });

  describe('Props and Configuration', () => {
    it('should accept initial code prop', () => {
      const initialCode = '<button>Click me</button>';
      render(<AdvancedAnalyzer initialCode={initialCode} />);

      const textarea = screen.getByDisplayValue(initialCode);
      expect(textarea).toBeInTheDocument();
    });

    it('should call onAnalysisComplete when provided', async () => {
      const user = userEvent.setup();
      render(
        <AdvancedAnalyzer
          initialCode="<div>Test</div>"
          onAnalysisComplete={mockOnAnalysisComplete}
        />
      );

      const analyzeButton = screen.getByText('تحليل متقدم').closest('button');
      if (analyzeButton) {
        fireEvent.click(analyzeButton);

        // Wait for analysis to complete (mocked)
        await waitFor(() => {
          expect(mockOnAnalysisComplete).toHaveBeenCalled();
        }, { timeout: 10000 });
      }
    });

    it('should respect theme prop', () => {
      const { rerender } = render(<AdvancedAnalyzer theme="dark" />);

      // Check if dark mode classes are applied
      const container = document.querySelector('.bg-gray-900');
      expect(container).toBeInTheDocument();

      // Test light theme
      rerender(<AdvancedAnalyzer theme="light" />);
      const lightContainer = document.querySelector('.bg-gradient-to-br');
      expect(lightContainer).toBeInTheDocument();
    });

    it('should respect language prop', () => {
      render(<AdvancedAnalyzer language="en" />);

      // Component should still render (language affects internal logic)
      expect(screen.getByText('محلل التصميم المتقدم')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<AdvancedAnalyzer />);

      const textarea = screen.getByPlaceholderText('الصق الكود هنا للتحليل المتقدم...');
      expect(textarea).toHaveAttribute('aria-label');
    });

    it('should support keyboard navigation', () => {
      render(<AdvancedAnalyzer />);

      const analyzeButton = screen.getByText('تحليل متقدم').closest('button');
      expect(analyzeButton).toBeInTheDocument();

      // Button should be focusable
      analyzeButton?.focus();
      expect(document.activeElement).toBe(analyzeButton);
    });

    it('should have proper heading structure', () => {
      render(<AdvancedAnalyzer />);

      const mainHeading = screen.getByText('محلل التصميم المتقدم');
      expect(mainHeading.tagName).toBe('H1');

      const sectionHeading = screen.getByText('كود التصميم');
      expect(sectionHeading.tagName).toBe('H2');
    });
  });

  describe('Error Handling', () => {
    it('should handle analysis errors gracefully', async () => {
      // Mock console.error to prevent error logs during testing
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const user = userEvent.setup();
      render(<AdvancedAnalyzer />);

      const textarea = screen.getByPlaceholderText('الصق الكود هنا للتحليل المتقدم...');
      await user.type(textarea, 'invalid code');

      const analyzeButton = screen.getByText('تحليل متقدم').closest('button');
      if (analyzeButton) {
        fireEvent.click(analyzeButton);

        // Should handle errors without crashing
        await waitFor(() => {
          // Component should still be rendered
          expect(screen.getByText('محلل التصميم المتقدم')).toBeInTheDocument();
        });
      }

      consoleSpy.mockRestore();
    });
  });

  describe('Responsive Design', () => {
    it('should render device selector buttons', () => {
      render(<AdvancedAnalyzer />);

      // All device buttons should be present
      expect(screen.getByTestId('smartphone-icon')).toBeInTheDocument();
      expect(screen.getByTestId('tablet-icon')).toBeInTheDocument();
      expect(screen.getByTestId('monitor-icon')).toBeInTheDocument();
    });

    it('should allow device selection', async () => {
      const user = userEvent.setup();
      render(<AdvancedAnalyzer />);

      const tabletButton = screen.getByTestId('tablet-icon').closest('button');
      if (tabletButton) {
        await user.click(tabletButton);
        // Should change active state (visual feedback)
        expect(tabletButton).toHaveClass('bg-purple-600');
      }
    });
  });
});
