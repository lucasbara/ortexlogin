export const openModalPassword = () => {
  console.log("Entra action");
  return {
    type: "MODAL_ACTIVE",
  };
};

export const closeModalPassword = () => {
  return {
    type: "CLOSE_MODAL",
  };
};
