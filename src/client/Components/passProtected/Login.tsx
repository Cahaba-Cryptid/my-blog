import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';


const Login: React.SFC<ILogin> = props => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async () => {
        event.preventDefault()

    }


    return (
        <>
            <>
                <div className="card row m-3 w-50 shadow">
                    <div className="card-body p-1">
                        <div className="input-group">
                            <div className="input-group-prepend">
                            </div>
                            <input type="email" placeholder="Email" value={email} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}/>
                            <input type="password" placeholder="password" value={password} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}/>
                        </div>
                        <div>
                            <button className="btn btn-success " onClick={() => handleLogin()}>Login</button>
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}



export interface ILogin extends RouteComponentProps {
    email: string,
    password: string
}

export default Login;