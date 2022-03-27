import React from 'react';

import AppContext from '../../context';
import ContentLoader from 'react-content-loader';
import styles from './Card.module.scss';

const Card = ({
  obj,
  title,
  price,
  imageUrl,
  onClickAddCart,
  onClickAddFavorite,
  loading = true,
  idParent
}) => {
  const { isItemAdded, isItemFavorite } = React.useContext(AppContext);

  const handleClickAdded = () => {
    onClickAddCart(obj);
  };
  const handleClickFavorite = () => {
    onClickAddFavorite(obj);
  };

  return (
    <div className={`${styles.card} mb-15`}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={160}
          height={187}
          viewBox='0 0 160 187'
          backgroundColor='#f3f3f3'
          foregroundColor='#ecebeb'
        >
          <rect x='0' y='0' rx='10' ry='10' width='160' height='91' />
          <rect x='0' y='100' rx='5' ry='5' width='160' height='15' />
          <rect x='0' y='125' rx='5' ry='5' width='100' height='15' />
          <rect x='0' y='160' rx='5' ry='5' width='80' height='25' />
          <rect x='118' y='143' rx='10' ry='10' width='32' height='32' />
        </ContentLoader>
      ) : (
        <>
          {onClickAddFavorite && <div className={styles.favorite} onClick={handleClickFavorite}>
            <img src={!isItemFavorite(idParent) ? '/img/unliked.svg' : '/img/liked.svg'} alt='Unliked' />
          </div>}
          <img width='100%' height={130} src={imageUrl} alt='Sneakers' />
          <h5>{title}</h5>
          <div className='d-flex justify-between align-center'>
            <div className='d-flex flex-column'>
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onClickAddCart && <img
              className={`${styles.plus} cu-p`}
              src={!isItemAdded(idParent) ? './img/btn-plus.svg' : './img/btn-checked.svg'}
              alt='Plus'
              onClick={handleClickAdded}
            />}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
