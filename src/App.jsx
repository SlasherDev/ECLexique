import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './css/App.css';
import Home from './pages/home.jsx';

function App() {
 return (
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
 )
}

export default App
