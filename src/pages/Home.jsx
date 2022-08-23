import Card from '../components/Card';
import React from 'react';

    function Home ({
        items,
        searchValue,
        setSearchValue,
        onChangeSearchInput,
        onAddToFavorite,
        onАddToCart,
        isLoading
        
    }) {     
      
      const renderItems =()=>{
        const filterItems = items=items.filter((items) =>
          items.title.toLowerCase().includes(searchValue.toLowerCase()),
        );
        return (isLoading ? [...Array(10)]: filterItems).map((item, index) => (
          
          <Card
           key={index}
           onFavorite={(obj)=> onAddToFavorite(obj) }
           onPlus={(obj) => onАddToCart(obj)} 
           loading={isLoading}
           {...item}
          /> 
          ));
      };

    return (
        <div className="content p-40">
          <div className="justify-between d-flex aligh-center mb-40">
            <h1>{searchValue ? `Поиско по запросу: "${searchValue}"`: 'Все красовки'}</h1>
            <div className="search-block d-flex">
              <img src="img/serch.svg" alt="Serch"/>
              {searchValue && 
              <img 
                onClick={() => setSearchValue ('')}
                className="clear cu-p" 
                src="img/btn-remuve.svg" 
                alt="Clear"
                />
              }
              <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."/>
            </div>
        </div>
        <div className='d-flex flex-wrap'>{renderItems()}</div>
        </div>
    );
}

export default Home;