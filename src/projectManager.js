import { retrieveFromLS, saveToLS } from './helperFunctions';
import {Project} from './project.js';


export function ProjectManager(){
    this.projects = []; 

    this.addProject = (title) => {
        if(this.exists(title).length == 0){
            let project = new Project(title); 
            this.projects.push(project); 
            saveToLS(project.title, project.toDoList); 
        }else{
            console.log("This project already exists!"); 
        }
    }

    this.deleteProject = (title) => {
        localStorage.removeItem(title); 
        this.initialize();  
    }

    //check if the project already exists
    this.exists = (title) => {
        return( this.projects.filter( element => {
            if(element.title == title){
                return element.title; 
            }
        })); 
    }

    this.initialize = () => {
        this.projects = []; 
        let project; 
        if(Object.keys(localStorage).length == 0){
            this.addProject("Today"); 
            this.addProject("Weekly"); 
        }else{
            Object.keys(localStorage).forEach(key => {
                project = new Project(key); 
                project.toDoList = retrieveFromLS(key); 
                this.projects.push(project); 
            })
        }
    }
    
}