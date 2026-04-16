'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/admin/DataTable'
import { PageHeader } from '@/components/admin/PageHeader'
import { FormModal } from '@/components/admin/FormModal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

export default function AdminGalleryPage() {
  const { toast } = useToast()
  const [items, setItems] = useState<any[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [form, setForm] = useState({ title:'',description:'',imageUrl:'',category:'general',published:true })
  const fetchItems = async () => { const res = await fetch('/api/admin/gallery'); const data = await res.json(); setItems(data.items||[]) }
  useEffect(() => { fetchItems() }, [])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = editing ? `/api/admin/gallery/${editing.id}` : '/api/admin/gallery'
    const res = await fetch(url, { method: editing?'PUT':'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
    if (res.ok) { toast({ title:'সংরক্ষিত' }); setModalOpen(false); fetchItems() }
  }
  const handleDelete = async (id: string) => { if (!confirm('মুছে ফেলবেন?')) return; await fetch(`/api/admin/gallery/${id}`, { method:'DELETE' }); fetchItems() }
  const columns = [
    { key:'imageUrl', header:'ছবি', render:(i:any) => <div className="relative w-16 h-10 rounded overflow-hidden"><Image src={i.imageUrl} alt={i.title} fill className="object-cover" /></div> },
    { key:'title', header:'শিরোনাম' },
    { key:'category', header:'বিভাগ' },
    { key:'published', header:'অবস্থা', render:(i:any) => <Badge variant={i.published?'success':'secondary'}>{i.published?'প্রকাশিত':'লুকানো'}</Badge> },
    { key:'actions', header:'', render:(i:any) => (<div className="flex gap-1"><Button variant="ghost" size="icon" onClick={() => { setEditing(i); setForm({ title:i.title,description:i.description||'',imageUrl:i.imageUrl,category:i.category,published:i.published }); setModalOpen(true) }}><Pencil className="h-4 w-4" /></Button><Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(i.id)}><Trash2 className="h-4 w-4" /></Button></div>) },
  ]
  return (
    <div>
      <PageHeader title="গ্যালারি ব্যবস্থাপনা" action={<Button onClick={() => { setEditing(null); setForm({ title:'',description:'',imageUrl:'',category:'general',published:true }); setModalOpen(true) }}><Plus className="h-4 w-4 mr-2" />নতুন</Button>} />
      <DataTable data={items} columns={columns} searchKey="title" />
      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing?'সম্পাদনা':'নতুন ছবি'}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div><Label>শিরোনাম</Label><Input value={form.title} onChange={e => setForm({...form,title:e.target.value})} required /></div>
          <div><Label>ছবির URL</Label><Input value={form.imageUrl} onChange={e => setForm({...form,imageUrl:e.target.value})} required /></div>
          <div className="grid grid-cols-2 gap-3"><div><Label>বিবরণ</Label><Input value={form.description} onChange={e => setForm({...form,description:e.target.value})} /></div><div><Label>বিভাগ</Label><Input value={form.category} onChange={e => setForm({...form,category:e.target.value})} /></div></div>
          <div className="flex items-center gap-2"><input type="checkbox" id="pub" checked={form.published} onChange={e => setForm({...form,published:e.target.checked})} /><Label htmlFor="pub">প্রকাশ করুন</Label></div>
          <div className="flex gap-2 justify-end"><Button type="button" variant="outline" onClick={() => setModalOpen(false)}>বাতিল</Button><Button type="submit">সংরক্ষণ</Button></div>
        </form>
      </FormModal>
    </div>
  )
}
