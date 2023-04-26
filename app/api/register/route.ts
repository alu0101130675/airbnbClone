import { client } from "@/prisma/libs/prismadb"
import { hash } from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  const {email,name,password} = body
  const hashedPassword=await hash(password,10)
  console.log(email,name,password)
  const user = await client.user.create({
    data:{
      email,
      name,
      hashedPassword
    }
  })
  return NextResponse.json(user)
}
