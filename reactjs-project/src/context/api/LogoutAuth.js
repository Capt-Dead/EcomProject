import axios from "axios";

axios.defaults.baseURL = "http://laravel-project.test:8080/api/";

export const LogoutAuth = async (cookies, userCookie) => {
  try {
    const response = await axios.post("logout", null, {
      headers: {
        Authorization: `Bearer ${userCookie.user.token}`,
      },
    });
    if (response.status === 204) {
      cookies.remove("user", { path: "/" });
      return response.data;
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    return error?.response?.data?.message;
  }
};

export default LogoutAuth;
