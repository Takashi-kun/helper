var element_login_form = document.querySelector('#login_form');
var element_login_button = document.querySelector('#login_button');
var element_user_name = document.querySelector('#user_name');

function loginByUserName(user_name) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', SERVER + '/regist.php');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            console.log(xhr.responseText);
            var data = JSON.parse(xhr.responseText);
            if (data['code'] === 1) {
                console.log('login success');
            } else {
                alert(data['msg']);
            }
        }
    }
    // xmlHttpRequest.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
    var data = {user_name: user_name};
    console.log(data);
    xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
    xhr.send(encodeParams(data));
}

element_login_button.addEventListener('click', function(e) {
    var user_name = element_user_name.value;
    loginByUserName(user_name);
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
