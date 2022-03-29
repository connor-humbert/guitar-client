import PropTypes from 'prop-types'

const Header = () => {


  return (
    <header className='header'>
      <h1>Chord Progression Generator</h1>
      
    </header>
  )
}

Header.defaultProps = {
  title: 'Chord Progression Generator',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

// CSS in JS
// const headingStyle = {
//   color: 'red',
//   backgroundColor: 'black',
// }

export default Header
