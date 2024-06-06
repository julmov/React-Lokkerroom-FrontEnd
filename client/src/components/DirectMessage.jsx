import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const DirectMessage = ({ selectedUser, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser]);

  const fetchMessages = async () => {
    try {
      let token = localStorage.getItem("token");
      let token1 = JSON.parse(token);
      let tokenValue = token1.token;

      const response = await fetch(
        `https://secret-bayou-22282-49e42fb604f5.herokuapp.com/api/messages/${currentUser.id}/${selectedUser.id}`,
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
      setMessages(data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim() || !selectedUser) {
      console.error("Error: Message or selected user cannot be empty.");
      return;
    }

    try {
      let token = localStorage.getItem("token");
      let token1 = JSON.parse(token);
      let tokenValue = token1.token;

      const response = await fetch(
        "https://secret-bayou-22282-49e42fb604f5.herokuapp.com/api/messages/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenValue}`,
          },
          body: JSON.stringify({
            senderId: currentUser.id,
            receiverId: selectedUser.id,
            messageContent: newMessage,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      setNewMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="middleBox">
      <div className="roomNameBox">
        <h2 className="roomName">{selectedUser.username}</h2>
      </div>
      <div className="MessageBox">
        {messages.map((message) => (
          <div key={message.id} className="myMessages">
            <div className="name-and-stamp">
              <p id="username">
                {message.sender_id === currentUser.id
                  ? "You"
                  : selectedUser.username}
              </p>
              <p id="timestamp">
                {new Date(message.timestamp).toLocaleString()}
              </p>
            </div>
            <p id="message-content">{message.message_content}</p>
          </div>
        ))}
      </div>
      <div className="inputBox">
        <input
          type="text"
          className="inputMessage"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className="sendButton"
          onClick={handleSendMessage}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default DirectMessage;
