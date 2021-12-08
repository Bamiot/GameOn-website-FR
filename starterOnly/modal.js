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
// validate form
function validForm(event) {
  const firstError = validFirst()
  const lastError = validLast()
  const emailError = validEmail()
  const birthdateError = validBirthDate()
  const quantityError = validQuantity()
  const locationError = validLocation()
  const cguError = validCGU()
  console.log({
    firstError,
    lastError,
    emailError,
    birthdateError,
    quantityError,
    locationError,
    cguError
  })
  if (
    firstError ||
    lastError ||
    emailError ||
    birthdateError ||
    quantityError ||
    locationError ||
    cguError
  ) {
    event.preventDefault()
  }
}

// validation functions
function validFirst() {
  if (firstNameInput.value === '' || firstNameInput.value.length < 2) {
    firstNameInput.style.border = '2px solid red'
    return true
  } else {
    firstNameInput.style.border = '2px solid green'
    return false
  }
}
function validLast() {
  if (lastNameInput.value === '' || lastNameInput.value.length < 2) {
    lastNameInput.style.border = '2px solid red'
    return true
  } else {
    lastNameInput.style.border = '2px solid green'
    return false
  }
}
function validEmail() {
  if (emailInput.value === '' || !emailInput.value.match(mailRegex)) {
    emailInput.style.border = '2px solid red'
    return true
  } else {
    emailInput.style.border = '2px solid green'
    return false
  }
}
function validBirthDate() {
  if (birthDateInput.value === '') {
    birthDateInput.style.border = '2px solid red'
    return true
  } else {
    console.log(birthDateInput.value)
    birthDateInput.style.border = '2px solid green'
    return false
  }
}
function validQuantity() {
  if (
    quantityInput.value !== '' &&
    (quantityInput.value < 1 || quantityInput.value > 99)
  ) {
    quantityInput.style.border = '2px solid red'
    return true
  } else {
    quantityInput.style.border = '2px solid green'
    return false
  }
}
function validLocation() {
  let flag = false
  for (const location of locations) if (location.checked) flag = true
  if (quantityInput.value !== '' && !flag) {
    formData[5].style.border = '2px solid red'
    return true
  } else {
    formData[5].style.border = '2px solid transparent'
    return false
  }
}
function validCGU() {
  const checkboxVisibleElement = formData[6].childNodes[3].childNodes[1]
  if (!checkbox1.checked) {
    checkboxVisibleElement.style.border = '2px solid red'
    return true
  } else {
    checkboxVisibleElement.style.border = '0px solid transparent'
    return false
  }
}
