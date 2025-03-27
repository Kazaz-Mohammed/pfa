"use server"

import { cookies } from "next/headers"
import { createClient } from "@/lib/db"
import { hash, compare } from "bcrypt"
import nodemailer from "nodemailer"

interface LoginData {
  email: string
  password: string
}

interface RegisterData {
  name: string
  email: string
  password: string
}

interface AuthResult {
  success: boolean
  error?: string
  userId?: string
  message?: string
}

export async function loginUser(data: LoginData): Promise<AuthResult> {
  try {
    const db = createClient()
    // console.log("Checking email:", data.email)

    // Find user by email
    const { rows } = await db.query("SELECT * FROM userss WHERE email = $1 LIMIT 1", [data.email])
    // console.log("User found:", rows.length > 0 ? rows[0] : "No user found")

    if (rows.length === 0) {
      return { success: false, error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" }
    }

    const user = rows[0]

    // console.log("Stored hashed password:", user.password)
    // console.log("Entered password:", data.password)

    // Check if account is verified
    if (user.status !== "approved") {
      return { success: false, error: "حسابك قيد المراجعة. لا يمكنك تسجيل الدخول بعد." };
    }


    // Verify password
    const passwordMatch = await compare(data.password, user.password)
    // console.log("Password match:", passwordMatch)

    if (!passwordMatch) {
      return { success: false, error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" }
    }

    // Set session cookie
    const sessionId = crypto.randomUUID()

    await db.query(
      "INSERT INTO sessions (id, user_id, expires_at) VALUES ($1, $2, $3)",
      [sessionId, user.id, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)], // 30 days
    )

    ;(await cookies()).set({
      name: "session_id",
      value: sessionId,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    })

    return { success: true, userId: user.id }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "حدث خطأ أثناء تسجيل الدخول" }
  }
}


async function sendVerificationEmail(email: string, name: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVICE, 
    port: 587, 
    secure: false, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Kebchi" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "طلبك قيد المراجعة",
    text: `مرحبًا ${name}،\n\nلقد استلمنا طلبك لإنشاء حساب. سيتم مراجعته قريبًا وسيتم إعلامك بمجرد التحقق من حسابك.\n\nشكرًا لاستخدامك منصتنا!`,
    html: `<p>مرحبًا <b>${name}</b>،</p><p>لقد استلمنا طلبك لإنشاء حساب. سيتم مراجعته قريبًا وسيتم إعلامك بمجرد التحقق من حسابك.</p><p>شكرًا لاستخدامك منصتنا!</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}


export async function registerUser(data: RegisterData): Promise<AuthResult> {
  try {
    const db = createClient()

     // Validate Inputs (backend-side)
     if (!data.name || data.name.length < 2) {
      return { success: false, error: "الاسم يجب أن يكون حرفين على الأقل" };
    }
    if (!data.email || !data.email.includes("@")) {
      return { success: false, error: "يرجى إدخال بريد إلكتروني صحيح" };
    }
    if (!data.password || data.password.length < 6) {
      return { success: false, error: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" };
    }

    // Check if email already exists
    const { rows: existingUsers } = await db.query("SELECT * FROM userss WHERE email = $1 LIMIT 1", [data.email])

    if (existingUsers.length > 0) {
      return { success: false, error: "البريد الإلكتروني مستخدم بالفعل" }
    }

    // Hash password
    const hashedPassword = await hash(data.password, 10)

    // Create user
    const { rows } = await db.query("INSERT INTO userss (name, email, password, status) VALUES ($1, $2, $3, 'pending') RETURNING id", [
      data.name,
      data.email,
      hashedPassword,
    ])

    // Send email notification
    await sendVerificationEmail(data.email, data.name);

    return { success: true, userId: rows[0].id,  message: "تم إرسال بريد إلكتروني إليك يفيد بأن طلبك قيد المراجعة."}
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, error: "حدث خطأ أثناء إنشاء الحساب" }
  }
}

export async function logoutUser(): Promise<{ success: boolean }> {
  try {
    const sessionId = (await cookies()).get("session_id")?.value

    if (sessionId) {
      const db = createClient()

      // Delete session
      await db.query("DELETE FROM sessions WHERE id = $1", [sessionId])

      // Clear cookie
      ;(await
            // Clear cookie
            cookies()).delete("session_id")
    }

    return { success: true }
  } catch (error) {
    console.error("Logout error:", error)
    return { success: false }
  }
}

export async function getCurrentUser() {
  try {
    const sessionId = (await cookies()).get("session_id")?.value

    if (!sessionId) {
      return null
    }

    const db = createClient()

    // Get session with user
    const { rows } = await db.query(
      `SELECT u.id, u.name, u.email 
       FROM sessions s 
       JOIN userss u ON s.user_id = u.id 
       WHERE s.id = $1 AND s.expires_at > NOW()
       LIMIT 1`,
      [sessionId],
    )

    if (rows.length === 0) {
      (await cookies()).delete("session_id")
      return null
    }

    return rows[0]
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}


// export async function sendContactMessage(name: string, email: string, message: string) {
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_SERVICE, 
//     port: 587, 
//     secure: false, 
//     requireTLS: true,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: `"Contact Form" <${process.env.EMAIL_USER}>`,
//     to: process.env.SUPPORT_EMAIL,
//     subject: `New Contact Message from ${name}`,
//     text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     return { success: true, message: "Message sent successfully" };
//   } catch (error) {
//     console.error("Error sending contact email:", error);
//     return { success: false, error: "Failed to send message" };
//   }
// }

export async function sendContactMessage(name: string, email: string, message: string) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.SUPPORT_EMAIL) {
    console.error("Missing email environment variables");
    return { success: false, error: "Email configuration is missing" };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVICE,
    port: 587, // Use 465 for secure connection
    secure: false, // Set to true if using port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // Prevent issues with self-signed certs
    },
  });

  const mailOptions = {
    from: `"Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.SUPPORT_EMAIL,
    subject: `New Contact Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Message sent successfully" };
  } catch (error) {
    console.error("Error sending contact email:", error);
    return { success: false, error: "Failed to send message" };
  }
}