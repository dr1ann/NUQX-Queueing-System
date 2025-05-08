import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Style.css";
import {
  FaPencilAlt,
  FaFileInvoiceDollar,
  FaGraduationCap,
  FaFolderOpen,
} from "react-icons/fa";
import Logo from "../../../../images/NULogo.png";
import Modal from "./Modal";

function StartPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userDetails?.userType) {
      navigate("/kiosk");
      return;
    }
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/auth/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setTransactions(data.transactions);
        setLoading(false);
      } else {
        alert("An error occurred. Please refresh the page.");
      }
    } catch (error) {
      alert("An error occurred. Please refresh the page.");
    }
  };

  const handleOpenModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleBack = () => {
    navigate("/mainpage");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const userDetails = {
    concern: selectedTransaction?.name,
    userType: state?.userType,
  };

  const styles = {
    pageContainer: {
      overflow: "hidden",
      position: "fixed",
      width: "100%",
      height: "100vh",
    },
    header: {
      backgroundColor: "#35408E",
      height: "80px",
      display: "flex",
      alignItems: "center",
      padding: "0 20px",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      lineHeight: 1,
    },
    logo: {
      height: "90px",
      marginRight: "10px",
    },
    headerTitle: {
      color: "#FFFFFF",
      fontSize: "35px",
      fontFamily: "'ClanOT Medium', sans-serif",
    },
    yellowLine: {
      backgroundColor: "#FFD41C",
      height: "8px",
      width: "100%",
    },
    footer: {
      position: "relative",
      width: "100%",
      backgroundColor: "#35408E",
      height: "75px",
    },
    buttonContainer: {
      marginTop: "50px",
      display: "flex",
      flexWrap: "wrap",
      padding: "0 .5rem",
      justifyContent: "center",
      gap: "20px",
    },
  };

  return (
    <div>
      <main className="flex flex-col flex-1 min-h-screen">
        <header style={styles.header}>
          <div style={styles.logoContainer}>
            <div
              className="ml-[5px] md:ml-0"
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                className="max-h-[100px] w-20 md:w-full mr-[6px]"
                src={Logo}
                alt="NU Logo"
              />
              <h1 className="text-white text-[1.5rem] mt-2 md:text-[2rem] font-[200]">
                NUQX
              </h1>
            </div>
          </div>
        </header>
        <div style={styles.yellowLine}></div>

        <div className="mt-10 text-center">
          <h2 className="text-[1.7rem] px-4 sm:text-[2.5rem] font-bold uppercase">
            Hello, <br /> What will you do today?
          </h2>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
              <p className="text-[#35408E] font-semibold">Loading...</p>
            </div>
          </div>
        ) : (
          <>
            {transactions.length === 0 ||
            transactions.every((tx) => tx.isOn === false) ? (
              <div className="h-[50vh] flex items-center justify-center">
                <span className="text-center uppercase text-xl md:text-2xl text-gray-600 font-semibold py-10">
                  No transactions listed yet.
                </span>
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-center mt-6 gap-4 px-4">
                {transactions
                  .filter((transaction) => transaction.isOn)
                  .map((transaction) => (
                    <>
                      <div key={transaction._id}>
                        <button
                          className="icon-button"
                          onClick={() => handleOpenModal(transaction)}
                        >
                          <img
                            src={transaction.image}
                            className="h-[80px] sm:h-[120px] w-[80px] sm:w-[120px]"
                            alt="Transaction icon"
                          />
                          <span className="button-text">
                            {transaction.name}
                          </span>
                        </button>
                      </div>
                      {selectedTransaction && (
                        <Modal
                          isOpen={isModalOpen}
                          onClose={handleModalClose}
                          isIDReset={selectedTransaction.isIDReset}
                          transactionID={selectedTransaction.transactionID}
                          userType={userDetails.userType}
                          details={{
                            ...userDetails,
                            concern: selectedTransaction.name,
                          }}
                        />
                      )}
                    </>
                  ))}
              </div>
            )}
          </>
        )}
        <div className="action-buttons mb-4 mt-6 text-center">
          <button
            onClick={handleBack}
            style={{
              width: "150px",
              height: "50px",
              fontSize: "16px",
              padding: "10px",
              borderRadius: "25px",
              backgroundColor: "#FFD41C",
              color: "#35408E",
              border: "none",
              cursor: "pointer",
              margin: "0 10px",
            }}
          >
            Back
          </button>
        </div>
      </main>

      <footer style={styles.footer}>
        <div
          style={{
            backgroundColor: "#FFD41C",
            height: "8px",
            width: "100%",
            position: "absolute",
            bottom: 70,
            left: 0,
            zIndex: 99,
          }}
        ></div>
      </footer>
    </div>
  );
}

export default StartPage;
