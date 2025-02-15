import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "./components/ui/provider"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from './Context/AuthContext.jsx'
import Modal from "react-modal";

Modal.setAppElement("#root"); // Called once here
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
