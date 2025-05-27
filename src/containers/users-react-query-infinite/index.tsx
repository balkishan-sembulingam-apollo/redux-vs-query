import React, { useEffect, useRef } from 'react';
import { Avatar, Box, Card, Flex, Spinner, Text } from '@radix-ui/themes';
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import styles from './index.module.css';
import { API_URL_MOCKAROO, ENABLE_CACHE, NETWORK_DELAY } from '../../constants';
import { UserMockaroo } from '../../types';
import { sleep } from '../../utils';

const queryClient = new QueryClient();

const fetchUsers = async ({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}): Promise<UserMockaroo[]> => {
  if (ENABLE_CACHE) {
    const cachedData = localStorage.getItem(
      `mockaroo-users:${offset}:${limit}`,
    );
    if (cachedData) {
      await sleep(NETWORK_DELAY);
      return JSON.parse(cachedData);
    }
  }

  const { data } = await axios.get(
    `${API_URL_MOCKAROO}/users?key=${process.env.REACT_APP_MOCKAROO_KEY}&limit=${limit}&offset=${offset}`,
  );
  if (ENABLE_CACHE) {
    localStorage.setItem(
      `mockaroo-users:${offset}:${limit}`,
      JSON.stringify(data),
    );
  }
  return data;
};

const UsersReactQueryInfiniteWrapper: React.FC = () => {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['mockaroo-users'],
    queryFn: ({ pageParam }) =>
      fetchUsers({
        offset: pageParam,
        limit: 10,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // If we received less than 10 items, we've reached the end
      if (lastPage.length < 10) return undefined;
      // Otherwise, return the next offset
      return allPages.length * 10;
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading)
    return (
      <div className={styles.loading}>
        <Spinner />
      </div>
    );
  if (error) return <Text>Error: {(error as Error).message}</Text>;

  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      <Flex direction="column" gap="4" className={styles.users}>
        {data?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.map((user) => (
              <Box maxWidth="240px" key={user.id}>
                <Card>
                  <Flex gap="3" align="center">
                    <Avatar
                      size="3"
                      radius="full"
                      fallback={user.firstName.charAt(0)}
                    />
                    <Box>
                      <Text as="div" size="2" weight="bold">
                        {user.firstName} {user.lastName}
                      </Text>
                      <Text as="div" size="2" color="gray">
                        {user.email}
                      </Text>
                    </Box>
                  </Flex>
                </Card>
              </Box>
            ))}
          </React.Fragment>
        ))}
        <Box mt="4" ref={loadMoreRef}>
          {isFetchingNextPage && <Text>Loading more...</Text>}
        </Box>
      </Flex>
    </>
  );
};

const UsersReactQueryInfinite: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersReactQueryInfiniteWrapper />
    </QueryClientProvider>
  );
};

export default UsersReactQueryInfinite;
