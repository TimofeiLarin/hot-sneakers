import React from 'react';
import './app.scss';
import { Drawer, Header, Card } from './components';

function App() {
  const [sneakers, setSneakers] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');

  const addArray = async () => {
    const response = await fetch('https://623d86dfdb0fc039d4b9127d.mockapi.io/sneakers');
    const sneakers = await response.json();
    setSneakers(sneakers);
  };

  React.useEffect(() => addArray(), []);

  const onClickAddFavorite = () => {
    console.log();
  };

  const onClickAddCart = (obj) => {
    if (!cartItems.includes(obj)) {
      setCartItems((prev) => [...prev, obj]);
    } else {
      setCartItems((prev) => [
        ...prev.slice(
          0,
          cartItems.findIndex((item) => item === obj)
        ),
        ...prev.slice(cartItems.findIndex((item) => item === obj) + 1),
      ]);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className='wrapper clear'>
      {cartOpened && <Drawer onClickClose={() => setCartOpened(false)} items={cartItems} />}
      <Header onClickCart={() => setCartOpened(true)} />
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
    </div>
  );
}

export default App;
