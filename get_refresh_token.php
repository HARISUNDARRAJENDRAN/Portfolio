<?php
require 'vendor/autoload.php';

$client = new Google_Client();
$client->setClientId('4695058238-r0ranakvki3fgu4htkrnd10hn5u75j9a.apps.googleusercontent.com');
$client->setClientSecret('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');
$client->setRedirectUri('http://localhost/portfolio/get_refresh_token.php');
$client->addScope('https://mail.google.com/');
$client->setAccessType('offline');
$client->setPrompt('consent');

if (!isset($_GET['code'])) {
    $auth_url = $client->createAuthUrl();
    header('Location: ' . filter_var($auth_url, FILTER_SANITIZE_URL));
} else {
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    echo 'Refresh Token: ' . $token['refresh_token'];
}
?>