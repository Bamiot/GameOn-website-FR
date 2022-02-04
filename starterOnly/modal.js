document.getElementById('nav-icon').addEventListener('click', editNav)
function editNav() {
  var x = document.getElementById('myTopnav')
  if (x.className === 'topnav') {
    x.className += ' responsive'
  } else {
    x.className = 'topnav'
  }
}

// DOM Elements
const modalbg = document.querySelector('.bground')
const modalBtn = document.querySelectorAll('.modal-btn')
const formData = document.querySelectorAll('.formData')
const closeBtn = document.querySelector('.bground .close')
// Form elements
const firstNameInput = document.getElementById('first')
const lastNameInput = document.getElementById('last')
const emailInput = document.getElementById('email')
const birthDateInput = document.getElementById('birthdate')
const quantityInput = document.getElementById('quantity')
const locations = document.querySelectorAll('.checkbox-input[name="location"]')
const checkbox1 = document.getElementById('checkbox1')
const checkbox2 = document.getElementById('checkbox2')
const submitBtn = document.querySelector('.btn-submit')
// wrap elements for error message
const firstNameWrap = formData[0]
const lastNameWrap = formData[1]
const emailWrap = formData[2]
const birthDateWrap = formData[3]
const quantityWrap = formData[4]
const locationWrap = formData[5]
const cguWrap = formData[6]

const errorMessages = [
  'Veuillez entrer 2 caractères ou plus pour le champ du prénom.',
  'Veuillez entrer 2 caractères ou plus pour le champ du nom.',
  'Veuillez entrer une adresse mail valide.',
  'Veuillez entrer une date valide au format jj/mm/aaaa.',
  'Veuillez entrer une valeur numérique pour le nombre de tournois.',
  'Veuillez cocher au moins une case.',
  'Veuillez accepter les conditions.'
]

// add error message
errorMessages.forEach((message, index) => {
  formData[index].setAttribute('data-error', message)
})

//regEx
const mailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line
const nameRegex = /^[a-zA-Zéèêëàâîïôûç\- ]+$/

// launch modal event
modalBtn.forEach(btn => btn.addEventListener('click', launchModal))
closeBtn.addEventListener('click', closeModal)
submitBtn.addEventListener('click', validForm)

// launch modal form
function launchModal() {
  modalbg.style.display = 'block'
}
// close modal form
function closeModal() {
  modalbg.style.display = 'none'

  formData.forEach(e => (e.style.opacity = 1))
  document.querySelector('.text-label').style.opacity = 1
  document.querySelector('.btn-submit').value = "C'est parti"
  submitBtn.addEventListener('click', validForm)

  document.querySelector('.succes').remove()
}

function checkElementError(element, condition) {
  element.setAttribute('data-error-visible', condition)
  return condition
}
// conditions
const isEmpty = element => element.value === ''
const textCondidtion = element =>
  isEmpty(element) || element.value.length < 2 || !nameRegex.test(element.value)
const mailCondidtion = element => !mailRegex.test(element.value)
const quantityCondidtion = element =>
  isEmpty(element) || parseInt(element.value) < 0 || parseInt(element.value) > 99
const isValidDate = date => !isNaN(new Date(date).getTime())

// element validation
const checkFirst = () => checkElementError(firstNameWrap, textCondidtion(firstNameInput))
const checkLast = () => checkElementError(lastNameWrap, textCondidtion(lastNameInput))
const checkEmail = () => checkElementError(emailWrap, mailCondidtion(emailInput))
const checkBirthDate = () =>
  checkElementError(birthDateWrap, !isValidDate(birthDateInput.value))
const checkQuantity = () =>
  checkElementError(quantityWrap, quantityCondidtion(quantityInput))
const checkLocation = () => {
  let flag = false
  for (const location of locations) if (location.checked) flag = true
  return checkElementError(locationWrap, parseInt(quantityInput.value) > 0 && !flag)
}
const checkCGU = () => checkElementError(cguWrap, !checkbox1.checked)

// form validation event
firstNameInput.addEventListener('focusout', checkFirst)
lastNameInput.addEventListener('focusout', checkLast)
emailInput.addEventListener('focusout', checkEmail)
birthDateInput.addEventListener('focusout', checkBirthDate)
quantityInput.addEventListener('focusout', checkQuantity)
checkbox1.addEventListener('change', checkCGU)

// validate form
function validForm(event) {
  event.preventDefault()
  if (
    checkFirst() ||
    checkLast() ||
    checkEmail() ||
    checkBirthDate() ||
    checkQuantity() ||
    checkLocation() ||
    checkCGU()
  ) {
  } else {
    formData.forEach(e => (e.style.opacity = 0))
    document.querySelectorAll('.formData input').forEach(e => (e.value = ''))
    formData.forEach(e => checkElementError(e, false))
    document.querySelector('.text-label').style.opacity = 0
    document.querySelector('.btn-submit').value = 'Fermer'
    submitBtn.addEventListener('click', closeModal)
    const succesDiv = document.createElement('div')
    succesDiv.classList.add('succes')
    succesDiv.innerHTML = 'Merci pour<br/>votre inscription'
    document
      .querySelector('.bground > .content > .modal-body > form')
      .insertBefore(succesDiv, document.querySelector('.btn-submit'))
  }
}

// champs non vide pour nle nombre de tournois
// clear modal
