import { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ParallaxProvider } from 'react-scroll-parallax'
import AOS from 'aos';
import "aos/dist/aos.css";
import Routes from './routes'

const App = () => {

    // load razorpay script
    useEffect(() => {
        AOS.init();
        AOS.refresh();
        // loadScript('https://checkout.razorpay.com/v1/checkout.js')
    }, [])

    return (
        <ParallaxProvider>
            <Router>
                <ToastContainer />
                <Routes/>
            </Router>
        </ParallaxProvider>
    )
}

export default App