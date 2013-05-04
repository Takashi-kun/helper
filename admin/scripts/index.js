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

var firedClickSolve = function(target) {
    getAjax(AJAX_URL + '?type=' + getURLHash(location.href), 'POST', {'id': target.name}, missingButton);
}

var missingButton = function(data, sendData) {
    console.log('HERE');
}

var getAjax = function(sendUrl, sendType, sendData, callBackFunc) {
    // ingicater_start();
    $.ajax({
        dataType: 'json',
        url: sendUrl,
        type: sendType,
        data: sendData,
        success: function(data) {
            callBackFunc(data, sendData);
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

var makeTable = function(data, sendData) {
    $('#main_table').text('');
    var thead = makeThead(sendData['type']);
    var tbody = $('<tbody/>');
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        var tr = $('<tr/>');
        var isSoloved = false;
        for (var key in obj) {
            var td = $('<td/>');
            td.text(obj[key]);
            td.appendTo(tr);
            if (key === 'is_solved' && obj[key] === '1') {
                isSoloved = true;
            }
        }
        if (sendData['type'] === 'help' && isSoloved === false) {
            var td = $('<td/>');
            var button = $('<button/>');
            button.attr({'class': 'solved_button', 'name': obj['id']});
            button.text('解決');
            button.appendTo(td);
            td.appendTo(tr);
        }
        tr.appendTo(tbody);
    }
    thead.appendTo('#main_table');
    tbody.appendTo('#main_table');

    $('.solved_button').on('click', function(e){
        firedClickSolve(e.target);
    });
}

var makeThead = function(type) {
    var thead = $('<thead/>');
    var tr = $('<tr/>');
    for (var i = 0; i < HELP_THEAD[type].length; i++) {
        var th = $('<th/>');
        th.text(HELP_THEAD[type][i]);
        th.appendTo(tr);
    }
    return tr;
}