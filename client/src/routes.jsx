import { Routes, Route } from 'react-router-dom'
import { lazy } from 'react'

import PrivateRoute from './components/Private/Private'
import AuthSuccess from './pages/Auth/AuthSuccess'
import Error from './pages/Error/Error'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
const Legals = lazy(() => import('./pages/Legals/Legals'));

import HomeLayout from './components/Layouts/HomeLayout'
import PageLayout from './components/Layouts/PageLayout'

import Home from './pages/Home'
import Schedule from './pages/Schedule'
import Events from './pages/Events'
import Event from "./pages/Events/Event"
import Pronite from './pages/Proshow/Pronite'



const routes = () => {
    return (
        <Routes>
            <Route path='/' element={<HomeLayout />} >
                <Route path="/" element={<Home />} />
            </Route>

            <Route path='/' element={<PageLayout />} >
                <Route path='*' element={<Error />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/legals/:pageName" element={<Legals />} />

                <Route path='/events' element={<Events />} />
                <Route path="/pronite" element={<Pronite />} />
                <Route path='/events/:eventId' element={<Event />} />
            </Route>

            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/auth/success" element={<AuthSuccess />} />
        </Routes>
    )
}

export default routes;