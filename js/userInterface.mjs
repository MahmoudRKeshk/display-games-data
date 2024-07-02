/* getting dom APIs */
const modal = document.getElementById('modal');
const modal_close_icon = document.getElementById('modal-close-icon');
const blur_layer = document.getElementById('blur-layout');
const drop_down_icon = document.getElementById('drop-down-icon');
const drop_down_close = document.getElementById('drop-down-close');
const nav_menu = document.getElementById('nav-menu') 
let menu_items = document.getElementsByClassName('nav-menu-item');
let cards = document.getElementsByClassName('card');


export function runNavUserInterface(){
    for(let i=0; i<menu_items.length; i++){
        menu_items[i].addEventListener('click', ()=>{
            if(menu_items[i].classList.contains('active')){
            } else {
                removeActiveClass(menu_items);
                menu_items[i].classList.add('active')
            }
        })
    }
}

export function runDropdownUserInterface(){
    drop_down_icon.addEventListener('click', ()=>{
        showBlurLayer();
        nav_menu.classList.remove('closed')
        nav_menu.classList.add('opened');
        nav_menu.classList.add('show-fall');
        setTimeout(()=>{
            nav_menu.classList.remove('show-fall');
        },500)
    });

    drop_down_close.addEventListener('click' , ()=>{
        hideBlurLayer();
        nav_menu.classList.add('closed');
        nav_menu.classList.remove('opened')
        nav_menu.classList.add('hide-fly');
        setTimeout(()=>{
            nav_menu.classList.remove('hide-fly');
        }, 600)
    })
}

export function runDetailsUserInterface(){
    for(let i=0; i<cards.length; i++){
        cards[i].addEventListener('click', ()=>{
            showModal(modal);
        })
    }
    modal_close_icon.addEventListener('click', ()=>{
        hideModal(modal);
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
        modal.classList.add('show');
        setTimeout(()=>{
            modal.classList.remove('show');
        },400);
}
function hideModal(modal){
    modal.classList.add('hide');
        setTimeout(()=>{
            modal.classList.add('d-none');
            hideBlurLayer()
            modal.classList.remove('hide');
        },350)
}

function hideBlurLayer(){
    blur_layer.classList.add('d-none');
}
function showBlurLayer(){
    blur_layer.classList.remove('d-none');
}