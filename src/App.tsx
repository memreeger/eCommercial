// import { BrowserRouter } from 'react-router-dom'
import ECommerceApp from './views/e-commerce'
import { AuthProvider } from './views/e-commerce/context/auth-context'
import { FavoriteProvider } from './views/e-commerce/context/favorite-context'
import "./index.css"
// import Exchange from './views/e-commerce/components/exchange'

function App() {
  return (
    <AuthProvider>
      <FavoriteProvider>
        <ECommerceApp />
      </FavoriteProvider>
    </AuthProvider>
    // <BrowserRouter>
    // {/* <Register /> */}
    //   <Login />
    // </BrowserRouter>
    // <Exchange />
  )
}

export default App