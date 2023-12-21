import {retrieveDailyTasks, retrieveWeeklyTasks } from './helperFunctions.js';
import { ProjectManager } from './projectManager.js';
import { DOMgenerator } from './DOMgenerator.js';
import './style.css'; 

let currentProject = "All"; 
let pm = new ProjectManager(); 
let dg = new DOMgenerator(); 
pm.initialize(); 
dg.renderDocument(pm.projects); 





// let dueDateToday = retrieveDailyTasks(pm.projects);
// let dueDateWeek = retrieveWeeklyTasks(pm.projects);

// console.log(dueDateToday); 
// console.log(dueDateWeek); 
// console.log(pm.projects); 
// currentProject = pm.projects[2]; 
// currentProject.createForm(); 



 
