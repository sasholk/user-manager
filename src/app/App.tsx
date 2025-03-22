import { CircularProgress } from '@mui/material';
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';

function App() {
  const routing = useRoutes(routes);

  return (
    <Suspense fallback={<CircularProgress color="secondary" />}>
      {routing}
    </Suspense>
  );
}

export default App;
