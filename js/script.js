//Dropdown Menu
let dropDownBtn = document.querySelector('#dropBtn');
let menuContent = document.querySelector('.dropdown-content');

dropDownBtn.addEventListener('click', () => {
  if (menuContent.style.display === '') {
    menuContent.style.display = 'block';
  } else {
    menuContent.style.display = '';
  }
})






