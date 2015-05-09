var hook = (function () {
  var $ = document.querySelector.bind(document)
  var cipher = ['E', 'R', 'T', 'Y', 'U', 'I', 'D', 'F', 'G', 'H', 'J', 'X', 'C', 'V', 'B', 'N']
  var input

  return {
    listen: listen
  }

  function connect (ipAddress) {
    var url = 'http://' + ipAddress
    var helperUrl = url + ':1941/ahoy.json'
    var request = new XMLHttpRequest()
    request.open('POST', helperUrl, true)
    request.onload = function () {
      if (this.status === 200) {
        var ahoy = JSON.parse(this.response)
        var appPort = ahoy.port || '1941'
        var appUrl = url + ':' + appPort + '/' + ahoy.location
        window.location = appUrl
      }
    }
    request.timeout = 1500
    request.ontimeout = function () {
      setInput()
    }
    request.send()
  }

  function decode (passcode) {
    var index = 0
    var ipAddress = ''
    var prefix = '10'
    if (passcode.length % 2) {
      var char0 = passcode.charAt(0)
      if (cipher.indexOf(char0) > -1) {
        prefix = '172.' + (cipher.indexOf(char0) + 16).toString()
        passcode = passcode.substr(1)
      } else {
        setInput()
      }
    } else if (passcode.length === 4) {
      prefix = '192.168'
    }
    passcode = passcode.split('')
    while (index < passcode.length) {
      var firstCharacter = passcode[index]
      var secondCharacter = passcode[index + 1]
      if (cipher.indexOf(firstCharacter) > -1 && cipher.indexOf(secondCharacter) > -1) {
        var firstValue = cipher.indexOf(firstCharacter.toString(16))
        var secondValue = cipher.indexOf(secondCharacter.toString(16))
        ipAddress += '.' + parseInt(firstValue + secondValue, 10).toString()
      } else {
        setInput()
        return false
      }
      index = index + 2
    }
    ipAddress = prefix + ipAddress
    connect(ipAddress)
  }

  function listen (formId, inputId) {
    var inputSelector = inputId || formId + ' input'
    input = $(inputSelector)
    $(formId).addEventListener('submit', function (e) {
      e.preventDefault()
      validate()
    }, false)
  }

  function setInput () {
    input.value = ''
  }

  function validate () {
    if (input.value.length < 4 || input.value.length > 6) {
      setInput()
    } else {
      decode(input.value.toUpperCase())
    }
  }
})()
