<?php
require_once 'db_connect.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: add_student.html');
    exit;
}

$roll = trim($_POST['roll_no'] ?? '');
$name = trim($_POST['name'] ?? '');
$cls  = trim($_POST['class'] ?? '');
$email= trim($_POST['email'] ?? '');
$contact= trim($_POST['contact'] ?? '');
$address= trim($_POST['address'] ?? '');
$admission_date = $_POST['admission_date'] ?? null;

if (!$roll || !$name) {
    echo "<script>alert('Roll No and Name are required.'); history.back();</script>";
    exit;
}

$stmt = $mysqli->prepare("INSERT INTO students (roll_no, name, class, email, contact, address, admission_date) VALUES (?, ?, ?, ?, ?, ?, ?)");
if (!$stmt) { die('Prepare failed: '.$mysqli->error); }
$stmt->bind_param('sssssss', $roll, $name, $cls, $email, $contact, $address, $admission_date);
if ($stmt->execute()) {
    echo "<script>alert('Student added successfully'); window.location='view_students.php';</script>";
} else {
    if ($mysqli->errno === 1062) {
        echo "<script>alert('Roll number already exists'); history.back();</script>";
    } else {
        echo "<script>alert('Error: ".$mysqli->error."'); history.back();</script>";
    }
}
$stmt->close();
$mysqli->close();
?>
