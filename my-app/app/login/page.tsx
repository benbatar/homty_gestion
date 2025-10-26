'use client';
import { useState } from 'react';
import { createSupabaseBrowser } from '../../lib/supabase/browser';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState<string|null>(null);
  const [err, setErr] = useState<string|null>(null);

  const onSend = async () => {
    setErr(null); setMsg(null);
    const supabase = createSupabaseBrowser();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/dashboard` }
    });
    if (error) setErr(error.message);
    else setMsg('Lien de connexion envoyé. Vérifie ta boîte mail.');
  };

  return (
    <main style={{ padding: 24 }}>
      <h1>Connexion</h1>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        style={{ padding: 8, width: 280, marginRight: 8 }}
      />
      <button onClick={onSend}>Envoyer lien</button>
      {msg && <p>{msg}</p>}
      {err && <p style={{color:'red'}}>{err}</p>}
    </main>
  );
}
