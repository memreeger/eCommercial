// import { BrowserRouter } from 'react-router-dom'
import ECommerceApp from './views/e-commerce'
import { AuthProvider } from './views/e-commerce/context/auth-context'
import { FavoriteProvider } from './views/e-commerce/context/favorite-context'

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
  )
}

export default App