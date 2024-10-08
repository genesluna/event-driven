import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { profileSlice } from '@/features/profiles/profile-slice';
import { eventSlice } from '@/features/events/event-slice';
import { authSlice } from '@/features/auth/auth-slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    events: eventSlice.reducer,
    profiles: profileSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
