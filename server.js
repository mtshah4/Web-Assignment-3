/*********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Mann Shah
*  Student ID: [Your Student ID Here]
*  Date: [Date Here]
*
*  Published URL: [Your Vercel URL will go here after deployment]
*
**********************************************************************************/

const express = require('express');
const app = express();
const path = require('path');
const data = require('./data/projectData.json'); // Updated to match your file name

const HTTP_PORT = process.env.PORT || 8080;

// Serve static files from /public
app.use(express.static('public'));

// Home Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/home.html'));
});

// About Page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/about.html'));
});

// Projects List (with optional ?sector filter)
app.get('/solutions/projects', (req, res) => {
  try {
    const sector = req.query.sector;
    if (sector) {
      const filtered = data.filter(p => p.sector.toLowerCase() === sector.toLowerCase());
      if (filtered.length === 0) throw "No projects found for sector: " + sector;
      res.json(filtered);
    } else {
      res.json(data);
    }
  } catch (err) {
    res.status(404).json({ error: err });
  }
});

// Project by ID
app.get('/solutions/projects/:id', (req, res) => {
  try {
    const project = data.find(p => p.id == req.params.id);
    if (!project) throw "Project not found";
    res.json(project);
  } catch (err) {
    res.status(404).json({ error: err });
  }
});

// Custom 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
});

// Start server
app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}`);
});