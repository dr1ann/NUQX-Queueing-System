import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "../pages/Transaction.css";
import ImageUploadBox from "../components/ImageUploadBox";

const AddTransaction = ({ onClose, onSuccess }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [transactionName, setTransactionName] = useState("");

  const generateId = (name) => {
    const words = name.split(" ").filter((word) => word.length > 0);
    let initials = "";

    if (words.length >= 3) {
      initials = words[0][0] + words[1][0] + words[2][0];
    } else if (words.length === 2) {
      initials = words[0][0] + words[1][0] + (words[1][1] || "");
    } else if (words.length === 1) {
      initials = words[0].slice(0, 3);
    }

    return initials.toUpperCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage || !selectedImage.startsWith("data:image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/add-transaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transactionID: generateId(transactionName),
            image: selectedImage,
            name: transactionName,
          }),
        }
      );
      if (response.status === 413) {
        alert(
          "Upload failed: Image size is too large. Please use a smaller file."
        );
        return;
      }

      const data = await response.json();

      if (response.ok) {
        alert("Transaction added successfully!");
        handleClearFields();
        onClose();
        onSuccess();
      } else {
        alert(data.message || "Failed to add transaction.");
      }
    } catch (error) {
      console.error("Transaction error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const handleClearFields = () => {
    setTransactionName("");
    setSelectedImage(null);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Add New Transaction</h2>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <ImageUploadBox onImageSelect={(img) => setSelectedImage(img)} />

          <input
            type="text"
            name="name"
            required
            placeholder="Transaction Name"
            value={transactionName}
            onChange={(e) => setTransactionName(e.target.value)}
            className="w-full p-2 mb-[10px] text-sm md:text-base rounded-md border-[2px] border-[#35408E]"
          />

          <p className="text-sm md:text-base py-[15px]">
            <strong>Date Created:</strong>{" "}
            {new Date().toISOString().split("T")[0]}
          </p>

          <div className="modal-buttons pt-[10px]">
            <button className="save-button text-sm md:text-base">Submit</button>
            <button
              type="button"
              className="clear-button text-sm md:text-base"
              onClick={handleClearFields}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
