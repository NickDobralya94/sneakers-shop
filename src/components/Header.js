import React from "react";
import {Link} from  'react-router-dom'
import { useCart } from "./hooks/useCart";

function Header(props) {

    const{totalPrice} = useCart();
   
    return (
        <header className="d-flex justify-between align-center p-40">
                <div className="d-flex align-center">
                <Link to="/">
                    <img width={40} hight={40} src="./img/logo.png" alt="Logotype"/>
                    <div className="headerInfo">
                        <h3 className="text-uppercase">SportHub</h3>
                        <p className="opacity-5">Магазин лучших кросовок</p>
                    </div>
                </Link>
                </div>
            <ul className="d-flex">
                <li onClick={props.onClickCart} className="mr-30 cu-p">
                    <img width={18} hight={18} src="./img/car.png" alt="Car"/>
                    <span>{totalPrice} грн</span>
                </li>
                <li className="mb-20 cu-p">
                    <Link to="/favorites">
                        <img width={18} hight={18} src="./img/heart.svg" alt="heart"/>
                    </Link>                    
                 </li>
                <li>
                    <Link to="/orders">
                    <img width={18} hight={18} src="./img/user.svg" alt="User"/>
                    </Link>
                 </li>
                </ul>
        </header>
    );
}

export default Header;