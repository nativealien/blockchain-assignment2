import { RouterProvider } from 'react-router-dom'
import { PubNubProvider } from './context/pubnubContext'
import { router } from './Router'
import './App.css'

export default function App() {

  return <PubNubProvider>
        <RouterProvider router={router} />
    </PubNubProvider>
}

