<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if (!empty($_POST['robot_trap'])) {
        die(json_encode(['status' => 'error', 'message' => 'Spam detected']));
    }

    $name = filter_var(trim($_POST['name'] ?? ''), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $topic = filter_var(trim($_POST['topic'] ?? ''), FILTER_SANITIZE_STRING);
    $message = filter_var(trim($_POST['message'] ?? ''), FILTER_SANITIZE_STRING);
    $privacy = isset($_POST['privacyPolicy']);

    if (empty($name) || empty($email) || empty($topic) || !$privacy) {
        echo json_encode(['status' => 'error', 'message' => 'Wypełnij wymagane pola.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'Błędny adres e-mail.']);
        exit;
    }

    $to = "twoj-email@domena.pl"; // <-- TUTAJ WPISZ EMAIL KLIENTKI
    $subject = "Nowa wiadomosc: " . $topic;
    
    $email_content = "Imie: $name\n";
    $email_content .= "E-mail: $email\n";
    $email_content .= "Temat: $topic\n\n";
    $email_content .= "Wiadomosc:\n$message\n";

    $headers = "From: Formularz <no-reply@twojadomena.pl>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=utf-8\r\n";

    if (mail($to, $subject, $email_content, $headers)) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Blad wysylki maila.']);
    }

} else {
    echo json_encode(['status' => 'error', 'message' => 'Forbidden']);
}