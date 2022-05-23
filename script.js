// Переменные
let arrowTop = document.getElementById("arrowTop");
let = navMenu = document.querySelector(".navigation-menu");
let = header = document.querySelector(".header");
let prevScroll = window.pageYOffset;
let elastic = document.querySelector('.search');
let iconPassword = document.querySelector(".toggle");
let input = document.querySelector("input");
let tabIcon = document.querySelectorAll(".tab-header p");
let tabs = document.querySelectorAll(".tab");
let cookieBox = document.querySelector(".cookie");
let cookieContent = document.querySelector(".cookie-content");
let buttonAlert = document.querySelector(".buttons button");
let animItems = document.querySelectorAll('.anim-on');
let accordionItems = document.querySelectorAll('.accordion__item');
let pos_header = header.offsetTop;
let numbers = document.querySelectorAll(".number");
let interval = 4000;
// Страница загружена
document.addEventListener("DOMContentLoaded", ()=>{
    // Закрыть меню при нажатии на любое место в экране
    window.addEventListener("click", e =>{
        const target = e.target;
        if(!target.closest(".navigation-menu") && !target.closest(".burger")) {
            navMenu.classList.remove("active")
        }
    })

    // Кнопка вверх
    arrowTop.onclick = function() {
        window.scrollTo(pageXOffset, 0);
    };
    
    window.addEventListener('scroll', function() {
        arrowTop.hidden = (pageYOffset < document.documentElement.clientHeight);
    });

    // Убрать header при прокрутке вниз и возвращение при прокрутке вверх
    window.onscroll = function() {
        let ScrollPoc = window.pageYOffset;
        if(prevScroll > ScrollPoc && !body.classList.contains("active")){
            header.style.top = "0";
        }else if(prevScroll < ScrollPoc && !body.classList.contains("active")) {
            header.style.top = "-100px";
        }
        prevScroll = ScrollPoc
    }

    // Поиск
    // Input = ".search"  search-object = ".name"  search-object = data-name = ""
    elastic.addEventListener('input', (ev) => {
        const value = ev.target.value.trim()
        const elasticItems = document.querySelectorAll('.card')
        const searchRegExp = new RegExp(value, 'gi')
        if (value === '') {
            elasticItems.forEach((el) => {
                el.classList.remove('hide')
            })
            return
        }
        elasticItems.forEach((el) => {
            const innerCard = el.querySelector('.name')
            const elementText = innerCard.dataset.name
            const isContainsSearchRequest = searchRegExp.test(elementText)
            if (!isContainsSearchRequest) {
                el.classList.add('hide');
            } else {
                el.classList.remove('hide');

            }
        })
    })

    // Скрыть + показать пароль
    iconPassword.addEventListener("click", () =>{
        if(input.type == "password"){
            input.type = "text";
            iconPassword.classList.replace("bi-eye-slash-fill", "bi-eye-fill");
        }else{
            input.type = "password";
            iconPassword.classList.replace("bi-eye-fill", "bi-eye-slash-fill");
        }
    })

    // Табы
    tabIcon.forEach((el, index)=>{
        el.addEventListener("click", ()=>{
          tabIcon.forEach(el =>{
            el.classList.remove("active")
          })
          tabs.forEach(tab =>{
            tab.classList.remove("active")
          })
          tabIcon[index].classList.add("active");
          tabs[index].classList.add("active");
        })
    })

    // Cookie file
    buttonAlert.onclick = ()=>{
        document.cookie = "User=Index; max-age=6000";
        if(document.cookie) {
          cookieBox.classList.add("hide")
          cookieContent.classList.add("hide")
        }else {
          alert("Please again")
        }
        
      
      }
      let check = document.cookie.indexOf("User=Index")
      if(check != -1){
        cookieBox.classList.add("hide")
        cookieContent.classList.add("hide")
      }else{
        cookieBox.classList.remove("hide")
        cookieContent.classList.remove("hide")
      }

    //   Анимация появления текста при заходе на сайт
    if (animItems.length > 0) {
        window.addEventListener('scroll', animOnScroll);
        function animOnScroll() {
            for (let index = 0; index < animItems.length; index++) {
                const animItem = animItems[index];
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 2;
                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }
                if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                    animItem.classList.add('_active');
                }
                else {
                    if (!animItem.classList.contains('_anim-no')) {
                        animItem.classList.remove('_active');
                    }
                }
            }
        }
        function offset(el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
        }
        setTimeout(() => {
            animOnScroll();
        }, 300);
    }

    // Slider изображений  function = 1) next()  2) prev()
    var images = [
        'https://i.pinimg.com/736x/c5/6b/2f/c56b2f4c9309457ee52b4278b0792bda--dandelion-wine-my-childhood.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYH6GgkTikeGzzAblabdxfOkmAl0srtktYbQ&usqp=CAU'
    ];
    var num = 0;
    function next() {
        var slider =
    document.getElementById('slider');
    num++;
    if(num >= images.length) {
        num = 0;
    }
    slider.src = images[num];
    }
    function prev() {
        var slider =
    document.getElementById('slider');
    num--;
    if(num < 0) {
        num = images.length-1;
    }
    slider.src = images[num];
    }

    // Accordion
    accordionItems.forEach((item) =>{
        const accordionHeader = item.querySelector('.accordion__header')
        accordionHeader.addEventListener('click', () =>{
            const openItem = document.querySelector('.accordion-open')
            toggleItem(item)
            if(openItem && openItem!== item){
                toggleItem(openItem)
            }
        })
    })
    const toggleItem = (item) =>{
        const accordionContent = item.querySelector('.accordion__content')
        if(item.classList.contains('accordion-open')){
            accordionContent.removeAttribute('style')
            item.classList.remove('accordion-open')
        }else{
            accordionContent.style.height = accordionContent.scrollHeight + 'px'
            item.classList.add('accordion-open')
        }
    }

    // Accordion jQuery 
    $(document).ready(function() {
        $(".accordion__header").click(function(event) {
            if($(".accordion").hasClass("one")) {
                $(".accordion__header").not($(this)).removeClass("active");
                $(".accordion__content").not($(this).next()).slideUp(300);
            }
            $(this).toggleClass("active").next().slideToggle(300);
        });
    });

    // sticky header
    window.onscroll = function() {
        let pos_in_window = document.documentElement.scrollTop;
        if(pos_in_window >= pos_header) {
            header.classList.add("sticky")
        }
        else {
            header.classList.remove("sticky")
        }
    }
    
    // Перечисления чисел
    numbers.forEach((num) => {
        let startValue = 0;
        let endValue = parseInt(num.getAttribute("data-val"));
        let duration = Math.floor(interval / endValue);
        let counter = setInterval(function () {
          startValue += 1;
          num.textContent = startValue;
          if (startValue == endValue) {
            clearInterval(counter);
          }
        }, duration);
      });
})
