import React, { useState, KeyboardEvent, FC } from "react";
import "./WhatsAppUI.css";


interface Message {
  id: string|number;
  from: "me"|"them";
  text: string;
  time: string;
}

export type Messages = Message[];


export type WhatsAppUIProps = {
 messages : Messages,
 unread : Number,
 chatName : String
}

const WhatsAppUI: FC<WhatsAppUIProps> = (props) => {

  const [input, setInput] = useState<string>("");
  const {messages,unread,chatName} = props;

  const handleSend = () => {
    if (!input.trim() ) return;

    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMessage: Message = {
      id: now.getTime(),
      from: "me",
      text: input.trim(),
      time: formattedTime,
    };

    

    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="wa-app">
      <div className="wa-main">
          <>
            <div className="wa-main-header">
              <div className="wa-chat-avatar large">
                {chatName.charAt(0).toUpperCase()}
              </div>
              <div className="wa-main-header-info">
                <div className="wa-main-name">{chatName}</div>
              </div>
            </div>

            <div className="wa-messages">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={
                    "wa-message-row " +
                    (msg.from === "me"
                      ? "wa-message-row-me"
                      : "wa-message-row-them")
                  }
                >
                  <div
                    className={
                      "wa-message-bubble " +
                      (msg.from === "me"
                        ? "wa-message-bubble-me"
                        : "wa-message-bubble-them")
                    }
                  >
                    <span className="wa-message-text">{msg.text}</span>
                    <span className="wa-message-time">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="wa-input-area">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message"
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </>
      </div>
    </div>
  );
};

export default WhatsAppUI;
