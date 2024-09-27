interface Props {
  title?: string;
  description?: string;
  text?: string;
}
function UseInitialValues(props: Props) {
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
  const INITIAL_FORM_ADD_POST = {
    title: "",
    description: "",
  };
  const INITIAL_FORM_UPDATE_POST = {
    title: props.title,
    description: props.description,
  };

  const INITIAL_FORM_ADD_COMMENT = {
    text: "",
  };
  const INITIAL_FORM_UPDATE_COMMENT = {
    text: props.text,
  };
  const INITIAL_FORM_CHANGE_PASSWORD = {
    currentPassword: "",
    newPassword: "",
  };

  return {
    INITIAL_FORM_STATE_LOGIN,
    INITIAL_FORM_STATE_SIGNUP,
    INITIAL_FORM_ADD_POST,
    INITIAL_FORM_ADD_COMMENT,
    INITIAL_FORM_UPDATE_POST,
    INITIAL_FORM_UPDATE_COMMENT,
    INITIAL_FORM_CHANGE_PASSWORD,
  };
}
export default UseInitialValues;
