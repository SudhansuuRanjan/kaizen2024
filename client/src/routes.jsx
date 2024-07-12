import { Routes, Route } from 'react-router-dom'
import { lazy } from 'react'
import Home from './pages/Home'
import Schedule from './pages/Schedule'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
const Legals = lazy(() => import('./pages/Legals/Legals'));
import HomeLayout from './components/Layouts/HomeLayout'
import PageLayout from './components/Layouts/PageLayout'


const routes = () => {
    return (
        <Routes>
            <Route path='/' element={<HomeLayout />} >
                <Route path="/" element={<Home />} />
            </Route>

            <Route path='/' element={<PageLayout />} >
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/legals/:pageName" element={<Legals />} />
            </Route>
            
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    )
}

export default routes;