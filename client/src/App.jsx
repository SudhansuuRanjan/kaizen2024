import { useEffect, Suspense } from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ParallaxProvider } from 'react-scroll-parallax'
import AOS from 'aos';
import "aos/dist/aos.css";
import Routes from './routes'
import ScrollToTop from './hooks/useScrollToTop';

const App = () => {

    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, [])

    return (
        <ParallaxProvider>
            <Router>
                <ScrollToTop />
                <ToastContainer />
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes />
                </Suspense>
            </Router>
        </ParallaxProvider>
    )
}

export default App