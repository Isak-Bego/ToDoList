import { format } from "date-fns";

export function strigifyDate(date){
    return format(date, "dd/MM/yyyy"); 
}

export function createDOM(type, attributes, parent, innerText){
    let element = document.createElement(type); 
    for(let i = 0; i < attributes.length; i++){
        element.setAttribute(attributes[i][0], attributes[i][1]); 
    }
    element.innerText = innerText; 
    parent.appendChild(element); 
}


//remove by class, id, or tag
export function removeDOM(identifier){
    switch(identifier[0]){
        case "class":{
            Array.from(document.getElementsByClassName(identifier[1])).forEach(element => {
                element.style.display = "none"; 
            });
            break;
        }

        case "id":{
            document.getElementById(identifier[1]).style.display = "none"; 
            break; 
        }

        case "tag":{
            Array.from(document.getElementsByTagName(identifier[1])).forEach(element => {
                element.style.display = "none"; 
            });
            break;
        }
    }
}

export function parseDate(date){
    let dateInfo = String(date).split("-"); 
    let m = parseInt(dateInfo[1]); 
    dateInfo[1] = String(m-1); 
    return dateInfo;
}