import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { API_URL_JPH } from '../../constants';
import { User } from '../../types';
import {
  fetchUsersFailure,
  fetchUsersStart,
  fetchUsersSuccess,
} from './usersSlice';

function* fetchUsers() {
  try {
    const { data }: { data: User[] } = yield call(
      axios.get,
      `${API_URL_JPH}/users`,
    );
    yield put(fetchUsersSuccess(data));
  } catch (error) {
    yield put(
      fetchUsersFailure(
        error instanceof Error ? error.message : 'An error occurred',
      ),
    );
  }
}

export function* usersSaga() {
  yield takeLatest(fetchUsersStart.type, fetchUsers);
}
