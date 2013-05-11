var offset = 0;
var timerId = 0;
var isAutoLoad = true;

$(function() {
    init();
});

var init = function() {
    $(window).on('load', function() {
        firedLoad(true);
    });

    $(window).on('hashchange', function() {
        firedLoad(true);
    });

    $('.links').on('click', function(e){
        firedClickNavLink(e.target);
    });

    $('.help_detail').on('click', function() {
        getAjax(AJAX_URL, 'GET', {'type': getURLHash(location.href), 'detail': $(this).val(), 'offset': offset}, makeTable);
    });

    $('.auto_load').on('click', function() {
        firedClickAutoLoad($(this));
    });

    $('#add_question').on('click', function() {
        getAjax(AJAX_URL + '?type=' + getURLHash(location.href), 'POST', {'body': $('#new_question').val(), 'type': getURLHash(location.href)}, makeTable);
        $('#new_question').val('');
    });

    $('.edit_question').on('click', function() {
        var body = $('#edit_question_textarea').val();
        var id = $('.edit_question_id').text();
        getAjax(AJAX_URL + '?type=' + getURLHash(location.href), 'POST', {'id': id, 'body': body, 'type': getURLHash(location.href)}, makeTable);
        console.log(body + id);
    });
};

var firedClickAutoLoad = function(target) {
    if (target.val() === 'yes') {
        isAutoLoad = true;
        firedLoad(true);
    } else {
        isAutoLoad = false;
        if (timerId !== 0) {
            clearInterval(timerId);
        }
        timerId = 0;
    }
}

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
        return 'help';
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

var firedLoad = function(flg) {
    if (flg === true) {
        offset = 0;
    }
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

    if (isAutoLoad !== true) {
        if (timerId !== 0) {
            clearInterval(timerId);
        }
        timerId = 0;
        return;
    }

    if (getURLHash(location.href) === 'help') {
        console.log('FIRED');
        if (timerId === 0) {
            timerId = setInterval(function() {
                firedLoad(true);
            }, AUTO_LOAD_INTERVAL);
        }
    } else {
        if (timerId !== 0) {
            clearInterval(timerId);
        }
        timerId = 0;
    }

};

var changeHelpDetailView = function(type) {
    if (type === 'help') {
        showHelpDetail();
    } else {
        hideHelpDetail();
    }

    if (type === 'question') {
        showQuestionDetail();
    } else {
        hideQuestionDetail();
    }
};

var hideHelpDetail = function() {
    $('#help_detail').hide();
};

var showHelpDetail = function() {
    $('#help_detail').show();
};

var hideQuestionDetail = function() {
    $('#question_detail').hide();
};

var showQuestionDetail = function() {
    $('#question_detail').show();
};

var firedClickSolve = function(target) {
    getAjax(AJAX_URL + '?type=' + getURLHash(location.href) + '&detail=' + $('input[name="help_detail"]:checked').val(), 'POST', {'id': target.name, 'type': getURLHash(location.href)}, makeTable);
};

var getAjax = function(sendUrl, sendType, sendData, callBackFunc) {
    //showLoading();
    $.ajax({
        dataType: 'json',
        url: sendUrl,
        type: sendType,
        data: sendData,
        success: function(data) {
            //hideLoading();
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
    if (count <= LIMIT_NUM) {
        return;
    }

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
    firedLoad(false);
}

var errorAjax = function(msg) {
    //alert('申し訳ございません。サーバでエラーが発生しています。');
    console.log('Sorry, Server error was happend');
    console.log(msg);
    //hideLoading();
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
            if (key === 'is_solved') {
                if (obj[key] === '1') {
                    isSoloved = true;
                }
                continue;
            }
            var td = $('<td/>');
            td.text(obj[key]);
            td.appendTo(tr);
       }

        var td = $('<td/>');
        if (sendData['type'] === 'help' && isSoloved === false) {
            var button = $('<button/>');
            button.attr({'class': 'solved_button btn', 'name': obj['id']});
            button.text('解決');
            button.appendTo(td);
        } else if (sendData['type'] === 'question') {
            var a = $('<a/>');
            a.attr(
                {
                    'class': 'edit_question_button btn btn-inverse',
                    'name': obj['id'],
                    'href': '#edit_question_modal',
                    'role': 'button',
                    'data-toggle': 'modal',
                    'inner-data': obj['body']
                }
            );
            a.text('編集');
            a.appendTo(td);
            td.appendTo(tr);

            var td = $('<td/>');
            var button = $('<button/>');
            button.attr({'class': 'delete_question_button btn btn-danger', 'name': obj['id']});
            button.text('削除');
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

    $('.delete_question_button').on('click', function() {
        if(window.confirm('本当に削除しますか?')){
            getAjax(AJAX_URL + '?type=' + getURLHash(location.href), 'POST', {'id': $(this).attr('name'), 'type': getURLHash(location.href)}, makeTable);
        }
    });

    $('.edit_question_button').on('click', function() {
        var body = $(this).attr('inner-data');
        $('.edit_question_id').text($(this).attr('name'));
        $('#edit_question_textarea').val(body);
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
