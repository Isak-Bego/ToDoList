import { addISOWeekYears } from 'date-fns';
import {createDOM, removeDOM, parseDate} from './helperFunctions.js'; 
import todo from './todo.js'; 

export function Project(title){

    this.toDoList = []; 

    this.addToDo = (toDo) => {
        this.toDoList.push(toDo); 
        localStorage.setItem(title, JSON.stringify(this.toDoList))
    }

    this.awaitSubmission = () => {
        let submitButton = document.querySelector("#submit"); 
        submitButton.addEventListener("click", () => {
            const title = document.querySelector("#title").value; 
            const description = document.querySelector("#desc").value; 
            const dateInfo = parseDate(document.querySelector("#datepicker").value); 
            const date = new Date(dateInfo[0], dateInfo[1], dateInfo[2]); 
            const priority = document.querySelector("#priority").value; 

            this.addToDo(todo(title, description, date, priority));  
            console.log(this.toDoList);
            this.removeForm(); 
        }); 
    }

    this.createForm = () => {
        createDOM("input", [["id", "title"], ["type", "text"]], document.body);
        createDOM("input", [["id", "desc"], ["type", "text"]], document.body); 
        createDOM("input", [["id", "datepicker"], ["type", "date"]], document.body); 
        createDOM("input", [["id", "priority"], ["type", "text"]], document.body); 
        createDOM("button", [["id", "submit"]], document.body, "Submit");
        this.awaitSubmission(); 
    }

    this.removeForm = () => {
        removeDOM(["id", "title"]); 
        removeDOM(["id", "desc"]); 
        removeDOM(["id", "datepicker"]); 
        removeDOM(["id", "priority"]); 
        removeDOM(["id", "submit"]); 
    }

    
}