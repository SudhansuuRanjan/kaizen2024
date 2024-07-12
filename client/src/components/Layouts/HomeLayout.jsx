import { Outlet } from "react-router-dom"
import NavBar from "../HomePage/NavBar"
import Footer from "../Footer/Footer"

const HomeLayout = () => {
    return (
        <main>
            <NavBar />
            <Outlet />
            <Footer />
        </main>
    )
}

export default HomeLayout