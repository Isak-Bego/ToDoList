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
        let submitButton = document.querySelector(".submit"); 
        submitButton.addEventListener("click", () => {
            const title = document.querySelector(".title").value; 
            const description = document.querySelector(".desc").value; 
            const dateInfo = parseDate(document.querySelector(".datepicker").value); 
            const date = new Date(dateInfo[0], dateInfo[1], dateInfo[2]); 
            const priority = document.querySelector(".priority").value; 

            this.addToDo(todo(title, description, date, priority));  
            console.log(this.toDoList);
            this.removeForm(); 
        }); 
    }

    this.createForm = () => {
        createDOM("input", [["class", "title"], ["type", "text"]], document.body);
        createDOM("input", [["class", "desc"], ["type", "text"]], document.body); 
        createDOM("input", [["class", "datepicker"], ["type", "date"]], document.body); 
        createDOM("input", [["class", "priority"], ["type", "text"]], document.body); 
        createDOM("button", [["class", "submit"]], document.body, "Submit");
        this.awaitSubmission(); 
    }

    this.removeForm = () => {
        removeDOM(); 
        removeDOM(); 
        removeDOM(); 
        removeDOM(); 
        removeDOM(); 
    }

    
}