import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export const createSupabaseServer = async () => {
  const cookieStore = await cookies(); // <- await nécessaire sur ta version
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set() {},   // no-op en Codespaces
        remove() {} // no-op en Codespaces
      }
    }
  );
};
