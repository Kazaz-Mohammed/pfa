"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Send
} from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert("تم إرسال رسالتك بنجاح!");
        setFormData({ name: "", email: "", phone: "", message: "" }); // Reset form
      } else {
        alert("حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى لاحقًا.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("تعذر إرسال الرسالة. تحقق من اتصالك بالإنترنت.");
    }
  };
  

  return (
    <div className="min-h-screen bg-background overflow-hidden" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 py-4 px-4 bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              className="bg-primary hover:bg-primary/90 transition-colors duration-300 rounded-full px-6 py-2 text-black font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <span>تسجيل الدخول</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="rotate-180"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>

          <nav className="flex items-center gap-8">
            <Link
              href="/contact"
              className="flex items-center gap-1 text-foreground hover:text-primary-foreground transition-colors duration-300"
            >
              تواصل معنا
              <span className="text-primary text-lg">•</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-1 text-foreground hover:text-primary-foreground transition-colors duration-300"
            >
              خدماتنا
              <span className="text-primary text-lg">•</span>
            </Link>
            <Link href="/" className="text-foreground hover:text-primary-foreground transition-colors duration-300">
              الرئيسية
            </Link>
            <Link href="/" className="flex items-center gap-1">
              <Image
                src="/logo-rm.png?height=40&width=120"
                alt="grimo logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </nav>
        </div>
      </header>

      {/* Contact Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="py-20 bg-gradient-to-br from-primary-foreground to-primary-foreground/90"
      >
        <div className="container mx-auto text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md"
          >
            تواصل معنا
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto mb-8 opacity-90"
          >
            نحن هنا للإجابة على أسئلتك وتلبية احتياجاتك. لا تتردد في التواصل معنا
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary-foreground rounded-full"></span>
                معلومات الاتصال
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary-foreground/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold">العنوان</h3>
                    <p className="text-muted-foreground">شارع بوكراع، العيون، المغرب</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-primary-foreground/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold">الهاتف</h3>
                    <p className="text-muted-foreground" dir="ltr">+212 655 21 81</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-primary-foreground/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold">البريد الإلكتروني</h3>
                    <p className="text-muted-foreground">info@kebchi.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-bold mb-4">تابعنا</h3>
                <div className="flex gap-4">
                  {[
                    { icon: Facebook, href: "#" },
                    { icon: Twitter, href: "#" },
                    { icon: Instagram, href: "#" },
                    { icon: Youtube, href: "#" },
                  ].map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-2 rounded-full transition-colors duration-300"
                    >
                      <social.icon className="h-5 w-5 text-primary-foreground" />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary-foreground rounded-full"></span>
                أرسل لنا رسالة
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium">الاسم الكامل</label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="اسمك"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium">رقم الهاتف</label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="رقم هاتفك"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">البريد الإلكتروني</label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="بريدك الإلكتروني"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium">الرسالة</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="اكتب رسالتك هنا"
                    rows={5}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary-foreground hover:bg-primary-foreground/90 text-white flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  أرسل الرسالة
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-primary-foreground"
      >
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">انضم إلى نشرتنا الإخبارية</h2>
            <p className="mb-8 opacity-90">احصل على آخر الأخبار والعروض الخاصة مباشرة إلى بريدك الإلكتروني</p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="البريد الإلكتروني"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white"
              />
              <Button className="bg-primary hover:bg-primary/90 text-black font-medium">اشترك الآن</Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-foreground text-white pt-20 pb-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            {/* Company Info */}
            <div>
              <Image
                src="/logo-rm.png?height=40&width=120"
                alt="grimo logo"
                width={120}
                height={40}
                className="h-10 w-auto mb-6 invert"
              />
              <p className="text-white/80 mb-6 leading-relaxed">
                منصة كبشي متخصصة في بيع وشراء الأغنام والماعز بطريقة سهلة وآمنة، نضمن لك جودة عالية وأسعار منافسة.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-300"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-primary rounded-full"></span>
                روابط سريعة
              </h3>
              <ul className="space-y-3">
                {["الرئيسية", "من نحن", "خدماتنا", "المنتجات", "الأسئلة الشائعة", "اتصل بنا"].map((item, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="text-white/80 hover:text-primary transition-colors duration-300 flex items-center gap-2"
                    >
                      <Send className="h-4 w-4 rotate-180" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-primary rounded-full"></span>
                خدماتنا
              </h3>
              <ul className="space-y-3">
                {["بيع الأغنام", "شراء الماعز", "خدمة التوصيل", "الفحص البيطري", "الاستشارات", "التدريب"].map(
                  (item, index) => (
                    <li key={index}>
                      <Link
                        href="#"
                        className="text-white/80 hover:text-primary transition-colors duration-300 flex items-center gap-2"
                      >
                        <Send className="h-4 w-4 rotate-180" />
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-primary rounded-full"></span>
                اتصل بنا
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <span className="text-white/80">شارع بوكراع، العيون، المغرب</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-white/80" dir="ltr">
                    +212 655 21 81
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-white/80">info@kebchi.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">© {new Date().getFullYear()} جميع الحقوق محفوظة لمنصة كبشي</p>
            <div className="flex gap-6">
              <Link href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-300">
                سياسة الخصوصية
              </Link>
              <Link href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-300">
                الشروط والأحكام
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}