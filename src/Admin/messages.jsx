import React, { useEffect, useState } from "react";
import AdminNavBar from "./adminNa";
import MessageCard from "./messageCard";

const AdminMessagePage = () => {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMessages, setFilteredMessages] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  const fetchMessages = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/products/message", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();
      if (Array.isArray(data)) {
        setMessages(data);
        setFilteredMessages(data);
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredMessages(messages);
    } else {
      const filtered = messages.filter((msg) =>
        msg.user_email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMessages(filtered);
    }
  }, [searchTerm, messages]);

  return (
    <div className="admin-messages-container p-4">
      <h2 className="text-2xl font-bold mb-4">All Messages</h2>

      {filteredMessages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <div className="grid gap-4 grid-cols-3">
          {filteredMessages.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessagePage;
