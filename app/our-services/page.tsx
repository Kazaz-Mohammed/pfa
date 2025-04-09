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
  Send,
  Check,
  ShieldCheck,
  Truck,
  Stethoscope,
  HelpCircle,
  BookOpen
} from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
}

export default function ServicesPage() {
  const services = [
    {
      icon: Check,
      title: "بيع الأغنام",
      description: "منصة متخصصة لبيع الأغنام بأعلى جودة وأفضل الأسعار",
      details: [
        "فحص طبي شامل للأغنام",
        "ضمان جودة المنتج",
        "توثيق كامل للحيوانات"
      ]
    },
    {
      icon: ShieldCheck,
      title: "ضمان الجودة",
      description: "نلتزم بتقديم أعلى معايير الجودة لعملائنا",
      details: [
        "فحوصات بيطرية دقيقة",
        "شهادات صحية معتمدة",
        "ضمان استبدال أو استرداد"
      ]
    },
    {
      icon: Truck,
      title: "خدمة التوصيل",
      description: "توصيل الأغنام والماعز إلى جميع أنحاء المنطقة",
      details: [
        "نقل آمن وسريع",
        "تغطية جميع المناطق",
        "أسعار توصيل تنافسية"
      ]
    },
    {
      icon: Stethoscope,
      title: "الفحص البيطري",
      description: "خدمات طبية متكاملة للأغنام والماعز",
      details: [
        "كشف مبكر عن الأمراض",
        "استشارات صحية مجانية",
        "تطعيمات وعلاجات متخصصة"
      ]
    },
    {
      icon: HelpCircle,
      title: "الاستشارات",
      description: "نصائح وإرشادات في مجال تربية الماشية",
      details: [
        "استشارات تربية الأغنام",
        "نصائح التغذية والرعاية",
        "دعم فني متخصص"
      ]
    },
    {
      icon: BookOpen,
      title: "التدريب",
      description: "دورات وورش عمل متخصصة في مجال تربية الماشية",
      details: [
        "دورات نظرية وعملية",
        "ورش عمل متخصصة",
        "شهادات معتمدة"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background overflow-hidden" dir="rtl">
      {/* Header - Copy from other pages */}
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
              href="/services"
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

      {/* Services Hero Section */}
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
            خدماتنا
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto mb-8 opacity-90"
          >
            نقدم مجموعة متكاملة من الخدمات لمربي الأغنام والماعز
          </motion.p>
        </div>
      </motion.section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              visible: { 
                transition: { 
                  staggerChildren: 0.1 
                } 
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInScale}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-primary-foreground/10 p-4 rounded-full">
                    <service.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </div>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-3 mb-6">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Send className="h-4 w-4 text-primary-foreground rotate-180" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#"
                  className="bg-primary-foreground text-white rounded-full px-6 py-2 inline-flex items-center gap-2 hover:bg-primary-foreground/90 transition-colors duration-300"
                >
                  تفاصيل أكثر
                  <Send className="h-4 w-4 rotate-180" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter and Footer sections - Copy from other pages */}
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
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder:text-white/60 focus:border-white flex-1"
              />
              <Button className="bg-primary hover:bg-primary/90 text-black font-medium">اشترك الآن</Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer - Copy from other pages */}
      <footer className="bg-foreground text-white pt-20 pb-10">
        {/* Footer content from landing and contact pages */}
        {/* (Use the same footer as in landing-page.tsx or contact-page.tsx) */}
      </footer>
    </div>
  )
}