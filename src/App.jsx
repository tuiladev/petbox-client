import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from '~/pages/Home'
import Account from '~/pages/Account'
import About from '~/pages/About'
import Blog from '~/pages/Blog'
import Article from '~/pages/Article'
import Contact from '~/pages/Contact'
import Services from '~/pages/Services'
import Shop from '~/pages/Shop'
import NotFound from '~/pages/NotFound'
import MainLayout from '~/layout/MainLayout'
import Auth from '~/components/features/Auth'

const router = createBrowserRouter([
  // No Component -> A Route Group
  {
    path: '/',
    children: [
      {
        // No Route -> A Layout Applied
        path: 'auth',
        Component: Auth
      },
      {
        // No Route -> A Layout Applied
        Component: MainLayout,
        children: [
          { index: true, Component: Home },
          { path: 'about', Component: About },
          {
            path: 'account',
            children: [{ path: ':tabName', Component: Account }]
          },
          {
            path: 'blog',
            children: [
              { index: true, Component: Blog },
              { path: ':articleID', Component: Article }
            ]
          },
          { path: 'contact', Component: Contact },
          { path: 'services', Component: Services },
          { path: 'shop', Component: Shop },
          { path: '*', Component: NotFound }
        ]
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
