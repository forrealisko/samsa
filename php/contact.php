<?php
/**
 * SAMSA — Contact Form Handler
 * Receives AJAX POST, validates, sends email to info@samsa.sk
 * Returns JSON response for frontend feedback.
 */
header('Content-Type: application/json; charset=utf-8');

// Only POST allowed
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// --- Collect & sanitise ---
$name    = trim(strip_tags($_POST['name']  ?? ''));
$email   = trim(strip_tags($_POST['email'] ?? ''));
$message = trim(strip_tags($_POST['message'] ?? ''));

// --- Validate ---
$errors = [];
if ($name === '')                        $errors[] = 'Meno je povinné.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Neplatný email.';
if ($message === '')                     $errors[] = 'Správa je povinná.';
if (strlen($message) > 5000)             $errors[] = 'Správa je príliš dlhá.';

if ($errors) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'errors' => $errors]);
    exit;
}

// --- Build & send email ---
$to      = 'info@samsa.sk';
$subject = 'Web formulár samsa.sk';
$body    = "Meno: {$name}\nEmail: {$email}\nSpráva:\n{$message}\n\n"
         . "—\nOdoslané: " . date('j.m.Y H:i:s')
         . "\nIP: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown');

$headers = implode("\r\n", [
    "From: info@samsa.sk",
    "Reply-To: {$email}",
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "X-Mailer: SAMSA-Web/2.0",
]);

$sent = @mail($to, $subject, base64_encode($body), $headers);

if ($sent) {
    echo json_encode(['ok' => true, 'message' => 'Správa bola odoslaná.']);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Odoslanie zlyhalo. Skúste znova.']);
}
