import { cn } from '@/lib/utils'

type StatusBadgeProps = {
  status: string
  className?: string
}

const statusMap: Record<string, string> = {
  // Project statuses
  New: 'bg-blue-50 text-blue-700 border-blue-200',
  Matched: 'bg-violet-50 text-violet-700 border-violet-200',
  'Proposal Received': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  Awarded: 'bg-orange-50 text-orange-700 border-orange-200',
  'In Progress': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  Delivered: 'bg-green-50 text-green-700 border-green-200',
  Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  // Approval
  approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
  // Subscription
  active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  inactive: 'bg-zinc-100 text-zinc-700 border-zinc-200',
  trial: 'bg-blue-50 text-blue-700 border-blue-200',
  past_due: 'bg-red-50 text-red-700 border-red-200',
  // Company
  verified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  suspended: 'bg-red-50 text-red-700 border-red-200',
  // Plans
  pro: 'bg-orange-50 text-orange-700 border-orange-200',
  basic: 'bg-blue-50 text-blue-700 border-blue-200',
  none: 'bg-zinc-100 text-zinc-700 border-zinc-200',
  // Proposal
  submitted: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  selected: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  declined: 'bg-red-50 text-red-700 border-red-200',
  // Urgency
  Normal: 'bg-blue-50 text-blue-700 border-blue-200',
  Rush: 'bg-orange-50 text-orange-700 border-orange-200',
  'Critical field deadline': 'bg-red-50 text-red-700 border-red-200',
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const styles = statusMap[status] ?? 'bg-zinc-100 text-zinc-700 border-zinc-200'
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        styles,
        className
      )}
    >
      {status}
    </span>
  )
}
