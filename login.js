import { useState } from "react";
import { useHistory } from "react-router-dom";
import footerimg from "../../assets/image/login-footer.svg";
import logoplace from "../../assets/image/Rectangle 4.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function login(e) {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.error("Please Check All The Required Fields");
    } else {
      const item = { email, password };
      var result = await fetch(
        "http://54.169.205.249:3000/ohodr/api/admin/login",
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
      if (result.status === 200) {
        localStorage.setItem("user-info", JSON.stringify(result));
        history.push("/dashboard");
      } else {
        toast.error("Invalid Email Or Password");
      }
    }
  }
  {
    window.localStorage.getItem("user-info") && history.push("/dashboard");
  }
  return (
    <div className="login-page-container">
      <div className="login-header-container "></div>
      <div className="login-img-container">
        <img src={logoplace} alt="" />
      </div>
      <div className="login-container">
        <h3 className="login-title"> Login </h3>
        <form>
          <label className="login-label"> Email </label>
          <br />
          <input
            className="w-full login-input "
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label className="login-label"> Password </label>
          <br />
          <input
            className="w-full login-input "
            placeholder="Enter your Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="login-button" onClick={login}>
            Login
          </button>

          <a href="/forget">
            <p className="text-right forgetpassword">Forget Password</p>
          </a>
        </form>
      </div>
      <div className="login-footer-container">
        <img src={footerimg} className="w-screen" alt="" />
      </div>
    </div>
  );
}

export default Login;
