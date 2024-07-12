import { Outlet } from "react-router-dom"
import NavBar from "../NavBar"
import Footer from "../Footer/Footer"

const PageLayout = () => {
    return (
        <main>
            <NavBar />
            <Outlet />
            <Footer />
        </main>
    )
}

export default PageLayout;