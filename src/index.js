import {removeAllChildNodes, retrieveDailyTasks, retrieveWeeklyTasks } from './helperFunctions.js';
import { ProjectManager } from './projectManager.js';
import { DOMgenerator } from './DOMgenerator.js';
import './style.css'; 

export let currentProject = "All"; 
export let dg = new DOMgenerator();
export let pm = new ProjectManager();  
pm.initialize(); 
dg.renderDocument(pm.projects); 


export let setCurrentProject = (newVar) => {
    currentProject = newVar; 
}

// let dueDateToday = retrieveDailyTasks(pm.projects);
// let dueDateWeek = retrieveWeeklyTasks(pm.projects);

// console.log(dueDateToday); 
// console.log(dueDateWeek); 
// console.log(pm.projects); 
// currentProject = pm.projects[2]; 
// currentProject.createForm(); 



 
