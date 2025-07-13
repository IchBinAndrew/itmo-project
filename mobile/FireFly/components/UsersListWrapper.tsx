// components/UsersListWrapper.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UsersList from '@/components/UsersList';

const queryClient = new QueryClient();

export default function UsersListWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersList />
    </QueryClientProvider>
  );
}
