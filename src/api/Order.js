const OrderService = {
     handleApprove : async (id, setApproved) => {
        setLoading(true);
        try {
          const response = await fetch(`https://api.example.com/items/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "approved" }),
          });
    
          if (response.ok) {
            setApproved(true);
          } else {
            console.error("Failed to approve");
          }
        } catch (error) {
          console.error("Error:", error);
        } finally {
          //setLoading(false);
        }
      }
}

export default OrderService;