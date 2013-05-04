var element_login_form = document.querySelector('#login_form');
var element_login_button = document.querySelector('#login_button');
var element_user_name = document.querySelector('#user_name');
var element_error_message = document.querySelector('#error_message');
var element_post_form = document.querySelector('#post_form');
var element_post_button = document.querySelector('#post_button');
var element_logout_button = document.querySelector('#logout_button');

if (checkLogin() === true) {
    afterLogin();
} else {
    beforeLogin();
}

function loginByUserName(user_name) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', SERVER + '/regist.php');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            console.log(xhr.responseText);
            var data = JSON.parse(xhr.responseText);
            if (data['code'] === 1) {
                localStorage['helperUserName'] = user_name;
                if (element_error_message.classList.contains('display_none') === false)  {
                    element_error_message.classList.add('display_none');
                }
                console.log('login success');
                element_user_name.value = '';
                afterLogin();
            } else {
                delete localStorage['helperUserName'];
                if (element_error_message.classList.contains('display_none') === true)  {
                    element_error_message.classList.remove('display_none');
                }
                element_error_message.textContent = data['msg'];
            }
        }
    }
    var data = {user_name: user_name};
    console.log(data);
    xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
    xhr.send(encodeParams(data));
}

function checkLogin() {
    console.log('userName:' + localStorage['helperUserName']);
    if (typeof(localStorage['helperUserName']) !== 'undefined' &&
               localStorage['helperUserName']  !== null) {
        return true;
    }
    return false;
}

function checkHelping() {
    console.log('userName:' + localStorage['helperUserName']);
    if (typeof(localStorage['helperHelping']) !== 'undefined' &&
               localStorage['helperHelping']  !== null) {
        return true;
    }
    return false;
}

function afterLogin() {
    if (element_post_form.classList.contains('display_none') === true)  {
        element_post_form.classList.remove('display_none');
        element_login_form.classList.add('display_none');
    }
    if (checkHelping() === true) {
        if (element_post_button.classList.contains('helping') === false) {
            element_post_button.classList.add('helping');
        }
        element_post_button.textContent = 'ヘルプ中';
        var priority = localStorage['helperHelping'];
        document.querySelector('#post_form select').value = priority;
    } else {
        element_post_button.addEventListener('click', function(e) {
            var user_name = localStorage['helperUserName'];
            var priority = document.querySelector('#post_form select').value;
            postByUserNameAndPriority(user_name, priority);
            e.preventDefault();
            e.stopPropagation();
            return false;
       }, false);
    }
}

function postByUserNameAndPriority(user_name, priority) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', SERVER + '/help.php');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            console.log(xhr.responseText);
            var data = JSON.parse(xhr.responseText);
            if (data['code'] === 1) {
                if (element_post_button.classList.contains('helping') === false) {
                    element_post_button.classList.add('helping');
                }
                element_post_button.textContent = 'ヘルプ中';
                localStorage['helperHelping'] = priority;
            }
        }
    }
    var data = {user_name: user_name, help_priority: priority};
    console.log(data);
    xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
    xhr.send(encodeParams(data));
}

function beforeLogin() {
    if (element_login_form.classList.contains('display_none') === true)  {
        element_login_form.classList.remove('display_none');
        element_post_form.classList.add('display_none');
    }
    element_login_button.addEventListener('click', function(e) {
        var user_name = element_user_name.value;
        loginByUserName(user_name);
        e.preventDefault();
        e.stopPropagation();
        return false;
    }, false);
}

function logout() {
    delete localStorage['helperUserName'];
}

element_logout_button.addEventListener('click', function(e) {
    logout();
    beforeLogin();
    e.preventDefault();
    e.stopPropagation();
    return false;
}, false);

function encodeParams(data) {
    var params = [];
    for(var name in data) {
        var value = data[name];
        var param = encodeURIComponent(name).replace( /%20/g, '+' )
            + '=' + encodeURIComponent(value).replace( /%20/g, '+' );
        params.push( param );
    }
    return params.join( '&' );
}
