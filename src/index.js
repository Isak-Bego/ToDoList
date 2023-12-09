import todo from './todo.js';
import { strigifyDate, createDOM, parseDate, removeDOM } from './helperFunctions.js';
import {Project} from './project.js';

let currentProject; 



let todayProject = new Project("Today"); 
let weeklyProject = new Project("Weekly")
let gymProjects = new Project("Gym"); 
currentProject = weeklyProject; 
currentProject.createForm(); 



 
