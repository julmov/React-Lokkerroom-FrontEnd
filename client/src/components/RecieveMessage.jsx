import React, { useState, useEffect } from "react";

const RecieveMessage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const token1 = JSON.parse(token);
        const tokenValue = token1.token;

        const response = await fetch(
          `https://secret-bayou-22282-49e42fb604f5.herokuapp.com/api/direct-messages`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${tokenValue}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }

        const data = await response.json();
        setMessages(data.messages); // Update state with fetched messages
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []); // Empty dependency array to run only once on component mount

  return (
    <div>
      <h2>Received Messages</h2>
      <p>{messages.length > 0 ? messages[0] : "No messages found"}</p>
    </div>
  );
};

export default RecieveMessage;
