<?php
// update-orders.php

header('Content-Type: application/json');

// Read raw POST data
$json = file_get_contents('php://input');
if (!$json) {
  echo json_encode(['success' => false, 'message' => 'No data received.']);
  exit;
}

$orders = json_decode($json, true);
if (!is_array($orders)) {
  echo json_encode(['success' => false, 'message' => 'Invalid JSON format.']);
  exit;
}

$ordersFile = __DIR__ . '/assets/data/orders.json';
$existingOrders = file_exists($ordersFile) ? json_decode(file_get_contents($ordersFile), true) : [];

foreach ($orders as $i => $updatedOrder) {
  if (isset($existingOrders[$i])) {
    $oldStatus = $existingOrders[$i]['status'];
    $newStatus = $updatedOrder['status'];

    if ($oldStatus !== $newStatus) {
      sendStatusUpdateEmail($updatedOrder);
    }
  }
}

file_put_contents($ordersFile, json_encode($orders, JSON_PRETTY_PRINT));

echo json_encode(['success' => true, 'message' => 'Orders updated.']);

function sendStatusUpdateEmail($order) {
  $email = $order['email'];
  $name = $order['fullname'];
  $orderId = $order['order_id'];
  $product = $order['product']['name'];
  $price = $order['product']['price'];
  $image = $order['product']['image'];
  $status = $order['status'];
  $timestamp = $order['timestamp'];
  $whatsappLink = "https://wa.me/923120569862";

  $subject = "Order Update - Order #$orderId";

  $messageBody = "<div style='max-width:600px;margin:0 auto;background-color:#15161c;border-radius:15px;overflow:hidden;box-shadow:0 0 20px rgba(0,0,0,0.3);'>
    <div style='padding:20px;background-color:#c025ff;color:#000;border-radius:15px 15px 0 0;text-align:center;'>
      <h2 style='margin:0;'>Order Update - ID #$orderId</h2>
    </div>
    <div style='padding:20px;color:#fff;'>
      <p>Dear <strong>$name</strong>,</p>
      <p>Your order <strong>#$orderId</strong> for <strong>$product</strong> (Price: <strong>$price</strong>) placed on <strong>$timestamp</strong> is now <strong>$status</strong>.</p>
      <img src='https://shamsrig.com/$image' alt='Product Image' style='max-width:100px;border-radius:8px;margin:10px 0;'>
      <hr style='border-color:#333;'>
      <p>";

  if ($status === 'Processing') {
    $messageBody .= "We have reviewed your payment screenshot and confirmed the order. It is now being prepared. We will notify you again once it's out for delivery.";
  } elseif ($status === 'Out for Delivery') {
    $messageBody .= "Good news! Your order has been dispatched and is now out for delivery. You should receive it soon.";
  } elseif ($status === 'Completed') {
    $messageBody .= "Your order has been successfully completed. If you have not received it or need assistance, please contact us at <a href='$whatsappLink' style='color:#c025ff;'>WhatsApp Support</a>.";
  }

  $messageBody .= "</p>
    </div>
    <div style='padding:15px;background-color:#1e1f29;color:#fff;text-align:center;border-radius:0 0 15px 15px;'>
      <p>If you have questions, please contact us on WhatsApp: <a href='$whatsappLink' style='color:#c025ff;'>+92 312 0569862</a></p>
      <p><a href='https://shamsrig.com' style='color:#c025ff;text-decoration:none;'>www.shamsrig.com</a></p>
    </div>
  </div>";

  $headers = "MIME-Version: 1.0\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8\r\n";
  $headers .= "From: Shamsrig@shamsrig.com";

  mail($email, $subject, $messageBody, $headers);
}
?>
