const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Enable CORS for all routes
app.use('/images', express.static(path.join(__dirname, 'images')));

// Sample data to serve
const data = [
    {
        id: 1, title: 'Web Development',
        description: 'We transform your needs into tailored digital solutions. Through in-depth analysis, we convert business ideas into effective platforms for communication, sales, and connection. We create authentic bonds between your brand and people.',
        link: '#',
        content: "Mondi digitali, che uniscono i brand e le persone Diamo forma a uno spazio digitale partendo da un’analisi oggettiva di bisogni specifici. Trasformiamo idee di business in piattaforme di comunicazione, vendita e contatto, creando connessioni profonde tra brand e persone. Le nostre competenze trasversali, unite alla costante formazione tecnologica e alla pluralità di linguaggi che parliamo, ci permettono di rendere croccante la realtà digital, sviluppando esperienze di navigazione uniche.",
        image: 'web-development-svg-color-2.svg',
        bgImage: 'web-paralax.jpg',
        textParalax: 'Siamo Agile perché puntiamo al miglioramento continuo, collaborando con i brand in modo trasparente e chiaro.  Lavoriamo per interazioni incrementali perché pensiamo che avere l’approvazione per piccoli step sia non solo gratificante per noi e per il cliente, ma che questo ci permetta di ridurre il rischio di errore, apportando valore al progetto.'
    },
    {
        id: 2,
        title: 'Mobile Development',
        description: 'We navigate the mobile development ecosystem, guiding clients from the design and development of native and hybrid apps to their successful launch on the App Store (iOS) and Play Store (Android).',
        link: '#',
        content: "Guidiamo l’ecosistema del mobile development seguendo i clienti dalla fase di progettazione e sviluppo di app native e ibride fino alla loro pubblicazione su App Store (iOS) e Play Store (Android). L’applicazione scaricata diventa così un reale valore aggiunto per l’utente, uno strumento digitale funzionale, veloce, dinamico, smart, a servizio delle persone.",
        image: 'mobile-app-svg-color-1.svg',
        bgImage: 'mob-paralax.jpg',
        textParalax:'Siamo Agile perché puntiamo al miglioramento continuo, collaborando con il cliente in modo trasparente e chiaro.  Lavoriamo per interazioni incrementali perché pensiamo che avere l’approvazione per piccoli step non sia solo gratificante per noi e per il cliente, ma che questo ci permetta di ridurre il rischio di errore, apportando valore al progetto'


    },
    {
        id: 3,
        title: 'UX/UI Design',
        content: "GElaboriamo esperienze utente (UX) ed interfacce (UI) personalizzate, volte a soddisfare le esigenze delle persone, conducendole tramite un’ottimizzazione strategica e massimizzazione delle prestazioni ai risultati prefissati dal brand. Sarti digitali che progettano, convertono e fidelizzano i clienti – persone – grazie a servizi dirompenti ed efficaci che regalano esperienze interattive che migliorano il vivere quotidiano, incrementando l’engagement e il tempo di permanenza.",
        description: 'We craft personalized user interface experiences that cater to user needs, guiding them through strategic optimization and performance maximization to achieve the brand’s desired outcomes.',
        link: '#', image: 'ux-mobile-svg-2.svg',
        bgImage: 'ux-paralax.jpg',
        textParalax:'Tecnologie e metodologie si fondono in un approccio Design Thinking.'

    },
];

app.get('/api/services', (req, res) => {
    const servicesWithImageUrls = data.map(service => ({
        ...service,
        image: `http://localhost:${PORT}/images/${service.image}`,
        bgImage: `http://localhost:${PORT}/images/${service.bgImage}`, // Construct the full URL for the image
        // Construct the full URL for the image
    }));
    res.json(servicesWithImageUrls);
});

// app.get('/api/services/:id', (req, res) => {
//     const servicesWithImageUrls = data.map(service => ({
//         ...service,

//         bgImage: `http://localhost:${PORT}/images/${service.bgImage}`, // Construct the full URL for the image
//          // Construct the full URL for the image
//     }));
//     res.json(servicesWithImageUrls);
// });




app.get('/api/services/:id', (req, res) => {
    const serviceId = parseInt(req.params.id);
    const servicesWithImageUrls = data.map(service => ({
        ...service,

        bgImage: `http://localhost:${PORT}/images/${service.bgImage}`, // Construct the full URL for the image
        // Construct the full URL for the image
    }));
    const service = servicesWithImageUrls.find(s => s.id === serviceId);


    if (service) {


        res.json(service);
    } else {
        res.status(404).json({ message: 'Service not found' });
    }
});

// API endpoint to get data
app.get('/api/services', (req, res) => {
    res.json(data);
});

// Define a root route
app.get('/', (req, res) => {
    res.send('Welcome to the API!'); // Simple response for the root URL
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});