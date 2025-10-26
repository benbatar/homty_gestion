import { NextResponse } from 'next/server';
import { createSupabaseServer } from '../../lib/supabase/server';

export async function GET() {
  const supabase = await createSupabaseServer(); // <- await
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL('/login', 'http://localhost:3000'));
}
