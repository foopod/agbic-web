import './Popup.css'
import { FaHeart } from 'react-icons/fa';

const Popup = ({cartridge, isVisible, closeHandler, isFav, favToggleHandler}) => {

  const clickOutside = (event) => {
    const isClickInside = document.getElementById('popup').contains(event.target);
    if(!isClickInside){
      closeHandler()
    }
  }

  return (
    <div
      style={{
        visibility: isVisible ? "visible" : "hidden",
        opacity: isVisible ? "1" : "0",
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      className='overlay'
      onClick={clickOutside}
      
    >
      <div className='popup' id={'popup'}>
        <h2><FaHeart onClick={favToggleHandler} style={{color: isFav ? 'hotpink' : 'grey'}}/>{cartridge.title}</h2>
        <span className='popup-close' onClick={closeHandler}>
          &times;
        </span>
        <div className='popup-content'>
          <img  className='popup-image'src={cartridge.image}/>
          <h3>{cartridge.about}</h3>
          <div className='popup-description'> 
            <p>{cartridge.description}</p>
            <img className='popup-logo' src={cartridge.logo}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
