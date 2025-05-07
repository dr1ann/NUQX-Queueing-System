import React from "react";
import { useNavigate } from "react-router-dom";
import "../Style.css";
import Logo from "../../../../images/NULogo.png";
import BackgroundImage from "../../../../images/NU-Manila.svg";

function MainPage() {
  const navigate = useNavigate();

  const handleStart = (userType) => {
    navigate("/startpage", { state: { userType } });
  };

  const styles = {
    pageContainer: {
      overflow: "hidden",
      position: "fixed",
      width: "100%",
      height: "100vh",
      backgroundColor: "#fff",
    },
    background: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: `url(${BackgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      opacity: 0.6,
      zIndex: -1,
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
  };

  return (
    <div>
      <main className="flex flex-col flex-1 min-h-screen">
        <div style={styles.background}></div>
        <header style={styles.header}>
          <div style={styles.logoContainer}>
            <div className="ml-[5px] md:ml-0" style={{ display: "flex", alignItems: "center" }}>
              <img className="max-h-[100px] w-20 md:w-full mr-[6px]" src={Logo} alt="NU Logo" />
              <h1 className="text-white text-[1.5rem] mt-2 md:text-[2rem] font-[200]">NUQX</h1>
            </div>
          </div>
        </header>
        <div style={styles.yellowLine}></div>

        <div className="flex flex-col items-center justify-center m-auto">
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2 className="text-lg sm:text-[2rem] mb-6 font-bold uppercase bg-white/70 px-4 py-2 rounded-lg">
              Select your user type:
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "140px" }}>
            <button
              className="w-[13rem] sm:w-[30rem] sm:h-[5rem] h-[3.5rem] text-base sm:text-2xl"
              onClick={() => handleStart("Student or Guest")}
              style={{ padding: "10px", borderRadius: "25px", backgroundColor: "#35408E", color: "#fff", border: "none", cursor: "pointer" }}
            >
              Student or Guest
            </button>

            <button
              className="w-[13rem] sm:w-[30rem] sm:h-[5rem] h-[3.5rem] text-base sm:text-2xl"
              onClick={() => handleStart("Senior or PWD")}
              style={{ padding: "10px", borderRadius: "25px", backgroundColor: "#35408E", color: "#fff", border: "none", cursor: "pointer", marginTop: "-100px" }}
            >
              Senior or PWD
            </button>
          </div>
        </div>
      </main>
      <footer style={styles.footer}>
        <div style={{ backgroundColor: "#FFD41C", height: "8px", width: "100%", position: "absolute", bottom: 70, left: 0, zIndex: 99 }}></div>
      </footer>
    </div>
  );
}

export default MainPage;
