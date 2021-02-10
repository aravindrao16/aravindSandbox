const defaultValues = {
  id: "",
  name: "",
  email: "",
};

export default (state = defaultValues, action) => {
  const { type, payload } = action;
  console.log("Type & Payload", type, payload);
  let stateCopy = JSON.parse(JSON.stringify(state));
  switch (type) {
    case "USER_AUTH":
      stateCopy.id = payload.id;
      stateCopy.name = payload.name;
      stateCopy.email = payload.email;
      return stateCopy;
    default:
      return state;
  }
};
