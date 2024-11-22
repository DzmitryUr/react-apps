import { BrowserRouter, Routes, Route } from 'react-router';

import './App.css';
import { CryptoPrices } from './components/CryptoPrices';
import { Crypto } from './components/Crypto';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CryptoPrices />} />
        <Route path='crypto/:id' element={<Crypto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
