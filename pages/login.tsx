import React, { useState } from 'react'
import Header from '../components/Header'
import Link from 'next/link'
import Pageloading from '../components/PageLoading';
import { appApi } from '../services/Api';
import localforage from 'localforage';
import { useRouter } from 'next/router';

type Form = {
    login: string;
    password: string;
}

export default function login() {
    const router = useRouter();
    const [form, setForm] = useState({} as Form);
    const [error, setError] = useState("");
    const [loading, toggleLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            toggleLoading(true);
            const { data: user_data } = await appApi.post('/login', form);

            await localforage.setItem('user', user_data.user);
            router.push("/app");
        } catch (error: any) {
            console.log(error)
            setError(error.response.data?.message)
        } finally {
            toggleLoading(false)
        }
    }


    return (<>
        <Header headerRight={<div className='d-flex gap-3'>
            <Link href={`/`} className="text-decoration-none">
                <span className="text-white text-decoration-none">Home</span>
            </Link>
            <Link href={`/cadastro`} className="text-decoration-none">
                <span className="text-white text-decoration-none">Cadastro</span>
            </Link>
        </div>} />
        <div className="d-flex flex-1 align-items-center" style={{ height: "calc(100vh - 60px)" }}>
            <form onSubmit={handleSubmit} className="container" style={{ maxWidth: "500px" }}>
                <div className="mb-3 ">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="text" className="form-control" name="login" value={form.login ?? ""} onChange={handleChange} />
                    <small id="emailHelp" className="text-muted small">We'll never share your email with anyone else.</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={form.password ?? ""} onChange={handleChange} />
                </div>
                {error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}
                <button type="submit" className="btn btn-pastel w-100">{loading ? <Pageloading className="text-white" /> : "ENVIAR"}</button>
            </form>
        </div>
    </>)
}
