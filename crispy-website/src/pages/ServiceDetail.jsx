import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ParallaxImage from '../components/ParalaxImage';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import useDeviceDetect  from '../util/useDeviceDetect';
import Loader from '../assets/loader.svg';

const ServiceDetail = () => {
    const { id } = useParams(); // Get the service ID from the URL
    const [service, setService] = useState(null);
    const {isMobile} = useDeviceDetect();

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await fetch(`/api/services/${id}`); // Adjust endpoint if needed
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setService(result);
            } catch (error) {
                console.error('Error fetching service:', error);
            }
        };

        fetchService();

    }, [id]);

    if (!service) return <div className='flex justify-center items-center p-20 h-[calc(100vh-228px)]'><img src={Loader} alt="loader" /></div>;
    const styleFirstLetter = (title) => {
        const words = title.split(' ');
        const firstWord = words[0];
        return words.map((word, index) => {
            if (index === 0) {
                console.log(word)
                return (
                    <span key={index} className='text-secondary-gray'>
                        {word}
                    </span>
                );
            } else {
                return (
                    <>
                        {' ' + word}
                    </>

                );
            }
        });
    };
    const frontendItems = {
        ...service?.feature1

    }
    

    const backendItems = {
        ...service?.feature2
    }
    

    // Define animation variants for list items
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    // Define animation variants for the parent UL
    const parentVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Stagger children by 0.2 seconds
            },
        },
    };
    return (
        <Layout isDetail={true}>


            <div>
                <h1 className=' text-xl md:text-[68px] font-bold uppercase text-primary-red  text-center mb-9'>
                    {styleFirstLetter(service.title)}</h1>

                <div className='flex justify-center items-center max-w-[700px] p-4 mx-auto mb-9'>

                    <p>{service.content}</p>
                </div>
                <div className='w-full mb-9' style={{
                    width: '100vw',
                    marginLeft: 'calc((-100vw + 100%) / 2)',
                    marginRight: 'calc((-100vw + 100%) / 2)'
                }}>
                    <ParallaxImage imageUrl={service?.bgImage} height={ isMobile ? 600 : 400} text={service?.textParalax} />

                </div>




                <div className='grid  md:grid-cols-3 gap-6 mt-6 mb-6'>
                    <div>
                        <h6 className='text-xl font-bold uppercase text-primary-red'>
                            Utilizziamo diverse tecnologie
                        </h6>
                    </div>
                    <div>
                        <motion.ul
                            className='list-disc pl-7'
                            initial="hidden"
                            whileInView="visible"
                            variants={parentVariants} // Set parent variants for staggering
                        >
                            <span className='text-primary-red uppercase font-bold mb-4 block'>{frontendItems?.title}</span>
                            {frontendItems?.list.map((item, index) => (
                                <>

                                <motion.li
                                    key={index}
                                    variants={itemVariants} // Use item variants for each list item
                                    style={{ marginBottom: '10px' }}
                                >
                                    {item}
                                </motion.li>
                                </>
                            ))}
                        </motion.ul>
                    </div>

                    <div>
                        <span className='text-primary-red uppercase font-bold mb-4 block'>{backendItems?.title}</span>
                        <motion.ul
                            className='list-disc pl-7'
                            initial="hidden"
                            whileInView="visible"
                            variants={parentVariants} // Set parent variants for staggering
                        >
                            {backendItems?.list.map((item, index) => (
                                <motion.li
                                    key={index}
                                    variants={itemVariants} // Use item variants for each list item
                                    style={{ marginBottom: '10px' }}
                                >
                                    {item}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>
                </div>



            </div>


        </Layout>
    );
};

export default ServiceDetail;