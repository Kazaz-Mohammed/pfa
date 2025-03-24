"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { registerUser } from "@/lib/auth-actions"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const signupSchema = z
  .object({
    name: z.string().min(2, { message: "الاسم يجب أن يكون حرفين على الأقل" }),
    email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
    password: z.string().min(6, { message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  })

type SignupFormValues = z.infer<typeof signupSchema>

interface SignupFormProps {
  onSuccess: () => void
}

export function SignupForm({ onSuccess }: SignupFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()


  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: SignupFormValues) {
    setIsLoading(true)
    try {
      const result = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      })

      if (result.success) {
        toast({
          title: "تم إنشاء الحساب بنجاح",
          description: result.message || "تم إرسال بريد إلكتروني إليك يفيد بأن طلبك قيد المراجعة.",
        })
        onSuccess()
      } else {
        toast({
          variant: "destructive",
          title: "فشل إنشاء الحساب",
          description: result.error || "البريد الإلكتروني مستخدم بالفعل",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "يرجى المحاولة مرة أخرى لاحقاً",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الاسم</FormLabel>
              <FormControl>
                <Input placeholder="أدخل اسمك الكامل" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>البريد الإلكتروني</FormLabel>
              <FormControl>
                <Input placeholder="أدخل بريدك الإلكتروني" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>كلمة المرور</FormLabel>
              <FormControl>
                <Input type="password" placeholder="أدخل كلمة المرور" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>تأكيد كلمة المرور</FormLabel>
              <FormControl>
                <Input type="password" placeholder="أعد إدخال كلمة المرور" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              جاري إنشاء الحساب...
            </>
          ) : (
            "إنشاء حساب"
          )}
        </Button>
      </form>
    </Form>
  )
}

