import React from "react";

const MessageCard = ({ message }) => {
  return (
    <div className="w-96 border border-gray-300 rounded shadow p-4 bg-white">
      <p className="text-black">
        <strong className="text-black">From:</strong> {message.user.email || "Unknown"}
      </p>
      <p>
        <strong>Message:</strong>
      </p>
      <p className="mt-2 text-gray-700">{message.message}</p>
      <p className="text-sm text-gray-500 mt-4">
        {new Date(message.created_at).toLocaleString()}
      </p>
    </div>
  );
};

export default MessageCard;
