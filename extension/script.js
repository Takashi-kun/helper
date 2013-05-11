var element_login_form    = document.querySelector('#login_form');
var element_login_button  = document.querySelector('#login_button');
var element_user_name     = document.querySelector('#user_name');
var element_error_message = document.querySelector('#error_message');
var element_post_form     = document.querySelector('#post_form');
var element_post_button   = document.querySelector('#post_button');
var element_posting_button = document.querySelector('#posting_button');
var element_logout_button  = document.querySelector('#logout_button');
var element_priority_select = document.querySelector('#post_form select');
var element_your_turn     = document.querySelector('#your_turn');
var element_wait_count    = document.querySelector('#wait_count');
var element_wait_num      = document.querySelector('#wait_num');

var user_name, priority;

element_post_button.addEventListener('click', postPriority, false);
element_posting_button.addEventListener('click', postSolved, false);
// element_logout_button.addEventListener('click', userLogout, false);
element_login_button.addEventListener('click', userLogin, false);

function checkLogin() {
    // console.log('userName:' + localStorage['helperUserName']);
    if (typeof(localStorage['helperUserName']) !== 'undefined' &&
               localStorage['helperUserName']  !== null) {
        return true;
    }
    return false;
}

function postSolved(event) {
    request(SERVER + '/solved.php', 'POST', {user_name: user_name}, processSolve, processError);
    return stopSubmit(event);
}

function postPriority(event) {
    priority = element_priority_select.value;
    request(SERVER + '/help.php', 'POST',
            {user_name: user_name, help_priority: priority}, processPost, processError);
    return stopSubmit(event);
}

function checkHelping() {
    if (typeof(localStorage['helperHelping']) !== 'undefined' &&
               localStorage['helperHelping']  !== null) {
        return true;
    }
    return false;
}

function displayHelp() {
    if (checkHelping() === false) {
        return;
    }
    displayPostingHelp();
}

function displayNotPostingHelp() {
    delete localStorage['helperHelping'];
    delete localStorage['helperWaitNum'];
    addClass(element_wait_count, 'display_none');
    addClass(element_your_turn, 'display_none');
    removeClass(element_post_button, 'display_none');
    addClass(element_posting_button, 'display_none');
    element_priority_select.disabled = false;
}

function displayPostingHelp() {
    addClass(element_post_button, 'display_none');
    removeClass(element_posting_button, 'display_none');
    console.log(localStorage['helperWaitNum']);
    if (localStorage['helperWaitNum'] > 0) {
        removeClass(element_wait_count, 'display_none');
        element_wait_num.textContent = localStorage['helperWaitNum'];
    } else if (localStorage['helperWaitNum'] == 0){
        console.log('your_turn');
        removeClass(element_your_turn, 'display_none');
    }
    element_priority_select.disabled = true;
    element_priority_select.value = localStorage['helperHelping'];
}

function processConfirm(response) {
    var data = JSON.parse(response);
    console.log(data);
    // まだHelpしていない時
    if (data['code'] === 1) {
        localStorage['helperHelping'] = data['msg'];
        localStorage['helperWaitNum'] = data['data'];
        displayPostingHelp();
    } else if (data['code'] === -5) {
        displayNotPostingHelp();
    }
}

function confirmStatus() {
    request(SERVER + '/confirm.php', 'POST',
           {user_name: user_name}, processConfirm, processError);
}

function processPriority(response) {
    var choices = JSON.parse(response);
    element_priority_select.textContent = '';
    for (var i in choices) {
        var option = document.createElement('option');
        if (typeof(choices[i]['id']) !== 'undefined' && choices[i]['id'] !== null) {
            option.value = choices[i]['id'];
            option.textContent = choices[i]['body'];
            element_priority_select.appendChild(option);
        }
    }
}

function displayPriority() {
    request(SERVER + '/priority.php', 'POST', '', processPriority, processError);
}

function afterLogin() {
    console.log('afterLogin');
    removeClass(element_post_form, 'display_none');
    addClass(element_login_form, 'display_none');
    user_name = localStorage['helperUserName'];
    displayHelp();
    confirmStatus();
    displayPriority();
}

function processError(response) {
    // console.log(response);
}

function processLogin(response) {
    var data = JSON.parse(response);
    if (data['code'] === 1) {
        localStorage['helperUserName'] = user_name;
        addClass(element_error_message, 'display_none');
        // console.log('login success');
        element_user_name.value = '';
        afterLogin();
    } else {
        delete localStorage['helperUserName'];
        removeClass(element_error_message, 'display_none');
        element_error_message.textContent = data['msg'];
    }
}


function processSolve(response) {
    var data = JSON.parse(response);
    if (data['code'] === 1) {
        displayNotPostingHelp();
    }
}

function processPost(response) {
    var data = JSON.parse(response);
    if (data['code'] === 1) {
        localStorage['helperHelping'] = priority;
        displayPostingHelp();
    }
}

function userLogin(event) {
    user_name = element_user_name.value;
    request(SERVER + '/regist.php', 'POST', {user_name: user_name}, processLogin, processError);
    return stopSubmit(event);
}

function beforeLogin() {
    removeClass(element_login_form, 'display_none');
    addClass(element_post_form, 'display_none');
}

function userLogout(event) {
    delete localStorage['helperUserName'];
    beforeLogin();
    return stopSubmit(event);
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
        // console.log(xhr.readyState);
        if (xhr.readyState === 4) {
            // console.log(xhr.responseText);
            success(xhr.responseText);
        } else {
            error(xhr.responseText);
        }
    }
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // console.log(data);
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

function main() {
    if (checkLogin() === true) {
        afterLogin();
    } else {
        beforeLogin();
    }
}

// userLogout();
main();
