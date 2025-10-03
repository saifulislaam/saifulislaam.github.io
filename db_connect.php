<?php
$mysqli = new mysqli("localhost", "root", "", "student_db");

// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}
?>
