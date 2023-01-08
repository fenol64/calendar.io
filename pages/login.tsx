import React from 'react'
import Header from '../components/Header'
import Link from 'next/link'

export default function login() {
    // create bootstrap login page
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
            <form className="container w-50">
                <div className="mb-3 ">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <small id="emailHelp" className="text-muted small">We'll never share your email with anyone else.</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-pastel w-100">Submit</button>
            </form>
        </div>
    </>)
}
