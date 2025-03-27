"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  BarChart3,
  Bell,
  ChevronDown,
  ClipboardList,
  Cog,
  FileText,
  Grid3X3,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Package,
  Plus,
  QrCode,
  Settings,
  ShoppingCart,
  Tag,
  Users,
  Wallet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLine,
  ChartXAxis,
  ChartYAxis,
  ChartArea,
} from "@/components/ui/chart"

import * as RechartsPrimitive from 'recharts'

export default function SellerDashboard() {
  const [language, setLanguage] = useState<"fr" | "ar">("fr")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  
  // Sample data for dashboard
  const stats = {
    activeListings: 24,
    totalViews: 1250,
    inquiries: 38,
    sales: 12,
    revenue: 42600,
    averagePrice: 100,
  }

  const recentInquiries = [
    {
      id: 1,
      buyerName: "Ahmed Tazi",
      buyerAvatar: "/femal1.jpg?height=40&width=40",
      sheepId: "SCN-12345-MA",
      sheepTitle: "Sardi Male - 1.5 years",
      date: "2023-11-15",
      status: "new",
      message: "Is this sheep still available? I'm interested in purchasing it for Eid.",
    },
    {
      id: 2,
      buyerName: "Fatima Alaoui",
      buyerAvatar: "/femal1.jpg?height=40&width=40",
      sheepId: "SCN-12346-MA",
      sheepTitle: "Timahdite Female - 2 years",
      date: "2023-11-14",
      status: "replied",
      message: "What is the exact weight of this sheep? And do you offer delivery to Casablanca?",
    },
    {
      id: 3,
      buyerName: "Karim Benjelloun",
      buyerAvatar: "/femal2.jpg?height=40&width=40",
      sheepId: "SCN-12348-MA",
      sheepTitle: "Beni Guil Male - 1 year",
      date: "2023-11-13",
      status: "new",
      message: "Can you provide more information about the vaccination history of this sheep?",
    },
  ]

  const popularListings = [
    {
      id: 1,
      title: "Sardi Male - Premium Quality",
      image: "/she.jpg?height=100&width=100",
      price: 4200,
      views: 320,
      inquiries: 15,
    },
    {
      id: 2,
      title: "Timahdite Female - Breeding",
      image: "/she.jpg?height=100&width=100",
      price: 3800,
      views: 280,
      inquiries: 12,
    },
    {
      id: 3,
      title: "D'man Male - Young",
      image: "/she.jpg?height=100&width=100",
      price: 2900,
      views: 210,
      inquiries: 8,
    },
  ]

  const marketTrends = [
    { month: "Jan", price: 3200 },
    { month: "Feb", price: 3300 },
    { month: "Mar", price: 3250 },
    { month: "Apr", price: 3400 },
    { month: "May", price: 3500 },
    { month: "Jun", price: 3600 },
    { month: "Jul", price: 3650 },
    { month: "Aug", price: 3700 },
    { month: "Sep", price: 3750 },
    { month: "Oct", price: 3800 },
    { month: "Nov", price: 3850 },
    { month: "Dec", price: 3900 },
  ]

  const salesByBreed = [
    { name: "Sardi", value: 45 },
    { name: "Timahdite", value: 25 },
    { name: "D'man", value: 15 },
    { name: "Beni Guil", value: 10 },
    { name: "Other", value: 5 },
  ]

  return (
    <div className="flex h-screen bg-[#f8f5f0]">
      {/* Sidebar */}
      <div
        className={`bg-[#0a5c36] text-white ${sidebarOpen ? "w-64" : "w-20"} transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between border-b border-[#0b6d40]">
          <div className="flex items-center gap-2">
            {sidebarOpen && (
              <Image
                src="/logo-rm.png?height=40&width=40"
                alt="Kebchi Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            {sidebarOpen ? (
              <h1 className="text-xl font-bold">KEBCHI</h1>
            ) : (
              <Image
                src="/logo-rm.png?height=30&width=30"
                alt="Kebchi Logo"
                width={30}
                height={30}
                className="rounded-full mx-auto"
              />
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-[#0b6d40]"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <ChevronDown className={`h-5 w-5 transition-transform ${sidebarOpen ? "" : "rotate-180"}`} />
          </Button>
        </div>

        <div className="flex-1 py-4 overflow-y-auto">
          <nav className="px-2 space-y-1">
            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md bg-[#0b6d40] text-white">
              <LayoutDashboard className="h-5 w-5" />
              {sidebarOpen && <span>{language === "fr" ? "Tableau de bord" : "لوحة التحكم"}</span>}
            </Link>

            <Link
              href="/sheep-management"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-white hover:bg-[#0b6d40]"
            >
              <Package className="h-5 w-5" />
              {sidebarOpen && <span>{language === "fr" ? "Gestion des moutons" : "إدارة الأغنام"}</span>}
            </Link>

            <Link
              href="/scn-management"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-white hover:bg-[#0b6d40]"
            >
              <QrCode className="h-5 w-5" />
              {sidebarOpen && <span>{language === "fr" ? "Gestion SCN" : "إدارة SCN"}</span>}
            </Link>

            <Link
              href="/inventory"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-white hover:bg-[#0b6d40]"
            >
              <ClipboardList className="h-5 w-5" />
              {sidebarOpen && <span>{language === "fr" ? "Inventaire" : "المخزون"}</span>}
            </Link>

            <Link
              href="/messages"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-white hover:bg-[#0b6d40]"
            >
              <MessageSquare className="h-5 w-5" />
              {sidebarOpen && (
                <div className="flex items-center justify-between w-full">
                  <span>{language === "fr" ? "Messages" : "الرسائل"}</span>
                  <Badge className="bg-red-500 text-white">3</Badge>
                </div>
              )}
              {!sidebarOpen && <Badge className="absolute right-2 bg-red-500 text-white">3</Badge>}
            </Link>

            <Link
              href="/analytics"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-white hover:bg-[#0b6d40]"
            >
              <BarChart3 className="h-5 w-5" />
              {sidebarOpen && <span>{language === "fr" ? "Analytique" : "التحليلات"}</span>}
            </Link>

            {/* <Link
              href="/business-tools"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-white hover:bg-[#0b6d40]"
            >
              <Wallet className="h-5 w-5" />
              {sidebarOpen && <span>{language === "fr" ? "Outils d'affaires" : "أدوات الأعمال"}</span>}
            </Link> */}

            {/* <Link
              href="/profile"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-white hover:bg-[#0b6d40]"
            >
              <Users className="h-5 w-5" />
              {sidebarOpen && <span>{language === "fr" ? "Profil" : "الملف الشخصي"}</span>}
            </Link> */}

            <Link
              href="/learning"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-white hover:bg-[#0b6d40]"
            >
              <FileText className="h-5 w-5" />
              {sidebarOpen && <span>{language === "fr" ? "Centre d'apprentissage" : "مركز التعلم"}</span>}
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-[#0b6d40]">
          <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-md text-white hover:bg-[#0b6d40]">
            <Settings className="h-5 w-5" />
            {sidebarOpen && <span>{language === "fr" ? "Paramètres" : "الإعدادات"}</span>}
          </Link>

          <Link href="/logout" className="flex items-center gap-3 px-3 py-2 rounded-md text-white hover:bg-[#0b6d40]">
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span>{language === "fr" ? "Déconnexion" : "تسجيل الخروج"}</span>}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b h-16 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-[#0a5c36]">
              {language === "fr" ? "Tableau de bord" : "لوحة التحكم"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                5
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/performance-review.png?height=32&width=32" alt="User" />
                    <AvatarFallback>MA</AvatarFallback>
                  </Avatar>
                  {language === "fr" ? "Mohammed Alami" : "محمد علمي"}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{language === "fr" ? "Mon compte" : "حسابي"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  <span>{language === "fr" ? "Profil" : "الملف الشخصي"}</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Cog className="mr-2 h-4 w-4" />
                  <span>{language === "fr" ? "Paramètres" : "الإعدادات"}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <button
                    className="flex items-center w-full"
                    onClick={() => setLanguage(language === "fr" ? "ar" : "fr")}
                  >
                    <span className="mr-2">🌐</span>
                    <span>{language === "fr" ? "العربية" : "Français"}</span>
                  </button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{language === "fr" ? "Déconnexion" : "تسجيل الخروج"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <Package className="h-8 w-8 text-[#0a5c36] mb-2" />
                <p className="text-sm text-gray-500">{language === "fr" ? "Annonces actives" : "الإعلانات النشطة"}</p>
                <h3 className="text-2xl font-bold">{stats.activeListings}</h3>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <Grid3X3 className="h-8 w-8 text-[#0a5c36] mb-2" />
                <p className="text-sm text-gray-500">{language === "fr" ? "Vues totales" : "إجمالي المشاهدات"}</p>
                <h3 className="text-2xl font-bold">{stats.totalViews}</h3>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <MessageSquare className="h-8 w-8 text-[#0a5c36] mb-2" />
                <p className="text-sm text-gray-500">{language === "fr" ? "Demandes" : "الاستفسارات"}</p>
                <h3 className="text-2xl font-bold">{stats.inquiries}</h3>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <ShoppingCart className="h-8 w-8 text-[#0a5c36] mb-2" />
                <p className="text-sm text-gray-500">{language === "fr" ? "Consulte Numero Tel" : "طلب رقم الهاتف"}</p>
                <h3 className="text-2xl font-bold">{stats.sales}</h3>
              </CardContent>
            </Card>

            {/* <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <Wallet className="h-8 w-8 text-[#0a5c36] mb-2" />
                <p className="text-sm text-gray-500">{language === "fr" ? "Revenus (MAD)" : "الإيرادات (درهم)"}</p>
                <h3 className="text-2xl font-bold">{stats.revenue.toLocaleString()}</h3>
              </CardContent>
            </Card> */}

            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <Tag className="h-8 w-8 text-[#0a5c36] mb-2" />
                <p className="text-sm text-gray-500">{language === "fr" ? "Nb des Moutons Verifier" : "عدد الاغنام تم التحقق منها"}</p>
                <h3 className="text-2xl font-bold">{stats.averagePrice}</h3>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Market Trends */}
            {/* <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>{language === "fr" ? "Tendances du marché" : "اتجاهات السوق"}</CardTitle>
                <CardDescription>
                  {language === "fr"
                    ? "Prix moyen des moutons au cours des 12 derniers mois"
                    : "متوسط أسعار الأغنام خلال الـ 12 شهرًا الماضية"}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer
                  data={marketTrends}
                  xAxisKey="month"
                  yAxisKey="value"
                  margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
                >
                  <ChartXAxis />
                  <ChartYAxis />
                  <ChartLine name="Average Price" dataKey="price" stroke="#0a5c36" strokeWidth={2} />
                  <ChartArea dataKey="price" fill="#0a5c36" fillOpacity={0.2} stroke="#0a5c36" strokeWidth={2} />
                  <ChartTooltip>
                    <ChartTooltipContent />
                  </ChartTooltip>
                </ChartContainer>
              </CardContent>
            </Card> */}

<Card className="lg:col-span-2">
  <CardHeader className="pb-2">
    <CardTitle>{language === "fr" ? "Tendances du marché" : "اتجاهات السوق"}</CardTitle>
    <CardDescription>
      {language === "fr"
        ? "Prix moyen des moutons au cours des 12 derniers mois"
        : "متوسط أسعار الأغنام خلال الـ 12 شهرًا الماضية"}
    </CardDescription>
  </CardHeader>
  <CardContent className="h-[300px]">
    <ChartContainer
      config={{
        price: {
          label: "Sheep Price",
          color: "#0a5c36"
        }
      }}
      data={marketTrends}
      xAxisKey="month"
      yAxisKey="value"
      margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
    >
      <RechartsPrimitive.ResponsiveContainer>
        <RechartsPrimitive.LineChart data={marketTrends}>
          <RechartsPrimitive.XAxis dataKey="month" />
          <RechartsPrimitive.YAxis />
          <RechartsPrimitive.Tooltip />
          <RechartsPrimitive.Line 
            type="monotone" 
            dataKey="price" 
            stroke="#0a5c36" 
            strokeWidth={2} 
          />
          <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
        </RechartsPrimitive.LineChart>
      </RechartsPrimitive.ResponsiveContainer>
    </ChartContainer>
  </CardContent>
</Card>

            {/* Sales by Breed */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>{language === "fr" ? "Ventes par race" : "المبيعات حسب السلالة"}</CardTitle>
                <CardDescription>
                  {language === "fr" ? "Répartition des ventes par race de mouton" : "توزيع المبيعات حسب سلالة الأغنام"}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center">
                  {/* This would be a pie chart in a real implementation */}
                  <div className="space-y-4 w-full">
                    {salesByBreed.map((breed, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{breed.name}</span>
                          <span className="text-sm font-medium">{breed.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-[#0a5c36] h-2 rounded-full" style={{ width: `${breed.value}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Inquiries */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>{language === "fr" ? "Demandes récentes" : "الاستفسارات الأخيرة"}</CardTitle>
                <CardDescription>
                  {language === "fr" ? "Dernières demandes de clients potentiels" : "أحدث استفسارات العملاء المحتملين"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="flex gap-4 p-3 rounded-lg bg-gray-50">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={inquiry.buyerAvatar} alt={inquiry.buyerName} />
                        <AvatarFallback>{inquiry.buyerName.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{inquiry.buyerName}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">{inquiry.date}</span>
                            {inquiry.status === "new" && (
                              <Badge className="bg-blue-500">{language === "fr" ? "Nouveau" : "جديد"}</Badge>
                            )}
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">{inquiry.sheepTitle}</span> ({inquiry.sheepId})
                        </p>

                        <p className="text-sm">{inquiry.message}</p>

                        <div className="flex gap-2 mt-2">
                          <Button size="sm" className="bg-[#0a5c36] hover:bg-[#0b6d40]">
                            {language === "fr" ? "Répondre" : "الرد"}
                          </Button>
                          <Button size="sm" variant="outline">
                            {language === "fr" ? "Voir les détails" : "عرض التفاصيل"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="link" className="mt-4 w-full text-[#0a5c36]">
                  {language === "fr" ? "Voir toutes les demandes" : "عرض جميع الاستفسارات"}
                </Button>
              </CardContent>
            </Card>

            {/* Popular Listings */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>{language === "fr" ? "Annonces populaires" : "الإعلانات الشائعة"}</CardTitle>
                <CardDescription>
                  {language === "fr" ? "Vos annonces les plus consultées" : "إعلاناتك الأكثر مشاهدة"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularListings.map((listing) => (
                    <div key={listing.id} className="flex gap-3 p-3 rounded-lg bg-gray-50">
                      <Image
                        src={listing.image || "/placeholder.svg"}
                        alt={listing.title}
                        width={60}
                        height={60}
                        className="rounded-md object-cover"
                      />

                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">{listing.title}</h4>
                        <p className="text-[#0a5c36] font-bold">{listing.price} MAD</p>

                        <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                          <span>
                            {listing.views} {language === "fr" ? "vues" : "مشاهدة"}
                          </span>
                          <span>
                            {listing.inquiries} {language === "fr" ? "demandes" : "استفسار"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="link" className="mt-4 w-full text-[#0a5c36]">
                  {language === "fr" ? "Voir toutes les annonces" : "عرض جميع الإعلانات"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">{language === "fr" ? "Actions rapides" : "إجراءات سريعة"}</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="bg-[#0a5c36] hover:bg-[#0b6d40] h-auto py-4 flex flex-col items-center">
                <Plus className="h-6 w-6 mb-2" />
                <span>{language === "fr" ? "Ajouter un mouton" : "إضافة خروف"}</span>
              </Button>

              <Button className="bg-[#0a5c36] hover:bg-[#0b6d40] h-auto py-4 flex flex-col items-center">
                <QrCode className="h-6 w-6 mb-2" />
                <span>{language === "fr" ? "Générer SCN" : "إنشاء SCN"}</span>
              </Button>

              <Button className="bg-[#0a5c36] hover:bg-[#0b6d40] h-auto py-4 flex flex-col items-center">
                <MessageSquare className="h-6 w-6 mb-2" />
                <span>{language === "fr" ? "Messages" : "الرسائل"}</span>
              </Button>

              <Button className="bg-[#0a5c36] hover:bg-[#0b6d40] h-auto py-4 flex flex-col items-center">
                <BarChart3 className="h-6 w-6 mb-2" />
                <span>{language === "fr" ? "Rapports" : "التقارير"}</span>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

