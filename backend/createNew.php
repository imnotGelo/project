<?php
include "config.php";

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Retrieve POST data
$LRN = $_POST['LRN'];
$firstname = $_POST['firstname'];
$middlename = $_POST['middlename'];
$lastname = $_POST['lastname'];
$email = $_POST['email'];
$address = $_POST['address'];
$grade_level = $_POST['grade_level'];
$strand = isset($_POST['strand']) ? $_POST['strand'] : NULL;

// Retrieve uploaded file details
$report_card_tmp_name = $_FILES['report_card']['tmp_name'];
$good_moral_tmp_name = $_FILES['good_moral']['tmp_name'];
$cert_trans_tmp_name = $_FILES['cert_trans']['tmp_name'];
$birth_cert_tmp_name = $_FILES['birth_cert']['tmp_name'];

// Check if LRN already exists in the database
$check_query = mysqli_query($con, "SELECT * FROM studentpending WHERE LRN = '$LRN'");
if (mysqli_num_rows($check_query) > 0) {
    http_response_code(409);
    $message['status'] = "Error";
    $message['error'] = "LRN already exists in the database.";
    echo json_encode($message);
    exit;
}

// Prepare SQL statement for insertion
$stmt = $con->prepare("INSERT INTO `studentpending` (`LRN`, `firstname`, `middlename`, `lastname`, `email`, `address`, `grade_level`, `strand`, `report_card`, `good_moral`, `cert_trans`, `birth_cert`) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

// Bind parameters
$stmt->bind_param("ssssssssssss", $LRN, $firstname, $middlename, $lastname, $email, $address, $grade_level, $strand, $report_card_content, $good_moral_content, $cert_trans_content, $birth_cert_content);

// Read and bind BLOB data for report_card
$report_card_content = file_get_contents($report_card_tmp_name);
$stmt->send_long_data(8, $report_card_content);

// Read and bind BLOB data for good_moral
$good_moral_content = file_get_contents($good_moral_tmp_name);
$stmt->send_long_data(9, $good_moral_content);

// Read and bind BLOB data for cert_trans
$cert_trans_content = file_get_contents($cert_trans_tmp_name);
$stmt->send_long_data(10, $cert_trans_content);

// Read and bind BLOB data for birth_cert
$birth_cert_content = file_get_contents($birth_cert_tmp_name);
$stmt->send_long_data(11, $birth_cert_content);

// Execute SQL statement
if ($stmt->execute()) {
    http_response_code(201); // Created status code
    $message['status'] = "Success";
} else {
    http_response_code(422); // Unprocessable Entity status code
    $message['status'] = "Error";
    $message['error'] = $stmt->error;
}

// Output response message as JSON
echo json_encode($message);
?>
