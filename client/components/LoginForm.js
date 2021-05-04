import Head from "next/head";
import Title from "../components/text/title";
import Subtitle from "../components/text/subtitle";
import Input from "../components/form/input";
import Button from "../components/form/button";
import Link from "next/link";
import { useState } from "react";
import * as yup from "yup";
import Image from 'next/image'
import { useAuth } from "../lib/auth";


function LoginForm({ Login, Error }) {
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const initializeErrors = () => ({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState(initializeErrors());

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors(initializeErrors());

    let schema = yup.object().shape({
      email: yup
        .string()
        .email("Email must be a valid email")
        .required("Email is required"),
      password: yup.string().required("Password is required"),
    });

    let valid;

    try {
      valid = await schema.validate(
        {
          email,
          password,
        },
        { abortEarly: false } // get all the errors
      );
    } catch (e) {
      const temp = {};

      e.inner.forEach((err) => {
        temp[err.path] = err.message;
      });

      // set errors to their proper places
      setErrors({ ...errors, ...temp });
    }

    if (!valid) return;

    setErrors(initializeErrors());

    try {
      const res = await auth.signin(email, password);
      console.log(res);
    } catch (e) {
      if (e.code.startsWith("auth")) {
        const errorMessage = "Email and password don't match";

        setErrors({
          email: errorMessage,
          password: errorMessage,
        });
      }
    }
  };

  const [details, setDetails] = useState({ email: "", password: "" });

  const submitHandler = e => {
    e.preventDefault();
    Login(details);
  }

  return (
    <div>
      <Head>
        <title>Login Page</title>
      </Head>
      <div className = "text-center">
        <Image
          src="/logo.png"
          alt="Picture of the author"
          width={165}
          height={69}
        />
      </div>
      <div className = 'border-1'>
        <hr></hr>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-1/2 text-center border-2 border-grey p-5 space-y-5 mt-12 mx-96">
          <Title>Sign in to your account</Title>
          <Subtitle className="mt-2">
            Idemy Online Course Platform
            </Subtitle>

          <Input
            id="email"
            label="email"
            type="text"
            placeholder="email address"
            error={errors.email}
            value={email}
            setFunc={setEmail}
          />
          <Input
            id="password"
            label="password"
            type="password"
            error={errors.password}
            sideHref="/"
            value={password}
            setFunc={setPassword}
          />
          <div className="mt-5">
            <Button type="submit" text="login" />
          </div>
        </div>
      </form>
    </div>
  );



  /*
  return (
      <form onSubmit={submitHandler}>
          <div className="form-inner">
              <h2>Login</h2>
              <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="text" name="email" id="email" onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email}></input>
              </div>
              <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input type="text" name="password" id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password}></input>
              </div>
              <input type="submit" value="LOGIN"></input>
          </div>
      </form>
  )
  */
}

export default LoginForm
