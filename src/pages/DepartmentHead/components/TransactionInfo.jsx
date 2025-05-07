import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import EditTransaction from "../components/EditTransaction";

const TransactionInfo = ({
  transactions,
  setTransactions,
  fetchTransactions,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleToggle = async (id, newState) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/transactions/${id}/toggle`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isOn: newState }),
        }
      );

      if (response.ok) {
        setTransactions((prev) =>
          prev.map((tx) => (tx._id === id ? { ...tx, isOn: newState } : tx))
        );
      } else {
        alert("Failed to update toggle state.");
      }
    } catch (error) {
      console.error("Toggle error:", error);
      alert("An error occurred while updating toggle.");
    }
  };

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] place-content-center gap-6">
        {transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="flex flex-col border-[1px] border-[#35408E] rounded-lg p-4"
          >
            <img
              src={transaction.image}
              className="h-[80px] sm:h-[120px] w-[80px] sm:w-[120px] mb-4"
              alt="Transaction icon"
            />
            <div className="toggle">
              <input
                type="checkbox"
                id={`toggle-${transaction._id}`}
                checked={transaction.isOn}
                onChange={() =>
                  handleToggle(transaction._id, !transaction.isOn)
                }
              />
              <label
                htmlFor={`toggle-${transaction._id}`}
                className="toggle-label"
              >
                <span className="label-on">ON</span>
                <span className="label-off">OFF</span>
              </label>
            </div>
            <p className="text-sm md:text-base">
              <strong>ID:</strong> {transaction.transactionID}
            </p>
            <p className="text-sm md:text-base">
              <strong>Name:</strong> {transaction.name}
            </p>
            <p className="text-sm md:text-base">
              <strong>Date Created:</strong>{" "}
              {new Date(transaction.createdAt).toISOString().split("T")[0]}
            </p>

            <button
              className="text-white bg-[#35408E] py-2 px-3 rounded-md flex items-center text-sm md:text-base gap-2 w-fit self-end h-auto"
              onClick={() => {
                setSelectedTransaction(transaction);
                setIsEditing(true);
              }}
            >
              <FaEdit /> Edit
            </button>
          </div>
        ))}
      </div>
      {isEditing && selectedTransaction && (
        <EditTransaction
          transaction={selectedTransaction}
          onClose={() => setIsEditing(false)}
          onSuccess={() => {
            setIsEditing(false);
            fetchTransactions();
          }}
        />
      )}
    </>
  );
};

export default TransactionInfo;
