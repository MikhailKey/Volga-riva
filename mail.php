<?php 
require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';
$name = $_POST['club_name'];
$phone = $_POST['club_phone'];
$email = $_POST['club_mail'];
$web = $_POST['club_web'];
//$mail->SMTPDebug = 3;                               // Enable verbose debug output
$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.yandex.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'email@mail.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'password'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров
$mail->setFrom('newclient@fitness-kit.ru'); // от кого будет уходить письмо?
$mail->addAddress('info@fitness-kit.ru');     // Кому будет уходить письмо 
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML
$mail->Subject = 'Заявка с сайта FitnessKit';
$mail->Body    = '' .$name . ' оставил заявку. <br> Cвязаться можно по телефону ' .$phone. ' Почта клуба: ' .$email. ' Сайт клуба: ' .$web;
$mail->AltBody = '';
if(!$mail->send()) {
   return false;
} else {
    return true;
}
?>