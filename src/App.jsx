import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Axios from 'axios';

import AppContext from './context';

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
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const cartResponse = await Axios.get('https://623d86dfdb0fc039d4b9127d.mockapi.io/cart');
        const favoriteResponse = await Axios.get(
          'https://623d86dfdb0fc039d4b9127d.mockapi.io/favorite'
        );
        const sneakersResponse = await Axios.get(
          'https://623d86dfdb0fc039d4b9127d.mockapi.io/sneakers'
        );

        setLoading(false);
        setCartItems(cartResponse.data);
        setFavoriteItems(favoriteResponse.data);
        setSneakers(sneakersResponse.data);
      } catch (error) {
        alert('Ошибка получения данных');
      }
    };
    fetchData();
  }, []);

  const onClickAddCart = async (obj) => {
    console.log('1', cartItems)
    console.log((cartItems.find((item) => item.idParent === obj.idParent)))
    if (cartItems.find((item) => item.idParent === obj.idParent)) {
      Axios.delete(`https://623d86dfdb0fc039d4b9127d.mockapi.io/cart/${(cartItems.find((item) => item.idParent === obj.idParent)).id}`);
      setCartItems((prev) => prev.filter((item) => item.idParent !== obj.idParent));
    } else {
      const { data } = await Axios.post('https://623d86dfdb0fc039d4b9127d.mockapi.io/cart', obj);
      setCartItems((prev) => [...prev, data]);
    }
    console.log('2', cartItems)
  };
  const onClickDeleteCart = (id) => {
    Axios.delete(`https://623d86dfdb0fc039d4b9127d.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  const onClickAddFavorite = async (obj) => {
    try {
      if (favoriteItems.find((item) => item.idParent === obj.idParent)) {
        Axios.delete(`https://623d86dfdb0fc039d4b9127d.mockapi.io/favorite/${(favoriteItems.find((item) => item.idParent === obj.idParent)).id}`);
        setFavoriteItems((prev) => prev.filter((item) => item.idParent !== obj.idParent));
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

  const isItemAdded = (id) => {
    return cartItems.some((obj) => obj.idParent === id);
  };

  const isItemFavorite = (id) => {
    return favoriteItems.some((obj) => obj.idParent === id);
  };

  return (
    <AppContext.Provider
      value={{
        sneakers,
        cartItems,
        onClickAddCart,
        setCartItems,
        isItemAdded,
        setCartOpened,
        favoriteItems,
        onClickAddFavorite,
        isItemFavorite,
      }}
    >
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
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onClickAddFavorite={onClickAddFavorite}
                onClickAddCart={onClickAddCart}
                loading={loading}
              />
            }
          />
          <Route path='/favorites' element={<Favorite />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
