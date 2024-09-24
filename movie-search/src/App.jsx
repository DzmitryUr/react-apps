import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CharacterList from './components/MovieList';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CharacterList />
    </QueryClientProvider>
  );
}