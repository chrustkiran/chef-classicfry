
const OrderService = {
  modifyOrder: (actionType, orderId) => {
    console.log(process.env)
    return new Promise((resolve, reject) => {
      fetch(`${process.env.REACT_APP_API_URL}/api/v1/orders/${orderId}/${actionType}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
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
