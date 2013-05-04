<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>管理ツール</title>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="css/index.css">
</head>
<body>
    <div class="container">
        <div class="navbar navbar-googlenav">
            <div class="navbar-inner">
                <a class="brand" href="#">Title</a>
                <ul class="nav">
                    <li class="active">
                        <a href="#user" class="links">ユーザー一覧</a>
                    </li>
                    <li>
                        <a href="#help" class="links">助けて一覧</a>
                    </li>
                    <li>
                        <a href="#question" class="links">質問一覧</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div id="help_detail">
        <label>
            <input type="radio" name="help_detail" value="all" checked>全て
        </label>
        <label>
            <input type="radio" name="help_detail" value="solved">解決済み
        </label>
        <label>
            <input type="radio" name="help_detail" value="no_solved">未解決
        </label>
    </div>
    <table id="main_table" class="table table-bordered table-hover">
    </table>
<script type="text/javascript" src="scripts/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="scripts/const.js"></script>
<script type="text/javascript" src="scripts/index.js"></script>
</body>
</html>

