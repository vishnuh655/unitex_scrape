import axios from "axios";

const BASE_URL = "https://uat-markets-pub-new.otcdesk.ch";

const getUserToken = async () => {
  const responseData = await axios.post(
    process.env.BASE_URL + "/api/v1/user/login",
    {
      captcha: "string",
      email: process.env.USER_NAME,
      password: process.env.PASSWORD,
    }
  );

  return responseData.data.token;
};

export default {
  getUserToken,
};
