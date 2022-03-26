import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Axios from 'axios';
import './app.scss';

import Home from './pages/Home';
import Favorite from './pages/Favorite';
import { Drawer, Header } from './components';

function App() {
  const [sneakers, setSneakers] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [favoriteItems, setFavoriteItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    Axios.get('https://623d86dfdb0fc039d4b9127d.mockapi.io/sneakers').then(({ data }) =>
      setSneakers(data)
    );
    Axios.get('https://623d86dfdb0fc039d4b9127d.mockapi.io/cart').then(({ data }) =>
      setCartItems(data)
    );
    Axios.get('https://623d86dfdb0fc039d4b9127d.mockapi.io/favorite').then(({ data }) =>
      setFavoriteItems(data)
    );
  }, []);

  const onClickAddCart = (obj) => {
    if (cartItems.includes(obj)) {
      Axios.delete(`https://623d86dfdb0fc039d4b9127d.mockapi.io/cart/${obj.id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== obj.id));
    } else {
      Axios.post('https://623d86dfdb0fc039d4b9127d.mockapi.io/cart', obj);
      setCartItems((prev) => [...prev, obj]);
    }
  };
  const onClickDeleteCart = (id) => {
    Axios.delete(`https://623d86dfdb0fc039d4b9127d.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  const onClickAddFavorite = async (obj) => {
    try {
      if (favoriteItems.includes(obj)) {
        Axios.delete(`https://623d86dfdb0fc039d4b9127d.mockapi.io/favorite/${obj.id}`);
        setFavoriteItems((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await Axios.post(
          'https://623d86dfdb0fc039d4b9127d.mockapi.io/favorite',
          obj
        );
        setFavoriteItems((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('No data favorite');
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className='wrapper clear'>
      {cartOpened && (
        <Drawer
          onClickClose={() => setCartOpened(false)}
          items={cartItems}
          onDelete={onClickDeleteCart}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />
      <Routes>
        <Route
          exact
          path='/'
          element={
            <Home
              sneakers={sneakers}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onClickAddFavorite={onClickAddFavorite}
              onClickAddCart={onClickAddCart}
            />
          }
        />
        <Route
          path='/favorites'
          element={
            <Favorite favoriteItems={favoriteItems} onClickAddFavorite={onClickAddFavorite} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
