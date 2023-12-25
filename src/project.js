import {
  parseDate,
  saveToLS,
} from "./helperFunctions.js";
import todo from "./todo.js";
import { currentProject, dg } from "./index.js";

export function Project(title) {
  this.title = title;
  this.order;
  this.toDoList = [];

  this.addToDo = (toDo) => {
    if (this.toDoList.length != 0) {
      toDo.id = this.toDoList[this.toDoList.length - 1].id + 1;
    } else toDo.id = 1;
    this.toDoList.push(toDo);
    saveToLS(title, [this.order, this.toDoList]);
  };

  this.deleteToDo = (currentProject, id) => {
    let index;
    let toDos = this.toDoList.filter((element) => {
      if (element.id == id) {
        return element;
      }
    });
    if (toDos.length != 0) {
      index = this.toDoList.indexOf(toDos[0]);
      this.toDoList.splice(index, 1);
      saveToLS(title, [this.order, this.toDoList]);
    } else "Element with the specified id does not exist!";
    dg.reRenderTaskSection(currentProject);
  };

  this.awaitSubmission = () => {
    let submitButton = document.querySelector("#submit");
    submitButton.addEventListener("click", () => {
      const title = document.querySelector("#title").value;
      const description = document.querySelector("#desc").value;
      const dateInfo = parseDate(document.querySelector("#datepicker").value);
      const date = new Date(dateInfo[0], dateInfo[1], dateInfo[2]);
      let priority;

      let priorities = document.querySelectorAll(".priorityElement");
      for (let i = 0; i < priorities.length; i++) {
        if (priorities[i].style.backgroundColor == "rgb(4, 130, 203)") {
          priority = priorities[i].innerText;
        }
      }

      this.addToDo(todo(this.title, title, description, date, priority));
      this.removeForm();
      dg.reRenderTaskSection(currentProject);
    });
  };

  this.createForm = () => {
    if (document.querySelector(".taskForm")) {
      document
        .querySelector(".addTask")
        .removeChild(document.querySelector(".taskForm"));
    } else {
      dg.renderTaskForm();
    }
    this.awaitSubmission();
  };

  this.removeForm = () => {
    document
      .querySelector(".addTask")
      .removeChild(document.querySelector(".taskForm"));
  };

  this.toggleDone = (currentProject, toDo) => {
    let i = this.toDoList.indexOf(toDo);
    this.toDoList[i].done = !this.toDoList[i].done;
    saveToLS(title, [this.order, this.toDoList]);
    dg.reRenderTaskSection(currentProject);
  };
}
