"use client"

import { useState, useEffect } from "react"
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
  Users,
  Cog,
  Edit,
  Trash2,
  MoreVertical,
  Loader2,
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
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

type Language = "fr" | "ar"
type ViewMode = "grid" | "table"
type SheepStatus = "active" | "inactive" | "sold"

interface Sheep {
  id: string
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

export default function SheepManagement() {
  const [language, setLanguage] = useState<Language>("fr")
  const [view, setView] = useState<ViewMode>("table")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterBreed, setFilterBreed] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sheepData, setSheepData] = useState<Sheep[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [editingSheep, setEditingSheep] = useState<Sheep | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    breed: "",
    gender: "",
    age: "",
    weight: "",
    price: 0,
    status: "active" as SheepStatus,
    location: "",
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newSheepData, setNewSheepData] = useState({
    title: "",
    breed: "Sardi",
    gender: "Male",
    age: "",
    weight: "",
    price: 0, // Make sure this is a valid number, not NaN
    status: "active" as SheepStatus,
    location: "",
  })
  
  const { toast } = useToast()

  // Fetch sheep data from API
  const fetchSheepData = async () => {
    setIsLoading(true)
    try {
      // Build query parameters
      const params = new URLSearchParams()
      if (searchQuery) params.append('search', searchQuery)
      if (filterBreed !== 'all') params.append('breed', filterBreed)
      if (filterStatus !== 'all') params.append('status', filterStatus)
      
      const response = await fetch(`/api/sheep?${params.toString()}`)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('API error details:', errorData)
        throw new Error('Failed to fetch sheep data')
      }
      
      const data = await response.json()
      
      // Ensure all sheep records have valid image URLs
      const processedData = data.map((sheep: any) => ({
        ...sheep,
        image: sheep.image || "/placeholder.svg?height=80&width=80",
        title: sheep.title || "Unknown Sheep",
      }))
      
      setSheepData(processedData)
      setTotalPages(Math.ceil(processedData.length / 10))
    } catch (error) {
      console.error('Error fetching sheep data:', error)
      toast({
        title: language === "fr" ? "Erreur" : "خطأ",
        description: language === "fr" 
          ? "Impossible de charger les données des moutons" 
          : "تعذر تحميل بيانات الأغنام",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch data on initial load and when filters change
  useEffect(() => {
    // Add a small debounce for search to avoid too many API calls
    const timer = setTimeout(() => {
      fetchSheepData()
    }, 300)
    
    return () => clearTimeout(timer)
  }, [searchQuery, filterBreed, filterStatus])

  const getStatusText = (status: SheepStatus): string => {
    if (status === 'active') return language === "fr" ? "Actif" : "نشط"
    if (status === 'inactive') return language === "fr" ? "Inactif" : "غير نشط"
    return language === "fr" ? "Vendu" : "تم بيعه"
  }

  // Calculate pagination
  const itemsPerPage = 10
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedSheep = sheepData.slice(startIndex, endIndex)

  // Handle edit sheep
  const handleEditSheep = (sheep: Sheep) => {
    setEditingSheep(sheep)
    setFormData({
      title: sheep.title,
      breed: sheep.breed,
      gender: sheep.gender,
      age: sheep.age,
      weight: sheep.weight,
      price: sheep.price,
      status: sheep.status,
      location: sheep.location,
    })
    setIsEditDialogOpen(true)
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value
    }))
  }

  // Handle form submission
  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!editingSheep) return
    
    try {
      setIsLoading(true)
      
      const response = await fetch(`/api/sheep/${editingSheep.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to update sheep')
      }
      
      // Close dialog and refresh data
      setIsEditDialogOpen(false)
      fetchSheepData()
      
      toast({
        title: language === "fr" ? "Succès" : "نجاح",
        description: language === "fr" 
          ? "Mouton mis à jour avec succès" 
          : "تم تحديث الخروف بنجاح",
      })
    } catch (error) {
      console.error('Error updating sheep:', error)
      toast({
        title: language === "fr" ? "Erreur" : "خطأ",
        description: language === "fr" 
          ? "Impossible de mettre à jour le mouton" 
          : "تعذر تحديث الخروف",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle delete sheep
  const handleDeleteSheep = async (id: string) => {
    if (confirm(language === "fr" 
      ? "Êtes-vous sûr de vouloir supprimer ce mouton ?" 
      : "هل أنت متأكد من رغبتك في حذف هذا الخروف؟")) {
      try {
        const response = await fetch(`/api/sheep/${id}`, {
          method: 'DELETE',
        })
        
        if (!response.ok) {
          throw new Error('Failed to delete sheep')
        }
        
        // Refresh data
        fetchSheepData()
        
        toast({
          title: language === "fr" ? "Succès" : "نجاح",
          description: language === "fr" 
            ? "Mouton supprimé avec succès" 
            : "تم حذف الخروف بنجاح",
        })
      } catch (error) {
        console.error('Error deleting sheep:', error)
        toast({
          title: language === "fr" ? "Erreur" : "خطأ",
          description: language === "fr" 
            ? "Impossible de supprimer le mouton" 
            : "تعذر حذف الخروف",
          variant: "destructive"
        })
      }
    }
  }

  // Add this function to handle input changes for the new sheep form
  const handleNewSheepInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    // Handle price specially to avoid NaN
    if (name === "price") {
      // If the value is empty, set it to 0 or empty string
      const numValue = value === "" ? 0 : parseFloat(value)
      // Make sure we don't set NaN as a value
      setNewSheepData(prev => ({
        ...prev,
        [name]: isNaN(numValue) ? 0 : numValue
      }))
    } else {
      // For non-numeric fields, just set the value directly
      setNewSheepData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  // Add this function to handle form submission
  const handleAddSheep = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setIsLoading(true)
      
      const response = await fetch('/api/sheep', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSheepData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to add sheep')
      }
      
      // Reset form and close dialog
      setNewSheepData({
        title: "",
        breed: "Sardi",
        gender: "Male",
        age: "",
        weight: "",
        price: 0,
        status: "active" as SheepStatus,
        location: "",
      })
      setIsAddDialogOpen(false)
      
      // Refresh data
      fetchSheepData()
      
      toast({
        title: language === "fr" ? "Succès" : "نجاح",
        description: language === "fr" 
          ? "Mouton ajouté avec succès" 
          : "تمت إضافة الخروف بنجاح",
      })
    } catch (error) {
      console.error('Error adding sheep:', error)
      toast({
        title: language === "fr" ? "Erreur" : "خطأ",
        description: language === "fr" 
          ? "Impossible d'ajouter le mouton" 
          : "تعذر إضافة الخروف",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
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

            <Button 
              className="bg-[#0a5c36] hover:bg-[#0b6d40]"
              onClick={() => setIsAddDialogOpen(true)}
            >
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

                  <Button variant="outline" size="icon" onClick={fetchSheepData}>
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
              {isLoading ? (
                <div className="flex justify-center items-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-[#0a5c36]" />
                  <span className="ml-2 text-[#0a5c36]">
                    {language === "fr" ? "Chargement..." : "جاري التحميل..."}
                  </span>
                </div>
              ) : sheepData.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  {language === "fr" 
                    ? "Aucun mouton trouvé. Ajoutez un mouton ou modifiez vos filtres." 
                    : "لم يتم العثور على أي خروف. أضف خروفًا أو عدل المرشحات."}
                </div>
              ) : view === "table" ? (
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
                      {paginatedSheep.map((sheep) => (
                        <TableRow key={sheep.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <Image 
                                src={sheep.image || "/placeholder.svg?height=80&width=80"} 
                                alt={sheep.title || "Sheep"} 
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
                                <DropdownMenuItem onClick={() => handleEditSheep(sheep)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  <span>{language === "fr" ? "Modifier" : "تعديل"}</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Package className="mr-2 h-4 w-4" />
                                  <span>{language === "fr" ? "Voir SCN" : "عرض SCN"}</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-red-600"
                                  onClick={() => handleDeleteSheep(sheep.id)}
                                >
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
                  {paginatedSheep.map((sheep) => (
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
                              <DropdownMenuItem onClick={() => handleEditSheep(sheep)}>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>{language === "fr" ? "Modifier" : "تعديل"}</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Package className="mr-2 h-4 w-4" />
                                <span>{language === "fr" ? "Voir SCN" : "عرض SCN"}</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDeleteSheep(sheep.id)}
                              >
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
              {!isLoading && sheepData.length > 0 && (
                <Pagination className="mt-4">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink 
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {language === "fr" ? "Modifier le mouton" : "تعديل الخروف"}
            </DialogTitle>
            <DialogDescription>
              {language === "fr" 
                ? "Modifiez les détails du mouton ci-dessous." 
                : "قم بتعديل تفاصيل الخروف أدناه."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitEdit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  {language === "fr" ? "Titre" : "العنوان"}
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="breed" className="text-right">
                  {language === "fr" ? "Race" : "السلالة"}
                </Label>
                <Select 
                  name="breed" 
                  value={formData.breed} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, breed: value }))}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                  <SelectItem value="Sardi">Sardi</SelectItem>
                    <SelectItem value="Timahdite">Timahdite</SelectItem>
                    <SelectItem value="D'man">D'man</SelectItem>
                    <SelectItem value="Beni Guil">Beni Guil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gender" className="text-right">
                  {language === "fr" ? "Sexe" : "الجنس"}
                </Label>
                <Select 
                  name="gender" 
                  value={formData.gender} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">{language === "fr" ? "Mâle" : "ذكر"}</SelectItem>
                    <SelectItem value="Female">{language === "fr" ? "Femelle" : "أنثى"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="age" className="text-right">
                  {language === "fr" ? "Âge" : "العمر"}
                </Label>
                <Input
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="weight" className="text-right">
                  {language === "fr" ? "Poids" : "الوزن"}
                </Label>
                <Input
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  {language === "fr" ? "Prix" : "السعر"}
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  {language === "fr" ? "Statut" : "الحالة"}
                </Label>
                <Select 
                  name="status" 
                  value={formData.status} 
                  onValueChange={(value: SheepStatus) => setFormData(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">{language === "fr" ? "Actif" : "نشط"}</SelectItem>
                    <SelectItem value="inactive">{language === "fr" ? "Inactif" : "غير نشط"}</SelectItem>
                    <SelectItem value="sold">{language === "fr" ? "Vendu" : "تم بيعه"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  {language === "fr" ? "Lieu" : "الموقع"}
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                {language === "fr" ? "Annuler" : "إلغاء"}
              </Button>
              <Button type="submit" className="bg-[#0a5c36] hover:bg-[#0b6d40]">
                {language === "fr" ? "Enregistrer" : "حفظ"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Sheep Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {language === "fr" ? "Ajouter un mouton" : "إضافة خروف"}
            </DialogTitle>
            <DialogDescription>
              {language === "fr" 
                ? "Remplissez les détails du nouveau mouton ci-dessous." 
                : "املأ تفاصيل الخروف الجديد أدناه."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddSheep}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-title" className="text-right">
                  {language === "fr" ? "Titre" : "العنوان"}
                </Label>
                <Input
                  id="new-title"
                  name="title"
                  value={newSheepData.title}
                  onChange={handleNewSheepInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-breed" className="text-right">
                  {language === "fr" ? "Race" : "السلالة"}
                </Label>
                <Select 
                  name="breed" 
                  value={newSheepData.breed} 
                  onValueChange={(value) => setNewSheepData(prev => ({ ...prev, breed: value }))}
                >
                  <SelectTrigger className="col-span-3" id="new-breed">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sardi">Sardi</SelectItem>
                    <SelectItem value="Timahdite">Timahdite</SelectItem>
                    <SelectItem value="D'man">D'man</SelectItem>
                    <SelectItem value="Beni Guil">Beni Guil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-gender" className="text-right">
                  {language === "fr" ? "Sexe" : "الجنس"}
                </Label>
                <Select 
                  name="gender" 
                  value={newSheepData.gender} 
                  onValueChange={(value) => setNewSheepData(prev => ({ ...prev, gender: value }))}
                >
                  <SelectTrigger className="col-span-3" id="new-gender">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">{language === "fr" ? "Mâle" : "ذكر"}</SelectItem>
                    <SelectItem value="Female">{language === "fr" ? "Femelle" : "أنثى"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-age" className="text-right">
                  {language === "fr" ? "Âge" : "العمر"}
                </Label>
                <Input
                  id="new-age"
                  name="age"
                  placeholder="1.5 years"
                  value={newSheepData.age}
                  onChange={handleNewSheepInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-weight" className="text-right">
                  {language === "fr" ? "Poids" : "الوزن"}
                </Label>
                <Input
                  id="new-weight"
                  name="weight"
                  placeholder="65 kg"
                  value={newSheepData.weight}
                  onChange={handleNewSheepInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-price" className="text-right">
                  {language === "fr" ? "Prix" : "السعر"}
                </Label>
                <Input
                  id="new-price"
                  name="price"
                  type="number"
                  min="0"
                  step="any"
                  value={newSheepData.price === 0 && newSheepData.price !== 0 ? "" : newSheepData.price.toString()}
                  onChange={handleNewSheepInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-status" className="text-right">
                  {language === "fr" ? "Statut" : "الحالة"}
                </Label>
                <Select 
                  name="status" 
                  value={newSheepData.status} 
                  onValueChange={(value: SheepStatus) => setNewSheepData(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger className="col-span-3" id="new-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">{language === "fr" ? "Actif" : "نشط"}</SelectItem>
                    <SelectItem value="inactive">{language === "fr" ? "Inactif" : "غير نشط"}</SelectItem>
                    <SelectItem value="sold">{language === "fr" ? "Vendu" : "تم بيعه"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-location" className="text-right">
                  {language === "fr" ? "Lieu" : "الموقع"}
                </Label>
                <Input
                  id="new-location"
                  name="location"
                  value={newSheepData.location}
                  onChange={handleNewSheepInputChange}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                {language === "fr" ? "Annuler" : "إلغاء"}
              </Button>
              <Button type="submit" className="bg-[#0a5c36] hover:bg-[#0b6d40]">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {language === "fr" ? "Ajout en cours..." : "جاري الإضافة..."}
                  </>
                ) : (
                  language === "fr" ? "Ajouter" : "إضافة"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

