import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider } from '@/lib/AuthContext';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Servis from './pages/Servis';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import EetProdukt from './pages/EetProdukt';
import Pokladny from './pages/Pokladny';
import Kontakt from './pages/Kontakt';
import Poptavka from './pages/Poptavka';

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/katalog" element={<Catalog />} />
            <Route path="/produkt/:id" element={<ProductDetail />} />
            <Route path="/eet/:slug" element={<EetProdukt />} />
            <Route path="/servis" element={<Servis />} />
            <Route path="/pokladny" element={<Pokladny />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/poptavka" element={<Poptavka />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}
export default App;
