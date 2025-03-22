import { useRoutes } from 'react-router-dom';
import routes from './routes';
import './style.css';

function App() {
  const routing = useRoutes(routes);
  return routing;
}

export default App;
