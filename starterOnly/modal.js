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

//regEx
let mailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line

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
}

function checkElementError(element, condition) {
  element.setAttribute('data-error-visible', condition)
  console.log(element)
  return condition
}

// conditions
const isEmpty = element => element.value === ''
const textCondidtion = element => isEmpty(element) || element.value.length < 2
const mailCondidtion = element =>
  textCondidtion(element) || !mailRegex.test(element.value)
const quantityCondidtion = element =>
  !isEmpty(element) && (element.value < 1 || element.value > 99)

// element validation
const checkFirst = () => checkElementError(formData[0], textCondidtion(firstNameInput))
const checkLast = () => checkElementError(formData[1], textCondidtion(lastNameInput))
const checkEmail = () => checkElementError(formData[2], mailCondidtion(emailInput))
const checkBirthDate = () => checkElementError(formData[3], isEmpty(birthDateInput))
const checkQuantity = () =>
  checkElementError(formData[4], quantityCondidtion(quantityInput))
const checkLocation = () => {
  let flag = false
  for (const location of locations) if (location.checked) flag = true
  return checkElementError(locations, !isEmpty(formData[4]) && !flag)
}
const checkCGU = () => checkElementError(formData[6], !checkbox1.checked)
// form validation event
firstNameInput.addEventListener('focusout', checkFirst)
lastNameInput.addEventListener('focusout', checkLast)
emailInput.addEventListener('focusout', checkEmail)
birthDateInput.addEventListener('focusout', checkBirthDate)
quantityInput.addEventListener('focusout', checkQuantity)
checkbox1.addEventListener('change', checkCGU)

// validate form
function validForm(event) {
  if (
    checkFirst() ||
    checkLast() ||
    checkEmail() ||
    checkBirthDate() ||
    checkQuantity() ||
    checkLocation() ||
    checkCGU()
  ) {
    event.preventDefault()
  }
}
