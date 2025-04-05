// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Welcome to My App 👋</h1>
      <p>This is the homepage.</p>
      <Link href="/signup">Go to Sign Up</Link>
      <br />
      <Link href="/login">Go to Login</Link>
    </main>
  );
}
