if(localStorage.getItem("name")){
    a = localStorage.getItem("name")
    document.write("Hii "+a)
}
else{
let a = prompt("Enter your name")
localStorage.setItem("name",a);
}
