import { BrowserRouter as Router, Routes, Route }from 'react-router-dom';

import Header from './components/header'
import Home from './pages/home'
import Portfolio from "./pages/portfolio";
import Contact from './pages/contact'

function Main() {
    return (
        <Router>
            <Header></Header>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/portfolio' element={<Portfolio />} />
                <Route path='/contact' element={<Contact />} />
            </Routes>
        </Router>
    );
}

export default Main
