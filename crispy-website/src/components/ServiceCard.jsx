import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const services = [
  { title: 'Service 1', description: 'Description for service 1', link: '#' },
  { title: 'Service 2', description: 'Description for service 2', link: '#' },
  { title: 'Service 3', description: 'Description for service 3', link: '#' },
  { title: 'Service 4', description: 'Description for service 4', link: '#' },
  { title: 'Service 5', description: 'Description for service 5', link: '#' },
  { title: 'Service 6', description: 'Description for service 6', link: '#' },
  // Add more services as needed
];

const ServicesGrid = () => {
  const { scrollY } = useScroll(); // Get the scroll position
  const springConfig = { damping: 25, stiffness: 100 }; // Spring animation config
  const wrapperY = useSpring(scrollY, springConfig); // Spring-based scroll position

  return (
    <motion.div
      className="wrapper"
      style={{
        position: wrapperY.get() > 0 ? 'fixed' : 'relative', // Update position based on scroll position
      }}
    >
      {services.map((service, index) => (
        <ServiceCard key={index} service={service} index={index} />
      ))}
    </motion.div>
  );
};

const ServiceCard = ({ service, index }) => {
  const cardHeight = 200; // Define a height for the card
  const start = index * cardHeight; // Start position for each card
  const end = start + cardHeight; // End position for each card

  const { scrollY } = useScroll(); // Get the scroll position
  const width = useTransform(scrollY, [start, end], ['100px', '300px']); // Transform width based on scroll position
  const opacity = useTransform(scrollY, [start, end], [0, 1]); // Transform opacity based on scroll position

  return (
    <motion.div
      style={{ width }}
      className="service-card"
    >
      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
      <motion.div
        style={{ opacity }} // Bind opacity to scroll position
        transition={{ duration: 0.5 }}
        className="description"
      >
        <p className="text-gray-600 mb-4">{service.description}</p>
        <a
          href={service.link}
          className="text-blue-500 hover:text-blue-700 font-medium"
        >
          Learn More
        </a>
      </motion.div>
    </motion.div>
  );
};

export default ServicesGrid;