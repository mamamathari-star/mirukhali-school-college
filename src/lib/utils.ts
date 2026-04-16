import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string | null | undefined, fmt = 'dd MMM yyyy'): string {
  if (!date) return 'N/A'
  return format(new Date(date), fmt)
}

export function formatDateTime(date: Date | string | null | undefined): string {
  if (!date) return 'N/A'
  return format(new Date(date), 'dd MMM yyyy HH:mm')
}

export function truncate(str: string, maxLength = 100): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength) + '...'
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function gradeFromGpa(gpa: number): string {
  if (gpa >= 5.0) return 'A+'
  if (gpa >= 4.0) return 'A'
  if (gpa >= 3.5) return 'A-'
  if (gpa >= 3.0) return 'B'
  if (gpa >= 2.0) return 'C'
  if (gpa >= 1.0) return 'D'
  return 'F'
}
