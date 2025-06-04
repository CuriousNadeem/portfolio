<?php
// process-order.php

header('Content-Type: application/json');

if (!isset($_FILES['file']) || !isset($_POST['order'])) {
  echo json_encode(['success' => false, 'message' => 'Missing file or order data.']);
  exit;
}

$order = json_decode($_POST['order'], true);

// Upload screenshot
$uploadDir = __DIR__ . '/assets/order-confirmations/';
if (!file_exists($uploadDir)) {
  mkdir($uploadDir, 0755, true);
}

$screenshotExt = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
$screenshotName = 'proof_' . time() . '.' . $screenshotExt;
$screenshotPath = $uploadDir . $screenshotName;
$screenshotURL = 'assets/order-confirmations/' . $screenshotName;

if (move_uploaded_file($_FILES['file']['tmp_name'], $screenshotPath)) {
  $order['screenshot'] = $screenshotURL;

  // Add order status by default
  $order['status'] = 'Not Completed';

  // Save to orders.json
  $ordersFile = __DIR__ . '/assets/data/orders.json';
  $orders = file_exists($ordersFile) ? json_decode(file_get_contents($ordersFile), true) : [];
  $orders[] = $order;
  file_put_contents($ordersFile, json_encode($orders, JSON_PRETTY_PRINT));

  // Shared HTML template
  $productImage = isset($order['product']['image']) ? $order['product']['image'] : '';
  $htmlMessage = "
    <div style='max-width: 600px; margin: 0 auto; background-color: #15161c; border-radius: 15px; box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2); overflow: hidden;'>
        <div style='padding: 20px; background-color: #c025ff; text-align: center; color: #000000; border-radius: 15px 15px 0 0;'>
            <h1 style='margin: 0; font-size: 1.5rem;'>New Order Received</h1>
        </div>
        <div style='padding: 20px;'>
            <p style='margin: 0 0 10px; color: #ffffff; line-height: 1.6;'><strong>Name:</strong> {$order['fullname']}</p>
            <p style='margin: 0 0 10px; color: #ffffff; line-height: 1.6;'><strong>Email:</strong> {$order['email']}</p>
            <p style='margin: 0 0 10px; color: #ffffff; line-height: 1.6;'><strong>Phone:</strong> {$order['phone']}</p>
            <p style='margin: 0 0 10px; color: #ffffff; line-height: 1.6;'><strong>Address:</strong> {$order['address']}, {$order['city']}, {$order['zipcode']}</p>
            <p style='margin: 0 0 10px; color: #ffffff; line-height: 1.6;'><strong>Timestamp:</strong> {$order['timestamp']}</p>
            <hr style='border-color: #333;'>
            <h3 style='color: #ffffff;'>Product Ordered:</h3>
            <p style='margin: 0 0 10px; color: #ffffff;'><strong>Product ID:</strong> {$order['product']['id']}</p>
            <p style='margin: 0 0 10px; color: #ffffff;'><strong>Product Name:</strong> {$order['product']['name']}</p>
            <p style='margin: 0 0 10px; color: #ffffff;'><strong>Price:</strong> {$order['product']['price']}</p>
            " . ($productImage ? "<img src='https://shamsrig.com/{$productImage}' alt='Product Image' style='max-width: 100px; border-radius: 8px; margin-top: 10px;'>" : "") . "
            <p style='margin-top: 10px; color: #ffffff;'><strong>Payment Screenshot:</strong> <a href='https://shamsrig.com/{$screenshotURL}' target='_blank' style='color: #c025ff;'>View Screenshot</a></p>
        </div>
        <div style='padding: 15px; background-color: #1e1f29; text-align: center; color: #ffffff; border-radius: 0 0 15px 15px;'>
            <p>This email was sent from your checkout page.</p>
            <p><a href='https://shamsrig.com' style='color: #c025ff; text-decoration: none;'>www.shamsrig.com</a></p>
        </div>
    </div>
  ";

  // Admin email
  $toAdmin = 'atshammughal28@gmail.com';
  $headers = "MIME-Version: 1.0\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8\r\n";
  $headers .= "From: orders@shamsrig.com";
  mail($toAdmin, 'New Order Received', $htmlMessage, $headers);

  // Customer confirmation email
  $toCustomer = $order['email'];
  $customerMessage = $htmlMessage . "
    <div style='max-width: 600px; margin: 10px auto 0; background-color: #15161c; padding: 20px; text-align: center; color: #ffffff; border-radius: 0 0 15px 15px;'>
      <p>Your order has been placed successfully.</p>
      <p>If you have any questions, feel free to contact us at <a href='mailto:atshammughal28@gmail.com' style='color: #c025ff;'>atshammughal28@gmail.com</a></p>
      <p>Or WhatsApp us at <a href='https://wa.me/923120569862' style='color: #c025ff;'>+92 312 0569862</a></p>
    </div>
  ";
  mail($toCustomer, 'Your Order Confirmation - ShamsRig', $customerMessage, $headers);

  echo json_encode(['success' => true]);
} else {
  echo json_encode(['success' => false, 'message' => 'Failed to upload screenshot.']);
}
?>
