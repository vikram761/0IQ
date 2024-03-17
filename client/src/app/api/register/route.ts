import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  try {
    const body = await request.json();

    const { name, email, password, institute, role } = body;

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new Error("Email Already Exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const UserRole = role ? "STUDENT" : "TEACHER";

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        institute,
        role: UserRole,
      },
    });

    const userId = user.id;

    if (UserRole == "STUDENT") {
      await prisma.student.create({
        data: {
          name,
          userId,
        },
      });
    } else {
      await prisma.teacher.create({
        data: {
          name,
          userId,
        },
      });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
