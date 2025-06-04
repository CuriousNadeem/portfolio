<?php
// update-orders.php

header('Content-Type: application/json');

// Read the raw POST data
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

// Save to orders.json
$file = __DIR__ . '/assets/data/orders.json';
file_put_contents($file, json_encode($orders, JSON_PRETTY_PRINT));

echo json_encode(['success' => true, 'message' => 'Orders updated.']);
