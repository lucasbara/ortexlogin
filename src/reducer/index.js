const initialState = {
  modalIsOpen: false,
  time: null,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MODAL_ACTIVE":
      return {
        ...state,
        modalIsOpen: true,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        modalIsOpen: false,
      };
    default:
      return state;
  }
};

export default rootReducer;
