import loginbg from "../../assets/svg/loginbg.svg";
import eye from "../../assets/svg/eye-fill.svg";
import eye2 from "../../assets/svg/eye-slash.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LoadingIndicator } from "../../components/loader";
import { useNavigate } from "react-router-dom";
import './styles.css'
import bedroom from '../../assets/images/neolocus/bedroom.png'
import axios from 'axios'
import { baseURL } from "../const";
export const Register = () => {
  const [loading, setLoading] = useState(false)
  const [toggle2, setToggle2] = useState(false)
  const [userName, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [password2, setPassword2] = useState('')
  const navigate = useNavigate()
  const Register = (event) => {
    setLoading(true)
    event.preventDefault()
    var formData = new FormData();
    formData.append('username', userName);
    formData.append('email', email);
    formData.append('password1', password);
    formData.append('password2', password2);
    axios
      .post(`${baseURL}/register`, formData)
      .then((response) => {
        setLoading(false)
        if (response.data == "Success") {
          navigate('/login')
        } else {
          setError(response.data)
        }
      })
      .catch((err) => {
        setError(err.data)
        setLoading(false)
        console.log(err)
      })
  }
  return (
    <div className="container-fluid row m-0 p-0" style={{ background: 'rgb(255 252 245)' }}>
      <div className="col-md-6 pt-4 pb-4" style={{
        height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
        backgroundImage: `url(${bedroom})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      >
        <h5 className="text-white font-weight-bold mt-2" style={{ fontSize: '5.8rem', width: '600px' }} >Design the room of your dreams</h5>
      </div>
      <div className="col-md-6 col-xs-12 col-sm-12 text-center pt-lg-5 mt-lg-5">
        {/* <div className="">
          <img className="logo1" src={Logo} alt="Logo" width={300} />
        </div> */}
        <div className="row mt-3 mt-5">
          <div className="col-md-9 col-lg-9 col-sm-12 col-xs-12 mx-auto">

            <h2 className="mb-3">
              {'Register'}
            </h2>

            <form onSubmit={(event) => { Register(event) }} className="pr-lg-5 pl-lg-5">
              <div
                className="form-group d-flex flex-column"
                style={{ textAlign: "start" }}
              >
                <label className="label2 fs13 ">{"User Name"}*</label>
                <input
                  style={{ borderRadius: "40px" }}
                  type="text"
                  className="form-control border"
                  id="username"
                  name="username"
                  autoComplete="off"
                  value={userName}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                // onFocus={() => setMessage("")}
                />
              </div>
              <div
                className="form-group d-flex flex-column mt-3"
                style={{ textAlign: "start" }}
              >
                <label className="label2 fs13 ">Email*</label>
                <input
                  style={{ borderRadius: "40px" }}
                  type="text"
                  className="form-control border"
                  id="email"
                  name="email"
                  autoComplete="off"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                // onFocus={() => setMessage("")}
                />
              </div>
              <div
                className="form-group d-flex flex-column mt-3"
                style={{ textAlign: "start" }}
              >
                <label className="label2 fs13 ">{"Password"}*</label>
                <input
                  style={{ borderRadius: "40px" }}
                  type={toggle2 ? "text" : "password"}
                  className="form-control border"
                  id="password"
                  name="password"
                  value={password}
                  maxLength={16}
                  minLength={8}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                // onFocus={() => setMessage("")}
                />
                <div className="relative">
                  <img
                    className="eye3"
                    src={toggle2 ? eye2 : eye}
                    onClick={() => { setToggle2(!toggle2) }}
                    alt="Logo"
                  />
                </div>
                {/* {validator.current.message(
                    "Password",
                    password,
                    "required|password"
                  )} */}
                {/* <span className="error-message">{message}</span> */}
              </div>

              <div
                className="form-group d-flex flex-column mt-3"
                style={{ textAlign: "start" }}
              >
                <label className="label2 fs13 ">{"Confirm Password"}*</label>
                <input
                  style={{ borderRadius: "40px" }}
                  type={toggle2 ? "text" : "password"}
                  className="form-control border"
                  id="password"
                  name="password"
                  value={password2}
                  maxLength={16}
                  minLength={8}
                  required
                  onChange={(e) => setPassword2(e.target.value)}
                // onFocus={() => setMessage("")}
                />
                <div className="relative">
                  <img
                    className="eye3"
                    src={toggle2 ? eye2 : eye}
                    onClick={() => { setToggle2(!toggle2) }}
                    alt="Logo"
                  />
                </div>
                {/* {validator.current.message(
                    "Password",
                    password,
                    "required|password"
                  )} */}
                {/* <span className="error-message">{message}</span> */}
              </div>
              <div style={{ fontSize: '14px', color: 'red', display: 'flex', justifyContent: 'flex-start', marginTop: '4px' }}>{error}</div>
              <div className="d-flex flex-row-reverse mb-4">
                {/* <Link to="/auth/forgotpassword">
                    <span className="fs-12 cursor-pointer">
                      Forgot Password
                    </span>
                  </Link> */}
              </div>
              <button
                className="font-weight-bold text-uppercase w-100 text-white border-0 login2"
                style={{
                  background: 'rgb(72, 136, 200)',
                  borderRadius: "40px",
                  height: "40px",
                }}
                type={loading ? "button" : "submit"}
                disabled={loading}
              >
                {loading ? "Logging in..." : 'Register'} {loading ? <LoadingIndicator size={"1"} /> : null}
              </button>
            </form>
            <div className="mt-3">Already Have An Account?</div>
            <Link to="/login" className="text-decoration-none login1">
              <span>  Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}