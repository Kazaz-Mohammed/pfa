"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Bell,
  ChevronDown,
  Download,
  Filter,
  LogOut,
  Package,
  Plus,
  QrCode,
  Search,
  Settings,
  Users,
  Cog,
  Edit,
  Trash2,
  MoreVertical,
  FileText,
  Printer,
  Share2,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRightLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for SCN certificates
const scnData = [
  {
    id: 1,
    scnId: "SCN-12345-MA",
    sheepName: "Sardi Male - 1.5 years",
    issueDate: "2023-10-15",
    validUntil: "2024-10-15",
    status: "active",
    breed: "Sardi",
    gender: "Male",
    age: "1.5 years",
    weight: "65 kg",
    healthStatus: "Excellent",
    vaccinationHistory: [
      { vaccine: "Anthrax", date: "2023-08-10" },
      { vaccine: "Clostridial", date: "2023-08-10" },
      { vaccine: "Pasteurellosis", date: "2023-09-05" }
    ],
    ownershipHistory: [
      { owner: "Mohammed Alami", from: "2023-10-15", to: "Present" }
    ],
    sheepImage: "/placeholder.svg?height=80&width=80",
    qrCodeImage: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    scnId: "SCN-12346-MA",
    sheepName: "Timahdite Female - 2 years",
    issueDate: "2023-10-12",
    validUntil: "2024-10-12",
    status: "active",
    breed: "Timahdite",
    gender: "Female",
    age: "2 years",
    weight: "55 kg",
    healthStatus: "Good",
    vaccinationHistory: [
      { vaccine: "Anthrax", date: "2023-08-05" },
      { vaccine: "Clostridial", date: "2023-08-05" },
      { vaccine: "Pasteurellosis", date: "2023-09-01" }
    ],
    ownershipHistory: [
      { owner: "Mohammed Alami", from: "2023-10-12", to: "Present" }
    ],
    sheepImage: "/placeholder.svg?height=80&width=80",
    qrCodeImage: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    scnId: "SCN-12347-MA",
    sheepName: "D'man Male - 1 year",
    issueDate: "2023-10-10",
    validUntil: "2024-10-10",
    status: "active",
    breed: "D'man",
    gender: "Male",
    age: "1 year",
    weight: "45 kg",
    healthStatus: "Good",
    vaccinationHistory: [
      { vaccine: "Anthrax", date: "2023-08-01" },
      { vaccine: "Clostridial", date: "2023-08-01" },
      { vaccine: "Pasteurellosis", date: "2023-08-20" }
    ],
    ownershipHistory: [
      { owner: "Mohammed Alami", from: "2023-10-10", to: "Present" }
    ],
    sheepImage: "/placeholder.svg?height=80&width=80",
    qrCodeImage: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    scnId: "SCN-12348-MA",
    sheepName: "Beni Guil Male - 1 year",
    issueDate: "2023-10-08",
    validUntil: "2024-10-08",
    status: "expired",
    breed: "Beni Guil",
    gender: "Male",
    age: "1 year",
    weight: "50 kg",
    healthStatus: "Good",
    vaccinationHistory: [
      { vaccine: "Anthrax", date: "2023-07-25" },
      { vaccine: "Clostridial", date: "2023-07-25" },
      { vaccine: "Pasteurellosis", date: "2023-08-15" }
    ],
    ownershipHistory: [
      { owner: "Mohammed Alami", from: "2023-10-08", to: "Present" }
    ],
    sheepImage: "/placeholder.svg?height=80&width=80",
    qrCodeImage: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    scnId: "SCN-12349-MA",
    sheepName: "Sardi Female - 3 years",
    issueDate: "2023-10-05",
    validUntil: "2024-10-05",
    status: "transferred",
    breed: "Sardi",
    gender: "Female",
    age: "3 years",
    weight: "70 kg",
    healthStatus: "Excellent",
    vaccinationHistory: [
      { vaccine: "Anthrax", date: "2023-07-20" },
      { vaccine: "Clostridial", date: "2023-07-20" },
      { vaccine: "Pasteurellosis", date: "2023-08-10" }
    ],
    ownershipHistory: [
      { owner: "Mohammed Alami", from: "2023-10-05", to: "2023-12-15" },
      { owner: "Karim Benjelloun", from: "2023-12-15", to: "Present" }
    ],
    sheepImage: "/placeholder.svg?height=80&width=80",
    qrCodeImage: "/placeholder.svg?height=200&width=200",
  },
];

export default function SCNManagement() {
  const [language, setLanguage] = useState<"fr" | "ar">("fr")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedScn, setSelectedScn] = useState<any>(null)
  const [viewCertificate, setViewCertificate] = useState(false)

  const filteredScn = scnData.filter((scn) => {
    const matchesSearch = scn.scnId.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          scn.sheepName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || scn.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500">{language === "fr" ? "Actif" : "نشط"}</Badge>;
      case 'expired':
        return <Badge className="bg-red-500">{language === "fr" ? "Expiré" : "منتهي"}</Badge>;
      case 'transferred':
        return <Badge className="bg-blue-500">{language === "fr" ? "Transféré" : "محول"}</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  const handleViewCertificate = (scn: any) => {
    setSelectedScn(scn);
    setViewCertificate(true);
  };

  return (
    <div className="flex min-h-screen bg-[#f8f5f0]">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b h-16 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-[#0a5c36] hover:underline">
              {language === "fr" ? "Tableau de bord" : "لوحة التحكم"}
            </Link>
            <span className="text-gray-400">/</span>
            <h1 className="text-xl font-bold text-[#0a5c36]">
              {language === "fr" ? "Gestion SCN" : "إدارة SCN"}
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
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold text-[#0a5c36]">
                {language === "fr" ? "Certificats SCN" : "شهادات SCN"}
              </h2>
              <p className="text-gray-600">
                {language === "fr" 
                  ? "Gérez les certificats d'identification des moutons" 
                  : "إدارة شهادات تعريف الأغنام"}
              </p>
            </div>

            <Button className="bg-[#0a5c36] hover:bg-[#0b6d40]">
              <QrCode className="mr-2 h-5 w-5" />
              {language === "fr" ? "Générer un nouveau SCN" : "إنشاء SCN جديد"}
            </Button>
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input 
                    className="pl-10" 
                    placeholder={language === "fr" ? "Rechercher par ID SCN ou nom de mouton..." : "البحث بمعرف SCN أو اسم الخروف..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex gap-4">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={language === "fr" ? "Statut" : "الحالة"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{language === "fr" ? "Tous les statuts" : "جميع الحالات"}</SelectItem>
                      <SelectItem value="active">{language === "fr" ? "Actif" : "نشط"}</SelectItem>
                      <SelectItem value="expired">{language === "fr" ? "Expiré" : "منتهي"}</SelectItem>
                      <SelectItem value="transferred">{language === "fr" ? "Transféré" : "محول"}</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SCN List */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>{language === "fr" ? "Liste des certificats SCN" : "قائمة شهادات SCN"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{language === "fr" ? "ID SCN" : "معرف SCN"}</TableHead>
                      <TableHead>{language === "fr" ? "Mouton" : "الخروف"}</TableHead>
                      <TableHead>{language === "fr" ? "Date d'émission" : "تاريخ الإصدار"}</TableHead>
                      <TableHead>{language === "fr" ? "Valide jusqu'au" : "صالح حتى"}</TableHead>
                      <TableHead>{language === "fr" ? "Race" : "السلالة"}</TableHead>
                      <TableHead>{language === "fr" ? "Statut" : "الحالة"}</TableHead>
                      <TableHead className="text-right">{language === "fr" ? "Actions" : "إجراءات"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredScn.map((scn) => (
                      <TableRow key={scn.id}>
                        <TableCell className="font-medium">{scn.scnId}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Image 
                              src={scn.sheepImage} 
                              alt={scn.sheepName} 
                              width={40} 
                              height={40} 
                              className="rounded-md object-cover"
                            />
                            <span>{scn.sheepName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{scn.issueDate}</TableCell>
                        <TableCell>{scn.validUntil}</TableCell>
                        <TableCell>{scn.breed}</TableCell>
                        <TableCell>
                          {getStatusBadge(scn.status)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8"
                              onClick={() => handleViewCertificate(scn)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              {language === "fr" ? "Voir" : "عرض"}
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Printer className="mr-2 h-4 w-4" />
                                  <span>{language === "fr" ? "Imprimer" : "طباعة"}</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" />
                                  <span>{language === "fr" ? "Télécharger" : "تحميل"}</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share2 className="mr-2 h-4 w-4" />
                                  <span>{language === "fr" ? "Partager" : "مشاركة"}</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  <span>{language === "fr" ? "Modifier" : "تعديل"}</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <ArrowRightLeft className="mr-2 h-4 w-4" />
                                  <span>{language === "fr" ? "Transférer" : "تحويل"}</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>{language === "fr" ? "Supprimer" : "حذف"}</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardContent>
          </Card>
        </main>

        {/* Certificate Viewer Dialog */}
        <Dialog open={viewCertificate} onOpenChange={setViewCertificate}>
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5 text-[#0a5c36]" />
                {language === "fr" ? "Certificat SCN" : "شهادة SCN"} - {selectedScn?.scnId}
              </DialogTitle>
            </DialogHeader>

            {selectedScn && (
              <div className="mt-4">
                <Tabs defaultValue="certificate">
                  <TabsList className="w-full mb-4">
                    <TabsTrigger value="certificate" className="flex-1">
                      <FileText className="h-4 w-4 mr-2" />
                      {language === "fr" ? "Certificat" : "الشهادة"}
                    </TabsTrigger>
                    <TabsTrigger value="history" className="flex-1">
                      <Clock className="h-4 w-4 mr-2" />
                      {language === "fr" ? "Historique" : "السجل"}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="certificate">
                    <div className="border rounded-lg p-4 bg-white">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                          <Image 
                            src="/placeholder.svg?height=50&width=50" 
                            alt="Kebchi Logo" 
                            width={50} 
                            height={50} 
                            className="rounded-full"
                          />
                          <div>
                            <h3 className="font-bold text-lg">Kebchi SCN</h3>
                            <p className="text-sm text-gray-500">
                              {language === "fr" ? "Système de certification nationale" : "نظام الشهادات الوطني"}
                            </p>
                          </div>
                        </div>
                        <Badge className={`
                          ${selectedScn.status === 'active' ? 'bg-green-500' : ''} 
                          ${selectedScn.status === 'expired' ? 'bg-red-500' : ''} 
                          ${selectedScn.status === 'transferred' ? 'bg-blue-500' : ''}
                          text-lg py-1 px-3
                        `}>
                          {selectedScn.status === 'active' && (language === "fr" ? "Actif" : "نشط")}
                          {selectedScn.status === 'expired' && (language === "fr" ? "Expiré" : "منتهي")}
                          {selectedScn.status === 'transferred' && (language === "fr" ? "Transféré" : "محول")}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="mb-6">
                            <h3 className="font-bold text-lg mb-3 text-[#0a5c36]">
                              {language === "fr" ? "Informations d'identité" : "معلومات الهوية"}
                            </h3>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-500">{language === "fr" ? "ID SCN:" : "معرف SCN:"}</span>
                                <span className="font-medium">{selectedScn.scnId}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">{language === "fr" ? "Date d'émission:" : "تاريخ الإصدار:"}</span>
                                <span>{selectedScn.issueDate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">{language === "fr" ? "Valide jusqu'au:" : "صالح حتى:"}</span>
                                <span>{selectedScn.validUntil}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">{language === "fr" ? "Propriétaire actuel:" : "المالك الحالي:"}</span>
                                <span>{selectedScn.ownershipHistory[selectedScn.ownershipHistory.length - 1].owner}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-bold text-lg mb-3 text-[#0a5c36]">
                              {language === "fr" ? "Informations du mouton" : "معلومات الخروف"}
                            </h3>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-500">{language === "fr" ? "Nom:" : "الاسم:"}</span>
                                <span>{selectedScn.sheepName}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">{language === "fr" ? "Race:" : "السلالة:"}</span>
                                <span>{selectedScn.breed}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">{language === "fr" ? "Sexe:" : "الجنس:"}</span>
                                <span>{selectedScn.gender}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">{language === "fr" ? "Âge:" : "العمر:"}</span>
                                <span>{selectedScn.age}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">{language === "fr" ? "Poids:" : "الوزن:"}</span>
                                <span>{selectedScn.weight}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">{language === "fr" ? "État de santé:" : "الحالة الصحية:"}</span>
                                <span>{selectedScn.healthStatus}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-center justify-between">
                          <div className="bg-white p-2 border rounded-lg mb-4 w-full h-48 relative">
                            <Image 
                              src={selectedScn.sheepImage} 
                              alt={selectedScn.sheepName} 
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>

                          <div className="bg-white p-4 border rounded-lg flex flex-col items-center">
                            <Image 
                              src={selectedScn.qrCodeImage} 
                              alt="QR Code" 
                              width={150} 
                              height={150} 
                              className="mb-2"
                            />
                            <p className="text-sm text-center text-gray-500">
                              {language === "fr" 
                                ? "Scannez ce code QR pour vérifier l'authenticité" 
                                : "امسح رمز QR هذا للتحقق من الأصالة"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t">
                        <h3 className="font-bold text-lg mb-3 text-[#0a5c36]">
                          {language === "fr" ? "Historique de vaccination" : "سجل التطعيم"}
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2 font-medium">
                                  {language === "fr" ? "Vaccin" : "اللقاح"}
                                </th>
                                <th className="text-left py-2 font-medium">
                                  {language === "fr" ? "Date" : "التاريخ"}
                                </th>
                                <th className="text-left py-2 font-medium">
                                  {language === "fr" ? "Statut" : "الحالة"}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedScn.vaccinationHistory.map((vaccine, index) => (
                                <tr key={index} className="border-b">
                                  <td className="py-2">{vaccine.vaccine}</td>
                                  <td className="py-2">{vaccine.date}</td>
                                  <td className="py-2">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      <CheckCircle className="mr-1 h-3 w-3" />
                                      {language === "fr" ? "Complété" : "مكتمل"}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="history">
                    <div className="border rounded-lg p-4 bg-white">
                      <div className="mb-6">
                        <h3 className="font-bold text-lg mb-3 text-[#0a5c36]">
                          {language === "fr" ? "Historique de propriété" : "سجل الملكية"}
                        </h3>
                        <ul className="space-y-4">
                          {selectedScn.ownershipHistory.map((record, index) => (
                            <li key={index} className="border-l-2 border-[#0a5c36] pl-4 py-1">
                              <div className="flex justify-between mb-1">
                                <span className="font-medium">{record.owner}</span>
                                <span className="text-sm text-gray-500">{record.from} - {record.to}</span>
                              </div>
                              {index === selectedScn.ownershipHistory.length - 1 ? (
                                <Badge className="bg-green-500">
                                  {language === "fr" ? "Propriétaire actuel" : "المالك الحالي"}
                                </Badge>
                              ) : (
                                <Badge variant="outline">
                                  {language === "fr" ? "Ancien propriétaire" : "المالك السابق"}
                                </Badge>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="font-bold text-lg mb-3 text-[#0a5c36]">
                          {language === "fr" ? "Journal d'activité" : "سجل النشاط"}
                        </h3>
                        <ul className="space-y-4">
                          <li className="flex items-start gap-3">
                            <div className="bg-blue-100 text-blue-800 p-2 rounded-full">
                              <FileText className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium">
                                {language === "fr" ? "Certificat généré" : "تم إنشاء الشهادة"}
                              </p>
                              <p className="text-sm text-gray-500">{selectedScn.issueDate}</p>
                            </div>
                          </li>
                          {selectedScn.ownershipHistory.length > 1 && (
                            <li className="flex items-start gap-3">
                              <div className="bg-blue-100 text-blue-800 p-2 rounded-full">
                                <ArrowRightLeft className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  {language === "fr" 
                                    ? `Transféré à ${selectedScn.ownershipHistory[selectedScn.ownershipHistory.length - 1].owner}` 
                                    : `تم التحويل إلى ${selectedScn.ownershipHistory[selectedScn.ownershipHistory.length - 1].owner}`}
                                </p>
                                <p className="text-sm text-gray-500">{selectedScn.ownershipHistory[selectedScn.ownershipHistory.length - 1].from}</p>
                              </div>
                            </li>
                          )}
                          <li className="flex items-start gap-3">
                            <div className="bg-green-100 text-green-800 p-2 rounded-full">
                              <CheckCircle className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium">
                                {language === "fr" ? "Dernier contrôle vétérinaire" : "آخر فحص بيطري"}
                              </p>
                              <p className="text-sm text-gray-500">{new Date(new Date(selectedScn.issueDate).getTime() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-between mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setViewCertificate(false)}
                  >
                    {language === "fr" ? "Fermer" : "إغلاق"}
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Printer className="mr-2 h-4 w-4" />
                      {language === "fr" ? "Imprimer" : "طباعة"}
                    </Button>
                    <Button className="bg-[#0a5c36] hover:bg-[#0b6d40]">
                      <Download className="mr-2 h-4 w-4" />
                      {language === "fr" ? "Télécharger" : "تحميل"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}