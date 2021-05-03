import { useState } from 'react';


function LoginForm({ Login, Error }) {

    const [details, setDetails] = useState({ email: "", password: "" });

    const submitHandler = e => {
        e.preventDefault();
        Login(details);
    }
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
}

export default LoginForm
