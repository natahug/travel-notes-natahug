let main = () => {
    document.body.style.border = "1px solid pink";
    console.log(document.body.childNodes[1].childNodes[1].childNodes[0].nodeType);
    
    let h1 = document.getElementById("the-heading");
    h1.innerHTML = "HELLO WORLD";
    h1.style.border = "50px solid magenta";
    
    let firstItem = document.querySelector(".first-item");
    firstItem.style.border= "1px solid white";
    
    let fourthNode = document.createElement("li");
    fourthNode.innerText = "Four";
    //have to add to the tree
    firstItem.parentElement.appendChild(fourthNode);
    
    let lis = document.querySelectorAll("li");
    console.log(lis);
    
};

alert("Hello");
window.addEventListener("load", main);



let countNode = (aNode) => {
   
    //base case
    if (aNode.childNodes.length === 0){
        return 1;
    } else{
        let sum = 1;
        for(let i =0; i<aNode.childNodes.length;i++){
            sum += countNode(aNode.childNodes[i]);
        }
        return sum;
    }
 
}

console.log(countNode(document.body));



