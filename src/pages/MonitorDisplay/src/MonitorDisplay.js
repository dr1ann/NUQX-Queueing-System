import React from "react";
import "./styles.css";
import NULogo from "./images/NU Logo.png";

const MonitorDisplay = () => {
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
    yellowLine1: {
      backgroundColor: "#FFD41C",
      height: "8px",
      width: "100%",
      position: "relative",
      marginTop: "-54px",
    },
    footer: {
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      backgroundColor: "#35408E",
      height: "70px",
    },
  };

  return (
    <>
      <main className="flex flex-col flex-1 min-h-screen">
        <header style={styles.header}>
          <div style={styles.logoContainer}>
            <img src={NULogo} alt="NU Logo" style={styles.logo} />
            <span style={styles.headerTitle}>NUQX</span>
          </div>
        </header>

        <div style={styles.yellowLine}></div>

        <div className="main-content-monitor">
          <div className="queue-container">
            <div className="left-section">
              <div className="serving-box">
                <div className="serving-header">Now Serving</div>
                <div className="serving-content">
                  <div className="proceed-text">PLEASE PROCEED TO:</div>
                  <div className="window-box">WINDOW 1</div>

                  <div
                    className="queue-number"
                    style={{ marginTop: "0", paddingTop: "0" }}
                  >
                    EN001
                  </div>
                </div>
              </div>
            </div>

            <div className="right-section">
              <div className="serving-header mb-4">Waiting</div>
              <div className="main-window-container">
                <div className="window-container">
                  <div className="window-box">WINDOW 2</div>
                  <div className="queue-number">EN002</div>
                </div>

                <div className="horizontal-divider"></div>

                <div className="window-container">
                  <div className="window-box">WINDOW 3</div>
                  <div className="queue-number">EN003</div>
                </div>

                <div className="horizontal-divider"></div>

                <div className="window-container">
                  <div className="window-box">WINDOW 4</div>
                  <div className="queue-number">EN004</div>
                </div>
                <div className="horizontal-divider"></div>

                <div className="window-container">
                  <div className="window-box">WINDOW 4</div>
                  <div className="queue-number">EN004</div>
                </div>
                <div className="horizontal-divider"></div>

                <div className="window-container">
                  <div className="window-box">WINDOW 4</div>
                  <div className="queue-number">EN004</div>
                </div>
                <div className="horizontal-divider"></div>

                <div className="window-container">
                  <div className="window-box">WINDOW 4</div>
                  <div className="queue-number">EN004</div>
                </div>
                <div className="horizontal-divider"></div>

                <div className="window-container">
                  <div className="window-box">WINDOW 4</div>
                  <div className="queue-number">EN004</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="relative w-full bg-[#35408E] h-[75px]">
        <div
          className="yellow-line2"
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
    </>
  );
};

export default MonitorDisplay;
