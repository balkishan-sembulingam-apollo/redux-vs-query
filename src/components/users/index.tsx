import React, { useState } from 'react';
import { Button } from '@radix-ui/themes';
import { Dialog } from '@radix-ui/themes';
import { Flex } from '@radix-ui/themes';
import styles from './index.module.css';
import { User } from '../../types';
import DetailsButtonReactQuery from '../details-button-react-query';
import DetailsButtonReactSaga from '../details-button-react-saga';
import UserReactQuery from '../user-react-query';
import UserReactSaga from '../user-react-saga';

interface UsersProps {
  data: User[];
  isLoading: boolean;
  isError: boolean;
  type: 'react-query' | 'react-saga';
}

const Users: React.FC<UsersProps> = ({ data, isLoading, isError, type }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (isError) {
    return <div>Error fetching users</div>;
  }

  return (
    <div className={styles.container}>
      <h2>Users List</h2>
      <div className={styles.grid}>
        {data?.map((user) => (
          <div key={user.id} className={styles.card}>
            <h3 className={styles.cardTitle}>{user.name}</h3>
            <p className={styles.cardText}>Username: {user.username}</p>
            <p className={styles.cardText}>Email: {user.email}</p>
            <Dialog.Root>
              <Dialog.Trigger>
                <Button onClick={() => setSelectedUser(user)}>
                  {type === 'react-query' ? (
                    <DetailsButtonReactQuery />
                  ) : (
                    <DetailsButtonReactSaga />
                  )}
                </Button>
              </Dialog.Trigger>
              <Dialog.Content maxWidth="450px">
                <Dialog.Title>User Details</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                  {selectedUser?.name}
                </Dialog.Description>
                {selectedUser &&
                  (type === 'react-query' ? (
                    <UserReactQuery userId={selectedUser.id} />
                  ) : (
                    <UserReactSaga userId={selectedUser.id} />
                  ))}
                <Flex gap="3" mt="4" justify="end">
                  <Dialog.Close>
                    <Button
                      variant="soft"
                      color="gray"
                      onClick={() => setSelectedUser(null)}
                    >
                      Close
                    </Button>
                  </Dialog.Close>
                </Flex>
              </Dialog.Content>
            </Dialog.Root>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
