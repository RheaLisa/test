const popupEditProfile = document.querySelector('#profile');
const editButton = document.querySelector('.profile__btn-edit');
const formElement = document.querySelector('#input-edit');
const nameInput = document.querySelector('#name');
const infoInput = document.querySelector('#info');
const imageName = document.querySelector('#place_name');
const imageLink = document.querySelector('#link');
const profileName = document.querySelector('.profile__info');
const profileInfo = document.querySelector('.profile__text');
const closeEdit = popupEditProfile.querySelector('.popup__close');
const initialCards = [
  {
    name: 'Обское море',
    link: 'https://images.unsplash.com/photo-1595933868307-5a7083dfb921?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
  },
  {
    name: 'Горный Алтай',
    link: 'https://images.unsplash.com/photo-1577033226943-58e28a0d65d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Эльбрус',
    link: 'https://images.unsplash.com/photo-1626518139514-65676cf25bac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    name: 'Мыс Острый',
    link: 'https://images.unsplash.com/photo-1636363880339-dc1c020d3e8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjJ8fCVEMCVCRiVEMSU4MCVEMCVCOCVEMSU4MCVEMCVCRSVEMCVCNCVEMCVCMCUyMCVEMSU4MCVEMCVCRSVEMSU4MSVEMSU4MSVEMCVCOCVEMCVCOHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Карелия',
    link: 'https://images.unsplash.com/photo-1630763741321-16e7bff61e2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Красная Поляна',
    link: 'https://images.unsplash.com/photo-1603787292746-92adce40cbef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
  }
];
const cardContainer = document.querySelector('.elements');
const popupLargerImage = document.querySelector('#larger_image');
const closeLargerImage = popupLargerImage.querySelector('.popup__close');
const popupAddImage = document.querySelector('#add_image');
const addButton = document.querySelector('.profile__btn-add');
const closeAddImage = popupAddImage.querySelector('.popup__close');
const addForm = popupAddImage.querySelector('#add_place');
const template = document.querySelector('.template');
const elements = initialCards.reverse().map(createCard);
const popups = document.querySelectorAll('.popup');

function openPopup (popup) {
  popup.classList.add('popup_opened');
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  const errorMessages = popup.querySelectorAll('.popup__input-error');
  errorMessages.forEach((errorElement) => {
    errorElement.classList.remove('popup__inpu-terror_visible');
  });
  const errorBorder = popup.querySelectorAll('.popup__input');
  errorBorder.forEach((border) => {
    border.classList.remove('popup__input_type_error');
  });
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileInfo.textContent = infoInput.value;
    closePopup(popupEditProfile);
}
function createCard(item) {
  const element = template.content.firstElementChild.cloneNode(true);
  const largerImage = element.querySelector('.element__image');
  largerImage.src = item.link;
  element.querySelector('.element__title').textContent = item.name;
  largerImage.setAttribute('alt', item.name);
  largerImage.addEventListener('click', function () {
    popupLargerImage.querySelector('.popup__item-text').textContent = item.name;
    popupLargerImage.querySelector('.popup__item-image').src = item.link;
    popupLargerImage.querySelector('.popup__item-image').setAttribute('alt', item.name);
    openPopup(popupLargerImage);
  });
  const deleteItem = element.querySelector('.element__trash');
  deleteItem.addEventListener('click', deleteImage);

  const like = element.querySelector('.element__heart');
  like.addEventListener('click', likeToggle);
  return element;
}

function renderCard(element) {
  cardContainer.prepend(element);
}
function deleteImage(event) {
  const item = event.currentTarget.closest('.element');
  item.remove();
} 
function likeToggle(event) {
  event.currentTarget.classList.toggle('element__heart_activ');
}
function addImage(event) {
  event.preventDefault();
  const addImage = {link: event.currentTarget.querySelector('#link').value, 
      name: event.currentTarget.querySelector('#place_name').value};
  createCard(addImage);
  renderCard(createCard(addImage));
  addForm.reset();
  closePopup(popupAddImage);
}
closeEdit.addEventListener('click', function() {
  closePopup(popupEditProfile)
});
formElement.addEventListener('submit', formSubmitHandler);
elements.forEach(renderCard);
editButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  infoInput.value = profileInfo.textContent;
  openPopup(popupEditProfile);
});
closeLargerImage.addEventListener('click', function() {
  closePopup(popupLargerImage);
});

addButton.addEventListener('click', function() {
  imageName.value = "";
  imageLink.value = "";
  openPopup(popupAddImage);
});

closeAddImage.addEventListener('click', function() {
  closePopup(popupAddImage);
});


addForm.addEventListener('submit', addImage);

popups.forEach((popup) => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  });
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
}); 
