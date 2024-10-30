import './Footer.css'

const Footer = props => {
  const year = new Date().getFullYear()

  return (
    <footer>
      <p>&copy; {year}. All rights reserved.</p>
    </footer>
  )
}

export default Footer
