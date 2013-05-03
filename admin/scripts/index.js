$(function() {
    init();
});

var init = function() {
    $(window).on('load', firedLoad);

    $(window).on('hashchange', firedLoad);

    $('.links').on('click', function(e){
        firedClick(e.target);
    });
}

var getURLHash = function(href) {
    var hrefStr = new String(href);
    var hrefArr = hrefStr.split('#');

    if (typeof hrefArr[1] !== 'string') {
        return 'user';
    }

    return hrefArr[1];
}

var firedClick = function(target) {
    getAjax(AJAX_URL, 'GET', {'type': getURLHash(target.href)}, makeTable);
}

var firedLoad = function() {
    getAjax(AJAX_URL, 'GET', {'type': getURLHash(location.href)}, makeTable);
}

var getAjax = function(sendUrl, sendType, sendData, callBackFunc) {
    // ingicater_start();
    $.ajax({
        dataType: 'json',
        url: sendUrl,
        type: sendType,
        data: sendData,
        success: function(data) {
            callBackFunc(data);
        },
        error: function(msg) {
            return errorAjax(msg);
        }
    });
}

var errorAjax = function(msg) {
    alert('申し訳ございません。サーバでエラーが発生しています。');
    console.log(msg);
    // ingicater_end();
    return false;
}

var makeTable = function(data) {
    $('#main_table').text('');
    var tbody = $('<tbody/>');

    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        var tr = $('<tr/>');
        for (var key in obj) {
            var td = $('<td/>');
            td.text(obj[key]);
            td.appendTo(tr);
        }
        tr.appendTo(tbody);
    }
    tbody.appendTo('#main_table');
}