<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>機能お試し</title>
    <link rel="stylesheet" type="text/css" href="">
</head>
<body>
    <p>
        登録
        <form action="http://dev.helper/regist.php" method="post">
            <input type="text" name="user_name" placeholder="あなたの名前">
            <input type="submit" name="regist">
        </form>
    </p>
    <p>
        Helpボタン
        <form action="http://dev.helper/help.php" method="post">
            <label>
                <input type="radio" name="help_priority" value="3" checked>高め
            </label>
            <label>
                <input type="radio" name="help_priority" value="2">普通
            </label>
            <label>
                <input type="radio" name="help_priority" value="1">低め
            </label>
            <input type="text" name="user_name" placeholder="あなたの名前">
            <input type="submit" name="help">
        </form>
    </p>
    <p>
        質問
        <form action="http://dev.helper/question.php" method="post">
            <textarea name="question_body" placeholder="質問内容"></textarea>
            <input type="text" name="user_name" placeholder="あなたの名前">
            <input type="submit" name="question">
        </form>
    </p>

<script type="text/javascript" src="http://localhost/jquery/jquery-1.7.2.min.js"></script>
<script>
</script>
</body>
</html>

