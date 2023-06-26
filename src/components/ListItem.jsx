import { FaHeart, FaItalic } from 'react-icons/fa'
import './ListItem.css'

function ListItem({cartridge, onClick}) {

  return (
    <div className='card' onClick={onClick}>
        <img className='card-image' src={cartridge.image} alt={cartridge.name} />
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
