import React from 'react';
import styles from './Card.module.scss';

const Card = ({obj, title, price, imageUrl, onClickAddCart, onClickAddFavorite }) => {
  const [plusOrChecked, setPlusOrChecked] = React.useState(false);

  const handleClickPlus = () => {
    setPlusOrChecked(!plusOrChecked);
    onClickAddCart(obj);
  };

  return (
    <div className={`${styles.card} mb-15`}>
      <div className={styles.favorite} onClick={onClickAddFavorite}>
        <img src={'/img/heart-unliked.svg'} alt='Unliked' />
      </div>
      <img width={133} height={112} src={imageUrl} alt='Sneakers' />
      <h5>{title}</h5>
      <div className='d-flex justify-between align-center'>
        <div className='d-flex flex-column'>
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          className={`${styles.plus} cu-p`}
          src={!plusOrChecked ? './img/btn-plus.svg' : './img/btn-checked.svg'}
          alt='Plus'
          onClick={handleClickPlus}
        />
      </div>
    </div>
  );
};

export default Card;
