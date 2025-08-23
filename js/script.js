"use strict"

window.addEventListener("DOMContentLoaded", () =>{
    const tabHeaderParent = document.querySelector(".tabheader__items")
    const tabHeader = tabHeaderParent.querySelectorAll(".tabheader__item");
    const tabs = document.querySelectorAll(".tabcontent");
    

    function hideTabConentsAndACtiveClass () {
        for(let i = 0; i<tabHeader.length; i++){
            tabs[i].style.display = "none";
            tabHeader[i].classList.remove("tabheader__item_active");
        }
    }
    hideTabConentsAndACtiveClass();
    showTabConentsAndACtiveClass();

    function showTabConentsAndACtiveClass (i = 0) {
        tabs[i].style.display = "block";
        tabHeader[i].classList.add("tabheader__item_active")

    }
    
    tabHeaderParent.addEventListener("click", (e) => {
        if(e.target && e.target.matches(".tabheader__item")){
            for(let i = 0; i < tabHeader.length; i++){
                if(e.target == tabHeader[i]){
                    hideTabConentsAndACtiveClass();
                    showTabConentsAndACtiveClass(i);
                    
                }
                
            }
        }
    })    
})