import React from 'react';
import logo from "../Images/logo.png";

function Header() {
    return (
        <header>
            <div className="logo">
                <img src={logo} alt=""/>
                <div className="title-desc">
                    <span className="uni-title">Erzurum Teknik Üniversitesi</span>
                    <span className="desc">Ders Programı Yönetim Paneli</span>
                </div>
            </div>
            <div className="others">
                s
            </div>
        </header>
    );
}

export default Header;