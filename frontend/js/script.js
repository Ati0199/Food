"use strict"

window.addEventListener("DOMContentLoaded", () =>{
    const tabHeaderParent = document.querySelector(".tabheader__items")
    const tabHeader = tabHeaderParent.querySelectorAll(".tabheader__item");
    const tabs = document.querySelectorAll(".tabcontent");
    
// tabs start ----------------------
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
        tabHeader[i].classList.add("tabheader__item_active");
        tabs[i].classList.add("anim");

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
    });
        // tabs end ---------------------
    
        // clock  start ----------------------
    function clock(endTime){
       
        const total = Date.parse(endTime) - Date.parse(new Date());

        let daysTime,hoursTime,minutesTime,secondsTime;

        if(total<=0){
            daysTime = 0;
            hoursTime = 0;
            minutesTime = 0;
            secondsTime = 0;
        }else{
            daysTime = Math.floor(total / (1000 * 60 * 60 *24));
            hoursTime = Math.floor((total / (1000 * 60 *60)) % 24); 
            minutesTime = Math.floor((total / (1000 * 60)) %60);
            secondsTime = Math.floor((total / 1000) % 60);
        }
        return{
            total,
            daysTime,
            hoursTime,
            minutesTime,
            secondsTime
        }
    };

    function setZero(n){
        return n>=0 && n<10 ? `0${n}` : n;
    }

    function showClock(selector, endTime){
        const timer = document.querySelector(selector);
        const days = document.querySelector("#days");
        const hours = document.querySelector("#hours");
        const minutes = document.querySelector("#minutes");
        const seconds = document.querySelector("#seconds");

        const timeInterval = setInterval(updateClock, 950)

        updateClock()

        function updateClock(){
            
            const {total,daysTime,hoursTime,minutesTime,secondsTime} = clock(endTime);
    
            days.textContent  = setZero(daysTime);
            hours.textContent = setZero(hoursTime);
            minutes.textContent = setZero(minutesTime);
            seconds.textContent = setZero(secondsTime);

            if(total <= 0){
                clearInterval(timeInterval);
            }
        }

    }
    showClock(".timer","2025-09-10");

    // clock end --------------------------
    
    // Modal window start -----------------------

    const trigerBtns = document.querySelectorAll("[data-modal-open]");
    const trigerModalOpen = document.querySelector(".modal");
    const trigerModalClose = document.querySelector("[data-modal-close]");
    const trigerModalContent = document.querySelector(".modal__content");

    const  timeOut = setTimeout(showModal, 5000);


    function closeModal(){
        trigerModalOpen.classList.add("hide");
        trigerModalOpen.classList.remove("show");
        clearTimeout(timeOut);
    }
    function showModal(){
        trigerModalOpen.classList.remove("hide");
        trigerModalOpen.classList.add("show");
        clearTimeout(timeOut);

    }

    trigerBtns.forEach(item =>{
        item.addEventListener("click", () =>{

            if(trigerModalOpen.classList.contains("hide")){
                showModal();
                document.body.style.overflowY = "hidden";  
            }
        })
    })
    
    
    trigerModalClose.addEventListener("click", () =>{
        if(trigerModalOpen.matches(".show")){
            closeModal();
            document.body.style.overflowY = "auto";      
        }

    })
    
    document.addEventListener("keydown",(e) =>{
        if(e.key === "Escape" && trigerModalOpen.matches(".show")){
            closeModal();
            document.body.style.overflowY = "auto"; 
            
        }
    })

    trigerModalOpen.addEventListener("click", (e) =>{
       if(e.target && e.target === trigerModalOpen ){
        closeModal();
        document.body.style.overflowY = "auto";  
        
       }
    })
    

    function scrollOpenModal(){
       
        
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight-1){
            showModal();
            document.body.style.overflowY = "hidden";  
            window.removeEventListener("scroll", scrollOpenModal)
        }
    }

    window.addEventListener("scroll",scrollOpenModal);

    // Modal window end -----------------------

class MenuCard{
    constructor(img, imgAlter, title, descr, price, parentSelector){
        this.img = img;
        this.imgAlter = imgAlter;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.usdRate = 41,24;
        this.parentSelector = document.querySelector(parentSelector);  
        this.changeToUHA();
    }

    changeToUHA(){
        this.price = this.price * this.usdRate;
    }

    redner(){
        const {img,imgAlter, title, descr, price, parentSelector} = this;
        const elem = document.createElement("div");
        elem.innerHTML = `
            <div class="menu__item">
                    <img src="${img}" alt="${imgAlter}">
                    <h3 class="menu__item-subtitle">${title}</h3>
                    <div class="menu__item-descr">${descr}></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${price.toFixed(2)}</span> грн/день</div>
                    </div>
            </div>
        `;
        parentSelector.append(elem)
    }
};

    new MenuCard (
        "img/tabs/vegy.jpg",
        "vegy",
        `Меню "Фитнес"`,
        `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
        5.55,
        ".menu__field .container"
    ).redner();

      new MenuCard (
        "img/tabs/elite.jpg",
        "elite",
        `Меню “Премиум”`,
        `Меню "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
        13.34,
        ".menu__field .container"
    ).redner();

     new MenuCard (
        "img/tabs/post.jpg",
        "post",
        `Меню Меню "Постное"`,
        `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
        10.43,
        ".menu__field .container"
    ).redner();


})