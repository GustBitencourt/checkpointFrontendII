/* DARK-MODE */
/* Selecionando o icone */
let icon = document.getElementById("header__nav--theme");

//local storage para guardar o tema "escolhido" e não resetar a escolha após atualizar o fechar a página
if(localStorage.getItem("theme") == null) {
    localStorage.setItem("theme", "light");
}

let localData = localStorage.getItem("theme");

if(localData == "light") {
    icon.src = "img/moon.png";
    document.body.classList.remove("dark-theme");
} else if(localData == "dark") {
    icon.src = "img/sun.png";
    document.body.classList.add("dark-theme");
}


/* Adicionando a classe do dark-theme no icone para acionar ou voltar ao normal */
icon.onclick = function (){
    document.body.classList.toggle("dark-theme");
    /* if/else para troca do icone de acordo com o tema selecionado */
    if(document.body.classList.contains("dark-theme")){
        icon.src = "img/sun.png";
        localStorage.setItem("theme", "dark"); //localStora para guardar a informaçõa
    } else {
        icon.src = "img/moon.png";
        localStorage.setItem("theme", "light"); //localStora para guardar a informaçõa
    }
}