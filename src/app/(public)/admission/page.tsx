'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { GraduationCap, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'

const admissionSchema = z.object({
  name: z.string().min(2, 'পূর্ণ নাম দিন'),
  dob: z.string().min(1, 'জন্ম তারিখ দিন'),
  fatherName: z.string().min(2, 'পিতার নাম দিন'),
  motherName: z.string().min(2, 'মাতার নাম দিন'),
  phone: z.string().min(11, 'সঠিক মোবাইল নম্বর দিন'),
  address: z.string().min(5, 'ঠিকানা দিন'),
  applyingClass: z.string().min(1, 'শ্রেণি নির্বাচন করুন'),
  group: z.string().optional(),
  session: z.string().min(1, 'সেশন দিন'),
})
type AdmissionForm = z.infer<typeof admissionSchema>

export default function AdmissionPage() {
  const { toast } = useToast()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<AdmissionForm>({
    resolver: zodResolver(admissionSchema),
  })

  const onSubmit = async (data: AdmissionForm) => {
    setLoading(true)
    try {
      const res = await fetch('/api/public/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, dob: new Date(data.dob).toISOString() }),
      })
      if (res.ok) {
        setSubmitted(true)
        toast({ title: 'আবেদন সফল!', description: 'আপনার ভর্তি আবেদন গ্রহণ করা হয়েছে।', variant: 'default' })
      } else {
        throw new Error('Failed')
      }
    } catch {
      toast({ title: 'ত্রুটি', description: 'আবেদন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">আবেদন সফল!</h2>
            <p className="text-gray-600">আপনার ভর্তি আবেদন গ্রহণ করা হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1d4ed8] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">ভর্তি আবেদন</h1>
          <p className="text-blue-200">অনলাইনে ভর্তির জন্য আবেদন করুন</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-600" />
              ভর্তি আবেদন ফর্ম
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>শিক্ষার্থীর নাম *</Label>
                  <Input placeholder="পূর্ণ নাম" {...register('name')} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <Label>জন্ম তারিখ *</Label>
                  <Input type="date" {...register('dob')} />
                  {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>}
                </div>
                <div>
                  <Label>পিতার নাম *</Label>
                  <Input placeholder="পিতার পূর্ণ নাম" {...register('fatherName')} />
                  {errors.fatherName && <p className="text-red-500 text-xs mt-1">{errors.fatherName.message}</p>}
                </div>
                <div>
                  <Label>মাতার নাম *</Label>
                  <Input placeholder="মাতার পূর্ণ নাম" {...register('motherName')} />
                  {errors.motherName && <p className="text-red-500 text-xs mt-1">{errors.motherName.message}</p>}
                </div>
                <div>
                  <Label>মোবাইল নম্বর *</Label>
                  <Input placeholder="01XXXXXXXXX" {...register('phone')} />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <Label>সেশন *</Label>
                  <Select onValueChange={(v) => setValue('session', v)}>
                    <SelectTrigger><SelectValue placeholder="সেশন নির্বাচন করুন" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024-25">২০২৪-২৫</SelectItem>
                      <SelectItem value="2025-26">২০২৫-২৬</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.session && <p className="text-red-500 text-xs mt-1">{errors.session.message}</p>}
                </div>
                <div>
                  <Label>ভর্তি শ্রেণি *</Label>
                  <Select onValueChange={(v) => setValue('applyingClass', v)}>
                    <SelectTrigger><SelectValue placeholder="শ্রেণি নির্বাচন করুন" /></SelectTrigger>
                    <SelectContent>
                      {['৬', '৭', '৮', '৯', '১০', '১১', '১২'].map(c => (
                        <SelectItem key={c} value={c}>শ্রেণি {c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.applyingClass && <p className="text-red-500 text-xs mt-1">{errors.applyingClass.message}</p>}
                </div>
                <div>
                  <Label>বিভাগ</Label>
                  <Select onValueChange={(v) => setValue('group', v)}>
                    <SelectTrigger><SelectValue placeholder="বিভাগ নির্বাচন করুন" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Science">বিজ্ঞান</SelectItem>
                      <SelectItem value="Humanities">মানবিক</SelectItem>
                      <SelectItem value="Commerce">বাণিজ্য</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>ঠিকানা *</Label>
                <Textarea placeholder="সম্পূর্ণ ঠিকানা" {...register('address')} />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-[#1e3a8a] hover:bg-blue-800" disabled={loading}>
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> আবেদন করা হচ্ছে...</>
                ) : (
                  'আবেদন জমা দিন'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
