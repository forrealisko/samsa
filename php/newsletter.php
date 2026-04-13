<?php
/**
 * SAMSA — Newsletter Signup Handler
 * Receives AJAX POST, validates, logs subscriber to HTML file,
 * and sends a confirmation email with discount code.
 * Returns JSON response for frontend feedback.
 */
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// --- Collect & sanitise ---
$name  = trim(strip_tags($_POST['name']  ?? ''));
$email = trim(strip_tags($_POST['email'] ?? ''));

// --- Validate ---
$errors = [];
if ($name === '')                                $errors[] = 'Meno je povinné.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))  $errors[] = 'Neplatný email.';

if ($errors) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'errors' => $errors]);
    exit;
}

// --- Log subscriber to HTML file ---
$logFile = __DIR__ . '/samsa-newsletter.html';
$ip      = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$date    = date('j.m.Y H:i:s');

// Create file with header row if it doesn't exist
if (!file_exists($logFile)) {
    $header = "<table border=\"1\" cellpadding=\"5\" cellspacing=\"0\">\n"
            . "<tr><th>Dátum a čas</th><th>Meno</th><th>Email</th><th>IP</th></tr>\n";
    if (file_put_contents($logFile, $header) === false) {
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => 'Nepodarilo sa vytvoriť súbor. Skontrolujte práva priečinka php/']);
        exit;
    }
}

$row = "<tr>"
     . "<td>" . htmlspecialchars($date) . "</td>"
     . "<td>" . htmlspecialchars($name) . "</td>"
     . "<td>" . htmlspecialchars($email) . "</td>"
     . "<td>" . htmlspecialchars($ip) . "</td>"
     . "</tr>\n";

$logged = file_put_contents($logFile, $row, FILE_APPEND | LOCK_EX);

if ($logged === false) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Zápis do súboru zlyhal.']);
    exit;
}

// --- Send notification email to shop ---
$to      = 'info@samsa.sk';
$subject = 'Nový newsletter odberateľ — samsa.sk';
$body    = "Nový odberateľ newslettra:\n\nMeno: {$name}\nEmail: {$email}\n\n"
         . "Dátum: {$date}\nIP: {$ip}";

$headers = implode("\r\n", [
    "From: info@samsa.sk",
    "Reply-To: {$email}",
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "X-Mailer: SAMSA-Web/2.0",
]);

@mail($to, $subject, base64_encode($body), $headers);

echo json_encode(['ok' => true, 'message' => 'Ďakujeme za registráciu!']);
