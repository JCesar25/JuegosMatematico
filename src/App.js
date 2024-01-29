
import './App.css';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import Juegos from "./Componentes/Juegos"

function App() {
  return (
    <BrowserRouter>
      <Routes>
    <Route path="/" element={<Juegos />}>
         
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
