import {createDOM, removeDOM, parseDate, retrieveFromLS, saveToLS} from './helperFunctions.js'; 
import todo from './todo.js'; 

export function Project(title){
    this.title = title;
    this.toDoList = []; 

    this.addToDo = (toDo) => {
        this.toDoList = retrieveFromLS(title);
        this.toDoList.push(toDo); 
        saveToLS(title, this.toDoList); 
    }

    this.deleteToDo = (index) => {
        this.toDoList = retrieveFromLS(title); 
        this.toDoList.splice(index, 1); 
        saveToLS(title, this.toDoList);
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
        const id = ["title", "desc", "datepicker", "priority", "submit"]; 
        for(let i = 0; i < id.length; i++) removeDOM(["id", id[i]]); 
    }

}