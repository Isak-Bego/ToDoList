import { retrieveFromLS, retrieveOFromLS, saveToLS } from './helperFunctions';
import {Project} from './project.js';
import {dg} from './index.js'; 


export function ProjectManager(){
    this.projects = []; 

    this.addProject = (title) => {
        if(this.exists(title).length == 0 && title != ""){
            let project = new Project(title);
            project.order = this.projects[this.projects.length-1].order + 1; 
            this.projects.push(project); 
            dg.renderProject(title); 
            saveToLS(project.title, [project.order, project.toDoList]); 
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
            let t = new Project("Today"); 
            t.order = 0; 
            this.projects.push(t);
            t = new Project("Weekly"); 
            t.order = 1; 
            this.projects.push(t);  
            saveToLS(this.projects[0].title, [this.projects[0].order, this.projects[0].toDoList]);
            saveToLS(this.projects[1].title, [this.projects[1].order, this.projects[1].toDoList]);
        }else{
            Object.keys(localStorage).forEach(key => {
                console.log("key", key); 
                project = new Project(key); 
                project.toDoList = retrieveFromLS(key); 
                project.order = retrieveOFromLS(key); 
                this.projects.push(project); 

                //sort the projects
                this.projects.sort( (a, b) => {
                    if(a.order > b.order) return 1; 
                    if(a.order < b.order) return -1; 
                    return 0; 
                }); 
            })
        }
    }
    
}