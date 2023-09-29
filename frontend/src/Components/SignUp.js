import '../Styles/SignUp.css';
import React, { useState } from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Ratio from 'react-bootstrap/Ratio';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
 

function SignUp() {
    return (
    <div className="create-account">
      {/* <div className="acc-img">
        <img src="./images/logo.png" alt="logo" />
      </div> */}
      <form>
        <br></br>
        <h2>Create Account</h2>
        <label className="label" for="name">Name:</label>
        <br />
        <input className="center-block" type="text" id="name" name="name" placeholder="Name" />
        <br />
        <label className="label" for="E-mail">E-mail:</label>
        <br />
        <input
          type="text"
          id="E-mail"
          name="E-mail"
          placeholder="E-mail"
          className="center-block"
          
        />
        <br />
        <label className="label" for="password">Password:</label>
        <br />
        <input
            className="center-block"
          type="password"
          id="password-field"
          class="login-form-field"
          placeholder="Password"
        ></input>
        <br></br>
        <label className="label" id="password-label" for="password">
          Confirm Password:
        </label>
        <input
          type="password"
          id="password-field"
          class="login-form-field"
          placeholder="Confirm Password"
          className="center-block"
        ></input>
        <br></br>
        <br></br>

        <input
          className="button"
          type="submit"
          value="Create Account"
          id="login-form-submit"
        ></input>
        <br></br>
        <br></br>

        <Link to="/login">
          <input
            className="button"
            type="submit"
            value="Return to login"
          ></input>
        </Link>
      </form>
    </div>

      )
}
  
export default SignUp;
 
