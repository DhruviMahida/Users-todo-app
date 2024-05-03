const initialState = {
  user: [],
  bookMarkedUser: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_BOOKMARK":
      return {
        ...state,
        bookMarkedUser: [...state.bookMarkedUser, action.payload],
      };
    case "REMOVE_BOOKMARK":
      return {
        ...state,
        bookMarkedUser: state.bookMarkedUser.filter(user => user.id !== action.payload),
      };
      default:
        return state
  }
};

export default rootReducer;
