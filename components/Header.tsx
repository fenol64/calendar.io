import React from 'react';

// import { Container }
type HeaderProps = {
    headerRight?: React.ReactNode;
    props?: any;
}

const Header: React.FC<HeaderProps> = ({ headerRight, ...props }) => {
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