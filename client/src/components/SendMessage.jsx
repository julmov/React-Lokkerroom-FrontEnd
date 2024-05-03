import React, { useState } from "react";

const SendMessage = () => {
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [messageSent, setMessageSent] = useState(false); // State to track message sent status

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const token1 = JSON.parse(token);
      const tokenValue = token1.token;

      const response = await fetch(
        "https://secret-bayou-22282-49e42fb604f5.herokuapp.com/api/messages/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenValue}`,
          },
          body: JSON.stringify({
            senderId,
            receiverId,
            messageContent,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setMessageSent(true); // Update state to indicate message was sent successfully
      // Optionally, you can reset the form fields or take other actions after sending the message
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="sendMessageBox">
      <h2>Send Message</h2>
      {messageSent ? (
        <p>Message sent successfully!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Sender ID:
            <input
              type="text"
              value={senderId}
              onChange={(e) => setSenderId(e.target.value)}
            />
          </label>
          <label>
            Receiver ID:
            <input
              type="text"
              value={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
            />
          </label>
          <label>
            Message Content:
            <input
              type="text"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
            />
          </label>
          <button type="submit">Send Message</button>
        </form>
      )}
    </div>
  );
};

export default SendMessage;
