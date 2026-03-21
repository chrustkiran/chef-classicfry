
const OrderService = {
  modifyOrder: (actionType, orderId) => {
    console.log(process.env)
    const accessToken = sessionStorage.getItem("accessToken");
    return new Promise((resolve, reject) => {
      fetch(`${process.env.REACT_APP_API_URL}/api/v1/orders/${orderId}/${actionType}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
      })
        .then((response) => resolve(response.json()))
        .catch((error) => {
          console.error("Error updating order:", error);
          reject(error);
        });
    });
  },
};

export default OrderService;
