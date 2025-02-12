import { useEffect } from "react";
import Order from "../components/Order";
import useOrder from "../hooks/useOrder";
import { useLocation } from "react-router-dom";

const OrderPage = () => {
  const { order, fetchOrder } = useOrder();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const orderId = query.get("orderId");
  useEffect(() => {
    fetchOrder(orderId);
  }, []);

  return (
    <div>
      {!order && (
        <div class="spinner-border text-dark" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      )}
      {order && <Order order={order}></Order>}
    </div>
  );
};

export default OrderPage;
