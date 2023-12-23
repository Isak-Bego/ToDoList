import Logo from './assets/todolist_logo.svg'; 
import Bin from './assets/trashCan.png'
import {add, getYear} from 'date-fns'; 
import { createDOM, removeAllChildNodes } from './helperFunctions';
import {pm, dg, currentProject, setCurrentProject} from './index.js'; 

export function DOMgenerator(){

    this.renderHeader = () => {
        let element = document.createElement("header"); 
        let image = document.createElement("img"); 
        image.src = Logo; 
        this.appendKid("body", element);
        this.appendKid("header", image); 
    }

    this.renderMiddleSection = (projects) => {
        let element = this.createDiv("middleSection"); 
        this.appendKid("body", element); 
        this.renderMiddleSectionOffset();
        this.renderProjectSection(projects);
        this.renderTaskSection(); 
    }

    this.renderMiddleSectionOffset = () => {
        let element = this.createDiv("middleSectionOffset"); 
        this.appendKid(".middleSection", element); 
    }

    this.renderProjectSection = (projects) => {
        let element = this.createDiv("projectSection"); 
        this.appendKid(".middleSectionOffset", element); 
        this.renderProject("+ Add Project"); 
        let addProject = document.querySelector(".projectSectionElement"); 
        addProject.classList.add("addProject"); 
        addProject.addEventListener("click", (event) => {
            document.querySelector(".projectForm").classList.toggle("visible"); 
            event.stopImmediatePropagation(); 
        });
        this.renderProject("All", projects);  
        if (currentProject == "All") document.querySelectorAll(".projectSectionElement")[1].classList.toggle("active"); 
        for(let i = 0; i < projects.length; i++){
            this.renderProject(projects[i].title, projects); 
        }
        this.renderAddProjectForm(); 
    }

    this.renderTaskSection = () => {
        let element = this.createDiv("taskSection"); 
        this.appendKid(".middleSectionOffset", element); 
        pm.projects.forEach(project => {
            for(let i = 0; i < project.toDoList.length; i++){
                this.renderTask(project.toDoList[i]);
            }
        });
    }

    this.reRenderTaskSection = (currentProject,projects) => {
        removeAllChildNodes(document.querySelector(".taskSection"));
        if(currentProject != "All"){
            this.renderAddTask(projects);
        }
        switch(currentProject){
            case "All":{
                projects.forEach(project => {
                    for(let i = 0; i < project.toDoList.length; i++){
                        console.log(project.toDoList[i]); 
                    }
                });  
                break; 
            }

            case "Today":{
                console.log("");
                break; 
            }

            case "Weekly":{
                console.log("");
                break;
            }

            default: {
                console.log("");
            }
        } 

    }

    this.renderTask = (toDo) => {
        console.log(toDo);
    }

    this.renderAddTask = () => {
        let addTsk = this.createDiv("addTask"); 
        addTsk.innerText = "+ Add Task"; 
        addTsk.addEventListener("click", (event) => {
            pm.projects.filter(project => {
                return project.title == currentProject; 
            })[0].createForm(); 
            event.stopPropagation(); 
        });
        this.appendKid(".taskSection", addTsk);
    }

    this.renderFooter = () => {
        let element = document.createElement("footer"); 
        let year = getYear(new Date()); 
        element.innerText = `© ${year} Isak Bego. All rights reserved.`
        this.appendKid("body", element);
    }

    this.renderDocument = (projects) => {
        this.renderHeader(); 
        this.renderMiddleSection(projects);
        this.renderFooter(); 
    }

    this.appendKid = (parent, kid) => {
        document.querySelector(parent).appendChild(kid); 
    }

    this.createDiv = (className) => {
        let div = document.createElement("div"); 
        div.className = className; 
        return div; 
    }

    this.renderProject = (title, projects = null) => {
        let element = this.createDiv("projectSectionElement"); 
        element.innerText = title; 
        if(title != "All" && title != "+ Add Project" && title != "Today" && title != "Weekly"){
            let bin = document.createElement("img"); 
            bin.src = Bin;
            element.appendChild(bin); 
            bin.addEventListener("click", (event) => {
                pm.deleteProject(title); 
                removeAllChildNodes(document.querySelector(".projectSection")); 
                this.renderProjectSection(pm.projects); 
                event.stopPropagation(); 
            })
        }

        element.addEventListener("click", (event) => {
            if(element != document.querySelector(".addProject")){
                element.classList.add('active'); 
                setCurrentProject(title); 
                //set Everything else to the default color
                let projectTiles = document.querySelectorAll(".projectSectionElement"); 
                for(let i = 1; i < projectTiles.length ; i++){
                    if(projectTiles[i].innerText != title){
                        projectTiles[i].classList.remove('active'); 
                    }
                }
                console.log(currentProject);    
                this.reRenderTaskSection(currentProject, projects);
            }
            event.stopPropagation();
        })
    
        this.appendKid(".projectSection", element); 
        
    }

    this.renderAddProjectForm = () => {
        let element = this.createDiv("projectForm"); 
        this.appendKid(".addProject", element);
        let inp = document.createElement("input"); 
        inp.classList.add("newProjectName"); 
        inp.setAttribute("type", "text"); 
        this.appendKid(".projectForm", inp); 
        let sub = document.createElement("button"); 
        sub.innerText = "ADD"; 
        sub.classList.add("addProjectButton"); 
        this.appendKid(".projectForm", sub); 

        inp.addEventListener("click", (event) => {
            event.stopPropagation();
        })

        sub.addEventListener("click", (event) => {
            let title = document.querySelector(".newProjectName").value; 
            document.querySelector(".newProjectName").value = ""; 
            pm.addProject(title); 
            console.log("added"); 
            document.querySelector(".projectForm").classList.toggle("visible");
            event.stopPropagation(); 
        })
    }

    this.renderTaskForm = () => {
        const categories = ["Title", "Description", "DueDate", "Priority"]; 
        let form = this.createDiv("taskForm"); 
        this.appendKid(".addTask", form); 
        for(let i = 0; i <= 4; i++){  
            this.appendKid(".taskForm", this.createDiv("wrapper")); 
        }

        let wrappers = document.querySelectorAll(".wrapper"); 

        createDOM("p", [["class", "category"]], wrappers[0], "Title"); 
        createDOM("input", [["id", "title"], ["type", "text"]], wrappers[0]);
        createDOM("p", [["class", "category"]], wrappers[1], "Description"); 
        createDOM("input", [["id", "desc"], ["type", "text"]], wrappers[1]);
        createDOM("p", [["class", "category"]], wrappers[2], "Due Date"); 
        createDOM("input", [["id", "datepicker"], ["type", "date"]], wrappers[2]); 
        createDOM("p", [["class", "category"]], wrappers[3], "Priority"); 
        // createDOM("div", [["class", "priorityHolder"]], wrappers[3]); 
        wrappers[3].appendChild(this.createDiv("priorityHolder"));
        createDOM("div", [["class", "priorityElement"]], document.querySelector(".priorityHolder"), "Low"); 
        createDOM("div", [["class", "priorityElement"]], document.querySelector(".priorityHolder"), "Medium"); 
        createDOM("div", [["class", "priorityElement"]], document.querySelector(".priorityHolder"), "High"); 
        createDOM("button", [["id", "submit"]], wrappers[4], "Add");

        let pe = document.querySelectorAll(".priorityElement"); 
        for(let i = 0; i < pe.length; i++){
            pe[i].addEventListener("click", () => {
                pe[i].style.backgroundColor = "rgb(4, 130, 203)"; 
                pe[i].style.color = "rgb(255, 255, 255)";
                for(let j = 0; j < pe.length; j++){
                    if(j != i){
                        pe[j].style.backgroundColor = "rgb(255, 255, 255)"
                        pe[j].style.color = "rgb(0, 0, 0)";
                    }
                }
            })
        }
        
        form.addEventListener("click", (event)=>{
            event.stopPropagation(); 
        })
    }
}