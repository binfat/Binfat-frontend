import { makeNetworkCall } from "src/network";
import { GET_STOCK_LEVEL_REPORT_REQUEST, GET_STOCK_LEVEL_REPORT_SUCCESS } from "../../constants";

export const getStockLevelReport = async ({ dispatch, enqueueSnackbar, Router, branch }) => {
  try {
    dispatch({
      type: GET_STOCK_LEVEL_REPORT_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "GET",
      path: `/view-product`,
    });
    console.log(data.data);
    dispatch({
      type: GET_STOCK_LEVEL_REPORT_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    Router.push({
      pathname: "/reporting/stock-level-bal-print-report",
      query: { branch },
    });
  } catch (error) {
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};
