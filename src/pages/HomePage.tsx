import { Link } from 'wouter';
import '../styles/home.css';

export function HomePage() {
  return (
    <main className="home-page">
      <div className="home-page__sun" />
      <section className="home-page__content">
        <p className="eyebrow">первая небольшая вылазка</p>
        <h1>У<br />подножья</h1>
        <p className="home-page__lead">
          Помоги Глосу исследовать окрестности и наполнить сумку ценными кристаллами.
        </p>
        <Link href="/game" className="primary-link">
          Открыть первую главу <span aria-hidden="true">↗</span>
        </Link>
      </section>
      <p className="home-page__chapter">Глава 01 · Поиск кристаллов</p>
    </main>
  );
}
