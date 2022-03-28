import React from 'react';

import { Card } from '../components';

const Home = ({
  sneakers,
  cartItems,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onClickAddFavorite,
  onClickAddCart,
  loading,
}) => {
  const renderItems = () => {
    return (
      loading
        ? [...Array(12)]
        : sneakers.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
    ).map((item, index) => (
      <Card
        key={index}
        obj={item}
        {...item}
        onClickAddFavorite={onClickAddFavorite}
        onClickAddCart={onClickAddCart}
        loading={loading}
      />
    ));
  };
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
      <div className='d-flex flex-wrap justify-between'>{renderItems()}</div>
    </div>
  );
};

export default Home;
