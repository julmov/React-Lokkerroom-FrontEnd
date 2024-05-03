import React, { useState, useEffect } from "react";

const RecieveMessage = ({ senderId, receiverId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const token1 = JSON.parse(token);
        const tokenValue = token1.token;

        const response = await fetch(
          `https://secret-bayou-22282-49e42fb604f5.herokuapp.com/api/messages/${senderId}/${receiverId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${tokenValue}`,
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
  }, [senderId, receiverId]); 

  return (
    <div>
      <h2>Received Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <strong>Sender:</strong> {message.sender_id},{" "}
            <strong>Receiver:</strong> {message.receiver_id},{" "}
            <strong>Content:</strong> {message.message_content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecieveMessage;
