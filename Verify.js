import React from "react";
import { useEffect, useState } from "react";
import footerimg from "../../assets/image/login-footer.svg";
import logoplace from "../../assets/image/Rectangle 4.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

function Reset() {
  const [otp, setOtp] = useState("");
  const history = useHistory();

  const datab = JSON.parse(window.localStorage.getItem("forget-info"));

  const otpToken = datab.data.otpToken;

  const item = {
    otpToken,
    otp,
  };

  async function submitHandler(e) {
    e.preventDefault();
    if (otp === "") {
      toast.error("Please Check All The Required Fields");
    } else {
      var result = await fetch(
        "http://54.169.205.249:3000/ohodr/api/admin/forget-password/verify/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(item),
        }
      );
      result = await result.json();
      console.log(result);
      if (result.isSuccess === true) {
        history.push("/reset");
      } else {
        toast.error(result.message);
      }
    }
  }

  return (
    <div>
      <div className="login-page-container">
        <div className="login-header-container "></div>
        <div className="login-img-container">
          <img src={logoplace} alt="" />
        </div>
        <div className="login-container">
          <h3 className="login-title"> Verify OTP </h3>
          <form>
            <label className="login-label"> OTP </label>
            <br />
            <input
              className="w-full login-input "
              placeholder="Enter the OTP you received"
              onChange={(e) => setOtp(e.target.value)}
            />
            <br />
            <button className="login-button" onClick={submitHandler}>
              Submit
            </button>
          </form>
        </div>
        <div className="login-footer-container">
          <img src={footerimg} className="w-screen" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Reset;
