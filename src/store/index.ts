import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { userSaga } from '../components/user-react-saga/userSaga';
import userReducer from '../components/user-react-saga/userSlice';
import { usersSaga } from '../containers/users-redux-saga/usersSaga';
import usersReducer from '../containers/users-redux-saga/usersSlice';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([userSaga(), usersSaga()]);
}

export const store = configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false })
      .concat(sagaMiddleware)
      .concat(logger),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
