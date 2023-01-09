import localforage from 'localforage';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

// import { Container }
type HeaderProps = {
    headerRight?: React.ReactNode;
    props?: any;
}

const Header: React.FC<HeaderProps> = ({ headerRight, ...props }) => {
    const router = useRouter()


    useEffect(() => {
        console.log('header', props);
        (async () => {
            const user = await localforage.getItem('user')
            console.log('user', user)

            if (user) {
                router.push('/app')
            }
        })()
    }, [])

    return <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
            <a className="shadow-text navbar-brand text-white " href="#">Calendar.io</a>
            <div className="me-auto" />
            {!headerRight ? <div className="d-flex">
                <button className="btn btn-outline-pastel" type="submit">Criar meu lembrete</button>
            </div> : headerRight}
        </div>
    </nav>;
}

export default Header;