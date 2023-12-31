import React, { useState, useEffect } from 'react';
import './Navigationbar.css';
import { useUserinfo } from '../../User/Userinfo/Userinfo';
import { CgProfile } from 'react-icons/cg';
import { FiShoppingCart } from 'react-icons/fi';
import { AiOutlineBell } from 'react-icons/ai';
import Search from '../../Searchs/Search/Search';
import { IoIosClose } from 'react-icons/io';
import jwt_decode from 'jwt-decode';
import Login from '../Login/login';
import Logo from '../Logo/Logo';
import Cartpage from '../../Cart/Cartpage';
import { Link, useNavigate } from 'react-router-dom';

const Navigationbar = () => {

    const [showLoginForm, setShowLoginForm] = useState(false);
    const [token, setToken] = useState(null);
    const [decoded_token, setDecodedToken] = useState(null)
    const navigate = useNavigate();
    const userId = decoded_token?.sub; 
    const userInfo=useUserinfo(token,userId);
 useEffect(() => {
        const storedToken = localStorage.getItem('payload');
        if (storedToken) {
            setToken(storedToken);
            const decodedToken = jwt_decode(storedToken);
            setDecodedToken(decodedToken);
        }
    }, []);


    const handleCartClick = () => {
        if (decoded_token) {
            navigate('/cart')
        } else {
            setShowLoginForm(true);
        }
    }

    const handleProfileClick = () => {
        if (decoded_token) {
            navigate('/user-page')
        } else {
            showLoginForm ? setShowLoginForm(false) : setShowLoginForm(true);
        }
    };
   
    const handleLogout = () => {
        console.log('userinfo: ', userInfo)
        setToken(null);
        setDecodedToken(null);
        localStorage.removeItem('payload');
        closeModal(true)
    }


    const closeModal = () => {
        setShowLoginForm(false);
    };
    function checkTokenExpiration() {
      var token = localStorage.getItem('payload');
      console.log('token dentro:',token)
  
      try {
          var decoded_token = jwt_decode(token);
          var exp_timestamp = decoded_token.exp;
          var exp_date = new Date(exp_timestamp * 1000);
          var time_until_exp = exp_date - new Date();
          var one_hour = 60 * 60 * 1000;
  
          if (time_until_exp <= one_hour) {
              console.log("Falta menos de 1 hora para a expiração do token. Realizando logout automático...");
              handleLogout(true);
          }
  
      } catch (error) {
          if (error.name === "TokenExpiredError") {
              console.log("O token já expirou.");
          } else {
              console.log("Erro na decodificação do token.");
          }
      }
  }
  
  var interval = 60 * 60 * 1000; 
  setInterval(checkTokenExpiration, interval);
  return (
    <div className="container-fluid">
      <nav className="navbar">
        <ul className="nav-list">
            <div className='navbar-item'>
                <Logo/>  
            </div>
            <div className='navbar-item'>
                <div className='search-div'>
                    <Search/>
                </div>
            </div>
            <div className='navbar-item'>
                <div className="conteudo">
                    {decoded_token && decoded_token.admin && (
                        <Link className='content-button' to="/admin"><button className="botao-admin"> Admin </button></Link>
                    )}
                    <a className='content-button' href="#" onClick={handleProfileClick}>
                        <CgProfile className="perfil"/>
                    </a>

                    <a className='content-button' href="" onClick={handleCartClick}>
                        <FiShoppingCart className="carrinho"/>
                    </a>

                    <a className='content-button' href="">
                        <AiOutlineBell className="notificacao"/>
                    </a>
                </div>
            </div>
        </ul>
      </nav>
      {showLoginForm && (
                <div className="modal-center">
                <div className="modal">
                    <div className="modal-content">
                        <IoIosClose className="close" onClick={closeModal}/>
                        <Login/>
                    </div>
                </div>
                </div>
            )}
    </div>
  );
};

export default Navigationbar;