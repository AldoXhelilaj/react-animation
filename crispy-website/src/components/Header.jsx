import Logo from '../assets/logo-crispy.gif'
import {motion, useTransform, useScroll} from 'framer-motion'
import {  Link, NavLink } from 'react-router-dom';
import  Services  from '../pages/Services'
import  Projects  from '../pages/Projects'

const Header = () => {
    const { scrollY } = useScroll();
    const background = useTransform(
        scrollY,
        [0, 100],
        ["rgba(0, 183, 255, 0)", "rgba(0, 183, 255, 1)"]
      );
      const height = useTransform(scrollY, [0, 100], [120, 60]);
    return (
        <motion.div 
   
        className="bg-white text-secondary-gray  font-[600] shadow-custom font-poppins uppercase text-xs">
            <div className="flex justify-between items-center py-4 px-6">
                <div id="logo-container-mobile">
                    <div id="main-logo">
                        <Link to="/">
                            <img
                                src={Logo}
                                alt="Crispy Bacon - Taste the difference."
                                className="h-[140px]"
                            />
                        </Link>
                    </div>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li><NavLink   to="/" className={({ isActive }) => isActive ? "text-primary-red" : "hover:text-primary-red"}>Servizi</NavLink></li>
                    </ul>

                </nav>
            </div>
        </motion.div>
    );
};

export default Header;