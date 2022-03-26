import React from 'react';
import styles from './Card.module.scss';

const Card = ({obj, title, price, imageUrl, onClickAddCart, onClickAddFavorite, favorite= false }) => {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(favorite);

  const handleClickAdded = () => {
    setIsAdded(!isAdded);
    onClickAddCart(obj);
  };
  const handleClickFavorite = () => {
    setIsFavorite(!isFavorite);
    onClickAddFavorite(obj);
  };

  return (
    <div className={`${styles.card} mb-15`}>
      <div className={styles.favorite} onClick={handleClickFavorite}>
        <img src={!isFavorite ? '/img/unliked.svg' : '/img/liked.svg'} alt='Unliked' />
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
          src={!isAdded ? './img/btn-plus.svg' : './img/btn-checked.svg'}
          alt='Plus'
          onClick={handleClickAdded}
        />
      </div>
    </div>
  );
};

export default Card;
