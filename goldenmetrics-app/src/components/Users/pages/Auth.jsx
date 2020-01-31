import React, { useContext, useState } from "react";
import axios from "axios";
import Input from "../../../shared/components/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_NOT_REQUIRED
} from "../../../shared/Validators/Validator";
import { useForm } from "../../../shared/Hooks/FormHooks";
import { AuthContext } from "../../../shared/Context/AuthContext";
import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isError, setIsError] = useState(false);
  const [formState, inputHandler, rememberMeHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false
      },
      password: {
        value: "",
        isValid: false
      },
      rememberMe: {
        value: "",
        isValid: true
      }
    },
    false
  );

  const authSubmitHandler = event => {
    event.preventDefault();
    const fetchAuthUsers = async () => {
      setIsError(false);
      try {
        const response = await axios.post("http://localhost:5000/login", {
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
          rememberMe: formState.inputs.rememberMe.value
        });
        auth.login(response.data.token);
      } catch (error) {
        setIsError(true);
      }
    };
    fetchAuthUsers();
  };

  return (
    <div className="container">
      <div className="container-auth">
        <img className="container-auth__image" alt = ""/>
        <form className="container-auth__form" onSubmit={authSubmitHandler}>
          <h3>Contacts App</h3>
          <Input
            element="input"
            id="email"
            type="email"
            placeholder="Email adress"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            placeholder="Password"
            validators={[]}
            errorText="Please enter a valid password"
            onInput={inputHandler}
          />
          <div className="checkbox-rememberme">
            <Input
              element="checkbox"
              id="rememberMe"
              type="checkbox"
              validators={[VALIDATOR_NOT_REQUIRED()]}
              onInput={rememberMeHandler}
            />
            <label>Remember me</label>
          </div>
          <button
            className="button login"
            type="submit"
            disabled={!formState.isValid}
          >
            Login
          </button>
          {isError && (
            <span className="error">Credentials error, try again</span>
          )}
        </form>
      </div>
    </div>
  );
};
export default Auth;
