import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import loginvalidation from "../loginvalidation";
import image from "../images/user1.jpg";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import image1 from "../images/Login image.jpeg";
import Button from "react-bootstrap/esm/Button";

function CustomerLogin() {
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(loginvalidation(user));
    setSubmitted(true);
  };

  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && submitted) {
      console.log(user);
      axios
        .post("http://localhost:8080/api/customers/validate", user)
        .then((resp) => {
          let result = resp.data.data;
          console.log(resp.data.data);
          sessionStorage.setItem("email", result.email);
          sessionStorage.setItem("uname", result.name);
          sessionStorage.setItem("role", "customer");
          sessionStorage.setItem("id", result.id);
          swal({
            title: "Success!",
            text: "Logged in successfully",
            icon: "success",
            button: "OK",
          });
          dispatch({ type: "IsLoggedIn" });
          navigate("/");
        })
        .catch((error) => {
          console.log("Error", error);
          // alert("Invalid username or password");
          swal({
            title: "Error!",
            text: "Invalid username or password",
            icon: "warning",
            button: "OK",
          });
        });
    }
  }, [errors]);

  return (
    // <div className="container-fluid w-50 mt-5 login-component" >
    //     <div
    //         className="row shadow bg-light border rounded"
    //     >
    //         <div className="col-4 ">
    //             <img
    //                 src={user1}
    //                 className="rounded-start img-fluid mt-5"
    //                 style={{ width: "300px" }}
    //             ></img>
    //         </div>

    //         <div className="col-8">
    //             <div className="border border-0 rounded p-2">
    //                 <h2 className="fw-bold mb-2 mt-2 text-uppercase"> Customer Login</h2>

    //                 <div className="">
    //                     <form onSubmit={handleSubmit}>
    //                         <div className="form-floating mb-3">
    //                             <label><i className="fa fa-envelope pr-2"></i>Email Address</label>
    //                             <input
    //                                 type="text"
    //                                 name="email"
    //                                 value={user.email}
    //                                 //onChange={handleInput}
    //                                 className="form-control form-control-sm"
    //                                 placeholder="name@example.com"
    //                             />
    //                             {errors.email && <medium className="text-danger float-right">{errors.email}</medium>}
    //                         </div>
    //                         <div className="form-floating mb-3">
    //                             <label><i className="fa fa-unlock pr-2"></i>Password</label>
    //                             <input
    //                                 type="password"
    //                                 className="form-control form-control-sm"
    //                                 name="password"
    //                                 value={user.password}
    //                                 //onChange={handleInput}
    //                                 placeholder="password"
    //                             />
    //                             {errors.password && <medium className="text-danger float-right">{errors.password}</medium>}
    //                         </div>
    //                         <div className="row g-1">
    //                             <div className="text-center mb-2 pl-3">
    //                                 <Link to="/forgetPasswordCustomer" className="link-primary">
    //                                     Forgot password?
    //                                 </Link>
    //                             </div>
    //                         </div>
    //                         <button className="btn btn-primary float-center">Login Now</button>
    //                     </form>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>

    <>
      <div class="container">
        <div class="row">
          <div class="col-7">
            <img src={image1} alt="Not Found" height={700}></img>
          </div>
          <div
            className="col-5 d-flex flex-column justify-content-center align-items-center col-md-4 bg-light"
            style={{ width: "525px" }}
          >
            <div className="mydiv">
            <h4 className="text-center">Customer Login</h4>
              <h1>Academic Aisle</h1>
              
            </div>
            <form onSubmit={handleSubmit}>
              <div class="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={handleInput}
                  className="form-control form-control-sm"
                  placeholder="name@example.com"
                />
                <small id="emailHelp" class="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div class="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control form-control-sm"
                  name="password"
                  value={user.password}
                  onChange={handleInput}
                  placeholder="password"
                />
              </div>

              <div className="row g-1">
                <div className="text-center mb-2 pl-3">
                  <Link to="/forgetPasswordCustomer" className="link-primary">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <button type="submit" class="btn btn-primary mt-2 mb-2">
                Submit
              </button>
              <br></br>
              <a href="/register">Don't have a account? Register here</a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerLogin;
