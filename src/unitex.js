import axios from "axios";
import userAuth from "./userAuth.js";
import CONSTANT from "./unitexConstants.js";

const methods = {
  GET: "get",
  POST: "post",
};

/**
 * Common Auth Header
 */
const authHeader = async () => {
  const userAuthToken = await userAuth.getUserToken();
  return { "x-token": `${userAuthToken}`, accept: "application/json" };
};

const makeRequest = async (method, url, data = {}) => {
  try {
    const responseData = await axios({
      method: method,
      url: process.env.BASE_URL + url,
      data: data,
      headers: { ...(await authHeader()) },
    });
    return [responseData.data, true];
  } catch (error) {
    return [error.response.status, false];
  }
};

/**
 * Gets Market List
 * @returns responseData
 */
const getMarketList = async () => {
  const [data, status] = await makeRequest(
    methods.GET,
    "/api/v1/market/list/1"
  );
  if (status) return data;
  console.error(data);
};

/**
 * Gets Market Price Using Market Id
 * @param {int} marketId
 * @returns responseData
 */
const getMarketPrice = async (marketId) => {
  const [data, status] = await makeRequest(
    methods.GET,
    `/api/v1/exchange/market/price?marketId=${marketId}`
  );
  if (status) return data;
  console.error(data);
};

/**
 * Get recent trades by market id
 * @param {int} marketId
 * @returns
 */
const getRecentTrades = async (marketId) => {
  const [data, status] = await makeRequest(
    methods.GET,
    `/api/v1/exchange/trade/recent?marketId=${marketId}`
  );
  if (status) return data;
  console.error(data);
};

/**
 * Buy Order
 * @param {int} marketId
 * @param {int} amount
 * @param {int} price
 * @returns
 */
const buyOrder = async (marketId, amount, price, sell = false) => {
  const [data, status] = await makeRequest(methods.POST, `/api/v1/order/open`, {
    amount: amount,
    marketId: marketId,
    price: price,
    side: sell ? CONSTANT.SIDE.SELL : CONSTANT.SIDE.BUY,
    type: CONSTANT.ORDER_TYPE.MARKET,
  });
  if (status) return data;
  console.error(data);
};

/**
 * Sell Order
 * @param {int} orderId
 * @returns respomseData
 */
const closeOrder = async (orderId) => {
  const [data, status] = await makeRequest(
    methods.POST,
    `/api/v1/order/close`,
    {
      orderId: orderId,
    }
  );
  if (status) return data;
  console.error(data);
};

export default {
  getMarketList,
  getMarketPrice,
  getRecentTrades,
  buyOrder,
  closeOrder,
};
