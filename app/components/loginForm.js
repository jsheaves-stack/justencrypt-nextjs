'use client'

import { useState } from 'react'
import { submitLoginRequest } from '../requests/requests';

export default function LoginForm(props) {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");

    const submitLogin = (e) => {
        e.preventDefault();

        submitLoginRequest(username, password).then((authenticated) => {
            props.setAuthenticated(authenticated);
        }).catch((err) => {
            console.error(err);
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-bg">
            <div className="w-full max-w-md">
                <div className="relative flex flex-col items-center justify-center rounded-base border-2 border-black bg-mainAccent p-10 pt-12 font-base shadow-base">
                    <h2 className="text-2xl font-bold mb-6 text-center text-white">
                        Login
                    </h2>
                    <form className="space-y-6" onSubmit={(e) => submitLogin(e)}>
                        <div>
                            <label className="block text-sm font-medium text-white">
                                Username
                            </label>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full h-12 rounded-base border-2 border-black p-[10px] font-base text-black ring-offset-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 focus-visible:ring-offset-2 outline-none transition-all"
                                type="text"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white">
                                Password
                            </label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-12 rounded-base border-2 border-black p-[10px] font-base text-black ring-offset-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 focus-visible:ring-offset-2 outline-none transition-all"
                                type="password"
                            />
                        </div>
                        <div className="w-full items-center">
                            <button className="flex m-auto text-align-center cursor-pointer items-center rounded-base border-2 border-black bg-main w-18 px-4 py-2 text-sm font-base shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
