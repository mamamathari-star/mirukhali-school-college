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
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'

export default function AdminFacilitiesPage() {
  const { toast } = useToast()
  const [facilities, setFacilities] = useState<any[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [form, setForm] = useState({ name:'',description:'',icon:'',category:'general',order:'0' })

  const fetchFacilities = async () => { const res = await fetch('/api/admin/facilities'); const data = await res.json(); setFacilities(data.facilities||[]) }
  useEffect(() => { fetchFacilities() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = editing ? `/api/admin/facilities/${editing.id}` : '/api/admin/facilities'
    const res = await fetch(url, { method: editing?'PUT':'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({...form,order:parseInt(form.order)}) })
    if (res.ok) { toast({ title:'সংরক্ষিত' }); setModalOpen(false); fetchFacilities() }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('মুছে ফেলবেন?')) return
    await fetch(`/api/admin/facilities/${id}`, { method:'DELETE' }); fetchFacilities()
  }

  const columns = [
    { key:'order', header:'ক্রম' },
    { key:'name', header:'নাম' },
    { key:'category', header:'বিভাগ' },
    { key:'active', header:'অবস্থা', render:(f:any) => <Badge variant={f.active?'success':'secondary'}>{f.active?'সক্রিয়':'নিষ্ক্রিয়'}</Badge> },
    { key:'actions', header:'', render:(f:any) => (<div className="flex gap-1"><Button variant="ghost" size="icon" onClick={() => { setEditing(f); setForm({ name:f.name,description:f.description||'',icon:f.icon||'',category:f.category,order:String(f.order) }); setModalOpen(true) }}><Pencil className="h-4 w-4" /></Button><Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(f.id)}><Trash2 className="h-4 w-4" /></Button></div>) },
  ]

  return (
    <div>
      <PageHeader title="সুযোগ-সুবিধা ব্যবস্থাপনা" action={<Button onClick={() => { setEditing(null); setForm({ name:'',description:'',icon:'',category:'general',order:'0' }); setModalOpen(true) }}><Plus className="h-4 w-4 mr-2" />নতুন</Button>} />
      <DataTable data={facilities} columns={columns} searchKey="name" />
      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing?'সম্পাদনা':'নতুন সুবিধা'}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div><Label>নাম</Label><Input value={form.name} onChange={e => setForm({...form,name:e.target.value})} required /></div>
          <div><Label>বিবরণ</Label><Textarea value={form.description} onChange={e => setForm({...form,description:e.target.value})} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>আইকন</Label><Input value={form.icon} onChange={e => setForm({...form,icon:e.target.value})} placeholder="BookOpen" /></div>
            <div><Label>বিভাগ</Label><Input value={form.category} onChange={e => setForm({...form,category:e.target.value})} /></div>
            <div><Label>ক্রম</Label><Input type="number" value={form.order} onChange={e => setForm({...form,order:e.target.value})} /></div>
          </div>
          <div className="flex gap-2 justify-end"><Button type="button" variant="outline" onClick={() => setModalOpen(false)}>বাতিল</Button><Button type="submit">সংরক্ষণ</Button></div>
        </form>
      </FormModal>
    </div>
  )
}
