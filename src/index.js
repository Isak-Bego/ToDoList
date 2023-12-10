import {Project} from './project.js';
import {retrieveDailyTasks, retrieveWeeklyTasks } from './helperFunctions.js';

let currentProject; 
let projects = [new Project("Today"), new Project("Weekly"), new Project("Gym"), new Project("Test")]
let dueDateToday = retrieveDailyTasks(projects)
let dueDateWeek = retrieveWeeklyTasks(projects)


console.log(dueDateToday); 
console.log(dueDateWeek);  


currentProject = projects[0]; 
currentProject.createForm(); 



 
