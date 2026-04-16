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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'

export default function AdminResultsPage() {
  const { toast } = useToast()
  const [results, setResults] = useState<any[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [form, setForm] = useState({ exam:'SSC',year:'',class:'',group:'',roll:'',registration:'',gpa:'',grade:'' })

  const fetchResults = async () => { const res = await fetch('/api/admin/results'); const data = await res.json(); setResults(data.results||[]) }
  useEffect(() => { fetchResults() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = editing ? `/api/admin/results/${editing.id}` : '/api/admin/results'
    const res = await fetch(url, { method: editing?'PUT':'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
    if (res.ok) { toast({ title: 'সংরক্ষিত' }); setModalOpen(false); fetchResults() }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('মুছে ফেলবেন?')) return
    await fetch(`/api/admin/results/${id}`, { method:'DELETE' }); fetchResults()
  }

  const columns = [
    { key:'exam', header:'পরীক্ষা' },
    { key:'year', header:'সাল' },
    { key:'roll', header:'রোল' },
    { key:'student', header:'নাম', render:(r:any) => r.student?.name||'-' },
    { key:'gpa', header:'GPA', render:(r:any) => <span className="font-bold text-blue-700">{r.gpa}</span> },
    { key:'grade', header:'গ্রেড', render:(r:any) => <Badge variant="success">{r.grade}</Badge> },
    { key:'verified', header:'যাচাই', render:(r:any) => <Badge variant={r.verified?'success':'warning'}>{r.verified?'হ্যাঁ':'না'}</Badge> },
    { key:'actions', header:'', render:(r:any) => (<div className="flex gap-1"><Button variant="ghost" size="icon" onClick={() => { setEditing(r); setForm({ exam:r.exam,year:r.year,class:r.class,group:r.group||'',roll:r.roll,registration:r.registration||'',gpa:String(r.gpa||''),grade:r.grade||'' }); setModalOpen(true) }}><Pencil className="h-4 w-4" /></Button><Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(r.id)}><Trash2 className="h-4 w-4" /></Button></div>) },
  ]

  return (
    <div>
      <PageHeader title="ফলাফল ব্যবস্থাপনা" action={<Button onClick={() => { setEditing(null); setModalOpen(true) }}><Plus className="h-4 w-4 mr-2" />নতুন</Button>} />
      <DataTable data={results} columns={columns} searchKey="roll" />
      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing?'সম্পাদনা':'নতুন ফলাফল'}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><Label>পরীক্ষা</Label><Select value={form.exam} onValueChange={v => setForm({...form,exam:v})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="SSC">SSC</SelectItem><SelectItem value="HSC">HSC</SelectItem></SelectContent></Select></div>
            <div><Label>সাল</Label><Input value={form.year} onChange={e => setForm({...form,year:e.target.value})} placeholder="2024" required /></div>
            <div><Label>শ্রেণি</Label><Input value={form.class} onChange={e => setForm({...form,class:e.target.value})} required /></div>
            <div><Label>বিভাগ</Label><Input value={form.group} onChange={e => setForm({...form,group:e.target.value})} /></div>
            <div><Label>রোল</Label><Input value={form.roll} onChange={e => setForm({...form,roll:e.target.value})} required /></div>
            <div><Label>রেজিস্ট্রেশন</Label><Input value={form.registration} onChange={e => setForm({...form,registration:e.target.value})} /></div>
            <div><Label>GPA</Label><Input type="number" step="0.01" min="0" max="5" value={form.gpa} onChange={e => setForm({...form,gpa:e.target.value})} /></div>
            <div><Label>গ্রেড</Label><Input value={form.grade} onChange={e => setForm({...form,grade:e.target.value})} placeholder="A+" /></div>
          </div>
          <div className="flex gap-2 justify-end"><Button type="button" variant="outline" onClick={() => setModalOpen(false)}>বাতিল</Button><Button type="submit">সংরক্ষণ</Button></div>
        </form>
      </FormModal>
    </div>
  )
}
