import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import DndProvider from './contexts/DndProvider.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  //<React.StrictMode>
  <DndProvider >
    <App />
  </DndProvider>
  //</React.StrictMode>,
)
