import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Photo, User } from '../../types';

export interface UserState {
  data: Record<number, User> | null;
  photos: Photo[];
  loading: boolean;
  updating: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: {},
  photos: [],
  loading: false,
  updating: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserRequest: (state, action: PayloadAction<number>) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.data = state.data ?? {};
      state.data[action.payload.id] = action.payload;
    },
    fetchUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchPhotosRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPhotosSuccess: (state, action: PayloadAction<Photo[]>) => {
      state.loading = false;
      state.photos = action.payload;
    },
    fetchPhotosFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserRequest: (state, action: PayloadAction<User>) => {
      state.updating = true;
      state.error = null;
    },
    updateUserSuccess: (state, action: PayloadAction<User>) => {
      state.data = state.data ?? {};
      state.data[action.payload.id] = action.payload;
      state.updating = false;
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.updating = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  fetchPhotosRequest,
  fetchPhotosSuccess,
  fetchPhotosFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
