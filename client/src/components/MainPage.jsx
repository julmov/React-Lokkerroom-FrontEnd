import React, { useState, useEffect } from "react";
import "../css/MainPage.css";
import "../css/messages.css";
import "../css/LobbyList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faSmile } from "@fortawesome/free-solid-svg-icons";
import IconBox from "./IconBox";
import UsersList from "./UsersList";
import LobbyList from "./LobbyList";
import RecieveMessage from "./RecieveMessage";
import CreateLobby from "./CreateLobby";
import SettingsContent from "./SettingsContent";
import DirectMessage from "./DirectMessage";
import EmojiPicker from "emoji-picker-react";

const MainPage = () => {
  const [roomName, setRoomName] = useState("");
  const [selectedLobbyId, setSelectedLobbyId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [activeContent, setActiveContent] = useState("lobby");
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  const currentUser = { id: 1 }; // Replace with actual current user ID

  const updateRoom = (name, id) => {
    setRoomName(name);
    setSelectedLobbyId(id);
    setSelectedUser(null);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setSelectedLobbyId(null);
  };

  const onEmojiClick = (emojiData, event) => {
    // Log the emojiData to understand its structure
    console.log(emojiData);

    // Handle the emoji based on its structure
    if (emojiData && emojiData.emoji) {
      setNewMessage(newMessage + emojiData.emoji);
    } else {
      console.error(
        "Emoji object structure has changed or is invalid",
        emojiData
      );
    }
    setEmojiPickerVisible(false);
  };

  useEffect(() => {
    if (selectedLobbyId) {
      let token = localStorage.getItem("token");
      let token1 = JSON.parse(token);
      let tokenValue = token1.token;

      fetch(
        "https://secret-bayou-22282-49e42fb604f5.herokuapp.com/api/messages",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch messages");
          }
          return response.json();
        })
        .then((data) => {
          setMessages(data);
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    }
  }, [selectedLobbyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    let token1 = JSON.parse(token);
    let tokenValue = token1.token;

    if (!newMessage.trim() || !selectedLobbyId) {
      console.error("Error: Message or lobby ID cannot be empty.");
      return;
    }

    try {
      const response = await fetch(
        `https://secret-bayou-22282-49e42fb604f5.herokuapp.com/api/lobby/${selectedLobbyId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenValue}`,
          },
          body: JSON.stringify({
            content: newMessage,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post message to lobby");
      }

      const data = await response.json();
      setNewMessage("");
      // Optionally, fetch messages again or add the new message to the state
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="mainPage">
      <div className="boxes">
        <div className="leftBox">
          <IconBox setActiveContent={setActiveContent} />
          <div className="contentBox">
            {activeContent === "lobby" && <LobbyList updateRoom={updateRoom} />}
            {activeContent === "receive" && <RecieveMessage />}
            {activeContent === "send" && (
              <UsersList onUserSelect={handleUserSelect} />
            )}
            {activeContent === "create" && <CreateLobby />}
            {activeContent === "settings" && <SettingsContent />}
          </div>
        </div>
        <div className="middleBox">
          {selectedLobbyId ? (
            <>
              <div className="roomNameBox">
                <h2 className="roomName">{roomName}</h2>
              </div>
              <div className="MessageBox">
                {messages
                  .filter((message) => message.lobby_id === selectedLobbyId)
                  .map((message) => (
                    <div key={message.id} className="myMessages">
                      <div className="name-and-stamp">
                        <p id="username">{message.username}</p>
                        <p id="timestamp">
                          {message.timestamp.slice(0, 10) +
                            " at " +
                            message.timestamp.slice(11, 16)}
                        </p>
                      </div>
                      <p id="message-content">{message.content}</p>
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
                  type="button"
                  className="smileButton"
                  onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}
                >
                  <FontAwesomeIcon icon={faSmile} />
                </button>
                <button
                  type="submit"
                  className="sendButton"
                  onClick={handleSubmit}
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
                {emojiPickerVisible && (
                  <div className="emojiPicker">
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                  </div>
                )}
              </div>
            </>
          ) : selectedUser ? (
            <DirectMessage
              selectedUser={selectedUser}
              currentUser={currentUser}
            />
          ) : (
            <div className="welcomeMessage">
              Select a lobby or user to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
