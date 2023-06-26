import { FaHeart, FaItalic } from 'react-icons/fa'
import './ListItem.css'

function ListItem({cartridge, onClick}) {

  const loading = cartridge.number > 8 ? 'lazy' : null;

  return (
    <div className='card' onClick={onClick}>
        <img className='card-image' src={cartridge.image} alt={cartridge.name} loading={loading}/>
        <div>
        {cartridge.isFav &&
          <FaHeart style={{color: 'hotpink'}}/>
        }
        <p className='card-text'>{cartridge.title}</p>
        </div>
    </div>
  )
}

export default ListItem
