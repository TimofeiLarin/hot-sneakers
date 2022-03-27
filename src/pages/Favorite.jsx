import React from 'react';
import AppContext from '../context';
import { Card } from '../components';

const Favorite = () => {
  const { favoriteItems, onClickAddFavorite } = React.useContext(AppContext);
  return (
    <div className='content p-40'>
      <div className='d-flex align-center justify-between mb-40'>
        <h1>Закладки</h1>
      </div>
      <div className='d-flex flex-wrap justify-between'>
        {favoriteItems.map((item, index) => {
          return (
            <Card
              key={item.title + index}
              obj={item}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              favorite={true}
              onClickAddFavorite={onClickAddFavorite}
              loading={false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Favorite;
