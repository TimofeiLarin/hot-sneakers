import React from 'react';
import Axios from 'axios';

import AppContext from '../context';
import Info from './Info';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({ onClickClose, items = [], onDelete }) => {
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const [oderId, setOrderId] = React.useState(null);
  const [orderComplete, setOrderComplete] = React.useState(false);

  const onClickOrder = async () => {
    try {
      const { data } = await Axios.post('https://623d86dfdb0fc039d4b9127d.mockapi.io/orders', {
        items: cartItems,
      });
      setOrderId(data.id);
      setOrderComplete(true);
      setCartItems([]);
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await Axios.delete(`https://623d86dfdb0fc039d4b9127d.mockapi.io/cart/${item.id}`);
        await delay(1000);
      }
    } catch (error) {
      alert('Не удалось создать заказ.'); 
    }
  };

  return (
    <div className='overlay'>
      <div className='drawer'>
        <h2 className='d-flex justify-between mb-30'>
          Корзина{' '}
          <img className='cu-p' src='/img/btn-remove.svg' alt='Remove' onClick={onClickClose} />
        </h2>
        {items.length > 0 ? (
          <>
            <div className='items'>
              {items.map((item, index) => {
                return (
                  <div
                    key={item.title + index + 'cart'}
                    className='cartItem d-flex align-center mb-20'
                  >
                    <div
                      style={{ backgroundImage: `url(${item.imageUrl})` }}
                      className='cartItemImg'
                    ></div>
                    <div className='mr-20 flex'>
                      <p className='mb-5'>{item.title}</p>
                      <b>{item.price} руб.</b>
                    </div>
                    <img
                      className='removeBtn'
                      src='/img/btn-remove.svg'
                      alt='Remove'
                      onClick={() => onDelete(item.id)}
                    />
                  </div>
                );
              })}
            </div>
            <div className='cartTotalBlock'>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>21 498 руб. </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>1074 руб. </b>
                </li>
              </ul>
              <button className='greenButton' onClick={onClickOrder}>
                Оформить заказ <img src='/img/arrow.svg' alt='Arrow' />
              </button>
            </div>
          </>
        ) : (
          <Info
            title={orderComplete ? 'Заказ оформлен' : 'Корзина пустая'}
            image={orderComplete ? '/img/complete-order.jpg' : '/img/empty-cart.jpg'}
            description={
              orderComplete
                ? `Ваш заказ №${oderId} скоро будет передан курьерской службе.`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;
