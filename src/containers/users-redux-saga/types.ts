import { User } from '../../types';

export interface UsersState {
  data: User[];
  loading: boolean;
  error: string | null;
}
