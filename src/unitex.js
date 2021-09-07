import axios from "axios";
import userAuth from "./userAuth.js";
import CONSTANT from "./unitexConstants.js";

/**
 * Common Auth Header
 */
const authHeader = async () => {
  const userAuthToken = await userAuth.getUserToken();
  return { "x-token": `${userAuthToken}`, accept: "application/json" };
};

/**
 * Gets Market List
 * @returns responseData
 */
const getMarketList = async () => {
  try {
    const responseData = await axios.get(
      process.env.BASE_URL + "/api/v1/market/list",
      { headers: { ...(await authHeader()) } }
    );
    return responseData.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * Gets Market Price Using Market Id
 * @param {int} marketId
 * @returns responseData
 */
const getMarketPrice = async (marketId) => {
  try {
    const responseData = await axios.get(
      process.env.BASE_URL +
        `/api/v1/exchange/market/price?marketId=${marketId}`,
      { headers: { ...(await authHeader()) } }
    );
    return responseData.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * Get recent trades by market id
 * @param {int} marketId
 * @returns
 */
const getRecentTrades = async (marketId) => {
  try {
    const responseData = await axios.get(
      process.env.BASE_URL +
        `/api/v1/exchange/trade/recent?marketId=${marketId}`,
      { headers: { ...(await authHeader()) } }
    );
    return responseData.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * Buy Order
 * @param {int} marketId
 * @param {int} amount
 * @param {int} price
 * @returns
 */
const buyOrder = async (marketId, amount, price) => {
  try {
    const responseData = await axios.post(
      process.env.BASE_URL + `/api/v1/order/open`,
      {
        amount: amount,
        marketId: marketId,
        price: price,
        side: CONSTANT.SIDE.BUY,
        type: CONSTANT.ORDER_TYPE.MARKET,
      },
      { headers: { ...(await authHeader()) } }
    );
    return responseData.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * Sell Order
 * @param {int} orderId
 * @returns respomseData
 */
const sellOrder = async (orderId) => {
  try {
    const responseData = await axios.post(
      process.env.BASE_URL + `/api/v1/order/close`,
      {
        orderId: orderId,
      },
      { headers: { ...(await authHeader()) } }
    );
    return responseData.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default {
  getMarketList,
  getMarketPrice,
  getRecentTrades,
  buyOrder,
  sellOrder,
};
