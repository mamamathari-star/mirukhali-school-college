'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Phone, Mail, MapPin, Clock, Send, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'

const contactSchema = z.object({
  name: z.string().min(2, 'নাম দিন'),
  email: z.string().email('সঠিক ইমেইল দিন'),
  subject: z.string().min(3, 'বিষয় দিন'),
  message: z.string().min(10, 'বার্তা লিখুন'),
})
type ContactForm = z.infer<typeof contactSchema>

export default function ContactPage() {
  const { toast } = useToast()
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (_data: ContactForm) => {
    setLoading(true)
    setTimeout(() => {
      setSent(true)
      setLoading(false)
      reset()
      toast({ title: 'বার্তা পাঠানো হয়েছে!', description: 'আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।' })
    }, 1000)
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1d4ed8] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">যোগাযোগ করুন</h1>
          <p className="text-blue-200">আমাদের সাথে কথা বলুন</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">যোগাযোগের তথ্য</h2>
            {[
              { icon: Phone, title: 'ফোন', lines: ['01716213807', '01309102726'], href: 'tel:01716213807' },
              { icon: Mail, title: 'ইমেইল', lines: ['info@mirukhali.edu.bd'], href: 'mailto:info@mirukhali.edu.bd' },
              { icon: MapPin, title: 'ঠিকানা', lines: ['মিরুখালি, মঠবাড়িয়া', 'পিরোজপুর, বরিশাল, বাংলাদেশ'], href: null },
              { icon: Clock, title: 'অফিস সময়', lines: ['শনি-বৃহস্পতি: সকাল ৮টা - বিকেল ৪টা', 'শুক্রবার ও ছুটির দিন: বন্ধ'], href: null },
            ].map((item) => {
              const Icon = item.icon
              return (
                <Card key={item.title}>
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className="bg-blue-100 rounded-lg p-2 shrink-0">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                      {item.lines.map((line, i) => (
                        item.href ? (
                          <a key={i} href={item.href} className="text-sm text-blue-600 hover:text-blue-800 block">{line}</a>
                        ) : (
                          <p key={i} className="text-sm text-gray-600">{line}</p>
                        )
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Send className="h-5 w-5 text-blue-600" />
                  বার্তা পাঠান
                </h2>
                {sent ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
                    <h3 className="font-bold text-gray-900 mb-1">বার্তা পাঠানো হয়েছে!</h3>
                    <p className="text-gray-500 text-sm">আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
                    <Button className="mt-4" onClick={() => setSent(false)}>নতুন বার্তা</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label>আপনার নাম *</Label>
                        <Input placeholder="নাম" {...register('name')} />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <Label>ইমেইল *</Label>
                        <Input placeholder="ইমেইল" {...register('email')} />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>
                    <div>
                      <Label>বিষয় *</Label>
                      <Input placeholder="বার্তার বিষয়" {...register('subject')} />
                      {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                    </div>
                    <div>
                      <Label>বার্তা *</Label>
                      <Textarea rows={5} placeholder="আপনার বার্তা লিখুন..." {...register('message')} />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                    </div>
                    <Button type="submit" className="w-full bg-[#1e3a8a] hover:bg-blue-800" disabled={loading}>
                      {loading ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> পাঠানো হচ্ছে...</>
                      ) : (
                        <><Send className="mr-2 h-4 w-4" /> পাঠান</>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
