import React from 'react'
import Header from './components/Header.js';
import Drawer from './components/Drawer/index.js';
import axios from 'axios'
import {Route, Routes} from  'react-router-dom'
import AppContext from './context';

import Home from './pages/Home'
import Favorites from './pages/Favorites.jsx';
import Orders from './pages/Orders.jsx';


function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(()=> {
    async function fetchData () {
      try {
        const cartResponse = await axios.get ('https://62f0fd3ee2bca93cd241924c.mockapi.io/cart');
        const favoritesResponse = await axios.get ('https://62f0fd3ee2bca93cd241924c.mockapi.io/favorite');
        const itemsRespons = await axios.get ('https://62f0fd3ee2bca93cd241924c.mockapi.io/items');

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsRespons.data);
      } catch (error) {
        alert ('Ошибка при запросе данных ;(');
      } 
    }
    fetchData();
  }, []);

  const onАddToCart = async (obj) => {

  const  findItam = cartItems.find(item=>Number(item.id) === Number(obj.id));
    try{
      if (findItam) {
        setCartItems((prev) => prev.filter((item)=> Number(item.id) !== Number(obj.id)));
        await axios.delete (`https://62f0fd3ee2bca93cd241924c.mockapi.io/cart'/${obj.id}`) 
      } else {
        setCartItems((prev) => [...prev, obj]);  
        const {data} = await axios.post ('https://62f0fd3ee2bca93cd241924c.mockapi.io/cart', obj);
        setCartItems((prev) => prev.map(item => { 
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            };
          }
        return item;
      }));
    }
      } catch(error) {
        alert ('Ошибка, не удалось добавить в корзину');
        console.error(error);
    }
  }; 

  const onRemuveItem = async (id) => {
    try {
      axios.delete (`https://62f0fd3ee2bca93cd241924c.mockapi.io/cart/${id}`); 
    setCartItems((prev) => prev.filter((item)=> item.id !== id));
    } catch (error) {
      alert('Ошибка, не удалось удалить товар из корзины')
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try{
    if (favorites.find(favObj=>Number(favObj.id) === Number(obj.id))) {
       axios.delete (`https://62f0fd3ee2bca93cd241924c.mockapi.io/favorite/${obj.id}`)
       setFavorites((prev) => prev.filter((item)=> Number(item.id) !== Number(obj.id)));
    } else {
    const {data} = await axios.post ('https://62f0fd3ee2bca93cd241924c.mockapi.io/favorite', obj);
    setFavorites((prev) => [...prev, data]);
    }
    } catch(error) {
      alert ('не удалось добавить в фавориты');
      console.error(error);
  }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
    
  };

  const isItemAdded = (id) => {
   return cartItems.some((obj) =>Number(obj.parentId) === Number(id));
  }
 
  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems, onАddToCart}}>
      <div className="App clear">
    {cartOpened && (
    <Drawer items={cartItems} onClose={() => setCartOpened (false)} onRemove={onRemuveItem} opened={cartOpened}/>)}
    
    <Header onClickCart={() => setCartOpened (true)}/>

    <Routes>
        <Route path="" element={ <Home
            
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onАddToCart={onАddToCart}
            isLoading={isLoading}
            
         />
   }/>
         
  </Routes>
  <Routes>
        <Route path="favorites" element={ <Favorites
        />
   }/>
         
  </Routes>

  <Routes>
        <Route path="orders" element={ <Orders
        />
   }/>
         
  </Routes>
  
        
  </div>
    </AppContext.Provider>
  );
}
export default App;
