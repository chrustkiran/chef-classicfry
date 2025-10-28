import React from "react";
import Header from "./Header";

const Order = ({ order }) => {
  return (
    <div>
      <Header></Header>
      <div className="container mt-4">
        <div className="card shadow-sm">
          <div className="card-header bg-dark text-white">
            <h5>Order ID: {order.orderId.substring(0, 6).toUpperCase()}</h5>
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
              &nbsp;
              <strong>Amount:</strong> ${order.payment.amount}
            </p>

            {order.orderItems?.length > 0 && (
              <div>
                <h6 className="mb-3">Order Items</h6>
                <div className="row">
                  {order.orderItems.map((orderItem, index) => {
                    // Check if the orderItem contains an item or a deal
                    const itemOrDeal = orderItem.item || orderItem.deal;

                    if (!itemOrDeal) return null; // Skip if neither exists

                    return (
                      <div className="col-md-4" key={index}>
                        <div className="card mb-3">
                          <img
                            style={{ width: '400px' }}
                            src={itemOrDeal.image}
                            className="card-img-top"
                            alt={itemOrDeal.name}
                          />
                          <div className="card-body">
                            <h6>{itemOrDeal.name}</h6>
                            <p>Category: {itemOrDeal.category || "Deal"}</p>
                            <p>
                              Price: $
                              {itemOrDeal.portionPrices?.[0]?.price ||
                                itemOrDeal.price ||
                                "N/A"}
                            </p>
                            <p>Quantity: {orderItem.quantity}</p>
                            {orderItem.drinkOptions && orderItem.drinkOptions.length > 0 && <p>Drinks: {orderItem.drinkOptions.map(d => d.name)
                              .join(", ")}</p>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
