import { useState } from "react";
import LoginForm from '../components/LoginForm';

function Login() {

    const adminUser = {
        email: "ahmet",
        password: "1234"
    }

    const [user, setUser] = useState({ email: "" });
    const [error, setError] = useState("");

    const Login = details => {
        if (details.email == adminUser.email && details.password == adminUser.password){
            console.log("You are logged in !");
            setUser({
                email: details.email,
                password: details.password
            });
        }
        else{
            console.log("Invaild email/password !");
            setError("Invaild email/password !");
        }
        console.log(details);
    }

    const Logout = details => {
        setUser({email: "", password: ""});
    }

    return (
        <div>
            {(user.email != "") ? (
                <div className="welcome">
                    <h2>Welcome, <span>{user.email}</span></h2>
                    <button onClick={Logout}>Logout</button>
                </div>
            ) : (
                <LoginForm Login={Login} error={error} />
            )} </div >
    )
}

export default Login
