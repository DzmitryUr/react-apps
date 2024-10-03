import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './App.css';
import Weather from './components/Weather';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Weather />
    </QueryClientProvider>
  );
}

export default App;
