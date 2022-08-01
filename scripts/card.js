const btnInfoUser = document.querySelector(".profile__btn-edit");
const formPopupUser = document.querySelector('.popup_button_edit');
const btnCloseFormUser = document.querySelector(".popup__edit-close");
const formUserInfo = document.querySelector("#input-edit");
const nameUser = document.querySelector(".popup__input_type_name");
const descriptionUser = document.querySelector(".popup__input_type_info");
const btnSaveFormUser = document.querySelector(".popup__submit");
const popupBg = document.querySelector ('.popup__bg');

//-----доступ к попап открытию картинки------

const popupOpenImg = document.querySelector('.popup_img');
const btnClosePopupOpenImg = document.querySelector(".popup__img-close");
const imgPopup = document.querySelector(".popup__item-image");
const nameImg = document.querySelector(".popup__item-text");

//-----------формы и кнопка добавления новых карточек на страницу-------
const btnAddElm = document.querySelector(".profile__btn-add");
const formAddElm = document.querySelector(".popup_add");
const btnCloseAddElm = document.querySelector(".popup__close");
const formHandlerAddElm = document.querySelector("#add_place");
const nameCard = document.querySelector(".popup__input_type_place");
const linkCard = document.querySelector(".popup__input_type_link");

//----------данные пользователя-------
const nameTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__text");
const containerCardItems = document.querySelector(".element__image");
const template = document.querySelector("#elements").content;
const container = document.querySelector('.elements');
//--------------Функции открытия/закрытия попапа-------

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
  
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
 
}
//--------слушатели для открытия форм редактирования-----

btnInfoUser.addEventListener("click", function (evt) {
  openPopup(formPopupUser);
  nameDescriptionSite() 
});

btnCloseFormUser.addEventListener("click", function (evt) {
  closePopup(formPopupUser);
});

//-------отображение имени и описания------

function nameDescriptionSite() {
  nameUser.value = nameTitle.textContent;
  descriptionUser.value = profileDescription.textContent;
}
//-----изменения данных пользователя из формы-----

function changeFormUserSubmit(evt) {
  evt.preventDefault();
  nameTitle.textContent = nameUser.value;
  profileDescription.textContent = descriptionUser.value;
  closePopup(formPopupUser);
}

formUserInfo.addEventListener("submit", changeFormUserSubmit);
//--------слушатели событий------

btnAddElm.addEventListener("click", function (evt) {
  openPopup(formAddElm);
});

btnCloseAddElm.addEventListener("click", function (evt) {
  closePopup(formAddElm);
});

const cards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];


//---------удаление, лайк, открытие картинки-------
function likeBtnHandler(evt) {
  evt.target.classList.toggle("element__heart_active");
}

function deleteBtnHandler(evt) {
  evt.target.closest(".element").remove();
}

function openBtnPopupImg(evt) {
  openPopup(popupOpenImg);
  imgPopup.src = evt.target.src;
  nameImg.innerText = evt.currentTarget.parentNode.querySelector('.element__title').textContent;
   imgPopup.alt = evt.target.alt;
}
btnClosePopupOpenImg.addEventListener("click", () => {
  closePopup(popupOpenImg);
});

//------вывод карточек на страницу------
function createCard(card) {
  const elm = template.querySelector('.element').cloneNode(true);
  const nameCard = elm.querySelector(".element__title");
  const imgCard = elm.querySelector(".element__image");
  const trash = elm.querySelector(".element__trash");
  const like = elm.querySelector(".element__heart");
  like.addEventListener("click", likeBtnHandler);
  trash.addEventListener("click", deleteBtnHandler);
  imgCard.addEventListener("click", openBtnPopupImg);
  nameCard.textContent = card.name;
  imgCard.src = card.link;
  imgCard.alt = card.name;
  return elm;
}
cards.forEach((card)=>{
  const renderCard = createCard(card)
  container.append(renderCard)
})
//------создание карточек----

function addCardHandler(evt) {
  evt.preventDefault();
  const newCard = { link: linkCard.value, name: nameCard.value, alt: nameCard.value }
  container.prepend(createCard(newCard));
  evt.target.reset();
  closePopup(formAddElm);
}
formHandlerAddElm.addEventListener("submit", addCardHandler);
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
} 

document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
  if(e.target === popupBg) {
      popupBg.classList.remove('popup_opened'); // Убираем активный класс с фона
      popup.classList.remove('popup_opened'); // И с окна
  }
});
