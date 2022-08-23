 import React from 'react'
 import styles from './Card.module.scss'  
 import ContentLoader from "react-content-loader"
import AppContext from '../../context';
   
   
   function Card ({id, onFavorite, imageUrl, title, price, onPlus, favorited=false, loading=false}) {  
     
    const [isFavorite, setIsFavorite] = React.useState(favorited);
    const {isItemAdded} = React.useContext(AppContext);
    const obj = ({id, parentId: id, imageUrl, title, price})
  
    const onClickPlus = () => {
      onPlus(obj);
    }  
    
    const onClickFavorite = () => {
      onFavorite(obj)
      setIsFavorite(!isFavorite)
    }
    return (
    <div className={styles.card}> 
    {
      loading ? <ContentLoader 
      speed={2}
      width={165}
      height={265}
      viewBox="0 0 150 265"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <rect x="0" y="0" rx="10" ry="10" width="155" height="155" /> 
      <rect x="0" y="167" rx="5" ry="5" width="155" height="15" /> 
      <rect x="0" y="187" rx="5" ry="5" width="100" height="15" /> 
      <rect x="0" y="234" rx="5" ry="5" width="80" height="24" /> 
      <rect x="124" y="230" rx="10" ry="10" width="32" height="32"/>
    </ContentLoader> : 
    <>
  {onFavorite && (
    <div className={styles.favorite} onClick={onClickFavorite}>
    <img src={isFavorite ? "img/liked.svg" : "img/unliked.svg"} alt="Unliked"/>
  </div>
  )}
  <img width={100} hight={135} src={imageUrl} alt="Sneakers"/>
  <h5>{title}</h5>
    <div className="d-flex justify-between align-center">
    <div className="d-flex flex-column">
      <span>Цена:</span>
        <b>{price}грн.</b> 
    </div>
  {onPlus && (
  <img className={styles.Plus} onClick={onClickPlus} src={isItemAdded(id)  ? "img/btn-cherked.svg" : "img/btn-plus.svg"} alt="Plus"
  />
  )}
</div>
    </>
    
    }
  
</div>
);
}

export default Card;