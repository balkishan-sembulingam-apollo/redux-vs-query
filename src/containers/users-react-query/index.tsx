import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Users from '../../components/users';
import { fetchUsers } from '../../helpers';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
});

const UsersReactQueryWrapper: React.FC = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 1000 * 5,
    refetchOnWindowFocus: true,
  });

  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      <Users
        data={users ?? []}
        isLoading={isLoading}
        isError={!!error}
        type="react-query"
      />
    </>
  );
};

const UsersReactQuery: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersReactQueryWrapper />
    </QueryClientProvider>
  );
};

export default UsersReactQuery;
