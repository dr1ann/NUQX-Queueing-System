import React, { useEffect, useState, useRef } from "react";
import "../base.css";
import Logo from "../../../../images/NULogo.png";
import { useNavigate, useLocation } from "react-router-dom";

function QueueNum() {
  const navigate = useNavigate();
  const location = useLocation();

  const queueNumber = location.state?.queueNumber;

  const handleDoneClick = () => {
    navigate("/kiosk");
  };

  const styles = {
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
  };

  useEffect(() => {
    if (!queueNumber) {
      navigate("/startpage");
      return;
    }
  }, []);

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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "1.2rem",
            marginBottom: "1.2rem",
          }}
        >
          <h1 className="text-[2rem] xl:text-[3rem] text-center text-[#333] mb-6 px-4">
            Thank you for using NUQX!
          </h1>

          <div
            className="bg-white rounded-xl mb-8 w-[90%] sm:w-fit px-[15px] py-[30px] sm:px-[100px] xl:py-[50px]"
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            <p className="text-[#333] text-[1.5rem] text-center xl:text-[2.5rem]">
              Your Ticket Number Is
            </p>
            <p className="text-[3rem] text-center xl:text-[5rem] font-bold text-[#35408E]">
              {queueNumber}
            </p>
          </div>

          <button
            onClick={handleDoneClick}
            className="bg-[#35408E] text-white py-[5px] px-[20px] sm:py-[10px] sm:px-[40px] rounded-3xl text-lg sm:text-2xl w-[100px] sm:w-[200px]"
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#283069")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#35408E")
            }
          >
            DONE
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

export default QueueNum;
