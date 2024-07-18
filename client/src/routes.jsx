import { Routes, Route } from 'react-router-dom'
import { lazy } from 'react'

import PrivateRoute from './components/Private/Private'
import AuthSuccess from './pages/Auth/AuthSuccess'
import Error from './pages/Error/Error'
import SignIn from './pages/Auth/SignIn'
import HomeLayout from './components/Layouts/HomeLayout'
import PageLayout from './components/Layouts/PageLayout'
import Home from './pages/Home'

const Legals = lazy(() => import('./pages/Legals/Legals'));
const InternalCollection = lazy(() => import('./pages/Sales/InternalCollection'));
const Pronite = lazy(() => import('./pages/Proshow/Pronite'));
const Schedule = lazy(() => import('./pages/Schedule'));
const Event = lazy(() => import('./pages/Events/Event'));
const Profile = lazy(() => import('./pages/User/Profile'));
const Cart = lazy(() => import('./pages/Cart/CartPage'));
const Events = lazy(() => import('./pages/Events'));

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
                <Route path='/internal-collection' element={<InternalCollection />} />


                <Route path='/cart' element={<PrivateRoute><Cart /></PrivateRoute>} />
                <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
            </Route>

            <Route path="/signin" element={<SignIn />} />
            <Route path="/auth/success" element={<AuthSuccess />} />
        </Routes>
    )
}

export default routes;