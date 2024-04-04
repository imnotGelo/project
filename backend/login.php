<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include "config.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);
$message = array();

$LRN = $data['LRN'];
$password = $data['password'];

$stmt = $con->prepare("SELECT * FROM `createuser` WHERE `LRN` = ? AND `password` = ? AND `status` = 1");
$stmt->bind_param("ss", $LRN, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();
    $userData = array(
        'LRN' => $row['LRN'],
        'firstname' => $row['firstname'],
        'middlename' => $row['middlename'],
        'lastname' => $row['lastname'],
        'email' => $row['email'],
        'address' => $row['address']
    );

    $stmt = $con->prepare("SELECT * FROM students WHERE LRN = ?");
    $stmt->bind_param("s", $LRN);
    $stmt->execute();
    $result = $stmt->get_result();

    $isStudent = $result->num_rows == 1; // Check if LRN is in students table

    if ($isStudent) {
        $row = $result->fetch_assoc();
        $studentData = array(
            'strand' => $row['strand'],
            'grade_level' => $row['grade_level']
        );
        $userData['studentData'] = $studentData;
    }

    http_response_code(200);
    $message['status'] = "Success";
    $message['user'] = $userData;
    $message['isStudent'] = $isStudent;
} else {
    http_response_code(401);
    $message['status'] = "Error";
    $message['error'] = "Invalid credentials";
}

$stmt->close();
echo json_encode($message);
?>
