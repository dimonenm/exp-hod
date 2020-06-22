const button1 = document.querySelector('.container-main-side-button-B1');
button1.addEventListener('click', colorshadowclick); 
function colorshadowclick() {
    button1.classList.add('container-main-side-button-B1new');
    button1.removeEventListener('click', colorshadowclick);
    button1.addEventListener('click', colorShadowRemove); 
}
function colorShadowRemove() {
    button1.classList.remove('container-main-side-button-B1new');
    button1.removeEventListener('click', colorShadowRemove);
    button1.addEventListener('click', colorshadowclick);
} 

