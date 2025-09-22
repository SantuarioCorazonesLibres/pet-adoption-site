import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import { Toaster } from './components/ui/sonner';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className='min-h-screen flex flex-col'>
        <Header />
        <main className='flex-grow'>
          <Routes>
            <Route path='/' element={<Index />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  )
}

export default App
