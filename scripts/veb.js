const submitButtonEl = document.querySelector('#submit');
const inputList = Array.from(document.querySelectorAll('.popup__input'));

const isInputValid = inputEl =>{
    return inputEl.checkValidity();
}
const activateError = (errorEl, message) => {

}
submitButtonEl.addEventListener('click', ()=>{
    let isFormValid = true;
    inputList.forEach(inputEl => {
        if(!isInputValid(inputEl)){
            isFormValid = false;
        }
        console.log(isFormValid);
    });
   
});
