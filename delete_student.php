<?php
require_once 'db_connect.php';
$id = intval($_GET['id'] ?? 0);
if(!$id){ header('Location: view_students.php'); exit; }

$stmt = $mysqli->prepare("DELETE FROM students WHERE id = ? LIMIT 1");
$stmt->bind_param('i', $id);
if($stmt->execute()){
    echo "<script>alert('Student deleted'); window.location='view_students.php';</script>";
} else {
    echo "<script>alert('Error deleting record'); window.location='view_students.php';</script>";
}
$stmt->close();
$mysqli->close();
?>
