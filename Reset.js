import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import footerimg from "../../assets/image/login-footer.svg";
import logoplace from "../../assets/image/Rectangle 4.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Reset() {
  const [email, setEmail] = useState("");
  const [newpassword, setPassword] = useState("");
  const history = useHistory();

  const item = {
    email,
    newpassword,
  };

  async function submitHandler(e) {
    e.preventDefault();
    if (email === "" || newpassword === "") {
      toast.error("Please Check All The Required Fields");
    } else {
      var result = await fetch(
        "http://54.169.205.249:3000/ohodr/api/admin/reset-password/",
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
        toast.success("Password changed sucessfully");
        history.push("/");
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
          <h3 className="login-title"> Reset Password </h3>
          <form>
            <label className="login-label"> Email </label>
            <br />
            <input
              className="w-full login-input "
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label className="login-label"> New Password </label>
            <br />
            <input
              type="password"
              className="w-full login-input "
              placeholder="Enter Your New Password"
              onChange={(e) => setPassword(e.target.value)}
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
