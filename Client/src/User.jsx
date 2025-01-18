import Navbar from "./components/User/Navbar";
import Hero from "./components/User/Hero";
import Footer from "./components/User/Footer";
import Particle from "./components/User/Particle";
import About from "./components/User/About";
import Projects from "./components/User/Projects";
import Contact from "./components/User/Contact";
import Contributions from "./components/User/Contributions";

const User = () => {
    return (
        <div className="relative">
            {/* Particle background container */}
            <div className="fixed inset-0 z-0">
                <Particle />
            </div>

            {/* Main content container */}
            <div className="relative z-10">
                <Navbar />
                <Hero />
                <About />
                <Projects />
                <Contributions />
                <Contact />
                <Footer />
            </div>
        </div>
    )
}

export default User
