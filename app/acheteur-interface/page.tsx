"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, MapPin, Filter, List, Grid3X3, ChevronDown, Star, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function LandingPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [language, setLanguage] = useState<"fr" | "ar">("fr")

  // Sample featured listings data
  const featuredListings = [
    {
      id: 1,
      title: "Sardi Sheep - Male",
      price: 3500,
      location: "Marrakech",
      breed: "Sardi",
      age: "1.5 years",
      weight: "65 kg",
      sellerRating: 4.8,
      verified: true,
      image: "/she.jpg?height=300&width=400",
    },
    {
      id: 2,
      title: "Timahdite Sheep",
      price: 2800,
      location: "Fez",
      breed: "Timahdite",
      age: "2 years",
      weight: "70 kg",
      sellerRating: 4.5,
      verified: true,
      image: "/she.jpg?height=300&width=400",
    },
    {
      id: 3,
      title: "D'man Sheep - Female",
      price: 2200,
      location: "Ouarzazate",
      breed: "D'man",
      age: "1 year",
      weight: "45 kg",
      sellerRating: 4.2,
      verified: true,
      image: "/she.jpg?height=300&width=400",
    },
    {
      id: 4,
      title: "Beni Guil Sheep",
      price: 3200,
      location: "Oujda",
      breed: "Beni Guil",
      age: "1.8 years",
      weight: "60 kg",
      sellerRating: 4.7,
      verified: false,
      image: "/she.jpg?height=300&width=400",
    },
  ]

  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      {/* Header */}
      <header className="bg-[#0a5c36] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="/logo-rm.png?height=40&width=40"
              alt="Kebchi Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold">Kebchi</h1>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-white text-white bg-[#e3d674] hover:bg-[#0b6d40] ">
                  {language === "fr" ? "Français" : "العربية"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage("fr")}>Français</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("ar")}>العربية</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* <Button variant="outline" className="border-white bg-[#499471] text-white hover:bg-[#0b6d40]">
              {language === "fr" ? "Se connecter" : "تسجيل الدخول"}
            </Button> */}

            <Button variant="outline" className="border-white bg-[#499471] text-white hover:bg-[#0b6d40]">
              {language === "fr" ? "Verifier SCN" : "تحقق من SCN"}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Search */}
      <section className="relative h-[400px] flex items-center justify-center bg-gradient-to-r from-[#0a5c36] to-[#2a8c5e] text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('/farm.jpg?height=400&width=1200')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {language === "fr" ? "Trouvez le mouton parfait" : "ابحث عن الخروف المثالي"}
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {language === "fr"
              ? "Marché en ligne transparent pour acheter des moutons de qualité vérifiée"
              : "سوق عبر الإنترنت شفاف لشراء الأغنام ذات الجودة المتحقق منها"}
          </p>

          <div className="bg-white rounded-lg p-2 flex max-w-3xl mx-auto shadow-lg">
            <Input
              placeholder={language === "fr" ? "Rechercher par race, lieu..." : "البحث حسب السلالة، الموقع..."}
              className="flex-grow text-sm text-black border-none focus-visible:ring-0"
            />
            <Button className="bg-[#0a5c36] hover:bg-[#0b6d40]">
              <Search className="h-4 w-4 mr-2" />
              {language === "fr" ? "Rechercher" : "بحث"}
            </Button>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#0a5c36]">
            {language === "fr" ? "Carte des prix par région" : "خريطة الأسعار حسب المنطقة"}
          </h2>
          <Button variant="outline" className="border-[#0a5c36] text-[#0a5c36]">
            {language === "fr" ? "Voir en plein écran" : "عرض ملء الشاشة"}
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 h-[400px] relative">
          <div className="absolute inset-0 m-4">
            <Image
              src="/placeholder.svg?height=400&width=800"
              alt="Morocco Map"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>

          <div className="absolute bottom-6 right-6 bg-white p-2 rounded-md shadow-md">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-sm">{language === "fr" ? "Prix bas" : "سعر منخفض"}</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span className="text-sm">{language === "fr" ? "Prix moyen" : "سعر متوسط"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-sm">{language === "fr" ? "Prix élevé" : "سعر مرتفع"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Filters */}
      <section className="container mx-auto px-4 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-[#0a5c36]">
            {language === "fr" ? "Filtres rapides" : "تصفية سريعة"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {language === "fr" ? "Fourchette de prix (MAD)" : "نطاق السعر (درهم)"}
              </label>
              <div className="flex items-center gap-2">
                <Input placeholder="Min" type="number" className="w-full" />
                <span>-</span>
                <Input placeholder="Max" type="number" className="w-full" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{language === "fr" ? "Localisation" : "الموقع"}</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={language === "fr" ? "Toutes les régions" : "جميع المناطق"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marrakech">Marrakech</SelectItem>
                  <SelectItem value="casablanca">Casablanca</SelectItem>
                  <SelectItem value="rabat">Rabat</SelectItem>
                  <SelectItem value="fez">Fez</SelectItem>
                  <SelectItem value="tangier">Tangier</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{language === "fr" ? "Race" : "السلالة"}</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={language === "fr" ? "Toutes les races" : "جميع السلالات"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sardi">Sardi</SelectItem>
                  <SelectItem value="timahdite">Timahdite</SelectItem>
                  <SelectItem value="dman">D'man</SelectItem>
                  <SelectItem value="beni-guil">Beni Guil</SelectItem>
                  <SelectItem value="boujaad">Boujaad</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button className="w-full bg-[#0a5c36] hover:bg-[#0b6d40]">
                <Filter className="h-4 w-4 mr-2" />
                {language === "fr" ? "Appliquer les filtres" : "تطبيق التصفية"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="container mx-auto px-4 mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#0a5c36]">
            {language === "fr" ? "Moutons en vedette" : "الأغنام المميزة"}
          </h2>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-[#0a5c36] hover:bg-[#0b6d40]" : ""}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-[#0a5c36] hover:bg-[#0b6d40]" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredListings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image src={listing.image || "/placeholder.svg"} alt={listing.title} fill className="object-cover" />
                  {listing.verified && (
                    <Badge className="absolute top-2 right-2 bg-[#0a5c36]">
                      <Check className="h-3 w-3 mr-1" />
                      SCN
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{listing.title}</h3>
                  <p className="text-xl font-bold text-[#0a5c36] mb-2">{listing.price} MAD</p>

                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {listing.location}
                  </div>

                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{listing.breed}</span>
                    <span>{listing.age}</span>
                    <span>{listing.weight}</span>
                  </div>

                  <div className="flex items-center text-sm">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1">{listing.sellerRating}</span>
                    </div>
                    <Button variant="link" className="ml-auto p-0 h-auto text-[#0a5c36]">
                      {language === "fr" ? "Voir détails" : "عرض التفاصيل"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {featuredListings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <div className="relative h-48 md:h-auto md:w-1/4">
                    <Image
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      fill
                      className="object-cover"
                    />
                    {listing.verified && (
                      <Badge className="absolute top-2 right-2 bg-[#0a5c36]">
                        <Check className="h-3 w-3 mr-1" />
                        SCN
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4 md:w-3/4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{listing.title}</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {listing.location}
                        </div>
                      </div>
                      <p className="text-xl font-bold text-[#0a5c36]">{listing.price} MAD</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="text-sm">
                        <span className="text-gray-500">{language === "fr" ? "Race:" : "السلالة:"}</span>
                        <span className="ml-1 font-medium">{listing.breed}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">{language === "fr" ? "Âge:" : "العمر:"}</span>
                        <span className="ml-1 font-medium">{listing.age}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">{language === "fr" ? "Poids:" : "الوزن:"}</span>
                        <span className="ml-1 font-medium">{listing.weight}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1">{listing.sellerRating}</span>
                        <span className="ml-1 text-gray-500">{language === "fr" ? "Vendeur" : "البائع"}</span>
                      </div>
                      <Button className="bg-[#0a5c36] hover:bg-[#0b6d40]">
                        {language === "fr" ? "Voir détails" : "عرض التفاصيل"}
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Button variant="outline" className="border-[#0a5c36] text-[#0a5c36]">
            {language === "fr" ? "Voir plus de moutons" : "عرض المزيد من الأغنام"}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a5c36] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Kebchi</h3>
              <p className="text-sm opacity-80">
                {language === "fr"
                  ? "Plateforme de marché en ligne pour l'achat et la vente de moutons au Maroc."
                  : "منصة سوق عبر الإنترنت لشراء وبيع الأغنام في المغرب."}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{language === "fr" ? "Liens rapides" : "روابط سريعة"}</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link href="#">{language === "fr" ? "À propos" : "حول"}</Link>
                </li>
                <li>
                  <Link href="#">{language === "fr" ? "Comment ça marche" : "كيف يعمل"}</Link>
                </li>
                <li>
                  <Link href="#">{language === "fr" ? "Vérification SCN" : "التحقق من SCN"}</Link>
                </li>
                <li>
                  <Link href="#">{language === "fr" ? "Devenir vendeur" : "كن بائعًا"}</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{language === "fr" ? "Aide & Support" : "المساعدة والدعم"}</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link href="#">{language === "fr" ? "FAQ" : "الأسئلة الشائعة"}</Link>
                </li>
                <li>
                  <Link href="#">{language === "fr" ? "Contactez-nous" : "اتصل بنا"}</Link>
                </li>
                <li>
                  <Link href="#">{language === "fr" ? "Signaler un problème" : "الإبلاغ عن مشكلة"}</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{language === "fr" ? "Légal" : "قانوني"}</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link href="#">{language === "fr" ? "Conditions d'utilisation" : "شروط الاستخدام"}</Link>
                </li>
                <li>
                  <Link href="#">{language === "fr" ? "Politique de confidentialité" : "سياسة الخصوصية"}</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm opacity-70">
            <p>© 2025 Kebchi. {language === "fr" ? "Tous droits réservés." : "جميع الحقوق محفوظة."}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

