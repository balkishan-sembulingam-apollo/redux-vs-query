import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
} from '@radix-ui/themes';
import { RootState } from '../../store';
import {
  fetchPhotosRequest,
  fetchUserRequest,
  updateUserRequest,
} from './userSlice';

interface UserReactSagaProps {
  userId: number;
}

const UserReactSaga: React.FC<UserReactSagaProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const { data, photos, loading, error } = useSelector(
    (state: RootState) => state.user,
  );

  const user = data?.[userId];

  useEffect(() => {
    dispatch(fetchUserRequest(userId));
    dispatch(fetchPhotosRequest());
  }, [dispatch, userId]);

  useEffect(() => {
    setUsername(user?.username ?? '');
  }, [user?.username]);

  const handleSave = () => {
    if (user?.id) {
      dispatch(updateUserRequest({ ...user, username }));
    }
  };

  if (loading) {
    return <Text>Loading user details...</Text>;
  }

  if (error) {
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
              <Button size="1" variant="soft" onClick={handleSave}>
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

export default UserReactSaga;
