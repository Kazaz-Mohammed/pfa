"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Star,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight,
} from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// import LoginRegisterModal from "./login-registre";
import { AuthModal } from "@/components/auth/auth-modal"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0)


  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const testimonials = [
    {
      name: "فاطمة الزهراء",
      role: "مربية أغنام",
      quote: "المنصة توفر لنا فرصة للوصول إلى المستهلكين بشكل مباشر مما يقلل من تكاليف الوسطاء!",
      image: "/femal1.jpg",
      avatar: "/performance-review.png",
      stars: 4
    },
    
    {
      name: "محمد أحمد",
      role: "مزارع",
      quote: "خدمة ممتازة وسهولة في التعامل مع المنصة!",
      image: "/femal1.jpg",
      avatar: "/performance-review.png",
      stars: 5
    },

    {
      name: "محمد عالي",
      role: "مزارع",
      quote: "خدمة ممتازة وسهولة في التعامل مع المنصة!",
      image: "/femal1.jpg",
      avatar: "/performance-review.png",
      stars: 5
    }
  ];
  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }; 

  // Add this new state for the modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "/sheep.jpg?height=500&width=700",
    "/she.jpg?height=500&width=700",  
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background overflow-hidden" dir="rtl">

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Header */}
      <header
        className={`sticky top-0 z-50 py-4 px-4 transition-all duration-300 ${scrollY > 50 ? "bg-white shadow-md" : "bg-transparent"}`}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* <Link
              href="#"
              className="bg-primary hover:bg-primary/90 transition-colors duration-300 rounded-full px-6 py-2 text-black font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
            > */}
            <button
              onClick={() => setIsAuthModalOpen(true)} // Modified to open modal
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
            <Link href="/acheteur-interface">
            <button className="bg-primary-foreground hover:bg-primary-foreground/90 transition-colors duration-300 rounded-full p-3 shadow-md hover:shadow-lg">
              <Search className="h-5 w-5 text-white" />
            </button>
            </Link>
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
              href="/our-services"
              className="flex items-center gap-1 text-foreground hover:text-primary-foreground transition-colors duration-300"
            >
              خدماتنا
              <span className="text-primary text-lg">•</span>
            </Link>
            <Link href="#" className="text-foreground hover:text-primary-foreground transition-colors duration-300">
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

      {/* Hero Section */}
      <section className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-gradient-to-br from-primary-foreground to-primary-foreground/90 relative p-8 md:p-16 flex flex-col items-center md:items-start justify-center min-h-[600px]"
          >
            {/* <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
              <button className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-colors duration-300">
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
            </div> */}

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Image
                src="/quality_image.png?height=150&width=150"
                alt="Quality Badge"
                width={150}
                height={150}
                className="mb-8 drop-shadow-xl"
              />
            </motion.div>

            <div className="text-center md:text-right">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-white text-4xl md:text-5xl font-bold mb-4 drop-shadow-md"
              >
                منصة بيع وشراء الأغنام والماعز
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-primary text-3xl md:text-4xl font-bold mb-8 drop-shadow-md"
              >
                سهولة وثقة في كل خطوة
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col md:flex-row items-center gap-4 mt-8"
              >
                <Link
                  href="/acheteur-interface"
                  className="bg-white hover:bg-gray-100 transition-colors duration-300 rounded-full px-8 py-3 text-foreground font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span>ابحث الآن</span>
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
                </Link>
                <Link
                  href="#"
                  className="bg-transparent border border-white/30 hover:border-white/60 transition-all duration-300 text-white rounded-full px-4 py-2 text-sm shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  معا ضد غلاء الأسعار
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Image */}
          {/* <div className="relative overflow-hidden">
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
              <button className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-colors duration-300">
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </div>
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full h-full"
            >
              <Image
                src="/sheep.jpg?height=500&width=700"
                alt="Sheep in field"
                width={700}
                height={500}
                className="w-full h-full object-cover min-h-[600px]"
              />
            </motion.div>
          </div>
        </div>
      </section> */}

<div className="relative overflow-hidden">
  {/* Left button (now on the left side) */}
  <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
    <button 
      onClick={prevImage}
      className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-colors duration-300"
    >
      <ChevronLeft className="h-6 w-6 text-white" />
    </button>
  </div>

  {/* Right button */}
  <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
    <button 
      onClick={nextImage}
      className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-colors duration-300"
    >
      <ChevronRight className="h-6 w-6 text-white" />
    </button>
  </div>

  {/* Updated Image with Carousel */}
  <motion.div
    key={currentImageIndex}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="w-full h-full"
  >
    <Image
      src={images[currentImageIndex]}
      alt="Sheep in field"
      width={700}
      height={500}
      className="w-full h-full object-cover min-h-[600px]"
    />
  </motion.div>
</div>
        </div>
      </section>



      {/* Features Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="py-20 bg-background"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { title: "خدمة الزبائن", desc: "متوفر 24/7 لخدمة الزبائن", img:"/support.svg" },
              { title: "أقل مسافة", desc: "لتسليم الحيوانات للزبون", img:"/measurement.svg" },
              { title: "الجودة", desc: "نضمن جودة الأغنام", img:"/discount.svg" },
              { title: "أقل تكلفة", desc: "نضمن الحصول على أقل سعر", img:"/high-quality.svg" },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInScale} className="flex flex-col items-center text-center group">
                <div className="bg-primary rounded-full p-6 mb-6 shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-2">
                  <Image
                    src={`${feature.img}?height=40&width=40`}
                    alt={feature.title}
                    width={40}
                    height={40}
                    className="h-10 w-10"
                  />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="py-20 bg-gradient-to-b from-background to-white"
      >
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-2">
              <span className="w-1 h-6 bg-primary-foreground rounded-full"></span>
              <h2 className="text-2xl font-bold">من بين خدماتنا</h2>
            </div>
            <div className="flex gap-2">
              <button className="border border-muted-foreground/20 hover:border-muted-foreground/40 rounded-full p-2 transition-colors duration-300">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="border border-muted-foreground/20 hover:border-muted-foreground/40 rounded-full p-2 transition-colors duration-300">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "خدمة البحث المتقدم", subtitle: "", img:"/search.svg" },
              { title: "خدمة التتبع الفريد", subtitle: "(SCN)", img:"/sheep-icon.svg" },
              { title: "خدمة الدعم الفني", subtitle: "", img:"/support.svg" },
              { title: "ضمان الجودة", subtitle: "", img:"/quality-service.svg" },
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInScale}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white rounded-xl p-8 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="mb-6 bg-background p-4 rounded-full">
                  <Image src={`${service.img}?height=80&width=80`} alt={service.title} width={80} height={80} />
                </div>
                <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                {service.subtitle && <p className="text-sm text-primary-foreground font-medium">{service.subtitle}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Marquee Section */}
      <section className="py-12 overflow-hidden bg-white">
        <div className="whitespace-nowrap animate-marquee">
          <span className="inline-block mx-4 text-6xl font-bold text-gray-100">Agriculture</span>
          <span className="inline-block mx-4 text-6xl font-bold text-gray-100">*</span>
          <span className="inline-block mx-4 text-6xl font-bold text-gray-100">Farming</span>
          <span className="inline-block mx-4 text-6xl font-bold text-gray-100">*</span>
          <span className="inline-block mx-4 text-6xl font-bold text-gray-100">Sheep</span>
          <span className="inline-block mx-4 text-6xl font-bold text-gray-100">*</span>
          <span className="inline-block mx-4 text-6xl font-bold text-gray-100">Farming</span>
        </div>
      </section>

      {/* About Platform Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="py-20 bg-gradient-to-b from-white to-background"
      >
        <div className="container mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="p-8 flex items-center justify-center"
              >
                <Image
                  src="/she.jpg?height=400&width=400"
                  alt="Sheep"
                  width={400}
                  height={400}
                  className="rounded-xl shadow-lg"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="p-8 flex flex-col justify-center"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1 h-6 bg-primary-foreground rounded-full"></span>
                  <h2 className="text-sm font-medium text-primary-foreground">كيفية</h2>
                </div>
                <h2 className="text-3xl font-bold mb-4">منصة بيع وشراء الأغنام والماعز</h2>
                <h3 className="text-xl font-bold mb-6 text-primary-foreground">سهولة وثقة في كل خطوة</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  بحث وتسوق الأغنام بسهولة مع ضمان الجودة والسلامة. نحن نوفر لك تجربة شراء سلسة وآمنة مع أفضل المربين في
                  المنطقة.
                </p>
                <div>
                  <Link
                    href="/acheteur-interface"
                    className="bg-primary-foreground text-white rounded-full px-8 py-3 inline-flex items-center gap-2 shadow-lg hover:shadow-xl hover:bg-primary-foreground/90 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <span>استكشف الآن</span>
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
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      {/* <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="py-20 bg-background"
      >
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-2">
              <span className="w-1 h-6 bg-primary-foreground rounded-full"></span>
              <h2 className="text-2xl font-bold">آراء زبائننا</h2>
            </div>
            <div className="flex gap-2">
              <button className="border border-muted-foreground/20 hover:border-muted-foreground/40 rounded-full p-2 transition-colors duration-300">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="border border-muted-foreground/20 hover:border-muted-foreground/40 rounded-full p-2 transition-colors duration-300">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="flex mb-4">
                {[1, 2, 3, 4].map((_, index) => (
                  <Star key={index} className="h-5 w-5 fill-primary text-primary" />
                ))}
                <Star className="h-5 w-5 text-primary" />
              </div>
              <blockquote className="text-xl font-medium mb-8 leading-relaxed">
                "المنصة توفر لنا فرصة للوصول إلى المستهلكين بشكل مباشر مما يقلل من تكاليف الوسطاء!"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    src="/performance-review.png?height=60&width=60"
                    alt="Customer"
                    width={60}
                    height={60}
                    className="rounded-full border-2 border-primary"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-primary-foreground text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    <Star className="h-3 w-3 fill-white" />
                  </span>
                </div>
                <div>
                  <p className="font-bold">فاطمة الزهراء</p>
                  <p className="text-sm text-muted-foreground">مربية أغنام</p>
                </div>
              </div>
              <div className="flex gap-1 mt-8">
                <span className="h-2 w-8 rounded-full bg-primary"></span>
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <span key={index} className="h-2 w-2 rounded-full bg-gray-200"></span>
                ))}
              </div>
            </motion.div>




            <div className="hidden md:flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative w-80 h-80"
              >
                <Image
                  src="/femal1.jpg?height=320&width=320"
                  alt="Testimonial Illustration"
                  width={320}
                  height={320}
                  className="rounded-full"
                />
              </motion.div>
            </div> 


            <div className="hidden md:flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative w-80 h-80 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ring-4 ring-primary/50"
            >
              <Image
                src="/femal1.jpg?height=320&width=320"
                alt="Testimonial Illustration"
                width={320}
                height={320}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10"></div>
            </motion.div>
          </div>

          </div>
        </div>
      </motion.section> */}



<motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="py-20 bg-background"
      >
       <div className="container mx-auto">
  <div className="flex justify-between items-center mb-12">
    <div className="flex items-center gap-2">
      <span className="w-1 h-6 bg-primary-foreground rounded-full"></span>
      <h2 className="text-2xl font-bold">آراء زبائننا</h2>
    </div>
    <div className="flex gap-2">
      <button 
        onClick={prevTestimonial}
        className="border border-muted-foreground/20 hover:border-muted-foreground/40 rounded-full p-2 transition-colors duration-300"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button 
        onClick={nextTestimonial}
        className="border border-muted-foreground/20 hover:border-muted-foreground/40 rounded-full p-2 transition-colors duration-300"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <motion.div
      key={currentTestimonialIndex}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
    >
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i}
            className={`h-5 w-5 ${i < testimonials[currentTestimonialIndex].stars ? 'fill-primary text-primary' : 'text-primary'}`}
          />
        ))}
      </div>
      <blockquote className="text-xl font-medium mb-8 leading-relaxed">
        "{testimonials[currentTestimonialIndex].quote}"
      </blockquote>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Image
            src={`${testimonials[currentTestimonialIndex].avatar}?height=60&width=60`}
            alt="Customer"
            width={60}
            height={60}
            className="rounded-full border-2 border-primary"
          />
          <span className="absolute -bottom-1 -right-1 bg-primary-foreground text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            <Star className="h-3 w-3 fill-white" />
          </span>
        </div>
        <div>
          <p className="font-bold">{testimonials[currentTestimonialIndex].name}</p>
          <p className="text-sm text-muted-foreground">
            {testimonials[currentTestimonialIndex].role}
          </p>
        </div>
      </div>
    </motion.div>

    <div className="hidden md:flex items-center justify-center">
      <motion.div
        key={currentTestimonialIndex}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-80 h-80 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ring-4 ring-primary/50"
      >
        <Image
          src={`${testimonials[currentTestimonialIndex].image}?height=320&width=320`}
          alt="Testimonial Illustration"
          width={320}
          height={320}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10"></div>
      </motion.div>
    </div>
  </div>
</div>
      </motion.section>



      {/* Partners Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="py-20 bg-white"
      >
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">شركاؤنا</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              نفتخر بالتعاون مع أفضل الشركاء في مجال الزراعة وتربية المواشي لتقديم أفضل الخدمات لعملائنا
            </p>
          </div>

          {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <motion.div key={index} variants={fadeInScale} className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=60&width=120"
                  alt={`Partner ${index + 1}`}
                  width={120}
                  height={60}
                  className="opacity-70 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
                />
              </motion.div>
            ))}
          </div> */}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              "/onca-rm.png",
              "/gg-rm.png",
              "/minist-rm.png",
              "/onca-rm.png",
              "/gg-rm.png",
              "/minist-rm.png",
            ].map((imageSrc, index) => (
              <motion.div key={index} variants={fadeInScale} className="flex items-center justify-center">
                <Image
                  src={`${imageSrc}?height=60&width=120`}
                  alt={`Partner ${index + 1}`}
                  width={120}
                  height={60}
                  className="opacity-70 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
                />
              </motion.div>
            ))}
          </div>


        </div>
      </motion.section>

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
                <Link
                  href="#"
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-300"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-300"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-300"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-300"
                >
                  <Youtube className="h-5 w-5" />
                </Link>
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
                      <ArrowRight className="h-4 w-4 rotate-180" />
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
                        <ArrowRight className="h-4 w-4 rotate-180" />
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

