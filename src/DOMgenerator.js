import Logo from './assets/todolist_logo.svg'; 
import Bin from './assets/trashCan.png'
import {add, getYear} from 'date-fns'; 
import { removeAllChildNodes } from './helperFunctions';
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
        });
        this.renderProject("All");  
        if (currentProject == "All") document.querySelectorAll(".projectSectionElement")[1].classList.toggle("active"); 
        for(let i = 0; i < projects.length; i++){
            this.renderProject(projects[i].title); 
        }
        this.renderAddProjectForm(); 
    }

    this.renderTaskSection = () => {
        let element = this.createDiv("taskSection"); 
        this.appendKid(".middleSectionOffset", element); 
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

    this.renderProject = (title) => {
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
            element.classList.add('active'); 
            setCurrentProject(title); 
            //set Everything else to the default color
            let projectTiles = document.querySelectorAll(".projectSectionElement"); 
            for(let i = 1; i < projectTiles.length ; i++){
                if(projectTiles[i].innerText != title){
                    projectTiles[i].classList.remove('active'); 
                }
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
}