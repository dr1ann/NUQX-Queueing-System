import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "../pages/Transaction.css";
import ImageUploadBox from "../components/ImageUploadBox";

const EditTransaction = ({ transaction, onClose, onSuccess }) => {
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

  useEffect(() => {
    if (transaction) {
      setTransactionName(transaction.name);
      setSelectedImage(transaction.image);
    }
  }, [transaction]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage || !selectedImage.startsWith("data:image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/auth/edit-transaction/${transaction._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transactionID: generateId(transactionName),
            image: selectedImage,
            name: transactionName,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Transaction updated successfully!");
        onClose();
        onSuccess();
      } else {
        alert(data.message || "Failed to update transaction.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };
  if (!transaction)
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">Edit Transaction</h2>
            <button className="close-button" onClick={onClose}>
              <FaTimes />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center py-10 text-center text-[#35408E]">
            <p className="text-xl font-semibold mb-2">
              No transaction selected
            </p>
            <p className="text-sm md:text-base text-gray-600">
              Please go back and select a transaction to edit.
            </p>
            <button
              onClick={onClose}
              className="mt-6 bg-[#35408E] hover:bg-[#2d367f] text-white text-sm md:text-base px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Edit Transaction</h2>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <ImageUploadBox
            onImageSelect={(img) => setSelectedImage(img)}
            defaultImage={selectedImage}
          />

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
            {new Date(transaction.createdAt).toISOString().split("T")[0]}
          </p>

          <div className="modal-buttons pt-[10px]">
            <button className="save-button text-sm md:text-base">Update</button>
            <button
              type="button"
              className="clear-button text-sm md:text-base"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransaction;
