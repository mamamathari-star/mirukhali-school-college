'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/admin/DataTable'
import { PageHeader } from '@/components/admin/PageHeader'
import { FormModal } from '@/components/admin/FormModal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

export default function AdminCommitteePage() {
  const { toast } = useToast()
  const [members, setMembers] = useState<any[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [form, setForm] = useState({ name:'',designation:'',role:'',phone:'',email:'',order:'0' })

  const fetchMembers = async () => { const res = await fetch('/api/admin/committee'); const data = await res.json(); setMembers(data.members||[]) }
  useEffect(() => { fetchMembers() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = editing ? `/api/admin/committee/${editing.id}` : '/api/admin/committee'
    const res = await fetch(url, { method: editing?'PUT':'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({...form,order:parseInt(form.order)}) })
    if (res.ok) { toast({ title:'সংরক্ষিত' }); setModalOpen(false); fetchMembers() }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('মুছে ফেলবেন?')) return
    await fetch(`/api/admin/committee/${id}`, { method:'DELETE' }); fetchMembers()
  }

  const columns = [
    { key:'order', header:'ক্রম' },
    { key:'name', header:'নাম' },
    { key:'designation', header:'পদবি' },
    { key:'phone', header:'ফোন', render:(m:any) => m.phone||'-' },
    { key:'actions', header:'', render:(m:any) => (<div className="flex gap-1"><Button variant="ghost" size="icon" onClick={() => { setEditing(m); setForm({ name:m.name,designation:m.designation,role:m.role,phone:m.phone||'',email:m.email||'',order:String(m.order) }); setModalOpen(true) }}><Pencil className="h-4 w-4" /></Button><Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(m.id)}><Trash2 className="h-4 w-4" /></Button></div>) },
  ]

  return (
    <div>
      <PageHeader title="পরিচালনা পর্ষদ" action={<Button onClick={() => { setEditing(null); setForm({ name:'',designation:'',role:'',phone:'',email:'',order:'0' }); setModalOpen(true) }}><Plus className="h-4 w-4 mr-2" />নতুন</Button>} />
      <DataTable data={members} columns={columns} searchKey="name" />
      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing?'সম্পাদনা':'নতুন সদস্য'}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2"><Label>নাম</Label><Input value={form.name} onChange={e => setForm({...form,name:e.target.value})} required /></div>
            <div><Label>পদবি</Label><Input value={form.designation} onChange={e => setForm({...form,designation:e.target.value})} required /></div>
            <div><Label>ভূমিকা</Label><Input value={form.role} onChange={e => setForm({...form,role:e.target.value})} required /></div>
            <div><Label>ফোন</Label><Input value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} /></div>
            <div><Label>ক্রম</Label><Input type="number" value={form.order} onChange={e => setForm({...form,order:e.target.value})} /></div>
          </div>
          <div className="flex gap-2 justify-end"><Button type="button" variant="outline" onClick={() => setModalOpen(false)}>বাতিল</Button><Button type="submit">সংরক্ষণ</Button></div>
        </form>
      </FormModal>
    </div>
  )
}
