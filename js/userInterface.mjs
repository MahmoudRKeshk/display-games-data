/* Imports */
import { getData } from './categoryData.mjs';
import { getDetails } from './detailsData.mjs';

/* getting dom APIs */
const modal = document.getElementById('modal');
const blur_layer = document.getElementById('blur-layout');
const drop_down_icon = document.getElementById('drop-down-icon');
const drop_down_close = document.getElementById('drop-down-close');
const nav_menu = document.getElementById('nav-menu');
let menu_items = document.getElementsByClassName('nav-menu-item');
let cardContainer = document.getElementById('card-container');
let body = document.getElementById('body');

export function runNavUserInterface(){
    for(let i=0; i<menu_items.length; i++){
        menu_items[i].addEventListener('click', ()=>{
            if(menu_items[i].classList.contains('active')){
            } else {
                removeActiveClass(menu_items);
                menu_items[i].classList.add('active');
                closeDropDownMenu();
            }

        })
    }
}

export function runDropdownUserInterface(){
    drop_down_icon.addEventListener('click', ()=>{
        showDropDownMenu();
    });
    drop_down_close.addEventListener('click' , ()=>{
        closeDropDownMenu();
    })
}

export function runDetailsUserInterface(){
    console.log("interface");
    let cards = document.getElementsByClassName('card');
    for(let i=0; i<cards.length; i++){
        cards[i].addEventListener('click', ()=>{
            let id = cards[i].dataset['id'] ;
            
            getDetails(id).then((data)=>{
                let details = JSON.parse(data);
                console.log(details);
                fillModalwithDetails(details);
                showModal(modal);
                const modal_close_icon = document.getElementById('modal-close-icon');
                modal_close_icon.addEventListener('click',()=>{
                    hideModal();
                })
            })
        })
    }
    
}

export function getAndDisplayDataByCategory(categoryName){
    getData(categoryName).then((textResponse)=>{
        let data = JSON.parse(textResponse);
        displayCategoryData(data);
        runDetailsUserInterface();
    })
}



/* 
?=> utilities
*/

function removeActiveClass(list){
    for(let i=0; i< list.length; i++){
        list[i].classList.remove('active')
    }
}
function showModal(modal){
        modal.classList.remove('d-none');
        showBlurLayer();
        disableScrolling(cardContainer);
        modal.classList.add('show');
        setTimeout(()=>{
            modal.classList.remove('show');
        },400);
}
function hideModal(){
    let modal = document.getElementById('modal');
    modal.classList.add('hide');
        setTimeout(()=>{
            modal.classList.add('d-none');
            hideBlurLayer()
            modal.classList.remove('hide');
        },350)
    enableScrolling(cardContainer);
}
function hideBlurLayer(){
    blur_layer.classList.add('d-none');
}
function showBlurLayer(){
    blur_layer.classList.remove('d-none');
}
function displayCategoryData(data){
    let containerData = ``;
    
    data.forEach(element => {
        containerData += `
            <div class="card" data-id="${element.id}" >
            <div class="image-container">
                <img src="${element.thumbnail}" alt="game tumbnail">
            </div>
            <div class="info">
                <p>${element.title}</p>
                <p class="badge-main">free</p>
                <p>${element.short_description}</p>
            </div>
            <div class="tags">
                <p class="badge-main">${element.genre}</p>
                <p class="badge-main">${element.plateform}</p>
            </div>
        </div>
        `
    });
    cardContainer.innerHTML = containerData;
}

function fillModalwithDetails(details){
    let modalContent = ``;
    modalContent = `
        <h2>
            ${details.title}
        </h2>
        <div class="modal-grid-container">
            <div class="modal-close-icon" id="modal-close-icon">
                <svg xmlns="http://www.w3.org/2000/svg"><path d="m2.828 17.828 6.086-6.086L15 17.828 17.828 15l-6.086-6.086 6.086-6.086L15 0 8.914 6.086 2.828 0 0 2.828l6.085 6.086L0 15l2.828 2.828z"/></svg>
            </div>
            <div class="image-container">
                <img src="${details.thumbnail}" alt="">
            </div>
            <div class="tags-data">
                <ul>
                    <li><strong class="badge-main">category</strong> ${details.category}</li>
                    <li><strong class="badge-main">platform</strong> ${details.platform}</li>
                    <li><strong class="badge-main">status</strong>   ${details.category}</li>
                </ul>
            </div>
            <div class="description">
                <p>
                    Tarisland is a free-to-play cross-platform MMORPG developed by Level Infinite and Published by Tencent. Available on PC and mobile devices, the game allows players to easily move between both, taking the game with them when they can’t be at their desk. The game is designed to appeal to players of MMOs like World of Warcraft, offering players nine playable classes and 18 specializations. Each class features an extensive talent tree system and can be customized. Players of existing MMOs will be familiar with the standard tank, DPS, and healer lineup, necessary for the game’s classic raid and dungeon system. Explore a vast game world and solve mysteries. Pick up various trades such as gathering, mining, and crafting, and sell your items on the auction house.
                </p>
            </div>
            <button> <a href="${details.game_url}" target="_blank" >Show Game</a></button>
        </div>`
    modal.innerHTML = modalContent;
}

function disableScrolling(element) {
    body.classList.add('disable-scroll');
}
function enableScrolling(element) {
    body.classList.add('enable-scroll');
}
function closeDropDownMenu(){
    hideBlurLayer();
        nav_menu.classList.add('closed');
        nav_menu.classList.remove('opened')
        nav_menu.classList.add('hide-fly');
        setTimeout(()=>{
            nav_menu.classList.remove('hide-fly');
        }, 600)
}

function showDropDownMenu(){
    showBlurLayer();
        nav_menu.classList.remove('closed')
        nav_menu.classList.add('opened');
        nav_menu.classList.add('show-fall');
        setTimeout(()=>{
            nav_menu.classList.remove('show-fall');
        },500)
}