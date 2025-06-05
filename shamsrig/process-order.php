<?php
// process-order.php

header('Content-Type: application/json');

if (!isset($_FILES['file']) || !isset($_POST['order'])) {
  echo json_encode(['success' => false, 'message' => 'Missing file or order data.']);
  exit;
}

$order = json_decode($_POST['order'], true);

// === Generate Unique Order ID ===
$orderIdFile = __DIR__ . '/assets/data/order-id.json';
$currentOrderId = 1;

if (file_exists($orderIdFile)) {
  $storedId = json_decode(file_get_contents($orderIdFile), true);
  if (is_numeric($storedId)) {
    $currentOrderId = intval($storedId) + 1;
  }
}
file_put_contents($orderIdFile, json_encode($currentOrderId));
$order['order_id'] = $currentOrderId;

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
  $order['status'] = 'Not Completed';

  // Save to orders.json
  $ordersFile = __DIR__ . '/assets/data/orders.json';
  $orders = file_exists($ordersFile) ? json_decode(file_get_contents($ordersFile), true) : [];
  $orders[] = $order;
  file_put_contents($ordersFile, json_encode($orders, JSON_PRETTY_PRINT));

  function buildOrderEmail($order, $isCustomer = false) {
    $orderId = $order['order_id'];
    $name = $order['fullname'];
    $email = $order['email'];
    $phone = $order['phone'];
    $address = $order['address'] . ', ' . $order['city'] . ', ' . $order['zipcode'];
    $timestamp = $order['timestamp'];
    $product = $order['product'];
    $productImage = isset($product['image']) ? $product['image'] : '';
    $screenshotURL = $order['screenshot'];
    $whatsappLink = "https://wa.me/923120569862";

    $headerText = $isCustomer ? 'Order Confirmed' : 'New Order Received';
    $footerText = $isCustomer ?
      "<p>Your order has been placed successfully.</p>
       <p>If you have any questions, feel free to contact us at <a href='mailto:atshammughal28@gmail.com' style='color: #c025ff;'>atshammughal28@gmail.com</a></p>
       <p>Or WhatsApp us at <a href='$whatsappLink' style='color: #c025ff;'>+92 312 0569862</a></p>"
      :
      "<p>This email was sent from your checkout page.</p>";

    return "
    <div style='max-width: 600px; margin: 0 auto; background-color: #15161c; border-radius: 15px; box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2); overflow: hidden;'>
        <div style='padding: 20px; background-color: #c025ff; text-align: center; color: #000000; border-radius: 15px 15px 0 0;'>
            <h1 style='margin: 0; font-size: 1.5rem;'>$headerText</h1>
        </div>
        <div style='padding: 20px;'>
            <p style='margin: 0 0 10px; color: #ffffff; line-height: 1.6;'><strong>Order ID:</strong> $orderId</p>
            <p style='margin: 0 0 10px; color: #ffffff; line-height: 1.6;'><strong>Name:</strong> $name</p>
            <p style='margin: 0 0 10px; color: #ffffff; line-height: 1.6;'><strong>Email:</strong> $email</p>
            <p style='margin: 0 0 10px; color: #ffffff; line-height: 1.6;'><strong>Phone:</strong> $phone</p>
            <p style='margin: 0 0 10px; color: #ffffff; line-height: 1.6;'><strong>Address:</strong> $address</p>
            <p style='margin: 0 0 10px; color: #ffffff; line-height: 1.6;'><strong>Timestamp:</strong> $timestamp</p>
            <hr style='border-color: #333;'>
            <h3 style='color: #ffffff;'>Product Ordered:</h3>
            <p style='margin: 0 0 10px; color: #ffffff;'><strong>Product ID:</strong> {$product['id']}</p>
            <p style='margin: 0 0 10px; color: #ffffff;'><strong>Product Name:</strong> {$product['name']}</p>
            <p style='margin: 0 0 10px; color: #ffffff;'><strong>Price:</strong> {$product['price']}</p>
            " . ($productImage ? "<img src='https://shamsrig.com/{$productImage}' alt='Product Image' style='max-width: 100px; border-radius: 8px; margin-top: 10px;'>" : "") . "
            <p style='margin-top: 10px; color: #ffffff;'><strong>Payment Screenshot:</strong> <a href='https://shamsrig.com/{$screenshotURL}' target='_blank' style='color: #c025ff;'>View Screenshot</a></p>
        </div>
        <div style='padding: 15px; background-color: #1e1f29; text-align: center; color: #ffffff; border-radius: 0 0 15px 15px;'>
            $footerText
            <p><a href='https://shamsrig.com' style='color: #c025ff; text-decoration: none;'>www.shamsrig.com</a></p>
        </div>
    </div>
    ";
  }

  // Admin email
  $toAdmin = 'atshammughal28@gmail.com';
  $headers = "MIME-Version: 1.0\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8\r\n";
  $headers .= "From: Shamsrig@shamsrig.com";
  mail($toAdmin, 'New Order Received', buildOrderEmail($order, false), $headers);

  // Customer confirmation email
  $toCustomer = $order['email'];
  mail($toCustomer, 'Order Confirmed - ShamsRig', buildOrderEmail($order, true), $headers);

  echo json_encode(['success' => true, 'order_id' => $currentOrderId]);
} else {
  echo json_encode(['success' => false, 'message' => 'Failed to upload screenshot.']);
}
?>
