'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/admin/DataTable'
import { PageHeader } from '@/components/admin/PageHeader'
import { FormModal } from '@/components/admin/FormModal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { formatDate } from '@/lib/utils'

export default function AdminNoticesPage() {
  const { toast } = useToast()
  const [notices, setNotices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [form, setForm] = useState({ title: '', content: '', category: 'general', published: false })

  const fetchNotices = async () => {
    const res = await fetch('/api/admin/notices')
    const data = await res.json()
    setNotices(data.notices || [])
    setLoading(false)
  }

  useEffect(() => { fetchNotices() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = editing ? `/api/admin/notices/${editing.id}` : '/api/admin/notices'
    const method = editing ? 'PUT' : 'POST'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    if (res.ok) {
      toast({ title: editing ? 'নোটিশ আপডেট হয়েছে' : 'নোটিশ তৈরি হয়েছে' })
      setModalOpen(false); setEditing(null); setForm({ title: '', content: '', category: 'general', published: false })
      fetchNotices()
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('এই নোটিশ মুছে ফেলবেন?')) return
    await fetch(`/api/admin/notices/${id}`, { method: 'DELETE' })
    toast({ title: 'নোটিশ মুছে ফেলা হয়েছে' })
    fetchNotices()
  }

  const handleTogglePublish = async (notice: any) => {
    await fetch(`/api/admin/notices/${notice.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...notice, published: !notice.published }),
    })
    fetchNotices()
  }

  const openEdit = (notice: any) => {
    setEditing(notice)
    setForm({ title: notice.title, content: notice.content, category: notice.category, published: notice.published })
    setModalOpen(true)
  }

  const columns = [
    { key: 'title', header: 'শিরোনাম' },
    { key: 'category', header: 'বিভাগ', render: (n: any) => <Badge variant="info">{n.category}</Badge> },
    { key: 'published', header: 'অবস্থা', render: (n: any) => <Badge variant={n.published ? 'success' : 'secondary'}>{n.published ? 'প্রকাশিত' : 'খসড়া'}</Badge> },
    { key: 'publishedAt', header: 'তারিখ', render: (n: any) => formatDate(n.publishedAt || n.createdAt) },
    { key: 'actions', header: 'অ্যাকশন', render: (n: any) => (
      <div className="flex gap-2">
        <Button variant="ghost" size="icon" onClick={() => handleTogglePublish(n)}>{n.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</Button>
        <Button variant="ghost" size="icon" onClick={() => openEdit(n)}><Pencil className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(n.id)}><Trash2 className="h-4 w-4" /></Button>
      </div>
    )},
  ]

  return (
    <div>
      <PageHeader title="নোটিশ ব্যবস্থাপনা" description="সব নোটিশ তৈরি, সম্পাদনা ও মুছুন"
        action={<Button onClick={() => { setEditing(null); setForm({ title: '', content: '', category: 'general', published: false }); setModalOpen(true) }}><Plus className="h-4 w-4 mr-2" /> নতুন নোটিশ</Button>}
      />
      <DataTable data={notices} columns={columns} searchKey="title" searchPlaceholder="নোটিশ খুঁজুন..." />
      <FormModal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null) }} title={editing ? 'নোটিশ সম্পাদনা' : 'নতুন নোটিশ'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><Label>শিরোনাম</Label><Input value={form.title} onChange={e => setForm({...form, title: e.target.value})} required /></div>
          <div><Label>বিভাগ</Label>
            <Select value={form.category} onValueChange={v => setForm({...form, category: v})}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{['general','exam','result','admission','event'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div><Label>বিষয়বস্তু</Label><Textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={5} required /></div>
          <div className="flex items-center gap-2"><input type="checkbox" id="pub" checked={form.published} onChange={e => setForm({...form, published: e.target.checked})} /><Label htmlFor="pub">প্রকাশ করুন</Label></div>
          <div className="flex gap-2 justify-end"><Button type="button" variant="outline" onClick={() => setModalOpen(false)}>বাতিল</Button><Button type="submit">সংরক্ষণ</Button></div>
        </form>
      </FormModal>
    </div>
  )
}
