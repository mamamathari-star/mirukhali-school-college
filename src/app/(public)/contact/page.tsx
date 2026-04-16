"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const contactInfo = [
  { icon: MapPin, label: "Address", value: "Mirukhali, Mathbaria, Pirojpur-8540, Bangladesh" },
  { icon: Phone, label: "Phone", value: "+880-xxx-xxxxxxx" },
  { icon: Mail, label: "Email", value: "info@mirukhalischool.edu.bd" },
  { icon: Clock, label: "Office Hours", value: "Sunday – Thursday: 8:00 AM – 4:00 PM" },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-green-800 to-green-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <Phone className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
          <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
          <p className="text-green-100">Get in touch with Mirukhali School & College</p>
        </div>
      </section>

      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-4">
              {contactInfo.map((info) => (
                <Card key={info.label} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <info.icon className="w-5 h-5 text-green-700" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">{info.label}</p>
                      <p className="text-gray-900 font-medium mt-0.5">{info.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Map placeholder */}
              <div className="bg-green-100 border-2 border-dashed border-green-300 rounded-xl p-8 text-center">
                <MapPin className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <p className="text-green-800 font-medium">Mirukhali, Mathbaria</p>
                <p className="text-sm text-green-600">Pirojpur, Bangladesh</p>
                <p className="text-xs text-green-500 mt-2">Map integration available with Google Maps API</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              {sent ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for contacting us. We will respond within 1-2 business days.</p>
                  <Button className="mt-6" onClick={() => setSent(false)}>Send Another Message</Button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <Send className="w-5 h-5 text-green-700" />
                    Send a Message
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name *</Label>
                        <Input id="name" {...register("name")} placeholder="Full name" />
                        {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" type="email" {...register("email")} placeholder="email@example.com" />
                        {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" {...register("phone")} placeholder="01XXXXXXXXX" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input id="subject" {...register("subject")} placeholder="Message subject" />
                        {errors.subject && <p className="text-xs text-red-600">{errors.subject.message}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea id="message" {...register("message")} placeholder="Your message..." rows={5} />
                      {errors.message && <p className="text-xs text-red-600">{errors.message.message}</p>}
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                      {isSubmitting ? (
                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
                      ) : (
                        <><Send className="w-4 h-4 mr-2" /> Send Message</>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
