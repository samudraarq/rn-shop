import { AUTHENTICATE, DONE_LOADING, LOGOUT } from "../actions/auth";

const initialState = {
  isLoading: true,
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DONE_LOADING: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      };
    case LOGOUT: {
      return {
        ...state,
        token: null,
        userId: null,
      };
    }
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     userId: action.userId,
    //   };
    default:
      return state;
  }
};
