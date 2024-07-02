import {runDetailsUserInterface, runNavUserInterface, runDropdownUserInterface, getAndDisplayDataByCategory} from './userInterface.mjs'

/* Menu Item APIs */
let mmorpg      = document.getElementById("mmorpg")
let shooter     = document.getElementById("shooter")
let sailing     = document.getElementById("sailing") 
let permadeath  = document.getElementById("permadeath")
let superhero   = document.getElementById("superhero")
let pixel       = document.getElementById("pixel")

let menu_buttons = [mmorpg,shooter,sailing,permadeath,superhero,pixel]


runNavUserInterface();
runDropdownUserInterface(); 

// getting data & displaying it
menu_buttons.forEach(menu_button => {
    menu_button.addEventListener('click', ()=>{
        let category = menu_button.attributes.id.value;
        getAndDisplayDataByCategory(category);
    })
});

