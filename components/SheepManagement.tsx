"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Bell,
  ChevronDown,
  Filter,
  LogOut,
  Package,
  Plus,
  Search,
  Settings,
  Users,
  Cog,
  Edit,
  Trash2,
  MoreVertical,
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

type Language = "fr" | "ar"
type ViewMode = "grid" | "table"
type SheepStatus = "active" | "inactive" | "sold"

interface Sheep {
  id: number
  scnId: string
  title: string
  breed: string
  gender: string
  age: string
  weight: string
  price: number
  status: SheepStatus
  location: string
  createdAt: string
  image: string
}

// Sample data
const sheepData: Sheep[] = [
  {
    id: 1,
    scnId: "SCN-12345-MA",
    title: "Sardi Male - 1.5 years",
    breed: "Sardi",
    gender: "Male",
    age: "1.5 years",
    weight: "65 kg",
    price: 4200,
    status: "active",
    location: "Meknès",
    createdAt: "2023-10-15",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    scnId: "SCN-12346-MA",
    title: "Timahdite Female - 2 years",
    breed: "Timahdite",
    gender: "Female",
    age: "2 years",
    weight: "55 kg",
    price: 3800,
    status: "active",
    location: "Fès",
    createdAt: "2023-10-12",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    scnId: "SCN-12347-MA",
    title: "D'man Male - 1 year",
    breed: "D'man",
    gender: "Male",
    age: "1 year",
    weight: "45 kg",
    price: 2900,
    status: "active",
    location: "Marrakech",
    createdAt: "2023-10-10",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    scnId: "SCN-12348-MA",
    title: "Beni Guil Male - 1 year",
    breed: "Beni Guil",
    gender: "Male",
    age: "1 year",
    weight: "50 kg",
    price: 3200,
    status: "inactive",
    location: "Oujda",
    createdAt: "2023-10-08",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 5,
    scnId: "SCN-12349-MA",
    title: "Sardi Female - 3 years",
    breed: "Sardi",
    gender: "Female",
    age: "3 years",
    weight: "70 kg",
    price: 4500,
    status: "active",
    location: "Rabat",
    createdAt: "2023-10-05",
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function SheepManagement() {
  const [language, setLanguage] = useState<Language>("fr")
  const [view, setView] = useState<ViewMode>("table")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterBreed, setFilterBreed] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredSheep = sheepData.filter((sheep) => {
    const matchesSearch = sheep.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sheep.scnId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBreed = filterBreed === "all" || sheep.breed === filterBreed
    const matchesStatus = filterStatus === "all" || sheep.status === filterStatus
    
    return matchesSearch && matchesBreed && matchesStatus
  })

  const getStatusText = (status: SheepStatus): string => {
    if (status === 'active') return language === "fr" ? "Actif" : "نشط"
    if (status === 'inactive') return language === "fr" ? "Inactif" : "غير نشط"
    return language === "fr" ? "Vendu" : "تم بيعه"
  }

  return (
    <div className="flex min-h-screen bg-[#f8f5f0]">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b h-16 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/eleveur-dashboard" className="text-[#0a5c36] hover:underline">
              {language === "fr" ? "Tableau de bord" : "لوحة التحكم"}
            </Link>
            <span className="text-gray-400">/</span>
            <h1 className="text-xl font-bold text-[#0a5c36]">
              {language === "fr" ? "Gestion des moutons" : "إدارة الأغنام"}
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
                {language === "fr" ? "Mes Moutons" : "أغنامي"}
              </h2>
              <p className="text-gray-600">
                {language === "fr" 
                  ? "Gérez votre inventaire de moutons et leur identifiants SCN" 
                  : "إدارة مخزون الأغنام ومعرفات SCN الخاصة بها"}
              </p>
            </div>

            <Button className="bg-[#0a5c36] hover:bg-[#0b6d40]">
              <Plus className="mr-2 h-5 w-5" />
              {language === "fr" ? "Ajouter un mouton" : "إضافة خروف"}
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
                    placeholder={language === "fr" ? "Rechercher par titre ou SCN ID..." : "البحث بالعنوان أو معرف SCN..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex gap-4">
                  <Select value={filterBreed} onValueChange={setFilterBreed}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={language === "fr" ? "Race" : "السلالة"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{language === "fr" ? "Toutes les races" : "جميع السلالات"}</SelectItem>
                      <SelectItem value="Sardi">Sardi</SelectItem>
                      <SelectItem value="Timahdite">Timahdite</SelectItem>
                      <SelectItem value="D'man">D'man</SelectItem>
                      <SelectItem value="Beni Guil">Beni Guil</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={language === "fr" ? "Statut" : "الحالة"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{language === "fr" ? "Tous les statuts" : "جميع الحالات"}</SelectItem>
                      <SelectItem value="active">{language === "fr" ? "Actif" : "نشط"}</SelectItem>
                      <SelectItem value="inactive">{language === "fr" ? "Inactif" : "غير نشط"}</SelectItem>
                      <SelectItem value="sold">{language === "fr" ? "Vendu" : "تم بيعه"}</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sheep List */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>{language === "fr" ? "Liste des moutons" : "قائمة الأغنام"}</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant={view === "table" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setView("table")}
                    className={view === "table" ? "bg-[#0a5c36]" : ""}
                  >
                    {language === "fr" ? "Tableau" : "جدول"}
                  </Button>
                  <Button 
                    variant={view === "grid" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setView("grid")}
                    className={view === "grid" ? "bg-[#0a5c36]" : ""}
                  >
                    {language === "fr" ? "Grille" : "شبكة"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {view === "table" ? (
                <div className="rounded-md border overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{language === "fr" ? "Mouton" : "الخروف"}</TableHead>
                        <TableHead>{language === "fr" ? "SCN ID" : "معرف SCN"}</TableHead>
                        <TableHead>{language === "fr" ? "Race" : "السلالة"}</TableHead>
                        <TableHead>{language === "fr" ? "Sexe" : "الجنس"}</TableHead>
                        <TableHead>{language === "fr" ? "Poids" : "الوزن"}</TableHead>
                        <TableHead className="text-right">{language === "fr" ? "Prix (MAD)" : "السعر (درهم)"}</TableHead>
                        <TableHead>{language === "fr" ? "Statut" : "الحالة"}</TableHead>
                        <TableHead className="text-right">{language === "fr" ? "Actions" : "إجراءات"}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSheep.map((sheep) => (
                        <TableRow key={sheep.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <Image 
                                src={sheep.image} 
                                alt={sheep.title} 
                                width={40} 
                                height={40} 
                                className="rounded-md object-cover"
                              />
                              <span>{sheep.title}</span>
                            </div>
                          </TableCell>
                          <TableCell>{sheep.scnId}</TableCell>
                          <TableCell>{sheep.breed}</TableCell>
                          <TableCell>{sheep.gender}</TableCell>
                          <TableCell>{sheep.weight}</TableCell>
                          <TableCell className="text-right">{sheep.price}</TableCell>
                          <TableCell>
                            <Badge 
                              className={`
                                ${sheep.status === 'active' ? 'bg-green-500' : ''} 
                                ${sheep.status === 'inactive' ? 'bg-gray-500' : ''} 
                                ${sheep.status === 'sold' ? 'bg-blue-500' : ''}
                              `}
                            >
                              {getStatusText(sheep.status)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  <span>{language === "fr" ? "Modifier" : "تعديل"}</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Package className="mr-2 h-4 w-4" />
                                  <span>{language === "fr" ? "Voir SCN" : "عرض SCN"}</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>{language === "fr" ? "Supprimer" : "حذف"}</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {filteredSheep.map((sheep) => (
                    <Card key={sheep.id} className="overflow-hidden h-full flex flex-col">
                      <div className="relative h-48 w-full">
                        <Image
                          src={sheep.image}
                          alt={sheep.title}
                          fill
                          className="object-cover"
                          style={{ objectFit: "cover" }}
                        />
                        <div className="absolute top-2 right-2">
                          <Badge 
                            className={`
                              ${sheep.status === 'active' ? 'bg-green-500' : ''} 
                              ${sheep.status === 'inactive' ? 'bg-gray-500' : ''} 
                              ${sheep.status === 'sold' ? 'bg-blue-500' : ''}
                            `}
                          >
                            {getStatusText(sheep.status)}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4 flex-1 flex flex-col">
                        <h3 className="font-semibold mb-1">{sheep.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">{sheep.scnId}</p>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                          <div>
                            <span className="text-gray-500">{language === "fr" ? "Race:" : "السلالة:"}</span> {sheep.breed}
                          </div>
                          <div>
                            <span className="text-gray-500">{language === "fr" ? "Sexe:" : "الجنس:"}</span> {sheep.gender}
                          </div>
                          <div>
                            <span className="text-gray-500">{language === "fr" ? "Âge:" : "العمر:"}</span> {sheep.age}
                          </div>
                          <div>
                            <span className="text-gray-500">{language === "fr" ? "Poids:" : "الوزن:"}</span> {sheep.weight}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <p className="font-bold text-lg text-[#0a5c36]">{sheep.price} MAD</p>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>{language === "fr" ? "Modifier" : "تعديل"}</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Package className="mr-2 h-4 w-4" />
                                <span>{language === "fr" ? "Voir SCN" : "عرض SCN"}</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>{language === "fr" ? "Supprimer" : "حذف"}</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

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
      </div>
    </div>
  )
}