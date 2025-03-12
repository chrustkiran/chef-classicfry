import axios from "axios";

const { useState } = require("react");

const OrderStatus = {
  PLACED_WITH_PAYMENT: "Placed",
  PLACED_WITHOUT_PAYMENT: "Placed",
  IN_PROGRESS: "In_Progress",
  READY_FOR_PICKUP: "Completed",
  COMPLETED: "Completed",
  PENDING_FOR_PAYMENT: "Payment_Pending",
  CANCELLED: "Denied",
};

const OrderStatusMapper = (status) => {
  if (status in OrderStatus) {
    return OrderStatus[status];
  }
  return status;
};

const base_url = `${process.env.REACT_APP_API_URL}/api/v1/`;
const useOrder = () => {
  const [orders, setOrders] = useState({});
  const [order, setOrder] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const fetchOrders = () => {
    axios
      .get(base_url + "orders?fromChef=true")
      .then((res) => {
        const orders = res.data.filter(
          (order) => order.orderStatus in OrderStatus
        );

        // Categorize orders into active and completed
        const categorizedOrders = orders.reduce((acc, order) => {
          const status = OrderStatusMapper(order.orderStatus);

          if (!acc[status]) {
            acc[status] = [];
          }

          acc[status].push({
            ...order,
            orderStatus: status,
          });

          return acc;
        }, {});

        setOrders(categorizedOrders);
      })
      .catch((err) => {
        setOrders({});
      });
  };

  const fetchOrder = (orderId) => {
    setLoading(true);
    axios
      .get(base_url + `orders/${orderId}`)
      .then((res) => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setOrder(null);
        setLoading(false);
      });
  };

  return { orders, fetchOrders, order, fetchOrder, loading };
};

export default useOrder;
