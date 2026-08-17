import { Link } from 'wouter';
import '../styles/not-found.css';

export function NotFoundPage() {
  return (
    <main className="not-found">
      <p className="eyebrow">404 · неизвестное направление</p>
      <h1>Такой тропы пока нет.</h1>
      <Link href="/">Вернуться к карте</Link>
    </main>
  );
}
