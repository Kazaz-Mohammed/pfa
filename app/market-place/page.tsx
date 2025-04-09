"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, MapPin, List, Grid3X3, Star, Check, X, Sliders, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function SearchPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [language, setLanguage] = useState<"fr" | "ar">("fr")
  const [priceRange, setPriceRange] = useState([1000, 5000])
  const [ageRange, setAgeRange] = useState([0, 5])
  const [weightRange, setWeightRange] = useState([20, 100])

  // Sample search results data
  const searchResults = [
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
      image: "/placeholder.svg?height=300&width=400",
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
      image: "/placeholder.svg?height=300&width=400",
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
      image: "/placeholder.svg?height=300&width=400",
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
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 5,
      title: "Boujaad Sheep - Male",
      price: 4100,
      location: "Casablanca",
      breed: "Boujaad",
      age: "2.5 years",
      weight: "75 kg",
      sellerRating: 4.9,
      verified: true,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 6,
      title: "Sardi Sheep - Female",
      price: 3300,
      location: "Rabat",
      breed: "Sardi",
      age: "1.2 years",
      weight: "55 kg",
      sellerRating: 4.6,
      verified: true,
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      {/* Header */}
      <header className="bg-[#0a5c36] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Kebchi Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
            </Link>
            <h1 className="text-2xl font-bold">Kebchi</h1>
          </div>

          <div className="hidden md:flex items-center gap-4 flex-1 max-w-xl mx-4">
            <div className="bg-white rounded-lg p-1 flex w-full">
              <Input
                placeholder={language === "fr" ? "Rechercher par race, lieu..." : "البحث حسب السلالة، الموقع..."}
                className="flex-grow border-none focus-visible:ring-0"
              />
              <Button className="bg-[#0a5c36] hover:bg-[#0b6d40]">
                <Search className="h-4 w-4" />
              </Button>
            </div>
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
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg text-[#0a5c36]">{language === "fr" ? "Filtres" : "تصفية"}</h2>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-500">
                  <X className="h-4 w-4 mr-1" />
                  {language === "fr" ? "Réinitialiser" : "إعادة تعيين"}
                </Button>
              </div>

              <Accordion type="multiple" defaultValue={["price", "location", "breed", "age", "weight"]}>
                <AccordionItem value="price">
                  <AccordionTrigger className="py-2">
                    {language === "fr" ? "Prix (MAD)" : "السعر (درهم)"}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Slider
                        defaultValue={[1000, 5000]}
                        min={500}
                        max={10000}
                        step={100}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="my-6"
                      />
                      <div className="flex items-center justify-between">
                        <Input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                          className="w-20"
                        />
                        <span>-</span>
                        <Input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                          className="w-20"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="location">
                  <AccordionTrigger className="py-2">{language === "fr" ? "Localisation" : "الموقع"}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox id="location-marrakech" />
                        <Label htmlFor="location-marrakech" className="ml-2">
                          Marrakech
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="location-casablanca" />
                        <Label htmlFor="location-casablanca" className="ml-2">
                          Casablanca
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="location-rabat" />
                        <Label htmlFor="location-rabat" className="ml-2">
                          Rabat
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="location-fez" />
                        <Label htmlFor="location-fez" className="ml-2">
                          Fez
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="location-tangier" />
                        <Label htmlFor="location-tangier" className="ml-2">
                          Tangier
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="location-oujda" />
                        <Label htmlFor="location-oujda" className="ml-2">
                          Oujda
                        </Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="breed">
                  <AccordionTrigger className="py-2">{language === "fr" ? "Race" : "السلالة"}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox id="breed-sardi" />
                        <Label htmlFor="breed-sardi" className="ml-2">
                          Sardi
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="breed-timahdite" />
                        <Label htmlFor="breed-timahdite" className="ml-2">
                          Timahdite
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="breed-dman" />
                        <Label htmlFor="breed-dman" className="ml-2">
                          D'man
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="breed-beni-guil" />
                        <Label htmlFor="breed-beni-guil" className="ml-2">
                          Beni Guil
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="breed-boujaad" />
                        <Label htmlFor="breed-boujaad" className="ml-2">
                          Boujaad
                        </Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="age">
                  <AccordionTrigger className="py-2">
                    {language === "fr" ? "Âge (années)" : "العمر (سنوات)"}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Slider
                        defaultValue={[0, 5]}
                        min={0}
                        max={10}
                        step={0.5}
                        value={ageRange}
                        onValueChange={setAgeRange}
                        className="my-6"
                      />
                      <div className="flex items-center justify-between">
                        <Input
                          type="number"
                          value={ageRange[0]}
                          onChange={(e) => setAgeRange([Number.parseFloat(e.target.value), ageRange[1]])}
                          className="w-20"
                        />
                        <span>-</span>
                        <Input
                          type="number"
                          value={ageRange[1]}
                          onChange={(e) => setAgeRange([ageRange[0], Number.parseFloat(e.target.value)])}
                          className="w-20"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="weight">
                  <AccordionTrigger className="py-2">
                    {language === "fr" ? "Poids (kg)" : "الوزن (كغ)"}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Slider
                        defaultValue={[20, 100]}
                        min={10}
                        max={150}
                        step={5}
                        value={weightRange}
                        onValueChange={setWeightRange}
                        className="my-6"
                      />
                      <div className="flex items-center justify-between">
                        <Input
                          type="number"
                          value={weightRange[0]}
                          onChange={(e) => setWeightRange([Number.parseInt(e.target.value), weightRange[1]])}
                          className="w-20"
                        />
                        <span>-</span>
                        <Input
                          type="number"
                          value={weightRange[1]}
                          onChange={(e) => setWeightRange([weightRange[0], Number.parseInt(e.target.value)])}
                          className="w-20"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="verification">
                  <AccordionTrigger className="py-2">
                    {language === "fr" ? "Vérification SCN" : "التحقق من SCN"}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex items-center">
                      <Checkbox id="verified-only" />
                      <Label htmlFor="verified-only" className="ml-2">
                        {language === "fr" ? "Moutons vérifiés uniquement" : "الأغنام المتحقق منها فقط"}
                      </Label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Button className="w-full mt-6 bg-[#0a5c36] hover:bg-[#0b6d40]">
                {language === "fr" ? "Appliquer les filtres" : "تطبيق التصفية"}
              </Button>
            </div>
          </div>

          {/* Mobile Filters Button */}
          <div className="md:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Sliders className="h-4 w-4 mr-2" />
                  {language === "fr" ? "Filtres" : "تصفية"}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>{language === "fr" ? "Filtres" : "تصفية"}</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <Accordion type="multiple" defaultValue={["price", "location", "breed", "age", "weight"]}>
                    {/* Same accordion content as desktop */}
                    <AccordionItem value="price">
                      <AccordionTrigger className="py-2">
                        {language === "fr" ? "Prix (MAD)" : "السعر (درهم)"}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <Slider
                            defaultValue={[1000, 5000]}
                            min={500}
                            max={10000}
                            step={100}
                            value={priceRange}
                            onValueChange={setPriceRange}
                            className="my-6"
                          />
                          <div className="flex items-center justify-between">
                            <Input
                              type="number"
                              value={priceRange[0]}
                              onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                              className="w-20"
                            />
                            <span>-</span>
                            <Input
                              type="number"
                              value={priceRange[1]}
                              onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                              className="w-20"
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Other accordion items would be repeated here */}
                  </Accordion>

                  <Button className="w-full mt-6 bg-[#0a5c36] hover:bg-[#0b6d40]">
                    {language === "fr" ? "Appliquer les filtres" : "تطبيق التصفية"}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Search Results */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-xl font-bold text-[#0a5c36]">
                    {language === "fr" ? "Résultats de recherche" : "نتائج البحث"}
                  </h1>
                  <p className="text-sm text-gray-500">
                    {language === "fr"
                      ? `${searchResults.length} moutons trouvés`
                      : `تم العثور على ${searchResults.length} خروف`}
                  </p>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <Select defaultValue="featured">
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder={language === "fr" ? "Trier par" : "ترتيب حسب"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">{language === "fr" ? "En vedette" : "مميز"}</SelectItem>
                      <SelectItem value="price-low">
                        {language === "fr" ? "Prix: croissant" : "السعر: تصاعدي"}
                      </SelectItem>
                      <SelectItem value="price-high">
                        {language === "fr" ? "Prix: décroissant" : "السعر: تنازلي"}
                      </SelectItem>
                      <SelectItem value="rating">{language === "fr" ? "Note du vendeur" : "تقييم البائع"}</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="hidden sm:flex items-center gap-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setViewMode("grid")}
                      className={viewMode === "grid" ? "bg-[#0a5c36] hover:bg-[#0b6d40]" : ""}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setViewMode("list")}
                      className={viewMode === "list" ? "bg-[#0a5c36] hover:bg-[#0b6d40]" : ""}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((listing) => (
                  <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
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
                {searchResults.map((listing) => (
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

            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" disabled>
                  &lt;
                </Button>
                <Button variant="default" size="icon" className="bg-[#0a5c36] hover:bg-[#0b6d40]">
                  1
                </Button>
                <Button variant="outline" size="icon">
                  2
                </Button>
                <Button variant="outline" size="icon">
                  3
                </Button>
                <Button variant="outline" size="icon">
                  &gt;
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

