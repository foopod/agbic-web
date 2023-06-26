import { useEffect, useState } from 'react'
import './App.css'
import jsonData from './assets/data.json';
import ListItem from './components/ListItem';
import Popup from './components/Popup';
import { FaHeart } from 'react-icons/fa';

function App() {
  const [listOfCartridges, setListOfCartridges] = useState(jsonData)
  const [selected, setSelected] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false) // by favourites

  const pad = (num, size) => {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  }

  const addToFav = (index)=> {
    const newFavourites = JSON.parse(JSON.stringify(favourites));
    newFavourites.push(index);

    localStorage.setItem('fav-list', JSON.stringify(newFavourites));
    setFavourites(newFavourites);
  }

  const removeFromFav = (index)=> {
    const newFavourites = favourites.filter(fav => fav !== index);

    localStorage.setItem('fav-list', JSON.stringify(newFavourites));
    setFavourites(newFavourites);
  }

  const favToggle = (index) => {
    const isFav = favourites.includes(index)
    if(isFav){
      removeFromFav(index);
    } else {
      addToFav(index);
    }
  }

  const toggleFilter = () => {
    if(isFiltered){
      setListOfCartridges(jsonData);
    } else {
      setListOfCartridges(jsonData.filter(cart => favourites.includes(cart.number)))
    }
    setIsFiltered(!isFiltered);
  }

  useEffect(() => {
    // onload
    let favList = []
    if(localStorage.getItem('fav-list')){
      favList = JSON.parse(localStorage.getItem('fav-list'));
    }
    localStorage.setItem('fav-list', JSON.stringify(favList))
    setFavourites(favList);
  }, [])

  useEffect(() => {
    // onload
    console.log(listOfCartridges)
  }, [listOfCartridges])

  return (
    <>
        <button onClick={toggleFilter}> filter by <FaHeart size={'0.8em'} style={{color: 'hotpink'}}/> </button>
        <Popup cartridge={jsonData[selected-1]} isVisible={showPopup} favToggleHandler={() => favToggle(selected)} closeHandler={() => {
          setShowPopup(false);
        }} isFav={favourites.includes(selected)}/>
        <div className='container'>
          {listOfCartridges.map((cart) => {
            cart.image = `images/${pad(cart.number, 3)}.jpg`
            cart.logo = `logo/${pad(cart.number, 3)}.gif`
            cart.isFav = favourites.includes(cart.number)
            return <ListItem key={`${cart.title}`} cartridge={cart} onClick={() => {
              setSelected(cart.number);
              setShowPopup(true);
            }}/>
          })}
        
      </div>
    </>
  )
}

export default App
