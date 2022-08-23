import React from "react";
import axios from "axios";

import Info from "../Card/Info"
import { useCart } from "../hooks/useCart";

import styles from "./Drawer.module.scss"
 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer ({onClose, onRemove, items = [], opened}) {
 
const {cartItems, setCartItems, totalPrice} = useCart()
const [orderId, setOrderId] = React.useState(null);
const [isOrderComplete, setIsOrderComplete] = React.useState(false);
const [isloading, setIsLoading] = React.useState(false);

const onClickOrder = async () => {
    try {
        setIsOrderComplete(true);
const {data} = await axios.post('https://62f0fd3ee2bca93cd241924c.mockapi.io/orders', {
    items: cartItems,
});
        setOrderId (data.id);
        setIsOrderComplete(true);
        setCartItems([]);

        for (let i=0; i < cartItems.length; i ++) {
            const item = cartItems[i];
            await axios.delete('https://62f0fd3ee2bca93cd241924c.mockapi.io/cart' + item.id)
            await delay(1000);
        }
    }   catch (error) {
        alert('Ошибка при создании заказа :(')
    }
    setIsLoading(false);
};
 
    return ( 
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
            <h2 className="d-flex justify-between mb-30">
                Корзина 
                <img onClick={onClose} className="cu-p" src="/img/btn-remuve.svg" alt="Выкл"/>    
            </h2>

            {
                items.length > 0 ? (
                <div >
                    <div className="d-flex flex-column flex"> 
                        <div className="items flex">
                        {items.map((obj) => (
                            <div key={obj.id} className="cartItem d-flex align-center mb-20">
                        <div
                            style={{backgroundImage:`url(${obj.imageUrl})`}}            
                            className="cartItemImg"></div>
                         
                        <div className="mb-20 flex">
                            <p className="mb-5">{obj.title}</p>
                            <b>{obj.price}</b>
                        </div>
                        <img 
                            onClick={() => onRemove(obj.id)} 
                            className="removeBtn" 
                            src="/img/btn-remuve.svg"
                            alt="Remove"/>
                        </div>
                ))}
                </div>
            </div> 
            <div className="cartTotalBlock">
            <ul>
                <li>
                    <span>Итого:</span>
                    <div></div>
                    <b>{totalPrice}грн</b>
                </li>
                <li>
                    <span>Налог 5%:</span>
                    <div></div>
                    <b>{totalPrice/100*5}грн</b>
                </li>
            </ul>
            <button disabled={isloading} onClick={onClickOrder} className="greenButton">
                Оформить заказ <img src="img/arrow.svg" alt="Arrow"/>
            </button>
            </div> 
        </div>) : (           
                <Info 
                title = {isOrderComplete ? "Заказ оформлен!":"Корзина пустая"}
                description={
                    isOrderComplete 
                    ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                    :"Добавьте хотябы одну пару кросовок чтобы сделать заказ"}
                image={isOrderComplete ? "/img/complite-order.png" : "/img/empty-cart.png"}
                />
            )}  
        </div> 
    </div> 
    );
} 

export default Drawer;


