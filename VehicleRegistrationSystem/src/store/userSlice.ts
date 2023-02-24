import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export const userKey = 'userKey';

export interface IUserData {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface IUserSessionData {
  token: string;
  user : IUserData
}

export interface IUserState {
  userData: IUserSessionData | null;
  isLoggedIn: boolean;
  isLoadingStorageData: boolean;
  isLoggingOut: boolean;
}

const initialState: IUserState = {
  userData: null,
  isLoggedIn: false,
  isLoadingStorageData: true,
  isLoggingOut: false,
};

const loadUserFromStorage:any = createAsyncThunk('user/loadFromStorage', () => {
  return AsyncStorage.getItem(userKey);
});

const loginUser:any = createAsyncThunk('user/loginUser',
  async (userData: IUserSessionData) => {
    await AsyncStorage.setItem(userKey, JSON.stringify(userData));
    return userData;
  },
);

const logOutUser:any = createAsyncThunk('user/logout', () => {
  return AsyncStorage.removeItem(userKey);
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  // use the builder pattern its easier to understand
  extraReducers: builder => {
    builder
      .addCase(loadUserFromStorage.fulfilled,
        (state, action: PayloadAction<any>) => {
          const {payload} = action;
          const user = JSON.parse(payload);
          // console.log("USRES",user);
          
          if (user) {
            state.isLoadingStorageData = false;
            state.isLoggedIn = true;
            state.userData = user;
          } else {
            state.isLoadingStorageData = false;
            state.isLoggedIn = false;
            state.userData = null;
          }
        },
      )
      .addCase(loadUserFromStorage.rejected,
        state => {
        state.isLoadingStorageData = false;
      })
      .addCase(loginUser.fulfilled,
        (state, action: PayloadAction<IUserSessionData>) => {
          const {payload} = action;
          state.isLoggedIn = true;
          state.userData = payload;
        },
      )
      .addCase(logOutUser.fulfilled,
        state => {
        state.isLoggedIn = false;
        state.userData = null;
      })
  },
});


const userReducer = userSlice.reducer;

export {
  userReducer,
  loadUserFromStorage,
  logOutUser,
  loginUser,
};
