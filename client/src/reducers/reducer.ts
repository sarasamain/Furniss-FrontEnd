interface RootState {
  name: string,
  lastname: string,
  username: string,
  email: string,
  password: string,
  birthdate: string,
  gender: string,
  address: string,
  isAuthenticated: boolean,
}

const initialState: RootState = {
  name: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  birthdate: "",
  gender: "",
  address: "",
  isAuthenticated: false,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_REGISTER_DETAILS":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "AUTHENTICATED":
      return {
        ...state, 
        isAuthenticated: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
