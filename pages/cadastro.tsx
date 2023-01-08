import React, { useState } from 'react';
import Header from '../components/Header';
import Pageloading from '../components/PageLoading';
import { appApi } from '../services/Api';

// import { Container } from './styles';
type Form = {
    name: string;
    username: string;
    emails: string;
    phones: string;
    password: string;
    confirm_password?: string;
}

const SignUp: React.FC = () => {

    const [form, setForm] = useState({} as Form)
    const [error, setError] = useState("")
    const [loading, toggleLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const form_payload = { ...form, [name]: value }

        if (name === "confirm_password" || name === "password") {
            if (form_payload.password !== form_payload.confirm_password) setError("Senhas não conferem")
            else setError("")
        }

        setForm(form_payload)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            toggleLoading(true)
            if ("confirm_password" in form) delete form.confirm_password;

            const users_req = await appApi.post("/users", form);

            console.log(users_req)


        } catch (error: any) {
            console.log(error)
            setError(error.response.data?.message)
        } finally {
            toggleLoading(false)
        }
    }

    return <>
        <Header headerRight={<>
            <div className="d-flex gap-3">
                <a className="text-white text-decoration-none" href="/">Home</a>
                <a className="text-white text-decoration-none" href="/login">Login</a>
            </div>
        </>} />
        <div className="container">
            <form onSubmit={handleSubmit} className="row">
                <div className="col-12">
                    <h1 className="text-center text-white mb-4">Cadastro</h1>
                </div>
                <div className="col-12 col-md-6">
                    <label htmlFor="name">Nome</label>
                    <input type="text" className="form-control" id="name" name="name" value={form.name ?? ""} onChange={handleChange} />
                </div>
                <div className="col-12 col-md-6">
                    <label htmlFor="username">usuário</label>
                    <input type="text" className="form-control" id="username" name="username" value={form.username ?? ""} onChange={handleChange} />
                    <small className='small text-muted'>Será usado para fazer o login no sistema</small>
                </div>
                <div className="col-12 col-md-6">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="emails" value={form.emails ?? ""} onChange={handleChange} />
                        <small id="emailHelp" className="text-muted small">We'll never share your email with anyone else.</small>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Phone</label>
                        <input type="text" className="form-control" name="phones" value={form.phones ?? ""} onChange={handleChange} />
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={form.password ?? ""} onChange={handleChange} />
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" name="confirm_password" value={form.confirm_password ?? ""} onChange={handleChange} />
                    </div>
                </div>
                <div className="col-12">
                    {error && <div className="alert alert-danger" role="alert">
                        {error}
                    </div>}
                    <button type="submit" className="btn btn-pastel w-100">{loading ? <Pageloading className="text-white" /> : "ENVIAR"}</button>
                </div>
            </form>
        </div>
    </>;
}

export default SignUp;