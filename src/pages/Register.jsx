import React from 'react'
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

function Register() {
  const [resetEmail, setResetEmail] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [resetName,setResetName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [msg, setMsg] = useState("");  
  const navigate = useNavigate();

    
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMsg("");
    
    await user

    const emailfoundData = await user.functions.getfoundEmailData(resetEmail);
    console.log(emailfoundData)

    emailfoundData === null ?

    ( await user.functions.createUser(resetName,resetPassword,resetEmail),
    setMsg('Sucessfully created!! '),
    setIsSubmitting(false),
    setResetEmail(''),
    setResetPassword(''),
    setResetName('')
  
    ):

    (setMsg('Failed to sign up : This email already exists :('),
    setIsSubmitting(false))


  };


  return (
  <>
    {msg && <Callout className='text-3xl text-red-500'>{msg}</Callout>}
    <section  className="px-72 mt-20 bg-pink-200 py-14 rounded-lg">
      <div className="text-5xl mb-5">Register</div>
      <form className="auth-form" onSubmit={formSubmitHandler}>
        <FormGroup label="resetEmail" labelFor="resetEmail">
          <InputGroup
            id="email"
            placeholder="Enter your email"
            type="email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup label="resetPassword" labelFor="resetPassword">
          <InputGroup
            id="password"
            placeholder="Enter your Password"
            type="password"
            value={resetPassword}
            onChange={(e) => setResetPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup label="resetName" labelFor="resetName">
          <InputGroup
            id="resetName"
            placeholder="Enter your Named"
            type="text"
            value={resetName}
            onChange={(e) => setResetName(e.target.value)}
            required
          />
        </FormGroup>
        <Button
          type="submit"
          text="Sign Up"
          intent="primary"
          loading={isSubmitting}
        />
        <Divider />
            
      </form>
    </section>
  </>   
    
  )
}

export default Register