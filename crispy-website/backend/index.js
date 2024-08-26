const express = require('express');
const cors = require('cors');
const path = require('path');
const { title } = require('process');
const { list } = require('postcss');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Enable CORS for all routes
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Sample data to serve
const data = [
    {
        id: 1,
        title: 'Web Development',
        description: 'We transform your needs into tailored digital solutions. Through in-depth analysis, we convert business ideas into effective platforms for communication, sales, and connection. We create authentic bonds between your brand and people.',
        link: '#',
        content: "Digital worlds, which unite brands and people We shape a digital space starting from an objective analysis of specific needs. We transform business ideas into communication, sales and contact platforms, creating deep connections between brands and people. Our transversal skills, combined with constant technological training and the plurality of languages ​​we speak, allow us to make digital reality crisp, developing unique browsing experiences.",
        image: 'web-development-svg-color-2.svg',
        bgImage: 'web-paralax.jpg',
        textParalax: 'Siamo Agile perché puntiamo al miglioramento continuo, collaborando con i brand in modo trasparente e chiaro.  Lavoriamo per interazioni incrementali perché pensiamo che avere l’approvazione per piccoli step sia non solo gratificante per noi e per il cliente, ma che questo ci permetta di ridurre il rischio di errore, apportando valore al progetto.',
        feature1: {
            title: 'Frontend',
            list: ['HTML5, CSS3, JS', 'Angular(2.0 and above) and AngularJS(1.0)', 'ReactJS','VueJS','Wordpress','Magento']
        },
        feature2: {
            title: 'Backend',
            list: ['NodeJS', 'Python', 'Firebase', 'Java EE']
        }
    },
    {
        id: 2,
        title: 'Mobile Development',
        description: 'We navigate the mobile development ecosystem, guiding clients from the design and development of native and hybrid apps to their successful launch on the App Store (iOS) and Play Store (Android).',
        link: '#',
        content: " We guide the mobile development ecosystem by following customers from the design and development phase of native and hybrid apps up to their publication on the App Store(iOS) and Play Store(Android).The downloaded application thus becomes a real added value for the user, a functional, fast, dynamic, smart digital tool at the service of people.",
        image: 'mobile-app-svg-color-1.svg',
        bgImage: 'mob-paralax.jpg',
        textParalax:'Siamo Agile perché puntiamo al miglioramento continuo, collaborando con il cliente in modo trasparente e chiaro.  Lavoriamo per interazioni incrementali perché pensiamo che avere l’approvazione per piccoli step non sia  s olo gratificante per noi e per il cliente, ma che questo ci permetta di ridurre il rischio di errore, apportando valore al progetto',
        feature1: {
        title: 'NATIVE',
        list: ['Android', 'iOS'],
                    },
        feature2: {
            title: 'HYBRID',
            list: ['React Native', 'Flutter', 'Ionic', 'Xamarin']
        }
    },
{
    id: 3,
        title: 'UX/UI Design',
        content: "e develop customized user experiences (UX) and interfaces (UI), aimed at satisfying people's needs, leading them through strategic optimization and maximization of performance to the results set by the brand. Digital tailors who design, convert and retain customers - people - thanks to disruptive and effective services that offer interactive experiences that improve daily life, increasing engagement and time spent.",
        description: 'We craft personalized user interface experiences that cater to user needs, guiding them through strategic optimization and performance maximization to achieve the brand’s desired outcomes.',
        link: '#', 
        image: 'ux-mobile-svg-2.svg',
        bgImage: 'ux-paralax.jpg',
        textParalax:'Tecnologie e metodologie si fondono in un approccio Design Thinking.',
        feature1: {
            title: 'Design Thinking',
            list: ['Figma', 'Adobe XD'],
        },
        feature2: {
        title: 'UX/UI Design',
        list: ['Adobe Photoshop',' Adobe Illustrator',' Adobe InDesign',' Adobe After Effects',' Adobe Premiere',' Adobe Audition',' Adobe Spark'],
            }
  
    },
];

// API endpoint to get all services
app.get('/api/services', (req, res) => {
    const servicesWithImageUrls = data.map(service => ({
        ...service,
        image: `${req.protocol}://${req.get('host')}/images/${service.image}`, // Use req.protocol and req.get('host')
        bgImage: `${req.protocol}://${req.get('host')}/images/${service.bgImage}`,
    }));
    res.json(servicesWithImageUrls);
});

// API endpoint to get a specific service by ID
app.get('/api/services/:id', (req, res) => {
    const serviceId = parseInt(req.params.id);
    const service = data.find(s => s.id === serviceId);

    if (service) {
        res.json({
            ...service,
            bgImage: `${req.protocol}://${req.get('host')}/images/${service.bgImage}`,
        });
    } else {
        res.status(404).json({ message: 'Service not found' });
    }
});

// Define a root route
app.get('/', (req, res) => {
    res.send('Welcome to the API!'); // Simple response for the root URL
});

// Export the app for Vercel
module.exports = app;

// Start the server (only for local testing)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

