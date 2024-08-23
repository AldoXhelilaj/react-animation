import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import  useDeviceDetect  from '../util/useDeviceDetect';

const Layout = ({ children, isDetail }) => {
    const animation = useAnimation();
    const [isAnimationFinished, setIsAnimationFinished] = useState(false);
    const { scrollY } = useScroll();
    const { isMobile } = useDeviceDetect();




    return (


        <motion.div
            animate={animation}
            className={`flex-grow p-4 max-w-[1260px] pt-[80px] mx-auto ${isDetail || isMobile ? '' : 'pb-[1200px]'}`}>
            {children} {/* This is where the page content will be rendered */}
        </motion.div>

    );
};

export default Layout;