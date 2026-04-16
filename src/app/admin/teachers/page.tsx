'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/admin/DataTable'
import { PageHeader } from '@/components/admin/PageHeader'
import { FormModal } from '@/components/admin/FormModal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

export default function AdminTeachersPage() {
  const { toast } = useToast()
  const [teachers, setTeachers] = useState<any[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [form, setForm] = useState({ name:'',designation:'',subject:'',qualification:'',phone:'',email:'',order:'0' })

  const fetchTeachers = async () => { const res = await fetch('/api/admin/teachers'); const data = await res.json(); setTeachers(data.teachers||[]) }
  useEffect(() => { fetchTeachers() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = editing ? `/api/admin/teachers/${editing.id}` : '/api/admin/teachers'
    const res = await fetch(url, { method: editing?'PUT':'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({...form,order:parseInt(form.order)}) })
    if (res.ok) { toast({ title: '✓' }); setModalOpen(false); fetchTeachers() }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('মুছে ফেলবেন?')) return
    await fetch(`/api/admin/teachers/${id}`, { method: 'DELETE' }); fetchTeachers()
  }

  const openEdit = (t: any) => { setEditing(t); setForm({ name:t.name,designation:t.designation,subject:t.subject,qualification:t.qualification||'',phone:t.phone||'',email:t.email||'',order:String(t.order) }); setModalOpen(true) }

  const columns = [
    { key:'order', header:'ক্রম' },
    { key:'name', header:'নাম' },
    { key:'designation', header:'পদবি' },
    { key:'subject', header:'বিষয়' },
    { key:'phone', header:'ফোন', render:(t:any) => t.phone||'-' },
    { key:'active', header:'অবস্থা', render:(t:any) => <Badge variant={t.active?'success':'secondary'}>{t.active?'সক্রিয়':'নিষ্ক্রিয়'}</Badge> },
    { key:'actions', header:'', render:(t:any) => (<div className="flex gap-1"><Button variant="ghost" size="icon" onClick={() => openEdit(t)}><Pencil className="h-4 w-4" /></Button><Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(t.id)}><Trash2 className="h-4 w-4" /></Button></div>) },
  ]

  return (
    <div>
      <PageHeader title="শিক্ষক ব্যবস্থাপনা" action={<Button onClick={() => { setEditing(null); setForm({ name:'',designation:'',subject:'',qualification:'',phone:'',email:'',order:'0' }); setModalOpen(true) }}><Plus className="h-4 w-4 mr-2" />নতুন</Button>} />
      <DataTable data={teachers} columns={columns} searchKey="name" />
      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing?'শিক্ষক সম্পাদনা':'নতুন শিক্ষক'}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2"><Label>নাম</Label><Input value={form.name} onChange={e => setForm({...form,name:e.target.value})} required /></div>
            <div><Label>পদবি</Label><Input value={form.designation} onChange={e => setForm({...form,designation:e.target.value})} required /></div>
            <div><Label>বিষয়</Label><Input value={form.subject} onChange={e => setForm({...form,subject:e.target.value})} required /></div>
            <div><Label>যোগ্যতা</Label><Input value={form.qualification} onChange={e => setForm({...form,qualification:e.target.value})} /></div>
            <div><Label>ফোন</Label><Input value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} /></div>
            <div><Label>ইমেইল</Label><Input type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} /></div>
            <div><Label>ক্রম</Label><Input type="number" value={form.order} onChange={e => setForm({...form,order:e.target.value})} /></div>
          </div>
          <div className="flex gap-2 justify-end"><Button type="button" variant="outline" onClick={() => setModalOpen(false)}>বাতিল</Button><Button type="submit">সংরক্ষণ</Button></div>
        </form>
      </FormModal>
    </div>
  )
}
