import './App.css';
import { Crypto } from './pages/Crypto';
import { CryptoPrices } from './components/CryptoPrices';
import { BrowserRouter, Routes, Route } from 'react-router';
import ErrorPage from './pages/ErrorPage';
import { fetchCryptoPrices } from './routes/root';
import { fetchCrypto } from './routes/crypto';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<CryptoPrices />} />
        <Route path='crypto/:id' element={<Crypto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
