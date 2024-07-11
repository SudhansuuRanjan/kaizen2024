import {Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Schedule from './pages/Schedule'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import Footer from './components/Footer/Footer'


const routes = () => {
    return (
        <Routes>
            <Route path="/" element={<>
                <Home />
                <Footer />
            </>} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    )
}

export default routes;