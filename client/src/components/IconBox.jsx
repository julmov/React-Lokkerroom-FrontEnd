import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPeopleGroup,
  faEnvelope,
  faSquarePlus,
  faMessage,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

const IconBox = ({ setActiveContent }) => {
  const handleIconClick = (content) => {
    setActiveContent(content);
  };

  return (
    <div className="iconBox">
      <FontAwesomeIcon
        icon={faPeopleGroup}
        className="icons"
        onClick={() => handleIconClick("lobby")} // Set active content to lobby
      />
      <FontAwesomeIcon
        icon={faEnvelope}
        className="icons"
        onClick={() => handleIconClick("receive")} // Set active content to receive
      />
      <FontAwesomeIcon
        icon={faSquarePlus}
        className="icons"
        onClick={() => handleIconClick("create")} // Set active content to send
      />
      <FontAwesomeIcon
        icon={faMessage}
        className="icons"
        onClick={() => handleIconClick("send")} // Set active content to create
      />
      <FontAwesomeIcon
        icon={faGear}
        className="icons"
        onClick={() => handleIconClick("settings")} // Set active content to settings
      />
    </div>
  );
};

export default IconBox;
