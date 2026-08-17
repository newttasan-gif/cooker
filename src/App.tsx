import { Route, Switch } from 'wouter';
import { GamePage } from './pages/GamePage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <div className="app-shell">
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/game" component={GamePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
