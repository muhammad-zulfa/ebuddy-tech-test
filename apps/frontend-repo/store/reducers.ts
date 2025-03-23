import { User } from "@/apis/user";
import { UserAction, UserActionTypes } from "./actions";

// Define the initial state
interface UserListState {
  users: User[];
  isLoading: boolean;
}

const initialState: UserListState = {
  users: [],
  isLoading: false,
};
// Define the reducer function
const userReducer = (
  state = initialState,
  action: UserAction
): UserListState => {
  switch (action.type) {
    case UserActionTypes.FETCHING_DATA:
      return {
        users: [],
        isLoading: true,
      };
    case UserActionTypes.DATA_FETCHED:
      return {
        isLoading: false,
        users: action.payload as User[],
      };
    default:
      return state;
  }
};

export default userReducer;
