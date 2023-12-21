
export default (title, description, dueDate, priority, id = 0) => {
    
    let done = false; 

    let toDo = {
        id: id,
        title: title, 
        description: description, 
        dueDate: dueDate, 
        priority: priority,
        done : done
    };

    return toDo; 
}