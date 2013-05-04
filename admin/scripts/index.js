var offset = 0;

$(function() {
    init();
});

var init = function() {
    $(window).on('load', firedLoad);

    $(window).on('hashchange', firedLoad);

    $('.links').on('click', function(e){
        firedClickNavLink(e.target);
    });

    $('.help_detail').on('click', function() {
        getAjax(AJAX_URL, 'GET', {'type': getURLHash(location.href), 'detail': $(this).val(), 'offset': offset}, makeTable);
    });
};

var showLoading = function() {
    $('#now_loading').css({'width': $(window).width(), 'height': $(window).height()});
    $('#now_loading').show();
};

var hideLoading = function() {
    $('#now_loading').hide();
};

var getURLHash = function(href) {
    var hrefStr = new String(href);
    var hrefArr = hrefStr.split('#');

    if (typeof hrefArr[1] !== 'string') {
        return 'user';
    }

    return hrefArr[1];
};

var firedClickNavLink = function(target) {
    var detail;
    var type = getURLHash(location.href);
    changeHelpDetailView(type);
    if (type === 'help') {
        detail = $('.help_detail.active').val();
    }
    getAjax(AJAX_URL, 'GET', {'type': type, 'detail': detail, 'offset': offset}, makeTable);
};

var firedLoad = function() {
    var detail;
    var type = getURLHash(location.href);
    $('.top_links').removeClass('active');
    $('.top_links').each(function() {
        if ($(this).children().attr('href') === '#' + type) {
            $(this).addClass('active');
        }
    });

    changeHelpDetailView(type);
    if (type === 'help') {
        detail = $('.help_detail.active').val();
    }
    getAjax(AJAX_URL, 'GET', {'type': type, 'detail': detail, 'offset': offset}, makeTable);
};

var changeHelpDetailView = function(type) {
    if (type === 'help') {
        showHelpDetail();
    } else {
        hideHelpDetail();
    }
};

var hideHelpDetail = function() {
    $('#help_detail').hide();
};

var showHelpDetail = function() {
    $('#help_detail').show();
};

var firedClickSolve = function(target) {
    getAjax(AJAX_URL + '?type=' + getURLHash(location.href) + '&detail=' + $('input[name="help_detail"]:checked').val(), 'POST', {'id': target.name, 'type': getURLHash(location.href)}, makeTable);
};

var getAjax = function(sendUrl, sendType, sendData, callBackFunc) {
    // ingicater_start();
    showLoading();
    $.ajax({
        dataType: 'json',
        url: sendUrl,
        type: sendType,
        data: sendData,
        success: function(data) {
            hideLoading();
            callBackFunc(data['data'], sendData);
            makePaging(Number(data['count']));
            return true;
        },
        error: function(msg) {
            return errorAjax(msg);
        }
    });
};

var makePaging = function(count) {
    $('.pagination ul').text('');
    var pagingNum = Math.floor(count/LIMIT_NUM) + 1;
    for (var i = 1; i <= pagingNum; i++) {
        var li = $('<li/>');
        var a = $('<a/>');
        a.text(i);
        a.appendTo(li);
        li.appendTo($('.pagination ul'));
        li.on('click', function() {
            firedClickPaging($(this));
        });
    }
};

var firedClickPaging = function(target) {
    offset = (Number(target.children().text()) - 1) * LIMIT_NUM;
    firedLoad();
}

var errorAjax = function(msg) {
    alert('申し訳ございません。サーバでエラーが発生しています。');
    console.log(msg);
    hideLoading();
    return false;
};

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

        var td = $('<td/>');
        if (sendData['type'] === 'help' && isSoloved === false) {
            var button = $('<button/>');
            button.attr({'class': 'solved_button btn', 'name': obj['id']});
            button.text('解決');
            button.appendTo(td);
        }
        td.appendTo(tr);
        tr.appendTo(tbody);
    }
    thead.appendTo('#main_table');
    tbody.appendTo('#main_table');

    $('.solved_button').on('click', function(e){
        firedClickSolve(e.target);
    });
};

var makeThead = function(type) {
    var thead = $('<thead/>');
    var tr = $('<tr/>');
    for (var i = 0; i < HELP_THEAD[type].length; i++) {
        var th = $('<th/>');
        th.text(HELP_THEAD[type][i]);
        th.appendTo(tr);
    }
    return tr;
};