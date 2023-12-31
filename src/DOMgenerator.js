import Logo from "./assets/todolist_logo.svg";
import Bin from "./assets/trashCan.png";
import Expand from "./assets/expand.png";
import { getYear } from "date-fns";
import {
  createDOM,
  removeAllChildNodes,
  retrieveDailyTasks,
  retrieveWeeklyTasks,
} from "./helperFunctions";
import { pm, currentProject, setCurrentProject } from "./index.js";

export function DOMgenerator() {
  this.renderHeader = () => {
    let element = document.createElement("header");
    let image = document.createElement("img");
    image.src = Logo;
    this.appendKid("body", element);
    this.appendKid("header", image);
  };

  this.renderMiddleSection = (projects) => {
    let element = this.createDiv("middleSection");
    this.appendKid("body", element);
    this.renderMiddleSectionOffset();
    this.renderProjectSection(projects);
    this.renderTaskSection();
  };

  this.renderMiddleSectionOffset = () => {
    let element = this.createDiv("middleSectionOffset");
    this.appendKid(".middleSection", element);
  };

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
    if (currentProject == "All")
      document
        .querySelectorAll(".projectSectionElement")[1]
        .classList.toggle("active");
    for (let i = 0; i < projects.length; i++) {
      this.renderProject(projects[i].title, projects);
    }
    this.renderAddProjectForm();
  };

  this.renderTaskSection = () => {
    let element = this.createDiv("taskSection");
    this.appendKid(".middleSectionOffset", element);
    pm.projects.forEach((project) => {
      for (let i = 0; i < project.toDoList.length; i++) {
        this.renderTask(project.toDoList[i]);
      }
    });
  };

  this.reRenderTaskSection = (currentProject) => {
    removeAllChildNodes(document.querySelector(".taskSection"));
    if (currentProject != "All") {
      this.renderAddTask(pm.projects);
    }
    switch (currentProject) {
      case "All": {
        pm.projects.forEach((project) => {
          for (let i = 0; i < project.toDoList.length; i++) {
            this.renderTask(project.toDoList[i]);
          }
        });
        break;
      }

      case "Today": {
        let dailyArray = retrieveDailyTasks(pm.projects);
        let dailyTasks = [];
        for (let i = 0; i < dailyArray.length; i++) {
          dailyTasks.push(dailyArray[i][1]);
        }
        dailyTasks.forEach((el) => {
          this.renderTask(el);
        });
        break;
      }

      case "Weekly": {
        let weeklyArray = retrieveWeeklyTasks(pm.projects);
        let weeklyTasks = [];
        for (let i = 0; i < weeklyArray.length; i++) {
          weeklyTasks.push(weeklyArray[i][1]);
        }
        weeklyTasks.forEach((el) => {
          this.renderTask(el);
        });
        break;
      }

      default: {
        let proj = pm.projects.filter((el) => {
          return el.title == currentProject;
        })[0];

        proj.toDoList.forEach((td) => {
          this.renderTask(td);
        });
      }
    }
  };

  this.renderTask = (toDo) => {
    let master = this.createDiv("masterContainer");
    let main = this.createDiv("mainTaskContainer");
    let detail = this.createDiv("taskDetailContainer");
    let priority = this.createDiv("taskPriorityContainer");
    switch (toDo.priority) {
      case "Low": {
        priority.style.backgroundColor = "rgb(57, 145, 109)";
        break;
      }

      case "Medium": {
        priority.style.backgroundColor = "rgb(209, 124, 77)";
        break;
      }

      case "High": {
        priority.style.backgroundColor = "rgb(100, 27, 48)";
        break;
      }
    }
    let title = document.createElement("p");
    title.innerText = toDo.title;

    title.addEventListener("click", (event) => {
      let cp = pm.projects.filter((el) => {
        return el.title == toDo.projectName;
      })[0];
      cp.toggleDone(currentProject, toDo);
      event.stopPropagation();
    });

    if (toDo.done) {
      title.style.textDecoration = "line-through";
      title.classList.add("doneColor");
    }
    let actions = this.createDiv("taskActions");
    let delIcon = document.createElement("img");
    delIcon.src = Bin;

    delIcon.addEventListener("click", (event) => {
      let cp = pm.projects.filter((el) => {
        return el.title == toDo.projectName;
      })[0];
      cp.deleteToDo(currentProject, toDo.id);
      event.stopPropagation();
    });

    let description = this.createDiv("taskDescriptionContainer");
    let expandIcon = document.createElement("img");
    expandIcon.src = Expand;

    expandIcon.addEventListener("click", (event) => {
      description.classList.toggle("visibleDC");
      event.stopPropagation();
    });

    description.innerText = toDo.description;
    document.querySelector(".taskSection").appendChild(master);
    master.appendChild(main);
    master.appendChild(description);
    main.appendChild(detail);
    main.appendChild(priority);
    detail.appendChild(title);
    detail.appendChild(actions);
    actions.appendChild(expandIcon);
    actions.appendChild(delIcon);
  };

  this.renderAddTask = () => {
    let addTsk = this.createDiv("addTask");
    addTsk.innerText = "+ Add Task";
    addTsk.addEventListener("click", (event) => {
      pm.projects
        .filter((project) => {
          return project.title == currentProject;
        })[0]
        .createForm();
      event.stopPropagation();
    });
    this.appendKid(".taskSection", addTsk);
  };

  this.renderFooter = () => {
    let element = document.createElement("footer");
    let year = getYear(new Date());
    element.innerText = `© ${year} Isak Bego. All rights reserved.`;
    this.appendKid("body", element);
  };

  this.renderDocument = (projects) => {
    this.renderHeader();
    this.renderMiddleSection(projects);
    this.renderFooter();
  };

  this.appendKid = (parent, kid) => {
    document.querySelector(parent).appendChild(kid);
  };

  this.createDiv = (className) => {
    let div = document.createElement("div");
    div.className = className;
    return div;
  };

  this.renderProject = (title, projects = null) => {
    let element = this.createDiv("projectSectionElement");
    element.innerText = title;
    if (
      title != "All" &&
      title != "+ Add Project" &&
      title != "Today" &&
      title != "Weekly"
    ) {
      let bin = document.createElement("img");
      bin.src = Bin;
      element.appendChild(bin);
      bin.addEventListener("click", (event) => {
        pm.deleteProject(title);
        removeAllChildNodes(document.querySelector(".projectSection"));
        this.renderProjectSection(pm.projects);
        this.reRenderTaskSection(currentProject);
        event.stopPropagation();
      });
    }

    element.addEventListener("click", (event) => {
      if (element != document.querySelector(".addProject")) {
        element.classList.add("active");
        setCurrentProject(title);
        //set Everything else to the default color
        let projectTiles = document.querySelectorAll(".projectSectionElement");
        for (let i = 1; i < projectTiles.length; i++) {
          if (projectTiles[i].innerText != title) {
            projectTiles[i].classList.remove("active");
          }
        }
        this.reRenderTaskSection(currentProject);
      }
      event.stopPropagation();
    });

    this.appendKid(".projectSection", element);
  };

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
    });

    sub.addEventListener("click", (event) => {
      let title = document.querySelector(".newProjectName").value;
      document.querySelector(".newProjectName").value = "";
      pm.addProject(title);
      document.querySelector(".projectForm").classList.toggle("visible");
      event.stopPropagation();
    });
  };

  this.renderTaskForm = () => {
    const categories = ["Title", "Description", "DueDate", "Priority"];
    let form = this.createDiv("taskForm");
    this.appendKid(".addTask", form);
    for (let i = 0; i <= 4; i++) {
      this.appendKid(".taskForm", this.createDiv("wrapper"));
    }

    let wrappers = document.querySelectorAll(".wrapper");

    createDOM("p", [["class", "category"]], wrappers[0], "Title");
    createDOM(
      "input",
      [
        ["id", "title"],
        ["type", "text"],
      ],
      wrappers[0]
    );
    createDOM("p", [["class", "category"]], wrappers[1], "Description");
    createDOM(
      "input",
      [
        ["id", "desc"],
        ["type", "text"],
      ],
      wrappers[1]
    );
    createDOM("p", [["class", "category"]], wrappers[2], "Due Date");
    createDOM(
      "input",
      [
        ["id", "datepicker"],
        ["type", "date"],
      ],
      wrappers[2]
    );
    createDOM("p", [["class", "category"]], wrappers[3], "Priority");
    // createDOM("div", [["class", "priorityHolder"]], wrappers[3]);
    wrappers[3].appendChild(this.createDiv("priorityHolder"));
    createDOM(
      "div",
      [["class", "priorityElement"]],
      document.querySelector(".priorityHolder"),
      "Low"
    );
    createDOM(
      "div",
      [["class", "priorityElement"]],
      document.querySelector(".priorityHolder"),
      "Medium"
    );
    createDOM(
      "div",
      [["class", "priorityElement"]],
      document.querySelector(".priorityHolder"),
      "High"
    );
    createDOM("button", [["id", "submit"]], wrappers[4], "Add");

    let pe = document.querySelectorAll(".priorityElement");
    for (let i = 0; i < pe.length; i++) {
      pe[i].addEventListener("click", () => {
        pe[i].style.backgroundColor = "rgb(4, 130, 203)";
        pe[i].style.color = "rgb(255, 255, 255)";
        for (let j = 0; j < pe.length; j++) {
          if (j != i) {
            pe[j].style.backgroundColor = "rgb(255, 255, 255)";
            pe[j].style.color = "rgb(0, 0, 0)";
          }
        }
      });
    }

    form.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  };
}
