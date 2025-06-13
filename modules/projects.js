const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

function initialize() {
  return new Promise((resolve, reject) => {
    try {
      projects = [];
      projectData.forEach(project => {
        const sector = sectorData.find(sector => sector.id === project.sector_id);
        if (sector) {
          projects.push({
            ...project,
            sector: sector.sector_name
          });
        }
      });
      resolve();
    } catch (error) {
      reject("Error initializing projects: " + error.message);
    }
  });
}

function getAllProjects() {
  return new Promise((resolve, reject) => {
    if (projects.length > 0) {
      resolve(projects);
    } else {
      reject("No projects available");
    }
  });
}

function getProjectById(projectId) {
  return new Promise((resolve, reject) => {
    const project = projects.find(p => p.id === parseInt(projectId));
    if (project) {
      resolve(project);
    } else {
      reject("Unable to find requested project");
    }
  });
}

function getProjectsBySector(sector) {
  return new Promise((resolve, reject) => {
    const filteredProjects = projects.filter(p =>
      p.sector.toLowerCase().includes(sector.toLowerCase())
    );
    if (filteredProjects.length > 0) {
      resolve(filteredProjects);
    } else {
      reject("Unable to find requested projects");
    }
  });
}

module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };