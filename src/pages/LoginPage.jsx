import {
    Button,
    FormGroup,
    InputGroup,
    Divider,
    Callout
  } from "@blueprintjs/core";
  import { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import {user} from "../utils/mongo.client";
  
  function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [username, setUsername] = useState(null);
  
    const navigate = useNavigate();
  
    const formSubmitHandler = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError("");

      const emailfoundData = await user.functions.getfoundEmailData(email);
      console.log(emailfoundData)

      const passwordFoundData = await user.functions.getfoundPasswordData(password);
      console.log(passwordFoundData)

      emailfoundData !== null && passwordFoundData !== null ?
     
      (setUsername(emailfoundData.name),
       navigate("/mainpanel",{state:{usern:{emailfoundData}}}) ):  

      (setError('wrong credential'),
      setIsSubmitting(false))

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
      </>
    );
  }
  
  export default Login;
  