import { useEffect, useState } from "react";
import Order from "../components/Order";
import useOrder from "../hooks/useOrder";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";

const OrderPage = () => {
  const { order, fetchOrder, loading } = useOrder();

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <Header> </Header>

      <div className="container mt-5">
        <h2>Search Order</h2>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter order ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="btn btn-dark"
            onClick={() => fetchOrder(searchTerm)}
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              "Search"
            )}
          </button>
        </div>

        {loading && (
          <div className="mt-3 text-center">
            <div className="spinner-border"></div>
            <p>Loading order details...</p>
          </div>
        )}

        {order && <Order order={order} />}
      </div>
    </div>
  );
};

export default OrderPage;
