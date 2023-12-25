export default (project, title, description, dueDate, priority, id = 0) => {
  let done = false;

  let toDo = {
    projectName: project,
    id: id,
    title: title,
    description: description,
    dueDate: dueDate,
    priority: priority,
    done: done,
  };

  return toDo;
};
