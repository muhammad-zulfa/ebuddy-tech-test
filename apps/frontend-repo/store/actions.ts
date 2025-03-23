import { User } from "@/apis/user";
import { Action } from "@reduxjs/toolkit";

export enum UserActionTypes {
  FETCHING_DATA = "FETCHING_PATIENT",
  DATA_FETCHED = "DATA_FETCHED",
}

export interface UserAction extends Action<UserActionTypes> {
  payload: User | boolean | Array<User>;
}

export const fetchingData = (): UserAction => ({
  type: UserActionTypes.FETCHING_DATA,
  payload: true,
});

export const dataFetched = (data: User | Array<User>): UserAction => ({
  type: UserActionTypes.DATA_FETCHED,
  payload: data,
});
