import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Header() {
    return(
        <div className="header-wrapper">
            <header id="main-header">
            <nav className="main-nav">
                <div className="logo">
                    <Link to="/" className="logo-btn">
                        <img src="https://dffoxz5he03rp.cloudfront.net/logos/logo_mrt_v2_web.svg" 
                        alt="myrealtrip" />
                    </Link>
                </div>

                <div className="nav-center">
                        <input type="text" className="search-input" 
                        placeholder="도시나 상품을 검색해보세요." />
                </div>

                <div className="login-bar">
                    <button className="partner-login">파트너 로그인</button>
                    <button className="main-login">로그인 및 회원가입</button>
                </div>
            </nav>
            <nav className="menu-nav">
                <ul className="menu-list">
                    <li><Link to="/">홈</Link></li>
                    <li>항공</li>
                    <li><Link to="/stay-abroad">해외 숙소</Link></li>
                    <li>국내 숙소</li>
                    <li>투어·티켓</li>
                    <li><Link to="/korean-guest-house">한인민박</Link></li>
                    <li>해외 골프</li>
                    <li>여행자 보험</li>
                    <li>크루즈·페리</li>
                    <li>더보기</li>
                </ul>
            </nav>
        </header>
        </div>
    );
}

export default Header;
