'use client'
import { useState, useEffect } from 'react'
import { Save, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PageHeader } from '@/components/admin/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'

export default function AdminSettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState<Record<string,string>>({})
  const [loading, setLoading] = useState(false)
  useEffect(() => { fetch('/api/admin/settings').then(r=>r.json()).then(data => { const s:Record<string,string>={}; data.settings?.forEach((s2:any) => { s[s2.key]=s2.value }); setSettings(s) }) }, [])
  const handleSave = async () => { setLoading(true); const res = await fetch('/api/admin/settings', { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(settings) }); setLoading(false); if (res.ok) toast({ title:'সংরক্ষিত' }) }
  const groups: Record<string,Array<{key:string;label:string}>> = {
    general: [{ key:'school_name',label:'বিদ্যালয়ের নাম (বাংলা)' },{ key:'school_name_en',label:'বিদ্যালয়ের নাম (ইংরেজি)' },{ key:'eiin',label:'EIIN' },{ key:'established',label:'প্রতিষ্ঠাকাল' }],
    contact: [{ key:'phone',label:'ফোন' },{ key:'email',label:'ইমেইল' },{ key:'address',label:'ঠিকানা' }],
    stats: [{ key:'student_count',label:'শিক্ষার্থী' },{ key:'teacher_count',label:'শিক্ষক' }],
  }
  const groupLabels: Record<string,string> = { general:'সাধারণ তথ্য', contact:'যোগাযোগ', stats:'পরিসংখ্যান' }
  return (
    <div>
      <PageHeader title="সেটিংস" />
      <div className="space-y-6">
        {Object.entries(groups).map(([group,fields]) => (
          <Card key={group}><CardHeader><CardTitle className="text-base">{groupLabels[group]}</CardTitle></CardHeader>
            <CardContent><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{fields.map(f => (<div key={f.key}><Label className="text-xs text-gray-500 mb-1 block">{f.label}</Label><Input value={settings[f.key]||''} onChange={e => setSettings(prev=>({...prev,[f.key]:e.target.value}))} /></div>))}</div></CardContent>
          </Card>
        ))}
        <Button onClick={handleSave} disabled={loading}>{loading?<><Loader2 className="mr-2 h-4 w-4 animate-spin" />হচ্ছে...</>:<><Save className="mr-2 h-4 w-4" />সংরক্ষণ</>}</Button>
      </div>
    </div>
  )
}
