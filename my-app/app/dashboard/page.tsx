import { redirect } from 'next/navigation';
import { createSupabaseServer } from '../../lib/supabase/server';

export default async function Dashboard() {
  const supabase = await createSupabaseServer(); // <- await
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  return (
    <main style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Bienvenue {user.email}</p>
      <a href="/logout">Se déconnecter</a>
    </main>
  );
}
