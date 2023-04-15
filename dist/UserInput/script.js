const signinUrl = 'https://private-47ed5-interviewapitest.apiary-mock.com/signin'

const $form = document.querySelector('form')
const $fullname = document.querySelector('input[data-input="fullname"]')
const $email = document.querySelector('input[data-input="email"]')
const $username = document.querySelector('input[data-input="username"]')
const $password = document.querySelector('input[data-input="password"]')
const $submit = document.querySelector('input[data-input="submit"]')
const $passwordError = document.querySelector('#password-validation')
const $postResult = document.querySelector('#post-result')

const hasError = {}

const rules = {
  email: /[\w_+.]+@[\w_]+\.\w{2,}(?:\.\w{2})?$/,
  fullname: /(?:[a-z])+\s(?:[a-z]+\s{0,1})*(?:[a-z])$/i,
  username: /[a-z]{8,16}/,
  password: [
    {
      regex: /^.{8,15}$/,
      message: 'Need to contain between 8 and 16 characters'
    },
    {
      regex: /[a-z]/,
      message: 'Need to contain at least a letter',
    },
    {
      regex: /[A-Z]/,
      message: 'Need to contain at least an uppercase letter'
    },
    {
      regex: /\d/,
      message: 'Need to contain at least a number'
    },
    {
      regex: /[^\sa-zA-Z\d]/,
      message: 'Need to contain at least a special character'
    }
  ]
}

function buttonState(input, foundError) {
	$submit.setAttribute('disabled', true)
	hasError[input] = foundError
	const amountOfErrors = Object.keys(hasError).filter(key => hasError[key] ? key : '')
	
	if(amountOfErrors.length > 0) return;
	if(!$fullname.value || !$email.value || !$username.value || !$password.value) return;

	$submit.removeAttribute('disabled')
}

function clearclasses(component) {
  component.removeAttribute('class')
}

function passwordValidate(input, rules) {
  const value = input.value
  const testMessage = rules.reduce((res, rule) => {
  	if(!res && !rule.regex.test(value))
  		return rule.message
  	return res
  }, '')
  clearclasses(input)
  $passwordError.innerText = testMessage
	console.log(value)
	if(!value) return;
  !testMessage ? input.classList.add('success') : input.classList.add('error')
  buttonState(input.dataset.input, !!testMessage)
}

function simpleValidade(input, rule) {
  const test = rule.test(input.value)
  clearclasses(input)
	if(!input.value) return;
  test ? input.classList.add('success') : input.classList.add('error')
  buttonState(input.dataset.input, !test)
}

function showMessage(res) {
  setTimeout(() => $postResult.innerText = '', 3000)
  if(res.error) {
    $postResult.innerText = res.error.msg
    clearclasses($postResult)
    $postResult.classList.add('error')
  }
}

function startLoading() {
  $submit.value = 'submitting'
}

function stopLoading() {
  setTimeout(() => $submit.value = 'submit', 1000)
}

function post(url, data, cb) {
  const payload = {
    method: 'post',
    body: data
  }
  
  startLoading()

  fetch(url, payload)
    .then(dt => dt.json())
    .then(dt => {
      cb(dt)
      stopLoading()
      showMessage(dt)
    })
}

const submitForm = ev => {
  ev.preventDefault()
  
  post(signinUrl, {
    username: $username.value,
    password: $password.value
  }, function(res) {
    console.log(res)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  $email.addEventListener('input', ev => simpleValidade(ev.target, rules.email))
  $fullname.addEventListener('input', ev => simpleValidade(ev.target, rules.fullname))
  $username.addEventListener('input', ev => simpleValidade(ev.target, rules.username))
  $password.addEventListener('input', ev => passwordValidate(ev.target, rules.password))
  $form.addEventListener('submit', submitForm)
})