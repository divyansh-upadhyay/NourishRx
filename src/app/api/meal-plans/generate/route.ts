import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { generateMealPlan } from '@/lib/ai-engine';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const plan = await generateMealPlan((session as any).id);

    return NextResponse.json({ success: true, plan });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
