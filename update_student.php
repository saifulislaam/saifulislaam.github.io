<?php
require_once 'db_connect.php';
if($_SERVER['REQUEST_METHOD'] !== 'POST') { header('Location: view_students.php'); exit; }

$id = intval($_POST['id'] ?? 0);
$roll = trim($_POST['roll_no'] ?? '');
$name = trim($_POST['name'] ?? '');
$cls  = trim($_POST['class'] ?? '');
$email= trim($_POST['email'] ?? '');
$contact= trim($_POST['contact'] ?? '');
$address= trim($_POST['address'] ?? '');
$admission_date = $_POST['admission_date'] ?? null;

if(!$id || !$roll || !$name) {
    echo "<script>alert('Invalid data'); history.back();</script>"; exit;
}

// update with prepared statement
$stmt = $mysqli->prepare("UPDATE students SET roll_no=?, name=?, class=?, email=?, contact=?, address=?, admission_date=? WHERE id=?");
$stmt->bind_param('sssssssi', $roll, $name, $cls, $email, $contact, $address, $admission_date, $id);
if($stmt->execute()){
    echo "<script>alert('Student updated'); window.location='view_students.php';</script>";
} else {
    echo "<script>alert('Error: ".$mysqli->error."'); history.back();</script>";
}
$stmt->close();
$mysqli->close();
?>
