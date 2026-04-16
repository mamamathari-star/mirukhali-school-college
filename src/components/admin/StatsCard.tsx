import { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  trend?: 'up' | 'down' | 'neutral'
  color?: 'blue' | 'green' | 'amber' | 'red' | 'purple'
}

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-600',
  amber: 'bg-amber-50 text-amber-600',
  red: 'bg-red-50 text-red-600',
  purple: 'bg-purple-50 text-purple-600',
}

export function StatsCard({ title, value, icon: Icon, description, color = 'blue' }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={cn('p-3 rounded-xl', colorClasses[color])}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-500 truncate">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
