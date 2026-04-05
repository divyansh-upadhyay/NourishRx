import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signToken, setSession } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName, ...patientData } = await req.json();

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'PATIENT',
        patientProfile: {
          create: {
            firstName,
            lastName,
            dob: new Date(patientData.dob || '1990-01-01'),
            gender: patientData.gender || 'Other',
            heightCm: parseFloat(patientData.heightCm || '170'),
            weightKg: parseFloat(patientData.weightKg || '70'),
          }
        }
      }
    });

    const token = signToken({ id: user.id, email: user.email, role: user.role });
    await setSession(token);

    return NextResponse.json({ success: true, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
