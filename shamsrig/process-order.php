<?php
// process-order.php

header('Content-Type: application/json');

// Check if file and order data exist
if (!isset($_FILES['file']) || !isset($_POST['order'])) {
  echo json_encode(['success' => false, 'message' => 'Missing file or order data.']);
  exit;
}

$order = json_decode($_POST['order'], true);

// File upload config
$uploadDir = __DIR__ . '/assets/order-confirmations/';
if (!file_exists($uploadDir)) {
  mkdir($uploadDir, 0755, true);
}

// Create a unique filename
$ext = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
$filename = 'proof_' . time() . '.' . $ext;
$filepath = $uploadDir . $filename;

if (move_uploaded_file($_FILES['file']['tmp_name'], $filepath)) {
  // Add filename to order data
  $order['screenshot'] = 'assets/order-confirmations/' . $filename;

  // Save to orders.json
  $ordersFile = __DIR__ . '/assets/data/orders.json';
  $orders = file_exists($ordersFile) ? json_decode(file_get_contents($ordersFile), true) : [];
  $orders[] = $order;
  file_put_contents($ordersFile, json_encode($orders, JSON_PRETTY_PRINT));

  // Optionally: send email using PHP's mail() or your preferred method
  // (not EmailJS here because it's client-side only)
  // Sample email:
  $to = 'atshammughal28@gmail.com';
  $subject = 'New Order Received';
  $message = "<h2>New Order Details</h2>"
           . "<p><strong>Name:</strong> {$order['name']}</p>"
           . "<p><strong>Email:</strong> {$order['email']}</p>"
           . "<p><strong>Phone:</strong> {$order['phone']}</p>"
           . "<p><strong>Address:</strong> {$order['address']}, {$order['city']}, {$order['zipcode']}</p>"
           . "<p><strong>Timestamp:</strong> {$order['timestamp']}</p>"
           . "<p><strong>Screenshot:</strong> <a href='https://shyamsrig.com/{$order['screenshot']}'>View Image</a></p>";
  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
  $headers .= "From: orders@shyamsrig.com";
  mail($to, $subject, $message, $headers);

  echo json_encode(['success' => true]);
} else {
  echo json_encode(['success' => false, 'message' => 'Failed to upload screenshot.']);
}
?>
