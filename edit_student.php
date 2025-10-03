<?php
require_once 'db_connect.php';
$id = intval($_GET['id'] ?? 0);
if(!$id){ header('Location: view_students.php'); exit; }

$stmt = $mysqli->prepare("SELECT * FROM students WHERE id = ? LIMIT 1");
$stmt->bind_param('i',$id);
$stmt->execute();
$res = $stmt->get_result();
$student = $res->fetch_assoc();
if(!$student){ header('Location: view_students.php'); exit; }
?>
<!doctype html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Edit Student</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="styles.css"></head>
<body>
<div class="container my-4">
  <h4>Edit Student</h4>
  <form action="update_student.php" method="post" onsubmit="return validateStudentForm('editForm')" id="editForm">
    <input type="hidden" name="id" value="<?=htmlspecialchars($student['id'])?>">
    <div class="row g-3">
      <div class="col-md-4"><input class="form-control" name="roll_no" value="<?=htmlspecialchars($student['roll_no'])?>"></div>
      <div class="col-md-8"><input class="form-control" name="name" value="<?=htmlspecialchars($student['name'])?>"></div>
      <div class="col-md-4"><input class="form-control" name="class" value="<?=htmlspecialchars($student['class'])?>"></div>
      <div class="col-md-4"><input class="form-control" name="email" value="<?=htmlspecialchars($student['email'])?>"></div>
      <div class="col-md-4"><input class="form-control" name="contact" value="<?=htmlspecialchars($student['contact'])?>"></div>
      <div class="col-12"><textarea class="form-control" name="address"><?=htmlspecialchars($student['address'])?></textarea></div>
      <div class="col-md-4"><input class="form-control" type="date" name="admission_date" value="<?=htmlspecialchars($student['admission_date'])?>"></div>
      <div class="col-12 text-end">
        <a class="btn btn-secondary" href="view_students.php">Cancel</a>
        <button class="btn btn-success" type="submit">Update</button>
      </div>
    </div>
  </form>
</div>
<script src="scripts.js"></script>
</body>
</html>
<?php $stmt->close(); $mysqli->close(); ?>
