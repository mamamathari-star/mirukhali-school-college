'use client'
import { useState, useEffect } from 'react'
import { Plus, ToggleLeft, ToggleRight, Trash2, QrCode } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/admin/DataTable'
import { PageHeader } from '@/components/admin/PageHeader'
import { FormModal } from '@/components/admin/FormModal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { formatDate } from '@/lib/utils'

export default function AdminCertificatesPage() {
  const { toast } = useToast()
  const [certificates, setCertificates] = useState<any[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [qrModal, setQrModal] = useState<any>(null)
  const [resultId, setResultId] = useState('')

  const fetchCerts = async () => { const res = await fetch('/api/admin/certificates'); const data = await res.json(); setCertificates(data.certificates||[]) }
  useEffect(() => { fetchCerts() }, [])

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/admin/certificates', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ resultId, type:'result' }) })
    if (res.ok) { toast({ title:'সনদ তৈরি হয়েছে' }); setModalOpen(false); setResultId(''); fetchCerts() }
    else toast({ title:'ত্রুটি', variant:'destructive' })
  }

  const handleToggleValidity = async (cert: any) => {
    await fetch(`/api/admin/certificates/${cert.id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ isValid:!cert.isValid }) })
    fetchCerts()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('মুছে ফেলবেন?')) return
    await fetch(`/api/admin/certificates/${id}`, { method:'DELETE' }); fetchCerts()
  }

  const columns = [
    { key:'certificateId', header:'সার্টিফিকেট ID' },
    { key:'student', header:'শিক্ষার্থী', render:(c:any) => c.student?.name||'-' },
    { key:'result', header:'পরীক্ষা', render:(c:any) => c.result?`${c.result.exam} ${c.result.year}`:'-' },
    { key:'issuedAt', header:'তারিখ', render:(c:any) => formatDate(c.issuedAt) },
    { key:'isValid', header:'অবস্থা', render:(c:any) => <Badge variant={c.isValid?'success':'destructive'}>{c.isValid?'বৈধ':'অবৈধ'}</Badge> },
    { key:'actions', header:'', render:(c:any) => (<div className="flex gap-1">{c.qrCode&&<Button variant="ghost" size="icon" onClick={() => setQrModal(c)}><QrCode className="h-4 w-4" /></Button>}<Button variant="ghost" size="icon" onClick={() => handleToggleValidity(c)}>{c.isValid?<ToggleRight className="h-4 w-4 text-green-500" />:<ToggleLeft className="h-4 w-4 text-gray-400" />}</Button><Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(c.id)}><Trash2 className="h-4 w-4" /></Button></div>) },
  ]

  return (
    <div>
      <PageHeader title="সনদপত্র ব্যবস্থাপনা" action={<Button onClick={() => setModalOpen(true)}><Plus className="h-4 w-4 mr-2" />নতুন সনদ</Button>} />
      <DataTable data={certificates} columns={columns} searchKey="certificateId" />
      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title="নতুন সনদ তৈরি">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div><Label>ফলাফল ID</Label><Input value={resultId} onChange={e => setResultId(e.target.value)} placeholder="Result ID দিন" required /></div>
          <div className="flex gap-2 justify-end"><Button type="button" variant="outline" onClick={() => setModalOpen(false)}>বাতিল</Button><Button type="submit">সনদ তৈরি করুন</Button></div>
        </form>
      </FormModal>
      {qrModal && (
        <FormModal open={!!qrModal} onClose={() => setQrModal(null)} title="QR কোড">
          <div className="text-center">
            <Image src={qrModal.qrCode} alt="QR Code" width={256} height={256} className="mx-auto" />
            <p className="text-sm text-gray-500 mt-2">সনদ যাচাই QR কোড</p>
            <p className="text-xs font-mono text-gray-400 mt-1">{qrModal.verifyHash}</p>
          </div>
        </FormModal>
      )}
    </div>
  )
}
