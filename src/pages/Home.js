import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import useOrder from "../hooks/useOrder";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import OrderConfirmationModal from "../components/OrderConfirmationModal";
import OrderService from "../api/OrderService";
import AuthContext from "../context/AuthContext";

const ActionButton = ({ handleActionClick, order }) => {
  return (
    <div className="d-flex gap-3">
      {(order.orderStatus === "Placed" || order.orderStatus === "Denied") && (
        <button
          className="btn btn-dark"
          onClick={() => {
            handleActionClick(order.orderId, "approve");
          }}
        >
          Approve
        </button>
      )}

      {order.orderStatus === "In_Progress" && (
        <button
          className="btn btn-dark"
          onClick={() => {
            handleActionClick(order.orderId, "ready-for-pickup");
          }}
        >
          Ready
        </button>
      )}

      {(order.orderStatus === "Placed" ||
        order.orderStatus === "In_Progress") && (
        <button
          style={{ border: "1px solid black" }}
          className="btn btn-light"
          onClick={() => {
            handleActionClick(order.orderId, "deny");
          }}
        >
          Deny
        </button>
      )}
    </div>
  );
};

const Home = () => {
  const { isNewOrder, setNewOrder } = useContext(AuthContext);
  const { orders, fetchOrders } = useOrder();
  const [activeTab, setActiveTab] = useState("Placed");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [err, setError] = useState(null);
  const [orderFetched, setOrderFetched] = useState(false);
  const [messages, setMessages] = useState([]);

  let socket;

  const showError = (text) => {
    setError(text);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  const toggleOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setExpandedOrder(null);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (Object.keys(orders).length > 0) {
      setNewOrder(false);
      setOrderFetched(true);
    }
  }, [orders]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [actionType, setActionType] = useState("");

  const handleActionClick = (order, type) => {
    setSelectedOrder(order);
    setActionType(type);
  };

  const handleConfirm = () => {
    OrderService.modifyOrder(actionType, selectedOrder)
      .then((res) => {
        if (res.orderId) {
          setOrderFetched(false);
          fetchOrders();
          if (actionType === "approve") {
            setActiveTab("In_Progress");
          }
        }
      })
      .catch((err) => {
        showError("There is an error while updating the order!");
      })
      .finally(() => {
        setSelectedOrder(null);
        setActionType("");
      });
  };

  useEffect(() => {
    const websocketUrl = process.env.REACT_APP_WS_URL;

    socket = new WebSocket(websocketUrl);

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      console.log("Message received:", event.data);
      setMessages((prev) => [...prev, event.data]);
      if (event.data === "new-order") {
        setNewOrder(true);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <Header> </Header>
      <section className="food-category-section fix section-padding section-bg">
        <div className="container px-3 px-md-5 px-lg-5 px-xl-5">
          {err && (
            <p
              style={{ border: "2px solid red" }}
              className="shadow-sm p-4 order-confirm mt-2"
            >
              {err}
            </p>
          )}
          <div className="row g-5 pr-5 pl-5 order-section px-3 px-md-5 px-lg-5 px-xl-5">
            <ul className="nav nav-tabs d-flex  order-tab">
              <li className="nav-item">
                <button
                  className={`nav-link text-black ${
                    activeTab === "Placed" ? "active shadow-sm" : ""
                  }`}
                  onClick={() => handleTabChange("Placed")}
                >
                  New Orders ({orders["Placed"] ? orders["Placed"]?.length : 0})
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link text-black  ${
                    activeTab === "In_Progress" ? "active shadow-sm" : ""
                  }`}
                  onClick={() => handleTabChange("In_Progress")}
                >
                  Approved Orders (
                  {orders["In_Progress"] ? orders["In_Progress"].length : 0})
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link text-black  ${
                    activeTab === "Denied" ? "active shadow-sm" : ""
                  }`}
                  onClick={() => handleTabChange("Denied")}
                >
                  Denied Orders (
                  {orders["Denied"] ? orders["Denied"]?.length : 0})
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`nav-link text-black ${
                    activeTab === "Completed" ? "active shadow-sm" : ""
                  }`}
                  onClick={() => handleTabChange("Completed")}
                >
                  Completed Orders (
                  {orders["Completed"] ? orders["Completed"]?.length : 0})
                </button>
              </li>
              <li>
                <div onClick={fetchOrders} className="btn mr-0">
                  <i className="fas fa-redo"></i>
                </div>
              </li>
            </ul>

            {isNewOrder && (
              <div className="d-flex justify-content-center text-secondary">
                -------------------------------{" "}
                <a href="/home">Click here to Refresh</a>{" "}
                -------------------------------
              </div>
            )}
            {/* Order List */}
            {!orderFetched ? (
              <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border text-dark" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="row row-cols-1 mt-3 g-1 gap-5">
                {!orders[activeTab] || orders[activeTab]?.length === 0 ? (
                  <p className="text-muted text-center">No orders available.</p>
                ) : (
                  orders[activeTab].map((order) => (
                    <div
                      key={order.orderId}
                      style={{ border: "2px solid black" }}
                      className="card"
                    >
                      <div className="card-body col gap-5">
                        <div className="d-flex column justify-content-between">
                          <div>
                            {" "}
                            <small>ORDER ID</small>{" "}
                            <h3 className="card-title">
                              {order.orderId.substring(0, 6).toUpperCase()}
                            </h3>
                          </div>
                          <div>
                            <span className="badge bg-success">
                              {order.orderStatus?.replace("_", " ")}
                            </span>
                          </div>
                        </div>
                        <div className="d-flex column justify-content-between mt-3 mb-1">
                          <div>
                            <div className="mb-2">
                              <strong>Name:</strong> {order.userView.firstName}{" "}
                              {order.userView.lastName} <br />
                              <strong>Phone:</strong>{" "}
                              {order.userView.phoneNumber}
                            </div>
                          </div>
                          <br></br>
                          <div className="ms-auto">
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
                        <div className="d-flex justify-content-between">
                          <div>
                            {" "}
                            <strong>Total:</strong> £{order.payment?.amount}{" "}
                          </div>
                          <div>
                            <span
                              style={{
                                border: "1px solid black",
                                color: "black",
                              }}
                              className="badge bg-light"
                            >
                              {order.payment.type} payment
                            </span>
                          </div>
                        </div>

                        {/* <button
                        className="btn btn-dark btn-sm mt-4 w-100"
                        onClick={() => navigate(`/orders?orderId=${order.orderId}`)}
                      >
                        Open this in a new tab
                      </button> */}
                        <button
                          className="btn btn-dark btn-sm mt-4 w-100"
                          onClick={() => toggleOrder(order.orderId)}
                        >
                          {expandedOrder === order.orderId
                            ? "Hide Details"
                            : "View Details"}
                        </button>
                      </div>

                      {/* Expandable Order Details */}
                      <div
                        className={`collapse ${
                          expandedOrder === order.orderId ? "show" : ""
                        }`}
                      >
                        <div className="card-body">
                          <div className="d-flex justify-content-between mb-3">
                            <h4>Order Items</h4>
                            <div>
                              <ActionButton
                                handleActionClick={handleActionClick}
                                order={order}
                              />
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
                                      <strog> {item.name} 
                                       {orderItem.drinkOption && <> - {orderItem.drinkOption.name}</>}
                                    </strog>
                                      
                                    </div>{" "}
                                    
                                    <div className="d-flex flex-row gap-2">
                                      {orderItem.portionSize !== "REGULAR" && (
                                        <span>
                                          <span>Portion: </span>
                                          <span
                                            className={`bg-warning badge badge-pill badge-primary text-dark`}
                                          >
                                            {orderItem.portionSize.replaceAll(
                                              "_",
                                              " "
                                            )}
                                          </span>
                                        </span>
                                      )}

                                      {orderItem.pizzaCrust && (
                                        <span>
                                          <span>Crust: </span>
                                          <span
                                            className={`bg-warning badge badge-pill badge-primary text-dark`}
                                          >
                                            {orderItem.pizzaCrust.replaceAll(
                                              "_",
                                              " "
                                            )}
                                          </span>
                                        </span>
                                      )}
                                      {orderItem.toppings?.length > 0 && (
                                        <span>
                                          <span>Toppings: </span>
                                          {orderItem.toppings.map((topping) => (
                                            <span
                                              key={topping}
                                              className={`bg-warning badge badge-pill badge-primary text-dark me-2 mb-2`}
                                            >
                                              {topping.replaceAll("_", " ")}
                                            </span>
                                          ))}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="card-body">
                          <h4>Additional Instructions</h4>
                          <p>{order.additionalInstructions}</p>
                        </div>
                        <div className="card-body">
                          <h4>Delivery Instructions</h4>
                          <p>{order.deliveryMethod}</p>
                          {order.deliveryMethod === "DELIVERY" && (
                            <p>
                              {" "}
                              <i className="bi bi-house"></i> &nbsp;
                              {`${order.deliveryAddress?.streetAddress}, ${order.deliveryAddress?.streetAddress.town}, ${order.deliveryAddress?.streetAddress.postCode}`}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        {selectedOrder && (
          <OrderConfirmationModal
            order={selectedOrder}
            actionType={actionType}
            onConfirm={handleConfirm}
            onCancel={() => {
              setSelectedOrder(null);
              setActionType("");
            }}
          />
        )}
      </section>
    </div>
  );
};

export default Home;
