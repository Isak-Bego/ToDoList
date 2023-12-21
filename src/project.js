import {createDOM, removeDOM, parseDate, retrieveFromLS, saveToLS} from './helperFunctions.js'; 
import todo from './todo.js'; 

export function Project(title){
    this.title = title;
    this.toDoList = []; 

    this.addToDo = (toDo) => {
        this.toDoList = retrieveFromLS(title);
        if(this.toDoList.length != 0) {
            toDo.id = this.toDoList[this.toDoList.length-1].id + 1;
        }  
        else toDo.id = 1;  
        this.toDoList.push(toDo); 
        saveToLS(title, this.toDoList); 
    }

    this.deleteToDo = (id) => {
        let index;
        this.toDoList = retrieveFromLS(title); 
        console.log("Fuck this shit", this.toDoList);
        let toDos = this.toDoList.filter(element => {
            if(element.id == id){
                return element;
            }
        })
        if(toDos.length != 0){
            index = this.toDoList.indexOf(toDos[0]);    
            this.toDoList.splice(index, 1); 
            saveToLS(title, this.toDoList);
        }else ("Element with the specified id does not exist!"); 
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