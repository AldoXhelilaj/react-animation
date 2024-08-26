import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import WebDevLogo from '../assets/web-development-svgrepo-com.svg';
import Layout from '../components/Layout';
import useDeviceDetect from '../util/useDeviceDetect';

const ServicesGrid = () => {
    const { scrollY } = useScroll(); // Get the scroll position
    const [services, setServices] = useState([]);
    const { isMobile } = useDeviceDetect();
    const wrapperPosition = useTransform(scrollY, [0, 1, 100], ['relative', 'relative', isMobile ? 'relative' : 'fixed']);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/services');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setServices(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();



    }, []);

    return (

        <Layout>
            <motion.div
                className="wrapper flex flex-col align-middle justify-center"
                style={{
                    position: wrapperPosition,
                    transition: 'position 0.5s ease, opacity 0.5s ease', // Smooth transition
                }}
            >
                <h1 className='text-xl md:text-[68px] font-bold uppercase text-primary-red mb-4 text-center p-2'>
                    <span className='text-secondary-gray'>I nostri </span>servizi
                </h1>
                <div className='flex justify-center align-middle gap-4 flex-wrap'>
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} index={index} />
                    ))}
                </div>

            </motion.div>

        </Layout>

    );
};

const ServiceCard = ({ service, index }) => {
    const { isMobile } = useDeviceDetect(); // Get device type
    const cardHeight = 200; // Define a height for the card
    const start = index * cardHeight; // Start position for each card
    const end = start + cardHeight; // End position for each card

    const { scrollY } = useScroll(); // Get the scroll position
    const isActive = useTransform(scrollY, [start, end], [1, 0]);
    const opacity = useTransform(scrollY, [start, end], [0, 1]);

    const [width, setWidth] = useState('300px');
    const [opacityValue, setOpacityValue] = useState(1);
    const [opacityValueDiv, setOpacityValueDiv] = useState(0);

    useEffect(() => {
        const unsubscribe = scrollY.onChange((latest) => {
            if (latest >= start && latest <= end) {
                setWidth('500px');
                setOpacityValue(0);
                setOpacityValueDiv(1);
                if (latest === start) {
                    setOpacityValue(1);
                    setWidth('300px');
                    setOpacityValueDiv(0);
                }
            } else {
                setWidth('300px');
                setOpacityValue(1);
                setOpacityValueDiv(0);
            }
        });

        return unsubscribe;

        if (isMobile) {
            setOpacityValue(1);
            setOpacityValueDiv(1);
        }
    }, [scrollY, start, end]);

    // Define an array of gradient colors
    const gradients = [
        'linear-gradient(270deg, #D60C3E, #FF8C00)',
        'linear-gradient(270deg, #FF8C00, #FFD700)',
        'linear-gradient(270deg, #FFD700, #D60C3E)',
    ];

    const [gradientIndex, setGradientIndex] = useState(0);

    // Function to change the gradient index
    const changeGradient = () => {
        setGradientIndex((prevIndex) => (prevIndex + 1) % gradients.length);
    };

    // Change gradient every 2 seconds
    useEffect(() => {
        const interval = setInterval(changeGradient, 3000);
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    // Render the ServiceCard
    return (
        isMobile ? (
            <div className="service-card bg-white shadow-lg rounded-lg overflow-hidden relative">
                <h3 className="text-xl font-bold mb-2 text-white uppercase">{service.title}</h3>
                <div className="pt-6 mb-auto z-10">
                    <div className="description uppercase bold flex flex-col items-baseline !opacity-100">
                        <p className="text-white mb-4">{service.description}</p>
                        <Link to={`/services/${service.id}`} className="text-primary-red font-medium hover:text-red-700 bg-white rounded flex">
                            <motion.span
                                className='flex py-3 px-6 rounded text-white'
                                transition={{
                                    duration: 2, // Duration of the transition
                                    ease: 'easeInOut', // Easing function
                                }}
                                whileHover={{
                                    scale: 1.05, // Slightly scale up on hover
                                }}
                                animate={{
                                    background: gradients[gradientIndex], // Slightly scale up on hover
                                }}
                            >
                                Learn More
                            </motion.span>
                        </Link>
                    </div>
                </div>
                <img src={service.image} alt="image" className="h-[130px] absolute bottom-0 right-0" />
            </div>
        ) : (
            <motion.div
                initial={false}
                animate={{ width }}
                className="service-card bg-white shadow-lg rounded-lg overflow-hidden relative"
            >
                <h3 className="text-xl font-bold mb-2 text-white uppercase">{service.title}</h3>
                <div className="pt-6 mt-auto z-10">
                    <motion.div
                        initial={false}
                        animate={{ opacity: opacityValueDiv }}
                        transition={{ duration: 1 }}
                        className="description uppercase bold flex flex-col items-baseline"
                    >
                        <p className="text-white mb-4">{service.description}</p>
                        <Link to={`/services/${service.id}`} className="text-primary-red font-medium hover:text-red-700 bg-white rounded flex">
                            <motion.span
                                className='flex py-3 px-6 rounded text-white'
                                transition={{
                                    duration: 2, // Duration of the transition
                                    ease: 'easeInOut', // Easing function
                                }}
                                whileHover={{
                                    scale: 1.05, // Slightly scale up on hover
                                }}
                                animate={{
                                    background: gradients[gradientIndex], // Slightly scale up on hover
                                }}
                            >
                                Learn More
                            </motion.span>
                        </Link>
                    </motion.div>
                </div>
                <motion.img
                    initial={false}
                    animate={{
                        opacity: opacityValue,
                    }}
                    transition={{ duration: 0.5 }}
                    src={service.image}
                    alt="image"
                    className="h-[130px] absolute bottom-2"
                />
            </motion.div>
        )
    );
};

export default ServicesGrid;