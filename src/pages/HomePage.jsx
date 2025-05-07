import React from "react";
import { useNavigate } from "react-router-dom";
import homepage from "../images/HomePage.svg";
import Logo from "../images/NULogo.png";

function HomePage() {
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
    <div className="fixed w-full h-screen overflow-hidden">
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
        <div className="flex flex-col xs:flex-row px-4 md:px-0 md:mt-0  md:justify-center gap-4 md:gap-10 items-start xs:items-center">
          <img
            src={homepage}
            alt="Home Page"
            className="hidden xs:block w-[8rem] xs:w-[14rem] xs:self-center md:w-[16rem] xl:w-[20rem]"
          />
          <div className="flex flex-col items-start">
            <h1 className="text-[5rem] md:text-[8rem] xl:text-[12rem] text-left text-[#2d3b8c]">
              NUQX
            </h1>
            <p className="text-[#2d3b8c] text-base sm:text-xl xl:text-2xl text-left">
              A Mobile and Web Application Development of Queuing System for
              National University Manila
            </p>
            <button
              className="text-sm sm:text-base xl:text-xl"
              style={styles.homepageBtn}
              onClick={() => navigate("/login")}
            >
              LOGIN
            </button>
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

export default HomePage;
