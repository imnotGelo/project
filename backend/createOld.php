<?php
include "config.php";

$input = file_get_contents('php://input');
$data = json_decode($input, true);
$message = array();
$LRN = $data['LRN'];
$firstname = $data['firstname'];
$middlename = $data['middlename'];
$lastname = $data['lastname'];
$email = $data['email'];
$address = $data['address'];
$report_card = $data['report_card'];
$grade_level = $data['grade_level'];
$strand = isset($data['strand']) ? $data['strand'] : NULL;


$q = mysqli_query($con, "INSERT INTO `studentpending` (`LRN`,`firstname`,`middlename`,`lastname`, `email`,`address`,`grade_level`, `strand`, `report_card`)
 VALUES ('$LRN', '$firstname','$middlename', '$lastname', '$email', '$address','$grade_level','$strand', '$report_card')");

if ($q) {
    http_response_code(201);
        $message['status'] = "Success";
} else {
    http_response_code(422);
    $message['status'] = "Error";
    $message['error'] = mysqli_error($con);
}

echo json_encode($message);
?>
