import React from "react";
import Header from "./Header";

const Order = ({ order }) => {
  return (
    <div>
      <Header></Header>
      <div className="container mt-4">
        <div className="card shadow-sm">
          <div className="card-header bg-dark text-white">
            <h5>Order ID: {order.orderId.substring(0,6).toUpperCase()}</h5>
            <small>
              Created Time: {new Date(order.createdTime).toLocaleString()}
            </small>
          </div>
          <div className="card-body">
            <h6 className="mb-1">User Details</h6>
            <p>
              <strong>Name:</strong> {order.userView.firstName}{" "}
              {order.userView.lastName} <br />
              <strong>Phone:</strong> {order.userView.phoneNumber}
            </p>

            <h6 className="mb-1">Payment Information</h6>
            <p>
              <strong>Status:</strong> {order.payment.status}
              <strong>Amount:</strong> ${order.payment.amount}
            </p>

            {order.items?.length > 0 && (
              <div>
                <h6 className="mb-3">Items</h6>
                <div className="row">
                  {order.items.map((item, index) => (
                    <div className="col-md-4" key={index}>
                      <div className="card mb-3">
                        <img
                          src={item.image}
                          className="card-img-top"
                          alt={item.name}
                        />
                        <div className="card-body">
                          <h6>{item.name}</h6>
                          <p>Price: ${item.price}</p>
                          <p>Quantity: {item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {order.deals?.length > 0 && (
              <div>
                <h6 className="mb-3">Deals</h6>
                <div className="row">
                  {order.deals.map((deal, index) => (
                    <div className="col-md-4" key={index}>
                      <div className="card mb-3">
                        <img
                          src={deal.image}
                          className="card-img-top"
                          alt={deal.name}
                        />
                        <div className="card-body">
                          <h6>{deal.name}</h6>
                          <p>Price: ${deal.price}</p>
                          <p>Quantity: {deal.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
