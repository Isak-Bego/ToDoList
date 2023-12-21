import {retrieveDailyTasks, retrieveWeeklyTasks } from './helperFunctions.js';
import { ProjectManager } from './projectManager.js';

let currentProject = "All"; 
let pm = new ProjectManager(); 
pm.initialize(); 



// let dueDateToday = retrieveDailyTasks(pm.projects);
// let dueDateWeek = retrieveWeeklyTasks(pm.projects);

// console.log(dueDateToday); 
// console.log(dueDateWeek); 
// console.log(pm.projects); 
// currentProject = pm.projects[2]; 
// currentProject.createForm(); 



 
