import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../../images/NULogo.png";
import registrarIcon from "../../../../images/edit-2.png";
import admissionsIcon from "../../../../images/teacher.png";
import accountingIcon from "../../../../images/card-tick.png";
import { Link } from "react-router-dom";

function Step1Guide() {
  const navigate = useNavigate();

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
    yellowLine1: {
      backgroundColor: "#FFD41C",
      height: "8px",
      width: "100%",
      position: "relative",
      marginTop: "-54px",
    },
    footer: {
      position: "relative",
      width: "100%",
      backgroundColor: "#35408E",
      height: "75px",
    },
    p1: {
      fontSize: "200px",
      color: "#2d3b8c",
      marginTop: "-120px",
      maxWidth: "700px",
      lineHeight: 1.4,
      position: "relative",
      marginLeft: "250px",
      top: "350px",
      fontWeight: "bold",
    },
    p: {
      fontSize: "40px",
      color: "#2d3b8c",
      marginTop: "-120px",
      maxWidth: "700px",
      lineHeight: 1.4,
      position: "relative",
      marginLeft: "250px",
      top: "470px",
    },
    homepageBtn: {
      backgroundColor: "#2d3b8c",
      color: "white",
      border: "none",
      padding: ".5rem 1rem",
      borderRadius: "10px",
      cursor: "pointer",
      transition: "background-color 0.3s ease-in-out",
      width: "100px",
    },
    content: {
      position: "relative",
      top: "-70px",
    },
  };

  return (
    <div className="xl:fixed w-full min-h-screen h-screen xl:overflow-hidden">
      <main className="flex flex-col justify-between h-full">
        <div>
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
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-4 md:gap-10 w-full max-w-[130rem] mx-auto">
          <div className="flex flex-col text-white grow bg-[#35408e] h-full w-full  justify-center px-4">
            <h1 className="text-2xl font-bold uppercase md:text-4xl text-center md:text-left text-black">
              Select a Department
            </h1>
            <p>1. Choose a Department:</p>
            <span>Enrollment, Admission, or Treasury</span>
          </div>

          <div className="flex flex-wrap items-center justify-center mt-6 gap-4 px-4">
            <div>
              <button
                className="icon-button"
                onClick={() => handleStart("registrar")}
              >
                <img
                  src={registrarIcon}
                  className="h-[80px] sm:h-[120px] w-[80px] sm:w-[120px]"
                  alt="Transaction icon"
                />
                <span className="button-text">Registrar</span>
              </button>
            </div>
            <div>
              <button
                className="icon-button"
                onClick={() => handleStart("accounting")}
              >
                <img
                  src={accountingIcon}
                  className="h-[80px] sm:h-[120px] w-[80px] sm:w-[120px]"
                  alt="Accounting icon"
                />
                <span className="button-text">Accounting</span>
              </button>
            </div>
            <div>
              <button
                className="icon-button"
                onClick={() => handleStart("admissions")}
              >
                <img
                  src={admissionsIcon}
                  className="h-[80px] sm:h-[120px] w-[80px] sm:w-[120px]"
                  alt="Admissions icon"
                />
                <span className="button-text">Admissions</span>
              </button>
            </div>
          </div>
        </div>
        <footer style={styles.footer}>
          <div
            className="yellow-line3"
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
      </main>
    </div>
  );
}

export default Step1Guide;
