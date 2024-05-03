export const addBookMark = (user) => {
    return {
      type: 'ADD_BOOKMARK',
      payload: user
    };
  };


  export const removeBookMark = (userId) => {
    return {
        type: "REMOVE_BOOKMARK",
        payload: userId,
    };
  };

