const express = require('express');
const path = require('path');
const app = express();// instance de l'application express

// Set Pug as the template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Custom middleware to check working hours
const checkWorkingHours = (req, res, next) => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday,1 = Monday, ..., 6 = Saturday
    const hour = now.getHours();

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 23) {
        next(); // Within working hours
    } else {
        res.send("Sorry, the website is only available during working hours (Monday to Friday, 9 to 17).");
    }
};

app.use(checkWorkingHours);// c'est midelwaire global
app.use(express.static(path.join(__dirname, 'public')));//pour utilser le fichier css




// Home Page
app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

// Our Services Page
app.get('/services', (req, res) => {
    res.render('service', { title: 'Our Services' });
});

// Contact Us Page
app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});