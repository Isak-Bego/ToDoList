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


 
