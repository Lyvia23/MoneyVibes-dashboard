export interface StatsCardData {
  id: string
  title: string
  value: string | number
  subtitle: string
  icon: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  iconColor?: string
  iconBg?: string
}

export interface CotisationData {
  month: string
  value: number
  date: string
}

export interface PretStatusData {
  name: string
  value: number
  color: string
  count: number
}

export interface NotificationData {
  id: string
  type: 'error' | 'warning' | 'info' | 'success'
  title: string
  message: string
  action: string
  actionUrl?: string
  createdAt: string
  isRead: boolean
}

export interface DashboardData {
  stats: StatsCardData[]
  cotisations: CotisationData[]
  pretsStatus: PretStatusData[]
  notifications: NotificationData[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
  }
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}
export interface TooltipPayload {
  name: string
  count: number
  value: number
  payload: PretStatusData
}