import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from './components/Header';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <div className='min-h-screen flex flex-col'>
            <Header />
            <main className='flex-grow'>
              <Routes>
                <Route path='/' element={<Index />} />
                <Route path='/sobre-nosotros' element={<AboutUs />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <Toaster />
          </div>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
