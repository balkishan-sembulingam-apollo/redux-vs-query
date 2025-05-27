import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { API_URL_JPH, NETWORK_DELAY } from '../../constants';
import { Photo, User } from '../../types';
import { sleep } from '../../utils';
import {
  fetchPhotosFailure,
  fetchPhotosRequest,
  fetchPhotosSuccess,
  fetchUserFailure,
  fetchUserRequest,
  fetchUserSuccess,
  updateUserFailure,
  updateUserRequest,
  updateUserSuccess,
} from './userSlice';

function* fetchUser(action: PayloadAction<number>) {
  try {
    const { data }: { data: User } = yield call(
      axios.get,
      `${API_URL_JPH}/users/${action.payload}`,
    );
    yield call(sleep, NETWORK_DELAY);
    yield put(fetchUserSuccess(data));
  } catch (error) {
    yield put(
      fetchUserFailure(
        error instanceof Error ? error.message : 'An error occurred',
      ),
    );
  }
}

function* fetchPhotos() {
  try {
    const { data }: { data: Photo[] } = yield call(
      axios.get,
      `${API_URL_JPH}/photos`,
    );
    yield call(sleep, NETWORK_DELAY);
    yield put(fetchPhotosSuccess(data));
  } catch (error) {
    yield put(
      fetchPhotosFailure(
        error instanceof Error ? error.message : 'An error occurred',
      ),
    );
  }
}

export function* updateUser(action: PayloadAction<User>) {
  try {
    const { data }: { data: User } = yield call(
      axios.put,
      `${API_URL_JPH}/users/${action.payload.id}`,
      action.payload,
    );
    yield call(sleep, NETWORK_DELAY);
    yield put(updateUserSuccess(data));
  } catch (error) {
    yield put(
      updateUserFailure(
        error instanceof Error ? error.message : 'An error occurred',
      ),
    );
  }
}

export function* userSaga() {
  yield takeLatest(fetchUserRequest.type, fetchUser);
  yield takeLatest(fetchPhotosRequest.type, fetchPhotos);
  yield takeLatest(updateUserRequest.type, updateUser);
}
