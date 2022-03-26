import React from 'react';
import { Card } from '../components';

const Home = ({
  sneakers,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onClickAddFavorite,
  onClickAddCart,
}) => {
  return (
    <div className='content p-40'>
      <div className='d-flex align-center justify-between mb-40'>
        <h1>{!searchValue ? 'Все кроссовки' : `Поиск по: "${searchValue}"`}</h1>
        <div className='search-block d-flex'>
          <img src='/img/search.svg' alt='Search' />
          {searchValue && (
            <img
              className='clear cu-p'
              src='/img/btn-remove.svg'
              alt='Clear'
              onClick={() => setSearchValue('')}
            />
          )}
          <input placeholder='Поиск...' value={searchValue} onChange={onChangeSearchInput} />
        </div>
      </div>
      <div className='d-flex flex-wrap justify-between'>
        {sneakers
          .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
          .map((item, index) => {
            return (
              <Card
                key={item.title + index}
                obj={item}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onClickAddFavorite={onClickAddFavorite}
                onClickAddCart={onClickAddCart}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
