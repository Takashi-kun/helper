var AJAX_URL = 'http://dev.helper/admin/api.php';
$(function() {
    init();
});

var init = function() {
    $('.links').on('click', function(e){
        clickLinks(e.target);
    });
}

var clickLinks = function(target) {
    var hrefStr = new String(target.href);
    var hrefArr = hrefStr.split('#');

    getAjax(AJAX_URL, 'GET', {'type': hrefArr[1]}, makeTable);
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