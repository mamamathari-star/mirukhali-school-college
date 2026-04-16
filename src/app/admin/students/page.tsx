'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/admin/DataTable'
import { PageHeader } from '@/components/admin/PageHeader'
import { FormModal } from '@/components/admin/FormModal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'

export default function AdminStudentsPage() {
  const { toast } = useToast()
  const [students, setStudents] = useState<any[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [form, setForm] = useState({ name: '', roll: '', registration: '', class: '', group: '', session: '', phone: '', address: '' })

  const fetchStudents = async () => { const res = await fetch('/api/admin/students'); const data = await res.json(); setStudents(data.students || []) }
  useEffect(() => { fetchStudents() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = editing ? `/api/admin/students/${editing.id}` : '/api/admin/students'
    const res = await fetch(url, { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    if (res.ok) { toast({ title: editing ? 'আপডেট হয়েছে' : 'যোগ করা হয়েছে' }); setModalOpen(false); setEditing(null); fetchStudents() }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('মুছে ফেলবেন?')) return
    await fetch(`/api/admin/students/${id}`, { method: 'DELETE' })
    toast({ title: 'মুছে ফেলা হয়েছে' }); fetchStudents()
  }

  const exportCSV = () => {
    const headers = ['নাম','রোল','রেজিস্ট্রেশন','শ্রেণি','বিভাগ','সেশন']
    const rows = students.map(s => [s.name,s.roll,s.registration,s.class,s.group,s.session])
    const csv = [headers,...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'students.csv'; a.click()
  }

  const openEdit = (s: any) => { setEditing(s); setForm({ name: s.name, roll: s.roll, registration: s.registration||'', class: s.class, group: s.group||'', session: s.session, phone: s.phone||'', address: s.address||'' }); setModalOpen(true) }

  const columns = [
    { key: 'name', header: 'নাম' },
    { key: 'roll', header: 'রোল' },
    { key: 'class', header: 'শ্রেণি', render: (s: any) => `শ্রেণি ${s.class}` },
    { key: 'group', header: 'বিভাগ', render: (s: any) => s.group || '-' },
    { key: 'session', header: 'সেশন' },
    { key: 'active', header: 'অবস্থা', render: (s: any) => <Badge variant={s.active ? 'success' : 'secondary'}>{s.active ? 'সক্রিয়' : 'নিষ্ক্রিয়'}</Badge> },
    { key: 'actions', header: '', render: (s: any) => (<div className="flex gap-1"><Button variant="ghost" size="icon" onClick={() => openEdit(s)}><Pencil className="h-4 w-4" /></Button><Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(s.id)}><Trash2 className="h-4 w-4" /></Button></div>) },
  ]

  return (
    <div>
      <PageHeader title="শিক্ষার্থী ব্যবস্থাপনা" action={<div className="flex gap-2"><Button variant="outline" onClick={exportCSV}><Download className="h-4 w-4 mr-2" />CSV</Button><Button onClick={() => { setEditing(null); setForm({ name:'',roll:'',registration:'',class:'',group:'',session:'',phone:'',address:'' }); setModalOpen(true) }}><Plus className="h-4 w-4 mr-2" />নতুন</Button></div>} />
      <DataTable data={students} columns={columns} searchKey="name" />
      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'শিক্ষার্থী সম্পাদনা' : 'নতুন শিক্ষার্থী'}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><Label>নাম</Label><Input value={form.name} onChange={e => setForm({...form,name:e.target.value})} required /></div>
            <div><Label>রোল নম্বর</Label><Input value={form.roll} onChange={e => setForm({...form,roll:e.target.value})} required /></div>
            <div><Label>রেজিস্ট্রেশন</Label><Input value={form.registration} onChange={e => setForm({...form,registration:e.target.value})} /></div>
            <div><Label>শ্রেণি</Label><Select value={form.class} onValueChange={v => setForm({...form,class:v})}><SelectTrigger><SelectValue placeholder="শ্রেণি" /></SelectTrigger><SelectContent>{['6','7','8','9','10','11','12'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
            <div><Label>বিভাগ</Label><Select value={form.group} onValueChange={v => setForm({...form,group:v})}><SelectTrigger><SelectValue placeholder="বিভাগ" /></SelectTrigger><SelectContent><SelectItem value="Science">বিজ্ঞান</SelectItem><SelectItem value="Humanities">মানবিক</SelectItem><SelectItem value="Commerce">বাণিজ্য</SelectItem></SelectContent></Select></div>
            <div><Label>সেশন</Label><Input value={form.session} onChange={e => setForm({...form,session:e.target.value})} placeholder="2023-24" /></div>
            <div><Label>ফোন</Label><Input value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} /></div>
            <div><Label>ঠিকানা</Label><Input value={form.address} onChange={e => setForm({...form,address:e.target.value})} /></div>
          </div>
          <div className="flex gap-2 justify-end"><Button type="button" variant="outline" onClick={() => setModalOpen(false)}>বাতিল</Button><Button type="submit">সংরক্ষণ</Button></div>
        </form>
      </FormModal>
    </div>
  )
}
