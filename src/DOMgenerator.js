import Logo from './assets/todolist_logo.svg'; 
import {getYear} from 'date-fns'; 

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
        this.renderProject("All");  
        document.querySelectorAll(".projectSectionElement")[1].classList.add("active"); 
        for(let i = 0; i < projects.length; i++){
            this.renderProject(projects[i].title); 
        }
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
        this.appendKid(".projectSection", element); 
    }
}