var element_login_form = document.querySelector('#login_form');
var element_login_button = document.querySelector('#login_button');
var element_user_name = document.querySelector('#user_name');
var element_error_message = document.querySelector('#error_message');
var element_post_form = document.querySelector('#post_form');
var element_post_button = document.querySelector('#post_button');
var element_logout_button = document.querySelector('#logout_button');
var user_name, priority;

if (checkLogin() === true) {
    afterLogin();
} else {
    beforeLogin();
}

function error(response) {
    console.log(response);
}

function processLogin(response) {
    var data = JSON.parse(response);
    if (data['code'] === 1) {
        localStorage['helperUserName'] = user_name;
        addClass(element_error_message, 'display_none');
        console.log('login success');
        element_user_name.value = '';
        afterLogin();
    } else {
        delete localStorage['helperUserName'];
        removeClass(element_error_message, 'display_none');
        element_error_message.textContent = data['msg'];
    }
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

function processSolve(response) {
    var data = JSON.parse(response);
    if (data['code'] === 1) {
        delete localStorage['helperHelping'];
        removeClass(element_post_button, 'helping');
        element_post_button.textContent = 'ヘルプ';
    }
}

function afterLogin() {
    removeClass(element_post_form, 'display_none');
    addClass(element_login_form, 'display_none');

    if (checkHelping() === true) {
        addClass(element_post_button, 'helping');
        element_post_button.textContent = 'ヘルプ中';
        priority = localStorage['helperHelping'];
        document.querySelector('#post_form select').value = priority;
        element_post_button.addEventListener('click', function(e) {
            user_name = localStorage['helperUserName'];
            request(SERVER + '/solved.php', 'POST', {user_name: user_name}, processSolve, error);
            return stopSubmit(e);
       }, false);
    } else {
        element_post_button.addEventListener('click', function(e) {
            user_name = localStorage['helperUserName'];
            priority = document.querySelector('#post_form select').value;
            request(SERVER + '/help.php', 'POST',
                    {user_name: user_name, help_priority: priority}, processPost, error);
            return stopSubmit(e);
       }, false);
    }

    element_logout_button.addEventListener('click', function(e) {
        logout();
        beforeLogin();
        return stopSubmit(e);
   }, false);
}

function processPost(response) {
    var data = JSON.parse(response);
    if (data['code'] === 1) {
        addClass(element_post_button, 'helping');
        element_post_button.textContent = 'ヘルプ中';
        localStorage['helperHelping'] = priority;
    }
}

function beforeLogin() {
    removeClass(element_login_form, 'display_none');
    addClass(element_post_form, 'display_none');

    element_login_button.addEventListener('click', function(e) {
        user_name = element_user_name.value;
        request(SERVER + '/regist.php', 'POST', {user_name: user_name}, processLogin, error);
        return stopSubmit(e);
    }, false);
}

function logout() {
    delete localStorage['helperUserName'];
}

function addClass(element, className) {
    if (element.classList.contains(className) === false) {
        element.classList.add(className);
    }
}

function removeClass(element, className) {
    if (element.classList.contains(className) === true) {
        element.classList.remove(className);
    }
}

function request(url, method, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            console.log(xhr.responseText);
            success(xhr.responseText);
        } else {
            error(xhr.responseText);
        }
    }
    xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
    console.log(data);
    xhr.send(encodeParams(data));
}

function stopSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

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
