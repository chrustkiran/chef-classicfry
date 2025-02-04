import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import Header from "./Header";
import useOrder from "../hooks/useOrder";

const Home = () => {
  const { logout } = useContext(AuthContext);

  const { orders, fetchOrders } = useOrder();
  const [activeTab, setActiveTab] = useState("active");
  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setExpandedOrder(null); // Reset expanded orders when switching tabs
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  return (
    <div>
      <Header></Header>
      {/* <h2 className="container mt-4 d-flex justify-content-center">Current Orders</h2> */}
      <section className="food-category-section fix section-padding section-bg">
        <div className="container px-3 px-md-5 px-lg-5 px-xl-5">
          <div className="row g-5 pr-5 pl-5 order-section px-3 px-md-5 px-lg-5 px-xl-5">
            <ul className="nav nav-tabs d-flex  order-tab">
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "active" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("active")}
                >
                  Active Orders
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "completed" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("completed")}
                >
                  Completed Orders
                </button>
              </li>
              <li>
                <div onClick={fetchOrders} className="btn mr-0">
                  <i className="fas fa-redo"></i>
                </div>
              </li>
            </ul>

            {/* Order List */}
            <div className="row row-cols-1 mt-3 g-1 gap-3">
              {orders[activeTab].length === 0 ? (
                <p className="text-muted text-center">No orders available.</p>
              ) : (
                orders[activeTab].map((order) => (
                  <div key={order.id} className="card">
                    <div className="card-body col gap-3">
                      <div className="d-flex column justify-content-between">
                        <div>
                          {" "}
                          <small>ORDER ID</small>{" "}
                          <h3 className="card-title">
                            {order.orderId.substring(0, 6)}
                          </h3>
                        </div>
                        <div>
                          <span className="badge bg-success">
                            {order.orderStatus}
                          </span>
                        </div>
                      </div>
                      <div className="d-flex column justify-content-between mt-3">
                        <div>
                          <strong>Total:</strong> £{order.payment?.amount}
                        </div>
                        <br></br>

                        <div>
                          <strong>
                            <i className="fas flaticon-calendar"> </i>
                          </strong>{" "}
                          {new Date(order.createdTime).toLocaleDateString()}{" "}
                          <br></br>
                          <strong>
                            <i className="fas fa-clock"></i>{" "}
                          </strong>{" "}
                          {new Date(order.createdTime).toLocaleTimeString()}
                        </div>
                      </div>
                      <div>
                        <span
                          style={{ border: "1px solid black", color: "black" }}
                          className="badge bg-light"
                        >
                          {order.payment.type} payment
                        </span>
                      </div>

                      <button
                        className="btn btn-dark btn-sm mt-4 w-100"
                        onClick={() => toggleOrder(order.id)}
                      >
                        {expandedOrder === order.id
                          ? "Hide Details"
                          : "View Details"}
                      </button>
                    </div>

                    {/* Expandable Order Details */}
                    <div
                      className={`collapse ${
                        expandedOrder === order.id ? "show" : ""
                      }`}
                    >
                      <div className="card-body">
                        <div className="d-flex justify-content-between mb-3"><h4>Order Items</h4>
                        <div className="d-flex gap-3">
                          <button className="btn btn-dark">Approve</button>
                          <button style={{border: '1px solid black'}} className="btn btn-light">Deny</button>
                        </div>
                        </div>
                        
                        <ul className="list-group">
                          {order.orderItems.map((orderItem, index) => {
                            const item = orderItem.item
                              ? orderItem.item
                              : orderItem.deal;
                            return (
                              <li
                                key={index}
                                className="list-group-item d-flex align-items-center gap-3"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="me-3"
                                  width="50"
                                  height="50"
                                />
                                <div> {orderItem.quantity}</div>
                                <div>
                                  <div>
                                    {" "}
                                    <span>
                                      {orderItem.portionSize !== "REGULAR" &&
                                        orderItem.portionSize}
                                    </span>{" "}
                                    {item.name}
                                  </div>{" "}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
