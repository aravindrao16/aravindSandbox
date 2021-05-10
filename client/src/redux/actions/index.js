export const userAuth = (payload) => {
  return {
    type: "USER_AUTH",
    payload,
  };
};

export const resetHome = (payload) => {
  return {
    type: "RESET_HOME",
    payload,
  };
};
