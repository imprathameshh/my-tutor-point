export const token = localStorage.getItem("accesstoken");

export const apiHeaders = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
//STOARAGE A ACCESSTOKEN
export const isLoggedIn = Boolean(localStorage.getItem("accesstoken"));
//STOARAGE A CURRENTUSER DETAIL;
export const currentUser = JSON.parse(localStorage.getItem("currentUser"));
