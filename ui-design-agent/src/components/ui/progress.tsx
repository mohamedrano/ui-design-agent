import * as React from 'react'
import { cn } from '@/lib/utils'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'error'
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, size = 'md', variant = 'default', ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    
    const sizeClasses = {
      sm: 'h-2',
      md: 'h-3',
      lg: 'h-4',
    }
    
    const variantClasses = {
      default: 'bg-primary',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      error: 'bg-red-500',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full overflow-hidden rounded-full bg-secondary',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'h-full w-full flex-1 transition-all duration-300 ease-in-out',
            variantClasses[variant]
          )}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </div>
    )
  }
)
Progress.displayName = 'Progress'

const ProgressLabel: React.FC<{
  value: number
  max?: number
  className?: string
}> = ({ value, max = 100, className }) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  
  return (
    <span className={cn('text-sm font-medium text-muted-foreground', className)}>
      {Math.round(percentage)}%
    </span>
  )
}

const ProgressWithLabel: React.FC<ProgressProps & {
  showLabel?: boolean
  labelPosition?: 'top' | 'bottom' | 'left' | 'right'
}> = ({ 
  showLabel = true, 
  labelPosition = 'top', 
  className, 
  ...props 
}) => {
  const { value = 0, max = 100 } = props
  
  return (
    <div className={cn('space-y-2', className)}>
      {showLabel && labelPosition === 'top' && (
        <div className="flex justify-between">
          <span className="text-sm font-medium">Progress</span>
          <ProgressLabel value={value} max={max} />
        </div>
      )}
      
      <Progress {...props} />
      
      {showLabel && labelPosition === 'bottom' && (
        <div className="flex justify-between">
          <span className="text-sm font-medium">Progress</span>
          <ProgressLabel value={value} max={max} />
        </div>
      )}
    </div>
  )
}

export { Progress, ProgressLabel, ProgressWithLabel }
