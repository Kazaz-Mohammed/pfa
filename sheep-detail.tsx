"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Check,
  MapPin,
  Phone,
  MessageCircle,
  Share2,
  Heart,
  AlertTriangle,
  ChevronDown,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function SheepDetailPage() {
  const [language, setLanguage] = useState<"fr" | "ar">("fr")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isSCNVerified, setIsSCNVerified] = useState(false)
  const [scnCode, setSCNCode] = useState("")

  // Sample sheep data
  const sheep = {
    id: 1,
    title:  {
      fr: "Bélier Sardi - Premium Mâle",
      ar: "كبش السردي - ذكر ممتاز"
    },
    price: 3500,
    location: "Marrakech",
    breed: "Sardi",
    age: "1.5 years",
    weight: "65 kg",
    color: {
      fr:"White with black markings",
      ar:"ابيض مع بقع سوداء"
    },
    height: "75 cm",
    sellerRating: 4.8,
    sellerName: "Mohammed Alami",
    sellerJoined: "2022",
    sellerLocation: "Marrakech",
    sellerPhone: "+212 6XX XXX XXX",
    verified: true,
    scnCode: "SCN-12345-MA",
    description:{
      fr:"This premium Sardi sheep is in excellent health and has been raised in optimal conditions. It has a strong build with the characteristic features of the Sardi breed, including a well-developed body and distinctive coloration. The sheep has been regularly checked by veterinarians and has all necessary vaccinations.",
      ar:"يتمتع هذا الخروف السردي الفاخر بصحة ممتازة، وقد رُبي في ظروف مثالية. يتميز ببنية قوية تحمل السمات المميزة لسلالة السردي، بما في ذلك جسم متطور ولون مميز. خضع الخروف لفحص بيطري منتظم، وحصل على جميع التطعيمات اللازمة."
    }
      ,
    images: [
      "/shee.jpg?height=600&width=800",
      "/she.jpg?height=600&width=800",
      "/shee.jpg?height=600&width=800",
      "/she.jpg?height=600&width=800",
    ],
    healthInfo: {
      vaccinations: [
        { name: "Enterotoxemia", date: "2023-05-15" },
        { name: "Sheep Pox", date: "2023-06-20" },
        { name: "Brucellosis", date: "2023-07-10" },
      ],
      lastCheckup: "2023-08-05",
      vetName: "Dr. Karim Benali",
      healthStatus: "Excellent",
    },
    similarListings: [
      {
        id: 2,
        title: {
          fr:"Sardi Sheep - Young Male",
          ar:"خروف سردى - ذكر صغير"
        },
        price: 3200,
        location: "Marrakech",
        image: "/shee.jpg?height=300&width=400",
      },
      {
        id: 3,
        title: {
          fr:"Sardi Sheep - Female",
          ar:"خروف ساردي - أنثى"
        },
        price: 3300,
        location: "Rabat",
        image: "/she.jpg?height=300&width=400",
      },
      {
        id: 4,
        title: {
          fr:"Timahdite Sheep - Male",
          ar:"خروف تيمحديت - ذكر"
        },
        price: 2800,
        location: "Fez",
        image: "/shee.jpg?height=300&width=400",
      },
    ],
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === sheep.images.length - 1 ? 0 : prevIndex + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? sheep.images.length - 1 : prevIndex - 1))
  }

  const verifySCN = () => {
    if (scnCode === sheep.scnCode) {
      setIsSCNVerified(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      {/* Header */}
      <header className="bg-[#0a5c36] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image
                src="/logo-rm.png?height=40&width=40"
                alt="Kebchi Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
            </Link>
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

            <Button variant="outline" className="border-white bg-[#499471] text-white hover:bg-[#0b6d40]">
                          {language === "fr" ? "Verifier SCN" : "تحقق من SCN"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="flex text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#0a5c36]">
              {language === "fr" ? "Accueil" : "الرئيسية"}
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link href="/search" className="text-gray-500 hover:text-[#0a5c36]">
              {language === "fr" ? "Recherche" : "بحث"}
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-[#0a5c36] font-medium">{sheep.title[language]}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px]">
                <Image
                  src={sheep.images[currentImageIndex] || "/placeholder.svg"}
                  alt={sheep.title[language]}
                  fill
                  className="object-contain"
                />

                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                {sheep.verified && (
                  <Badge className="absolute top-4 right-4 bg-[#0a5c36]">
                    <Check className="h-3 w-3 mr-1" />
                    SCN {language === "fr" ? "Vérifié" : "تم التحقق"}
                  </Badge>
                )}
              </div>

              <div className="p-4 flex justify-center gap-2">
                {sheep.images.map((image, index) => (
                  <button
                    key={index}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
                      index === currentImageIndex ? "border-[#0a5c36]" : "border-transparent"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sheep Details */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-2xl font-bold">{sheep.title[language]}</h1>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Heart className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <p className="text-3xl font-bold text-[#0a5c36] mb-4">{sheep.price} MAD</p>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  {sheep.location}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-sm">
                    <span className="text-gray-500">{language === "fr" ? "Race:" : "السلالة:"}</span>
                    <span className="ml-1 font-medium">{sheep.breed}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">{language === "fr" ? "Âge:" : "العمر:"}</span>
                    <span className="ml-1 font-medium">{sheep.age}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">{language === "fr" ? "Poids:" : "الوزن:"}</span>
                    <span className="ml-1 font-medium">{sheep.weight}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">{language === "fr" ? "Couleur:" : "اللون:"}</span>
                    <span className="ml-1 font-medium">{sheep.color[language]}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">{language === "fr" ? "Hauteur:" : "الارتفاع:"}</span>
                    <span className="ml-1 font-medium">{sheep.height}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <h3 className="font-semibold mb-2">{language === "fr" ? "Vendeur" : "البائع"}</h3>
                  <div className="flex items-center gap-3 mb-2">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Seller"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">{sheep.sellerName}</p>
                      <div className="flex items-center text-sm">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1">{sheep.sellerRating}</span>
                        <span className="ml-1 text-gray-500">
                          {language === "fr" ? `Membre depuis ${sheep.sellerJoined}` : `عضو منذ ${sheep.sellerJoined}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button className="bg-[#0a5c36] hover:bg-[#0b6d40]">
                    <Phone className="h-4 w-4 mr-2" />
                    {language === "fr" ? "Afficher le numéro" : "إظهار الرقم"}
                  </Button>
                  <Button variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {language === "fr" ? "Contacter le vendeur" : "الاتصال بالبائع"}
                  </Button>
                </div>

                <div className="mt-6 text-sm text-gray-500 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  {language === "fr"
                    ? "Vérifiez toujours le code SCN avant l'achat"
                    : "تحقق دائمًا من رمز SCN قبل الشراء"}
                </div>
              </CardContent>
            </Card>

            {/* SCN Verification */}
            <Card className="mt-4">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">{language === "fr" ? "Vérification SCN" : "التحقق من SCN"}</h3>

                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder={language === "fr" ? "Entrez le code SCN" : "أدخل رمز SCN"}
                    value={scnCode}
                    onChange={(e) => setSCNCode(e.target.value)}
                  />
                  <Button className="bg-[#0a5c36] hover:bg-[#0b6d40]" onClick={verifySCN}>
                    {language === "fr" ? "Vérifier" : "تحقق"}
                  </Button>
                </div>

                {isSCNVerified ? (
                  <div className="bg-green-50 border border-green-200 rounded-md p-3 flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800">
                        {language === "fr" ? "Code SCN vérifié" : "تم التحقق من رمز SCN"}
                      </p>
                      <p className="text-sm text-green-700">
                        {language === "fr"
                          ? "Ce mouton est authentique et enregistré dans le système national."
                          : "هذا الخروف أصلي ومسجل في النظام الوطني."}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">
                    {language === "fr"
                      ? "Demandez au vendeur le code SCN et vérifiez l'authenticité du mouton."
                      : "اطلب من البائع رمز SCN وتحقق من أصالة الخروف."}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs for Description, Health Info, etc. */}
        <div className="mt-8">
          <Tabs defaultValue="description">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="description">{language === "fr" ? "Description" : "الوصف"}</TabsTrigger>
              <TabsTrigger value="health">{language === "fr" ? "Informations de santé" : "معلومات صحية"}</TabsTrigger>
              <TabsTrigger value="price">{language === "fr" ? "Comparaison de prix" : "مقارنة الأسعار"}</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">{language === "fr" ? "Description" : "الوصف"}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">{sheep.description[language]}</p>

              <h4 className="font-semibold mt-6 mb-2">
                {language === "fr" ? "Caractéristiques de la race Sardi" : "خصائص سلالة السردي"}
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>{language === "fr" ? "Corps robuste et bien développé" : "جسم قوي ومتطور جيدًا"}</li>
                <li>{language === "fr" ? "Laine de haute qualité" : "صوف عالي الجودة"}</li>
                <li>
                  {language === "fr" ? "Excellente adaptation au climat marocain" : "تكيف ممتاز مع المناخ المغربي"}
                </li>
                <li>{language === "fr" ? "Bonne résistance aux maladies" : "مقاومة جيدة للأمراض"}</li>
              </ul>
            </TabsContent>

            <TabsContent value="health" className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">
                {language === "fr" ? "Informations de santé" : "معلومات صحية"}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">{language === "fr" ? "État de santé" : "الحالة الصحية"}</h4>
                  <p className="text-gray-700 mb-4">{sheep.healthInfo.healthStatus}</p>

                  <h4 className="font-semibold mb-2">{language === "fr" ? "Dernier examen" : "الفحص الأخير"}</h4>
                  <p className="text-gray-700 mb-4">{sheep.healthInfo.lastCheckup}</p>

                  <h4 className="font-semibold mb-2">{language === "fr" ? "Vétérinaire" : "الطبيب البيطري"}</h4>
                  <p className="text-gray-700">{sheep.healthInfo.vetName}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    {language === "fr" ? "Historique des vaccinations" : "تاريخ التطعيمات"}
                  </h4>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">{language === "fr" ? "Vaccin" : "اللقاح"}</th>
                        <th className="text-left py-2">{language === "fr" ? "Date" : "التاريخ"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sheep.healthInfo.vaccinations.map((vaccination, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2">{vaccination.name}</td>
                          <td className="py-2">{vaccination.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="price" className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">
                {language === "fr" ? "Comparaison de prix" : "مقارنة الأسعار"}
              </h3>

              <div className="mb-6">
                <h4 className="font-semibold mb-2">
                  {language === "fr" ? "Prix moyen pour la race Sardi" : "متوسط السعر لسلالة السردي"}
                </h4>
                <div className="h-10 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0a5c36] flex items-center justify-end px-3 text-white text-sm font-medium"
                    style={{ width: "70%" }}
                  >
                    3200 MAD
                  </div>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>2000 MAD</span>
                  <span className="font-bold text-[#0a5c36]">{language === "fr" ? "Ce mouton: 3500 MAD" : "ثمن هذا غنم: 3500 درهم"}</span>
                  <span>5000 MAD</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-2">
                  {language === "fr" ? "Tendance des prix (6 derniers mois)" : "اتجاه الأسعار (الأشهر الستة الماضية)"}
                </h4>
                <div className="h-40 bg-white border rounded-md p-2">
                  {/* Placeholder for price chart */}
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    {language === "fr" ? "Graphique de tendance des prix" : "رسم بياني لاتجاه الأسعار"}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">{language === "fr" ? "Prévision des prix" : "توقعات الأسعار"}</h4>
                <p className="text-sm text-gray-700 mb-2">
                  {language === "fr"
                    ? "Basé sur les tendances historiques, les prix pour cette race devraient:"
                    : "بناءً على الاتجاهات التاريخية، من المتوقع أن تكون أسعار هذه السلالة:"}
                </p>
                <div className="flex items-center gap-2 text-green-600">
                  <ChevronDown className="h-4 w-4 rotate-180" />
                  <span className="font-medium">
                    {language === "fr"
                      ? "Augmenter de 5-10% dans les prochaines semaines"
                      : "زيادة بنسبة 5-10٪ في الأسابيع القادمة"}
                  </span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Similar Listings */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[#0a5c36] mb-6">
            {language === "fr" ? "Moutons similaires" : "أغنام مماثلة"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sheep.similarListings.map((listing: {
    id: number;
    title: { fr: string; ar: string };
    price: number;
    location: string;
    image: string;
}) => (
              <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image src={listing.image || "/placeholder.svg"} alt={listing.title[language]} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{listing.title[language]}</h3>
                  <p className="text-xl font-bold text-[#0a5c36] mb-2">{listing.price} MAD</p>

                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {listing.location}
                  </div>

                  <Button variant="link" className="mt-2 p-0 h-auto text-[#0a5c36]">
                    {language === "fr" ? "Voir détails" : "عرض التفاصيل"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

