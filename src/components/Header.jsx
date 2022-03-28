import React from 'react';

import { Link } from 'react-router-dom';
import AppContext from '../context';

const Header = ({ onClickCart }) => {
  const { cartItems } = React.useContext(AppContext);
  return (
    <header className='d-flex justify-between align-center p-40'>
      <Link to='hot-sneakers/'>
        <div className='d-flex align-center'>
          <img width={40} height={40} src='img/logo.png' alt='logo' />
          <div>
            <h3 className='text-uppercase'>Hot Sneakers</h3>
            <p className='opacity-5'>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className='d-flex'>
        <li className='mr-30 cu-p' onClick={onClickCart}>
          <img width={18} height={18} src='img/cart.svg' alt='cart' />
          <span>{cartItems.reduce((sum, item) => sum + item.price, 0)} руб.</span>
        </li>
        <li className='mr-20 cu-p'>
          <Link to='hot-sneakers/favorites'>
            <img width={18} height={18} src='img/heart.svg' alt='favorites' />
          </Link>
        </li>
        <li>
          <Link to='hot-sneakers/orders'>
            <img width={18} height={18} src='img/user.svg' alt='user' />
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
