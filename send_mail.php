<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\OAuth;
use League\OAuth2\Client\Provider\Google;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = '142.251.167.108'; // Gmail SMTP IP address
        $mail->Port = 465;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->SMTPAuth = true;
        $mail->AuthType = 'XOAUTH2';
        
        // Add debug mode to see detailed errors
        $mail->SMTPDebug = 2;
        $mail->Debugoutput = 'html';

        // OAuth2 configuration
        $clientId = '4695058238-r0ranakvki3fgu4htkrnd10hn5u75j9a.apps.googleusercontent.com';
        $clientSecret = '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';
        $refreshToken = '1//0gZ6BDCX6H9_kCgYIARAAGBASNwF-L9IrdhkacLrzLYmBtLglN5Jz63Jngw6k6ZqP-gh5FQUeNMk-IePpp_1JQQ2hdjZwh-R8IxQ';

        $provider = new \League\OAuth2\Client\Provider\Google([
            'clientId' => $clientId,
            'clientSecret' => $clientSecret,
        ]);

        $mail->setOAuth(
            new OAuth([
                'provider' => $provider,
                'clientId' => $clientId,
                'clientSecret' => $clientSecret,
                'refreshToken' => $refreshToken,
                'userName' => 'hsundar080506@gmail.com',
            ])
        );

        // Recipients
        $mail->setFrom('hsundar080506@gmail.com', 'Portfolio Contact Form');
        $mail->addAddress('hsundar080506@gmail.com');
        $mail->addReplyTo($email, $name);

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = "Name: $name<br>Email: $email<br><br>Message:<br>$message";

        $mail->send();
        echo json_encode(["status" => "success", "message" => "Message sent successfully!"]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => "Failed to send message. Error: {$mail->ErrorInfo}"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>