const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
  const popup = document.querySelectorAll('.popup')
  const btnEdit = document.querySelector('.profile__btn-edit');
  const btnAdd = document.querySelector('.profile__btn-add');
  const closePopupBtns = document.querySelectorAll('.popup__close');
  const popupEditProfile = document.querySelector('.popup_button_edit');
  const popupAdd = document.querySelector('.popup_add');
  const popupGallery = document.querySelector('.popup_img');
  const formEditProfile = document.querySelector('.popup__input-form');
  const nameInput = formEditProfile.querySelector('#name');
  const jobInput = formEditProfile.querySelector('#info');
  const profile = document.querySelector('.profile');
  const nameProfile = profile.querySelector('.profile__title');
  const jobProfile = profile.querySelector('.profile__text');
  const formAdd = document.querySelector('#add_place');
  const titleInput = formAdd.querySelector('#place_name');
  const linkInput = formAdd.querySelector('#link');
  const elements = document.querySelector('.elements');
  const elementTemplate = document.querySelector('#elements').content;
  
  function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
  }
  
  function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
  }
  
  function popupClickHandler(evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
    }
  }
  function formEditProfileSubmitHandler(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(popupEditProfile);
  }
  function formAddSubmitHandler(evt) {
    evt.preventDefault();
    const el = {
      name: titleInput.value,
      link: linkInput.value
    }
    renderPrependElement(el);
    closePopup(popupAdd);
  
    evt.target.reset();
    const btnSubmit = formAdd.querySelector('.popup__submit');
    btnSubmit.classList.add('popup__submit_disabled');
    btnSubmit.disabled = true;
  }
  
  function btnEditClickHandler(evt) {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    openPopup(popupEditProfile);
  }
  function btnAddClickHandler(evt) {
    openPopup(popupAdd);
  }
  function btnCloseClickHandler(evt) {
    const popup = evt.target.closest('.popup');
    closePopup(popup);
  }
  function btnLikeClickHandler(evt) {
    evt.target.classList.toggle('element__heart_active');
  }
  function btnRemoveClickHandler(evt) {
    const element = evt.target.closest('.element');
    element.remove();
  }
  function btnOpenPopupGalleryClickHandler(evt) {
    const link = evt.target.src;
    const title = evt.target.alt;
    popupGallery.querySelector('.popup__item-image').src = link;
    popupGallery.querySelector('.popup__item-image').alt = title;
    popupGallery.querySelector('.popup__item-text').textContent = title;
    openPopup(popupGallery);
  }
  
  function closeByEscape(evt) {
    if (evt.key === 'Escape') {
      closePopup(popup);
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
    }
  }
  
  btnEdit.addEventListener('click', btnEditClickHandler);
  btnAdd.addEventListener('click', btnAddClickHandler);
  formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
  formAdd.addEventListener('submit', formAddSubmitHandler);
  popupEditProfile.addEventListener('click', popupClickHandler);
  popupAdd.addEventListener('click', popupClickHandler);
  popupGallery.addEventListener('click', popupClickHandler);
  
   closePopupBtns.forEach(btnClosePopup => {
    btnClosePopup.addEventListener('click', btnCloseClickHandler);
  });
  
  function createElement(el) {
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    const elementPhoto = element.querySelector('.element__image');
  
    elementPhoto.src = el.link;
    elementPhoto.alt = el.name;
    element.querySelector('.element__title').textContent = el.name;
    elementPhoto.addEventListener('click', btnOpenPopupGalleryClickHandler);
    element.querySelector('.element__heart').addEventListener('click', btnLikeClickHandler);
    element.querySelector('.element__trash').addEventListener('click', btnRemoveClickHandler);
  
    return element;
  }
  function renderAppendElement(el) {
    const element = createElement(el);
    elements.append(element);
  }
  function renderPrependElement(el) {
    const element = createElement(el);
    elements.prepend(element);
  }
  initialCards.forEach(el => {
    renderAppendElement(el);
  });
  window.addEventListener('load', () => {
    document.querySelectorAll('.popup').forEach((popup) => popup.classList.add('popup_transition'));
  });