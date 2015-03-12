hook = function() {
    var $ = document.querySelector.bind(document),
        cipher = ['E','R','T','Y','U','I','D','F','G','H','J','X','C','V','B','N']

    return {
        listen: listen
    }

    function connect (ipAddress) {
        var url = 'http://' + ipAddress,
            helperUrl = url + ':1941/ahoy.json',
            request = new XMLHttpRequest

        request.open('POST', helperUrl, true)
        request.onload = function() {
            if (this.status === 200) {
                var ahoy = JSON.parse(this.response),
                    appPort = ahoy.port || '1941',
                    appUrl = url + ':' + appPort + '/' + ahoy.location
                console.log(ahoy)
                alert(appUrl)
                window.location = appUrl
            } else {
                alert('HTTP Status:', this.status)
            }
        }
        request.timeout = 1500
        request.ontimeout = function() {
            setInput()
        }
        request.send()
    }

    function decode (passcode) {
        var index = 0,
            ipAddress = '',
            prefix = '10'

        if (passcode.length % 2) {
            var firstCharacter = passcode.charAt(0)
            if (cipher.indexOf(firstCharacter) > -1) { 
                prefix = '172.' + (cipher.indexOf(firstCharacter) + 16).toString()
                passcode = passcode.substr(1)
            } else {
                setInput();
            }
        } else if (passcode.length === 4) {
            prefix = '192.168'
        }
        passcode = passcode.split('')
        while (index < passcode.length) {
            var firstCharacter = passcode[index],
                secondCharacter = passcode[index + 1]
            if (cipher.indexOf(firstCharacter) > -1 && cipher.indexOf(secondCharacter) > -1) {
                var firstValue = cipher.indexOf(firstCharacter.toString(16)),
                    secondValue = cipher.indexOf(secondCharacter.toString(16))
                ipAddress += '.' + parseInt(firstValue + secondValue, 16).toString()
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
        $(formId).addEventListener('submit', function(e) {
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

}()

/*
var hook = function() {
    var $ = document.querySelector.bind(document),
        cipher = ['E','R','T','Y','U','I','D','F','G','H','J','X','C','V','B','N'],
        connect = function(ipAddress) {
            var url = 'http://' + ipAddress,
                helperUrl = url + ':1941/ahoy.json',
                request = new XMLHttpRequest
            request.open('POST', helperUrl, true)
            request.onload = function() {
                if (this.status === 200) {
                    var ahoy = JSON.parse(this.response),
                        appPort = ahoy.port || '1941',
                        appUrl = url + ':' + appPort + '/' + ahoy.location
                    console.log(ahoy)
                    alert(appUrl)
                    window.location = appUrl
                } else {
                    alert('HTTP Status:', this.status)
                }
            }
            request.timeout = 1500
            request.ontimeout = function() {
                setInput()
            }
            request.send()
        },
        decode = function(passcode) {
            var index = 0,
                ipAddress = '',
                prefix = '10'
            if (passcode.length % 2) {
                var firstCharacter = passcode.charAt(0)
                if (cipher.indexOf(firstCharacter) > -1) { 
                    prefix = '172.' + (cipher.indexOf(firstCharacter) + 16).toString()
                    passcode = passcode.substr(1)
                } else {
                    setInput();
                }
            } else if (passcode.length === 4) {
                prefix = '192.168'
            }
            passcode = passcode.split('')
            while (index < passcode.length) {
                var firstCharacter = passcode[index],
                    secondCharacter = passcode[index + 1]
                if (cipher.indexOf(firstCharacter) > -1 && cipher.indexOf(secondCharacter) > -1) {
                    var firstValue = cipher.indexOf(firstCharacter.toString(16)),
                        secondValue = cipher.indexOf(secondCharacter.toString(16))
                    ipAddress += '.' + parseInt(firstValue + secondValue, 16).toString()
                } else {
                    setInput()
                    return false
                }
                index = index + 2
            }
            ipAddress = prefix + ipAddress
            connect(ipAddress)
        },
        listen = function(formId, inputId) {
            var inputSelector = inputId || formId + ' input'
            input = $(inputSelector)
            $(formId).addEventListener('submit', function(e) {
                e.preventDefault()
                validate()
            }, false)
        },
        setInput = function() {
            input.value = ''
        },
        validate = function() {
            if (input.value.length < 4 || input.value.length > 6) {
                setInput()
            } else {
                decode(input.value.toUpperCase())
            }
        }
    return {
        listen: listen
    }
}()
*/