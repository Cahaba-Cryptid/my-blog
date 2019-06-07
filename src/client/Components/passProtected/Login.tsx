import * as React from 'react';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { json, SetToken } from '../../utils/api';

const Login: React.SFC<ILogin> = props => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async () => {
        event.preventDefault()

        try {
            let result = await json('/auth/login', 'POST', {
                email,
                password,
            });

            if (result) {
                SetToken(result.token, { userid: result.authroid, role: result.role });
                if (result.role === 'admin') {
                    props.history.push('/admin')
                } else {
                    props.history.push('/');
                }
            }
        } catch (error) {
            throw (error);
        }

    }

    return (
        <>
            <div className="card row m-3 w-50 shadow">
                <div className="card-body p-1">
                    <div className="input-group">
                        <div className="input-group-prepend">
                        </div>
                        <input className="m-2" type="email" placeholder="Email" value={email} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)} />
                        <input className="m-2" type="password" placeholder="password" value={password} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} />
                    </div>
                    <div>
                        <button className="btn btn-success m-2" onClick={() => handleLogin()}>Login</button>
                    </div>
                </div>
            </div>
        </>
    )
}



export interface ILogin extends RouteComponentProps {
    email: string,
    password: string
}

export default Login;