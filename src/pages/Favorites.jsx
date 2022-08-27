
   import React from "react";
   import Card from "../components/Card"; 
   import AppContext from "../context.js";
    
    function Favorites() {    
       const {favorites, onAddToFavorite} = React.useContext(AppContext);

    return (
        <div className="content p-40">
          <div className="justify-between d-flex aligh-center mb-40">
           <h1>Мои закладки</h1>
        </div>
        <div className="d-flex flex-wrap">
          {favorites.map((item, index) => (
            <Card
            key={index}
            onFavorite={(obj)=> onAddToFavorite(obj) }
            favorited={true}
            {...item}
            />
            ))}
          </div>
        </div>
    );
  }

export default Favorites;