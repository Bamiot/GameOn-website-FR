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
  const element = formData[0]
  if (firstNameInput.value === '' || firstNameInput.value.length < 2) {
    element.setAttribute('data-error-visible', true)
    return true
  } else {
    element.setAttribute('data-error-visible', false)
    return false
  }
}
function validLast() {
  const element = formData[1]
  if (lastNameInput.value === '' || lastNameInput.value.length < 2) {
    element.setAttribute('data-error-visible', true)
    return true
  } else {
    element.setAttribute('data-error-visible', false)
    return false
  }
}
function validEmail() {
  const element = formData[2]
  if (emailInput.value === '' || !emailInput.value.match(mailRegex)) {
    element.setAttribute('data-error-visible', true)
    return true
  } else {
    element.setAttribute('data-error-visible', false)
    return false
  }
}
function validBirthDate() {
  const element = formData[3]
  if (birthDateInput.value === '') {
    element.setAttribute('data-error-visible', true)
    return true
  } else {
    element.setAttribute('data-error-visible', false)
    return false
  }
}
function validQuantity() {
  const element = formData[4]
  if (
    quantityInput.value !== '' &&
    (quantityInput.value < 1 || quantityInput.value > 99)
  ) {
    element.setAttribute('data-error-visible', true)
    return true
  } else {
    element.setAttribute('data-error-visible', false)
    return false
  }
}
function validLocation() {
  const element = formData[5]
  let flag = false
  for (const location of locations) if (location.checked) flag = true
  if (quantityInput.value !== '' && !flag) {
    element.setAttribute('data-error-visible', true)
    return true
  } else {
    element.setAttribute('data-error-visible', false)
    return false
  }
}
function validCGU() {
  const element = formData[6]
  if (!checkbox1.checked) {
    element.setAttribute('data-error-visible', true)
    return true
  } else {
    element.setAttribute('data-error-visible', false)
    return false
  }
}
