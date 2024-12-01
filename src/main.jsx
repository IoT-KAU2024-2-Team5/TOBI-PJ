import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Styles from './styles/index.jsx'

createRoot(document.getElementById('root')).render(
  <Styles>
    <App />
  </Styles>,
)
