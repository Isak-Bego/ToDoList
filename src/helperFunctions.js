import { format, parseJSON, isToday, isThisWeek } from "date-fns";

export function strigifyDate(date) {
  return format(date, "dd/MM/yyyy");
}

export function createDOM(type, attributes, parent, innerText) {
  let element = document.createElement(type);
  for (let i = 0; i < attributes.length; i++) {
    element.setAttribute(attributes[i][0], attributes[i][1]);
  }
  element.innerText = innerText;
  parent.appendChild(element);
}

//remove by class, id, or tag
export function removeDOM(identifier) {
  switch (identifier[0]) {
    case "class": {
      Array.from(document.getElementsByClassName(identifier[1])).forEach(
        (element) => {
          element.style.display = "none";
        }
      );
      break;
    }

    case "id": {
      document.getElementById(identifier[1]).style.display = "none";
      break;
    }

    case "tag": {
      Array.from(document.getElementsByTagName(identifier[1])).forEach(
        (element) => {
          element.style.display = "none";
        }
      );
      break;
    }
  }
}

export function parseDate(date) {
  let dateInfo = String(date).split("-");
  let m = parseInt(dateInfo[1]);
  dateInfo[1] = String(m - 1);
  return dateInfo;
}

export function retrieveFromLS(key) {
  let toDoList = [];
  let td = JSON.parse(localStorage.getItem(key))[1];
  if (td.length != 0) {
    toDoList = td;
    toDoList.forEach((element) => {
      element.dueDate = parseJSON(element.dueDate);
    });

    switch (key) {
      case "Today": {
        toDoList = removeNotToday(toDoList);
        break;
      }

      case "Weekly": {
        toDoList = removeNotThisWeek(toDoList);
        break;
      }
    }
  }
  return toDoList;
}

export function retrieveOFromLS(title) {
  return JSON.parse(localStorage.getItem(title))[0];
}

export function saveToLS(key, object) {
  localStorage.setItem(key, JSON.stringify(object));
}

export function retrieveDailyTasks(projects) {
  let dueDateToday = [];
  for (let i = 0; i < projects.length; i++) {
    projects[i].toDoList.forEach((element) => {
      if (isToday(element.dueDate)) {
        dueDateToday.push([projects[i].title, element]);
      }
    });
  }
  return dueDateToday;
}

export function retrieveWeeklyTasks(projects) {
  let dueDateWeek = [];
  for (let i = 0; i < projects.length; i++) {
    projects[i].toDoList.forEach((element) => {
      if (isThisWeek(element.dueDate)) {
        dueDateWeek.push([projects[i].title, element]);
      }
    });
  }
  return dueDateWeek;
}

export function removeNotToday(toDoList) {
  for (let i = 0; i < toDoList.length; i++) {
    if (!isToday(toDoList[i].dueDate)) {
      toDoList.splice(i, 1);
    }
  }
  return toDoList;
}

export function removeNotThisWeek(toDoList) {
  for (let i = 0; i < toDoList.length; i++) {
    if (!isThisWeek(toDoList[i].dueDate)) {
      toDoList.splice(i, 1);
    }
  }
  return toDoList;
}

export function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
