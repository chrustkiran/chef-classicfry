import React, { useState } from "react";

const OrderConfirmationModal = ({
  orderId,
  actionType,
  onConfirm,
  onCancel,
}) => {
  const [isLoading, setLoading] = useState(false);
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        padding: "20px",
        border: "1px solid #ccc",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
      }}
    >
      <h3>Confirm "{actionType?.replaceAll('-', ' ')}" Order</h3>
      <p>
        Are you sure you want to {actionType?.replaceAll('-', ' ')} order {orderId}?
      </p>
      <div className="d-flex gap-2">
        <button
          className="btn btn-dark"
          onClick={() => {
            setLoading(true);
            onConfirm();
          }}
        >
          {isLoading ? "Loading..." : "Yes"}
        </button>
        <button className="btn btn-danger" onClick={onCancel}>
          No
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
