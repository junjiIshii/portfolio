<?php
    ini_set( 'display_errors', 1 );
    ini_set( 'error_reporting', E_ALL );

    if(!empty($_POST)){
        $email = htmlspecialchars($_POST['email']);
        $title = htmlspecialchars($_POST['title']);
        $content = htmlspecialchars($_POST['content']);

        $to ='iscii1996@gmail.com';
        $suject = 'ポートフォリオサイトからの問い合わせ【'.$title.'】';
        $mes =<<< EOM
ポートフォリオサイトより問い合わせがありました。

送信者アドレス:$email
件名:$title
内容:
$content
EOM;
        mail($to,$suject,$mes);
        echo json_encode(array());
        exit();
    }
?>
