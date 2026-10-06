import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/footer'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/route'
function App(){
  return(
    <>
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main className="page-content">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;
