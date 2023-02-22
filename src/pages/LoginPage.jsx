import { Button,FormGroup,InputGroup,Divider,Callout} from "@blueprintjs/core";
  import { useState, useEffect } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import {user as USER}  from "../utils/mongo.client";
  import { googleLogout,useGoogleLogin} from "@react-oauth/google"; 
  import axios from 'axios';

  
  
  function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [username, setUsername] = useState(null);
    const [ user, setUser ] = useState(null);
    const [ profile, setProfile ] = useState(null);

    const navigate = useNavigate();

    const login = useGoogleLogin({
      onSuccess: (codeResponse) => setUser(codeResponse),
      onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(
    () => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                    const userg = res.data
                    console.log(userg)
                    navigate("/mainpanel",{state:{userg:{userg}}})

                })
                .catch((err) => console.log(err));
        }
    },
    [ user ]
);

 // log out function to log the user out of google and set the profile array to null
 const logOut = () => {
  googleLogout();
  setProfile(null);
};


  
   
  
    const formSubmitHandler = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError("");

      const emailfoundData = await USER.functions.getfoundEmailData(email);
      console.log(emailfoundData)

      const passwordFoundData = await USER.functions.getfoundPasswordData(password);
      console.log(passwordFoundData)

      emailfoundData !== null && passwordFoundData !== null ?
     
      (setUsername(emailfoundData.name),
       navigate("/mainpanel",{state:{usern:{emailfoundData}}}) ):  

      (setError('wrong credential'),
      setIsSubmitting(false))

    };

    const responseMessage = (response) => {
      console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };

   

    return (
      <>
        {error && <Callout>{error}</Callout>}
        <div className="text-5xl mb-5">Welcome to sign in! </div>

        <form className="auth-form" onSubmit={formSubmitHandler}>
          <FormGroup label="Email" labelFor="email">
            <InputGroup
              id="email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup label="Password" labelFor="password">
            <InputGroup
              id="password"
              placeholder="Enter your Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              
            />
          </FormGroup>
          <Button
            type="submit"
            text="Sign In"
            intent="primary"
            loading={isSubmitting}
          />

          <Divider />
         
          {/* <Link to="/forgot">Forgot Password?</Link> */}
        </form>

        <div>
        {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
              <Button
            type="submit"
            text="Sign In with Google 🚀 "
            intent="warning"
            onClick={() => login()}
          
          />
                
            )}
        </div>
         
      </>
    );
  }
  
  export default Login;
  