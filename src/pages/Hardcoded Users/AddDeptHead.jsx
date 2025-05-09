import React, { useState } from "react";
import user from "../../images/user.png";
import { FaTimes } from "react-icons/fa";

const AddDeptHead = () => {
  const [selectedImage, setSelectedImage] = useState(user);

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [department, setDepartment] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setEmail("");
    setDepartment("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password mismatch check
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Image file validation
    if (!selectedImage || !selectedImage.startsWith("data:image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          middleName,
          lastName,
          email,
          password,
          role: "departmentHead", // hardcoded
          department,
          profileImage: selectedImage,
        }),
      });

      if (response.status === 413) {
        alert(
          "Upload failed: Image size is too large. Please upload a smaller image."
        );
        return;
      }

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert("User registered successfully!");
        handleClear();
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const modalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxHeight: "90vh",
    overflowY: "auto",
    maxWidth: "800px",
    background: "#fff",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
    zIndex: 1001,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "15px",
    right: "20px",
    fontSize: "22px",
    cursor: "pointer",
  };

  const avatarContainerStyle = {
    position: "relative",
    width: "120px",
    height: "120px",
    margin: "0 auto 20px",
  };

  const avatarImageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "50%",
    border: "4px solid #35408E",
  };

  const uploadIconStyle = {
    position: "absolute",
    bottom: "0",
    right: "38%",
    fontSize: "17px",
    cursor: "pointer",
    backgroundColor: "#fff",
    borderRadius: "100%",
    padding: "2px 5px 0px 5px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  };

  const formContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    gap: "20px",
    marginTop: "20px",
  };

  const columnStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };

  const formGroupStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  const labelStyle = {
    marginBottom: "5px",
    fontWeight: "500",
    fontSize: "15px",
    color: "black",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 15px",
    borderRadius: "10px",
    border: "2px solid #3f51b5",
    outline: "none",
    color: "black",
  };

  const buttonGroupStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "30px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "fit-content",
  };

  const buttonStyle = {
    padding: "12px 24px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    color: "#fff",
    backgroundColor: "#35408E",
    boxShadow: "0px 4px 8px rgba(63, 81, 181, 0.3)",
    transition: "background 0.3s ease",
  };

  return (
    <>
      <div
        className="modal-overlay"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        }}
      ></div>
      <div style={modalStyle}>
        <h3 className="text-2xl pl-2 font-semibold flex self-start mb-4">
          Add New Department Head
        </h3>
        <span className="text-[#35408E]" style={closeButtonStyle}>
          <FaTimes />
        </span>
        <form onSubmit={handleSubmit}>
          <div style={avatarContainerStyle}>
            <img src={selectedImage} alt="Profile" style={avatarImageStyle} />
            <label htmlFor="upload-avatar" style={uploadIconStyle}>
              <i className="ri-camera-fill"></i>
            </label>
            <input
              type="file"
              id="upload-avatar"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </div>

          <div className="w-3/4 mb-4 mx-auto">
            <label style={labelStyle}>Department</label>
            <select
              required
              style={inputStyle}
              className="text-sm md:text-base"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="" disabled>
                Select department
              </option>
              <option value="admissions">Admissions</option>
              <option value="registrar">Registrar</option>
              <option value="accounting">Accounting</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px]">
            <div style={columnStyle}>
              <div>
                <label style={labelStyle}>First Name</label>
                <input
                  required
                  type="text"
                  placeholder="Enter first name"
                  style={inputStyle}
                  className="text-sm md:text-base"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label style={labelStyle}>Middle Name</label>
                <input
                  required
                  type="text"
                  placeholder="Enter middle name"
                  style={inputStyle}
                  className="text-sm md:text-base"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </div>
              <div>
                <label style={labelStyle}>Last Name</label>
                <input
                  required
                  type="text"
                  placeholder="Enter last name"
                  style={inputStyle}
                  className="text-sm md:text-base"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div style={columnStyle}>
              <div>
                <label style={labelStyle}>Email</label>
                <input
                  required
                  type="email"
                  placeholder="Enter email"
                  style={inputStyle}
                  className="text-sm md:text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label style={labelStyle}>Default Password</label>
                <input
                  required
                  type="password"
                  placeholder="Enter password"
                  style={inputStyle}
                  className="text-sm md:text-base"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label style={labelStyle}>Confirm Password</label>
                <input
                  required
                  type="password"
                  placeholder="Confirm password"
                  style={inputStyle}
                  className="text-sm md:text-base"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div style={buttonGroupStyle}>
            <button className="text-sm md:text-base" style={buttonStyle}>
              Submit
            </button>
            <button
              className="text-sm md:text-base"
              style={buttonStyle}
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddDeptHead;
