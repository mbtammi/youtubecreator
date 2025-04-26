import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import Account from './pages/Account';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import Footer from './components/Footer';
import Pricing from './pages/Pricing';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

const App = () => {
    return (
        <Router>
          <Header />
            <Routes>
                {/* Default route for the landing page */}
                <Route path='/' element={<LandingPage />} />
                
                {/* Other routes */}
                <Route path='/home' element={<HomePage />} />
                <Route path='/account' element={<Account />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/pricing' element={<Pricing />} />
                <Route path='/privacy' element={<Privacy />} />
                <Route path='/terms' element={<Terms />} />
            </Routes>
          <Footer />
        </Router>
    );
};

export default App;