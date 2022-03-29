import {FaTimes} from 'react-icons/fa'

const SavedProgression = ({savedProgression, onDelete}) => {
  return (
    <div className='task'>
        <h3>
        {savedProgression.progression} 
        <FaTimes 
        style={{cursor: 'pointer'}}
        onClick ={() => onDelete(savedProgression.id)}
        />
        </h3>
    </div>
  )
}

export default SavedProgression