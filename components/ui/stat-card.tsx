import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  iconColor?: string
  trend?: string
  trendUp?: boolean
  alert?: boolean
  className?: string
  onClick?: () => void
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-primary',
  trend,
  trendUp,
  alert,
  className,
  onClick,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border bg-card p-5 shadow-sm transition-all duration-200 min-h-28',
        alert ? 'border-yellow-500/40 bg-yellow-50' : 'border-border',
        onClick && 'cursor-pointer hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(event) => {
        if (!onClick) return
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onClick()
        }
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-muted-foreground leading-tight mb-3">
            {title}
          </p>
          <p className={cn('text-3xl font-bold leading-none', alert ? 'text-yellow-600' : 'text-foreground')}>
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
          {trend && (
            <p
              className={cn(
                'text-xs font-medium mt-1',
                trendUp ? 'text-emerald-600' : alert ? 'text-yellow-600' : 'text-muted-foreground'
              )}
            >
              {trendUp ? 'Up ' : ''}{trend}
            </p>
          )}
        </div>
        <div
          className={cn(
            'rounded-lg p-2.5 shrink-0 ml-3',
            alert ? 'bg-yellow-100 text-yellow-700' : cn('bg-muted/70 ring-1 ring-border/60', iconColor)
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}
