import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Users from '../../components/users';
import { RootState, store } from '../../store';
import { fetchUsersStart } from './usersSlice';

const UsersReduxSagaWrapper: React.FC = () => {
  const dispatch = useDispatch();
  const {
    data: users,
    loading,
    error,
  } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsersStart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Users
      data={users ?? []}
      isLoading={loading}
      isError={!!error}
      type="react-saga"
    />
  );
};

const UsersReduxSaga: React.FC = () => {
  return (
    <Provider store={store}>
      <UsersReduxSagaWrapper />
    </Provider>
  );
};
export default UsersReduxSaga;
