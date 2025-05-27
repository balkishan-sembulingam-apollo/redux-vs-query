import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
} from '@radix-ui/themes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUser, fetchUserPhotos, updateUser } from '../../helpers';
import { User } from '../../types';

interface UserReactQueryProps {
  userId: number;
}

const UserReactQuery: React.FC<UserReactQueryProps> = ({ userId }) => {
  const [username, setUsername] = useState('');
  const queryClient = useQueryClient();
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    staleTime: 1000 * 10,
    refetchOnWindowFocus: true,
  });

  const { data: photos } = useQuery({
    queryKey: ['photos'],
    queryFn: () => fetchUserPhotos(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  const { mutate: mutateUser } = useMutation({
    mutationFn: (u: User) => updateUser(userId, u),
    onSuccess: (response) => {
      console.log('onSuccess', { response });
      queryClient.setQueryData(['user', userId], response);
      queryClient.setQueryData(['users'], (old: User[]) =>
        old.map((u) => (u.id === userId ? response : u)),
      );
    },
  });

  const handleSave = () => {
    if (user?.id) {
      mutateUser({
        ...user,
        username,
      });
    }
  };

  useEffect(() => {
    setUsername(user?.username ?? '');
  }, [user?.username]);

  if (isLoading) {
    return <Text>Loading user details...</Text>;
  }

  if (error || !user) {
    return <Text color="red">Error loading user details</Text>;
  }

  return (
    <Card size="2">
      <Flex direction="column" gap="3">
        <Heading size="4" as="h2">
          {user?.name ?? '......'}
        </Heading>

        <Box>
          <TextField.Root
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          >
            <TextField.Slot side="right">
              <Button
                size="1"
                variant="soft"
                onClick={handleSave}
                disabled={username === user?.username}
              >
                Save
              </Button>
            </TextField.Slot>
          </TextField.Root>
        </Box>

        <Box>
          <Text as="div" weight="bold" size="2">
            Email:
          </Text>
          <Text as="div" size="2">
            {user?.email ?? '......'}
          </Text>
        </Box>

        <Box>
          <Text as="div" weight="bold" size="2">
            Phone:
          </Text>
          <Text as="div" size="2">
            {user?.phone ?? '......'}
          </Text>
        </Box>

        <Box>
          <Text as="div" weight="bold" size="2">
            Website:
          </Text>
          <Text as="div" size="2">
            {user?.website ?? '......'}
          </Text>
        </Box>

        <Box>
          <Text as="div" weight="bold" size="2">
            Address:
          </Text>
          <Text as="div" size="2">
            {user?.address?.street ?? '......'},{' '}
            {user?.address?.suite ?? '......'}
            <br />
            {user?.address?.city ?? '......'},{' '}
            {user?.address?.zipcode ?? '......'}
          </Text>
        </Box>

        <Box>
          <Text as="div" weight="bold" size="2">
            Company:
          </Text>
          <Text as="div" size="2">
            {user?.company?.name ?? '......'}
            <br />
            <Text color="gray">{user?.company?.catchPhrase ?? '......'}</Text>
          </Text>
        </Box>
        <Box>
          <Text as="div" weight="bold" size="2">
            Photos:
          </Text>
          <Text as="div" size="2">
            {photos?.length ?? '......'}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default UserReactQuery;
