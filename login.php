<?php
session_start();
require_once 'db_connect.php';

if($_SERVER['REQUEST_METHOD'] !== 'POST'){ header('Location: login.html'); exit; }
$username = trim($_POST['username'] ?? '');
$password = $_POST['password'] ?? '';

$stmt = $mysqli->prepare("SELECT id, username, password, full_name FROM staff WHERE username = ? LIMIT 1");
$stmt->bind_param('s', $username);
$stmt->execute();
$res = $stmt->get_result();
$user = $res->fetch_assoc();
if($user && password_verify($password, $user['password'])){
    $_SESSION['staff_id'] = $user['id'];
    $_SESSION['staff_name'] = $user['full_name'] ?: $user['username'];
    header('Location: view_students.php');
    exit;
} else {
    echo "<script>alert('Invalid credentials'); window.location='login.html';</script>";
}
?>
