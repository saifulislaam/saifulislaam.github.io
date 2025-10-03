<?php
require_once 'db_connect.php';
$roll = trim($_GET['roll_no'] ?? '');
if (!$roll) {
    header('Location: search_student.html');
    exit;
}

$stmt = $mysqli->prepare("SELECT id, roll_no, name, class, email, contact, address, admission_date FROM students WHERE roll_no = ? LIMIT 1");
$stmt->bind_param('s', $roll);
$stmt->execute();
$res = $stmt->get_result();
$student = $res->fetch_assoc();
?>
<!doctype html>
<html>
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Search Result</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="container my-4">
  <a href="search_student.html" class="btn btn-link">&larr; Back to Search</a>
  <?php if ($student): ?>
    <div class="card p-3">
      <h5>Student Details</h5>
      <table class="table">
        <tr><th>Roll No</th><td><?=htmlspecialchars($student['roll_no'])?></td></tr>
        <tr><th>Name</th><td><?=htmlspecialchars($student['name'])?></td></tr>
        <tr><th>Class</th><td><?=htmlspecialchars($student['class'])?></td></tr>
        <tr><th>Email</th><td><?=htmlspecialchars($student['email'])?></td></tr>
        <tr><th>Contact</th><td><?=htmlspecialchars($student['contact'])?></td></tr>
        <tr><th>Address</th><td><?=nl2br(htmlspecialchars($student['address']))?></td></tr>
        <tr><th>Admission Date</th><td><?=htmlspecialchars($student['admission_date'])?></td></tr>
      </table>
      <div>
        <a class="btn btn-sm btn-primary" href="edit_student.php?id=<?=$student['id']?>"><i class="fa fa-edit"></i> Edit</a>
        <a class="btn btn-sm btn-danger" href="delete_student.php?id=<?=$student['id']?>" onclick="return confirm('Delete this student?')"><i class="fa fa-trash"></i> Delete</a>
      </div>
    </div>
  <?php else: ?>
    <div class="alert alert-warning">No student found for Roll No: <?=htmlspecialchars($roll)?></div>
  <?php endif; ?>
</div>
</body>
</html>
<?php
$stmt->close();
$mysqli->close();
?>
