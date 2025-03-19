"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, CheckCircle, XCircle, AlertTriangle, Clipboard, Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


export default function SCNVerificationPage() {
  const [language, setLanguage] = useState<"fr" | "ar">("fr")
  const [scnCode, setSCNCode] = useState("")
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verified" | "partial" | "invalid">("idle")
  const [copied, setCopied] = useState(false)

  // Sample verification data
  const verificationData = {
    scnCode: "SCN-12345-MA",
    sheepInfo: {
      breed: "Sardi",
      birthDate: "2022-01-15",
      gender: "Male",
      origin: "Marrakech Region",
      breeder: "Ferme Alaoui",
    },
    healthInfo: {
      vaccinations: [
        { name: "Enterotoxemia", date: "2023-05-15", status: "valid" },
        { name: "Sheep Pox", date: "2023-06-20", status: "valid" },
        { name: "Brucellosis", date: "2023-07-10", status: "valid" },
      ],
      lastCheckup: "2023-08-05",
      healthStatus: "Excellent",
    },
  }

  const handleVerify = () => {
    if (scnCode === verificationData.scnCode) {
      setVerificationStatus("verified")
    } else if (scnCode.startsWith("SCN-")) {
      setVerificationStatus("partial")
    } else {
      setVerificationStatus("invalid")
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(verificationData.scnCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
            {/* <Button variant="outline" className="border-white text-white hover:bg-[#0b6d40]">
              {language === "fr" ? "Se connecter" : "تسجيل الدخول"}
            </Button> */}
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

           

          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#0a5c36] mb-4">
              {language === "fr" ? "Vérification SCN" : "التحقق من SCN"}
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              {language === "fr"
                ? "Vérifiez l'authenticité et l'historique de santé d'un mouton en utilisant son code SCN (Sheep Code Number)."
                : "تحقق من أصالة وتاريخ صحة الخروف باستخدام رمز SCN (رقم كود الخروف)."}
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  placeholder={
                    language === "fr" ? "Entrez le code SCN (ex: SCN-12345-MA)" : "أدخل رمز SCN (مثال: SCN-12345-MA)"
                  }
                  value={scnCode}
                  onChange={(e) => setSCNCode(e.target.value)}
                  className="flex-grow"
                />
                <Button className="bg-[#0a5c36] hover:bg-[#0b6d40]" onClick={handleVerify}>
                  <Search className="h-4 w-4 mr-2" />
                  {language === "fr" ? "Vérifier" : "تحقق"}
                </Button>
              </div>

              <div className="mt-4 text-sm text-gray-500 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1" />
                {language === "fr"
                  ? "Demandez toujours au vendeur le code SCN avant d'acheter un mouton."
                  : "اطلب دائمًا من البائع رمز SCN قبل شراء الخروف."}
              </div>
            </CardContent>
          </Card>

          {verificationStatus !== "idle" && (
            <Card className="mb-8 overflow-hidden">
              <div
                className={`p-4 text-white ${
                  verificationStatus === "verified"
                    ? "bg-green-600"
                    : verificationStatus === "partial"
                      ? "bg-yellow-500"
                      : "bg-red-600"
                }`}
              >
                <div className="flex items-center gap-2">
                  {verificationStatus === "verified" ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      <h2 className="font-semibold">{language === "fr" ? "Mouton vérifié" : "خروف متحقق منه"}</h2>
                    </>
                  ) : verificationStatus === "partial" ? (
                    <>
                      <AlertTriangle className="h-5 w-5" />
                      <h2 className="font-semibold">{language === "fr" ? "Vérification partielle" : "تحقق جزئي"}</h2>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5" />
                      <h2 className="font-semibold">{language === "fr" ? "Code SCN invalide" : "رمز SCN غير صالح"}</h2>
                    </>
                  )}
                </div>
              </div>

              {verificationStatus === "verified" && (
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <p className="text-sm text-gray-500">{language === "fr" ? "Code SCN" : "رمز SCN"}</p>
                      <p className="font-medium">{verificationData.scnCode}</p>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={copyToClipboard}>
                      {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                      {copied ? (language === "fr" ? "Copié" : "تم النسخ") : language === "fr" ? "Copier" : "نسخ"}
                    </Button>
                  </div>

                  <Tabs defaultValue="info">
                    <TabsList className="grid grid-cols-2 mb-6">
                      <TabsTrigger value="info">{language === "fr" ? "Informations" : "معلومات"}</TabsTrigger>
                      <TabsTrigger value="health">{language === "fr" ? "Santé" : "الصحة"}</TabsTrigger>
                    </TabsList>

                    <TabsContent value="info">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">{language === "fr" ? "Race" : "السلالة"}</p>
                          <p className="font-medium">{verificationData.sheepInfo.breed}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            {language === "fr" ? "Date de naissance" : "تاريخ الميلاد"}
                          </p>
                          <p className="font-medium">{verificationData.sheepInfo.birthDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{language === "fr" ? "Genre" : "الجنس"}</p>
                          <p className="font-medium">{verificationData.sheepInfo.gender}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{language === "fr" ? "Origine" : "المنشأ"}</p>
                          <p className="font-medium">{verificationData.sheepInfo.origin}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{language === "fr" ? "Éleveur" : "المربي"}</p>
                          <p className="font-medium">{verificationData.sheepInfo.breeder}</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="health">
                      <div>
                        <div className="mb-4">
                          <p className="text-sm text-gray-500">
                            {language === "fr" ? "État de santé" : "الحالة الصحية"}
                          </p>
                          <p className="font-medium">{verificationData.healthInfo.healthStatus}</p>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-gray-500">
                            {language === "fr" ? "Dernier examen médical" : "آخر فحص طبي"}
                          </p>
                          <p className="font-medium">{verificationData.healthInfo.lastCheckup}</p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500 mb-2">
                            {language === "fr" ? "Vaccinations" : "التطعيمات"}
                          </p>
                          <div className="space-y-2">
                            {verificationData.healthInfo.vaccinations.map((vaccination, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                                <div>
                                  <p className="font-medium">{vaccination.name}</p>
                                  <p className="text-sm text-gray-500">{vaccination.date}</p>
                                </div>
                                <Badge
                                  className={`${vaccination.status === "valid" ? "bg-green-500" : "bg-yellow-500"}`}
                                >
                                  {vaccination.status === "valid"
                                    ? language === "fr"
                                      ? "Valide"
                                      : "صالح"
                                    : language === "fr"
                                      ? "Expiré"
                                      : "منتهي الصلاحية"}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              )}

              {verificationStatus === "partial" && (
                <CardContent className="p-6">
                  <div className="text-center py-4">
                    <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      {language === "fr" ? "Vérification partielle" : "تحقق جزئي"}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {language === "fr"
                        ? "Le format du code semble correct, mais ce code spécifique n'est pas trouvé dans notre base de données."
                        : "يبدو تنسيق الرمز صحيحًا، ولكن هذا الرمز المحدد غير موجود في قاعدة بياناتنا."}
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-sm text-yellow-800">
                      {language === "fr"
                        ? "Veuillez vérifier le code et réessayer, ou contactez notre service d'assistance pour plus d'informations."
                        : "يرجى التحقق من الرمز والمحاولة مرة أخرى، أو الاتصال بخدمة الدعم لدينا لمزيد من المعلومات."}
                    </div>
                  </div>
                </CardContent>
              )}

              {verificationStatus === "invalid" && (
                <CardContent className="p-6">
                  <div className="text-center py-4">
                    <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      {language === "fr" ? "Code SCN invalide" : "رمز SCN غير صالح"}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {language === "fr"
                        ? "Le code que vous avez entré n'est pas un code SCN valide."
                        : "الرمز الذي أدخلته ليس رمز SCN صالحًا."}
                    </p>
                    <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-800">
                      {language === "fr"
                        ? "Les codes SCN valides commencent par 'SCN-' suivi de 5 chiffres et un code de région (ex: SCN-12345-MA)."
                        : "رموز SCN الصالحة تبدأ بـ 'SCN-' متبوعة بـ 5 أرقام ورمز المنطقة (مثال: SCN-12345-MA)."}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          )}

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-[#0a5c36] mb-4">
              {language === "fr" ? "À propos du système SCN" : "حول نظام SCN"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {language === "fr" ? "Qu'est-ce que le SCN?" : "ما هو SCN؟"}
                </h3>
                <p className="text-gray-700 mb-4">
                  {language === "fr"
                    ? "Le Sheep Code Number (SCN) est un système national d'identification et de traçabilité pour les moutons au Maroc. Chaque mouton enregistré reçoit un code unique qui permet de suivre son origine, son historique de santé et ses déplacements."
                    : "رقم كود الخروف (SCN) هو نظام وطني للتعريف وتتبع الأغنام في المغرب. يتلقى كل خروف مسجل رمزًا فريدًا يسمح بتتبع أصله وتاريخه الصحي وتحركاته."}
                </p>

                <h3 className="font-semibold text-lg mb-2">
                  {language === "fr" ? "Pourquoi est-ce important?" : "لماذا هو مهم؟"}
                </h3>
                <p className="text-gray-700">
                  {language === "fr"
                    ? "Le système SCN aide à prévenir la fraude, assure la qualité et la santé des moutons, et protège les acheteurs. Il permet également de suivre les épidémies potentielles et d'améliorer les pratiques d'élevage."
                    : "يساعد نظام SCN في منع الاحتيال، ويضمن جودة وصحة الأغنام، ويحمي المشترين. كما يسمح بتتبع الأوبئة المحتملة وتحسين ممارسات التربية."}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {language === "fr" ? "Comment lire un code SCN" : "كيفية قراءة رمز SCN"}
                </h3>
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <p className="font-medium mb-2">SCN-12345-MA</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>
                      <span className="font-medium">SCN-</span>:
                      {language === "fr" ? " Préfixe standard" : " بادئة قياسية"}
                    </li>
                    <li>
                      <span className="font-medium">12345</span>:
                      {language === "fr" ? " Numéro d'identification unique" : " رقم تعريف فريد"}
                    </li>
                    <li>
                      <span className="font-medium">MA</span>:
                      {language === "fr" ? " Code de région (Marrakech)" : " رمز المنطقة (مراكش)"}
                    </li>
                  </ul>
                </div>

                <h3 className="font-semibold text-lg mb-2">
                  {language === "fr" ? "Où trouver le code SCN" : "أين تجد رمز SCN"}
                </h3>
                <p className="text-gray-700">
                  {language === "fr"
                    ? "Le code SCN peut être trouvé sur l'étiquette d'oreille du mouton, sur les documents officiels fournis par l'éleveur, ou en scannant la puce RFID si le mouton en est équipé."
                    : "يمكن العثور على رمز SCN على علامة أذن الخروف، أو على المستندات الرسمية المقدمة من المربي، أو عن طريق مسح شريحة RFID إذا كان الخروف مجهزًا بها."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

