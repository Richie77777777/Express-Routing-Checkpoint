const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files (CSS) from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Custom middleware to check working hours
function workingHoursMiddleware(req, res, next) {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next();
    } else {
        res.send('The application is only available during working hours (Monday to Friday, from 9 to 17).');
    }
}

app.use(workingHoursMiddleware);

// Routes
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Home</title>
            <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
            <nav>
                <a href="/">Home</a>
                <a href="/services">Our Services</a>
                <a href="/contact">Contact Us</a>
            </nav>
            <h1>Home Page</h1>
            <p>Welcome to our home page!</p>
        </body>
        </html>
    `);
});

app.get('/services', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Our Services</title>
            <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
            <nav>
                <a href="/">Home</a>
                <a href="/services">Our Services</a>
                <a href="/contact">Contact Us</a>
            </nav>
            <h1>Our Services</h1>
            <p>Here are the services we offer.</p>
        </body>
        </html>
    `);
});

app.get('/contact', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contact Us</title>
            <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
            <nav>
                <a href="/">Home</a>
                <a href="/services">Our Services</a>
                <a href="/contact">Contact Us</a>
            </nav>
            <h1>Contact Us</h1>
            <p>Get in touch with us through the following means.</p>
        </body>
        </html>
    `);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
