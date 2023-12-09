
export default (title, description, dueDate, priority) => {
    
    let done = false; 

    let toDo = {
        title: title, 
        description: description, 
        dueDate: dueDate, 
        priority: priority,
        done : done
    };

    return toDo; 
}