'use client'
import { useState, useEffect } from 'react'
import { Check, X, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/admin/DataTable'
import { PageHeader } from '@/components/admin/PageHeader'
import { useToast } from '@/components/ui/use-toast'
import { formatDate } from '@/lib/utils'

export default function AdminAdmissionsPage() {
  const { toast } = useToast()
  const [admissions, setAdmissions] = useState<any[]>([])

  const fetchAdmissions = async () => { const res = await fetch('/api/admin/admissions'); const data = await res.json(); setAdmissions(data.admissions||[]) }
  useEffect(() => { fetchAdmissions() }, [])

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/admissions/${id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ status }) })
    toast({ title: `${status==='APPROVED'?'অনুমোদিত':'প্রত্যাখ্যাত'} হয়েছে` }); fetchAdmissions()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('মুছে ফেলবেন?')) return
    await fetch(`/api/admin/admissions/${id}`, { method:'DELETE' }); fetchAdmissions()
  }

  const statusVariants: Record<string,any> = { PENDING:'warning', APPROVED:'success', REJECTED:'destructive' }
  const statusLabels: Record<string,string> = { PENDING:'অপেক্ষারত', APPROVED:'অনুমোদিত', REJECTED:'প্রত্যাখ্যাত' }

  const columns = [
    { key:'name', header:'নাম' },
    { key:'applyingClass', header:'শ্রেণি', render:(a:any) => `শ্রেণি ${a.applyingClass}` },
    { key:'phone', header:'ফোন' },
    { key:'session', header:'সেশন' },
    { key:'createdAt', header:'তারিখ', render:(a:any) => formatDate(a.createdAt) },
    { key:'status', header:'অবস্থা', render:(a:any) => <Badge variant={statusVariants[a.status]}>{statusLabels[a.status]}</Badge> },
    { key:'actions', header:'', render:(a:any) => (<div className="flex gap-1">{a.status==='PENDING'&&<><Button variant="ghost" size="icon" className="text-green-600" onClick={() => updateStatus(a.id,'APPROVED')}><Check className="h-4 w-4" /></Button><Button variant="ghost" size="icon" className="text-red-500" onClick={() => updateStatus(a.id,'REJECTED')}><X className="h-4 w-4" /></Button></>}<Button variant="ghost" size="icon" className="text-gray-400" onClick={() => handleDelete(a.id)}><Trash2 className="h-4 w-4" /></Button></div>) },
  ]

  return (
    <div>
      <PageHeader title="ভর্তি আবেদন ব্যবস্থাপনা" />
      <DataTable data={admissions} columns={columns} searchKey="name" />
    </div>
  )
}
