function UseInitialValues() {
  const INITIAL_FORM_STATE_LOGIN = {
    email: "",
    password: "",
  };
  const INITIAL_FORM_STATE_SIGNUP = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  return {
    INITIAL_FORM_STATE_LOGIN,
    INITIAL_FORM_STATE_SIGNUP,
  };
}
export default UseInitialValues;
