import Logo from "../../assets/images/Logo2.png";
import loginbg from "../../assets/svg/loginbg.svg";
import eye from "../../assets/svg/eye-fill.svg";
import eye2 from "../../assets/svg/eye-slash.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LoadingIndicator } from "../../components/loader";
import './styles.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin } from '@react-oauth/google';
import { useUser } from "../context/userContext";
import { baseURL } from "../const";

export const Login = () => {
  const [loading, setLoading] = useState(false)
  const [toggle2, setToggle2] = useState(false)
  const [email, setEmail] = useState("info@desai.net")
  const [password, setPassword] = useState('Keypulse@123')
  const [error, setError] = useState('')
  const { userData, setUserData } = useUser();
  const googleLoginURL = `${baseURL}/googlelogin`


  const getUserData = async (userName) => {
    try {
      var formData = new FormData();
      formData.append('user', userName);
      const response = await axios.post(`${baseURL}/get_user_details`, formData);
      console.log(response)
      setUserData(response?.data?.paymentinfo)
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };


  const navigate = useNavigate()
  const Login = (event) => {
    // if (email === 'info@desai.net' && password === 'Keypulse@123') {
    //   setLoading(true)
    //   navigate('/start-design')
    // }
    var formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    formData.append('email', email);
    event.preventDefault()
    axios
      .post(`${baseURL}/login`, formData)
      .then((response) => {

        setLoading(false)
        console.log(response)
        if (response.data === "Success") {
          navigate('/start-design')
          localStorage.setItem('username', email);
          localStorage.setItem('email', email);
          localStorage.setItem('token', `${response.data}`);
          getUserData(email)
        } else {
          setError(response.data)
          console.log('Login Failed')
          // window.alert("Incorrect Password")
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }


  const onSuccess = (response) => {

  };

  const onFailure = (response) => {
    console.log('Login Failed:', response);
  };

  const onLogoutSuccess = () => {
    console.log('Logout Success');
  };

  const getUserInfo = async (token) => {
    try {
      const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      GoogleLogin(response.data)
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const GoogleLogin = (data) => {
    var formData = new FormData();
    formData.append('username', `${data.name.replaceAll(' ', '_')}`);
    formData.append('id', data.id);
    formData.append('email', data.email);

    axios
      .post(googleLoginURL, formData)
      .then((response) => {
        console.log(response)
        setLoading(false)
        if (response.status == 200) {
          navigate('/start-design')
          console.log(data)
          localStorage.setItem('username', `${data.name.replaceAll(' ', '_')}`);
          localStorage.setItem('email', data.email);
          localStorage.setItem('token', `${response.data}`);
        } else {
          setError(response.data)
          console.log('Login Failed')
          // window.alert("Incorrect Password")
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      getUserInfo(tokenResponse.access_token)
    },
  });

  return (
    <div className="container-fluid row m-0 p-0" style={{ background: 'rgb(255 252 245)' }}>
      <div className="col-md-6 pt-4 pb-4" style={{ height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgb(72, 136, 200)' }}>
        <h5 className="text-white font-weight-bold mt-2" style={{ fontSize: '5.8rem', width: '600px' }} >Design the room of your dreams</h5>
      </div>
      <div className="col-md-6 col-xs-12 col-sm-12 text-center pt-lg-5 mt-lg-5">
        <div className="pt-5">
        </div>
        <div className="row mt-3" style={{ height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="col-md-9 col-lg-9 col-sm-12 col-xs-12 mx-auto">
            <div style={{ width: '100% !important' }}>
              <button
                className="custom-google-login-button"
                onClick={() => {
                  login()
                }}
              >
                <img src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAORSURBVHgBtZfNbxNHGMaf2d0EB/qxLpUsLIduLlVUqWXTSlUvldakPVZF6qGoF5JzVSXtpZeoWdo/oEY99FQ5qEItEohEHDgQ4eWCICDiXIgFElk+JGQg8oaIxCHxvLzjiChOduOv5JHW9s6M5zfzzjvPzgo0qDnbMvWO2DEBYUPgAy6y+DJB8Pk+kKAZKeH13Cp4jfQn6gK/6HUMqQ0xwIEgE/WlBpIxVmjiUL7go1nw+gy7RoXAMFqTL0BuaqpwumHwnN1rGZ0ih/VwtiU9kcgkL3o/by03thY8tj+yqQMMbSisdVUpFp2w8hqwmil10gWopNkd5df2L6fDKrSaUdQJr5E67OuEYUOjnu6pWaEu7jgOSWkCateSyFPQHs8PwvraWONHn/eO8q0bSiQRCI1Opm7MZrCDeAdYvAP+JNDC4anZgZ3aVsHLOVhLE4nc0rX3rFAokE7dvJPHLmo91BLOgW+K1oH+Z9saCCGHdxta7Vd9lCcxzb9s9Xv1/n4snkuiUupgKI2lbhQGsQcSKsxCYm5zoYK++LcbKHb2HLoe7T7tyJAV2PoWG9Hjq4j/dN+LfcX2t4O+H5nMCKEdQbOSlZOGIN4+4cY5U+//AgpKDpqUBCY0EWEWRAiwR+KMNrXI2piFvZTGjhPuLCv+btlmBFhEJJCG5pOmYarmi1IOZpdEaXP5k7Uu/Pr8E9x99U5ffvByy+ZxfORKjg8PzrYKKdNaPM2hFvDelN0um/jx6ae49+otnrQcQos67uasUCir/NLIV5OLKriqvs++6GboZzzjWLUBr/+Ane0/hla0VnHDK8gbz6SDKrhsIDMy/3GQCT7c1oy3W9bOfm2jCf3wW26I/fZEWJ0Q+pj6roJVuCcXE6ci+jEF5LT9z9GGzl7OX7+MSpJRj0//v9/T1ed2jWf1ZY9OQx1fo+WzsbgQlZn8oFdNOjvrqG1nadC+JQg1OPP90pc4yNdWsb0OhIK5E4ttUMHb3sOxlQSSxe/QsbbR1dj/f/RvPOlqnItn4RMkn5Gobbss7yviUfIMlmIP1K1f1rWak+Y2y1QhZHgfw320qVVjAQ+TZzyG9o276ZrJRB7o/57OWucLl9z58vwJtCQKCNqp/OCkG1Zb9xVGrTtId/mNosEBMJDEaU7AjFq6qFZ1wZsGwFmiO+odKt5lHimVA7y7721rYWXRPxiLB/PLpQectuPsHHkG1s2R17KaTnlOqfV9AAAAAElFTkSuQmCC"} alt="" />
                Sign in with Google
              </button>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
              <div className="border-top">

              </div>
              <div style={{ width: '100%' }}>
                OR CONTINUE WITH
              </div>
              <div className="border-top">

              </div>
            </div>
            <h2 className="mb-1">
              {'Login'}
            </h2>
            <form onSubmit={(event) => Login(event)} className="pr-lg-5 pl-lg-5">
              <div
                className="form-group d-flex flex-column"
                style={{ textAlign: "start" }}
              >
                <label className="label2 fs13 ">{"UserName"}*</label>
                <input
                  style={{ borderRadius: "40px" }}
                  // type="email"
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
                  // maxLength={16}
                  // minLength={8}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                // onFocus={() => setMessage("")}
                />
                <div className="relative">
                  <img
                    className="eye3"
                    src={toggle2 ? eye2 : eye}
                    onClick={() => setToggle2(!toggle2)}
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
                <Link to="#">
                  <span className="fs-12 cursor-pointer">
                    Forgot Password
                  </span>
                </Link>
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
                {loading ? "Logging in..." : 'Login'} {loading ? <LoadingIndicator size={"1"} /> : null}
              </button>
            </form>
            <div className="account2 mt-2">{"Don't Have An Account?"}</div>
            <Link to="/register" className="text-decoration-none register2">
              <span>  {"Register"}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}