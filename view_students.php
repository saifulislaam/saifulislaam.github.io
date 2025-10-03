<?php
require_once 'db_connect.php';

// pagination
$page = max(1, intval($_GET['page'] ?? 1));
$perPage = 10;
$start = ($page - 1) * $perPage;

// sorting
$allowedSort = ['id','roll_no','name','class','admission_date'];
$sort = in_array($_GET['sort'] ?? 'id', $allowedSort) ? $_GET['sort'] : 'id';
$order = ($_GET['order'] ?? 'asc') === 'desc' ? 'DESC' : 'ASC';

// total count
$totalRes = $mysqli->query("SELECT COUNT(*) AS cnt FROM students");
$total = $totalRes->fetch_assoc()['cnt'] ?? 0;
$totalPages = ceil($total / $perPage);

// fetch page
$stmt = $mysqli->prepare("SELECT id, roll_no, name, class, email, contact, admission_date FROM students ORDER BY $sort $order LIMIT ?, ?");
$stmt->bind_param('ii', $start, $perPage);
$stmt->execute();
$res = $stmt->get_result();
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>All Students</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="container my-4">
  <h4>Students (<?=(int)$total?>)</h4>
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th><a href="?sort=roll_no&order=<?= $order==='ASC'?'desc':'asc' ?>">Roll</a></th>
        <th><a href="?sort=name&order=<?= $order==='ASC'?'desc':'asc' ?>">Name</a></th>
        <th>Class</th>
        <th>Email</th>
        <th>Contact</th>
        <th>Admission Date</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <?php while($r = $res->fetch_assoc()): ?>
      <tr>
        <td><?=htmlspecialchars($r['roll_no'])?></td>
        <td><?=htmlspecialchars($r['name'])?></td>
        <td><?=htmlspecialchars($r['class'])?></td>
        <td><?=htmlspecialchars($r['email'])?></td>
        <td><?=htmlspecialchars($r['contact'])?></td>
        <td><?=htmlspecialchars($r['admission_date'])?></td>
        <td>
          <a class="btn btn-sm btn-primary" href="edit_student.php?id=<?=$r['id']?>"><i class="fa fa-edit"></i></a>
          <a class="btn btn-sm btn-danger" href="delete_student.php?id=<?=$r['id']?>" onclick="return confirm('Delete?')"><i class="fa fa-trash"></i></a>
        </td>
      </tr>
      <?php endwhile; ?>
    </tbody>
  </table>

  <!-- pagination -->
  <nav>
    <ul class="pagination">
      <?php for($p=1;$p<=$totalPages;$p++): ?>
        <li class="page-item <?= $p==$page ? 'active' : '' ?>"><a class="page-link" href="?page=<?=$p?>"><?=$p?></a></li>
      <?php endfor; ?>
    </ul>
  </nav>

</div>
</body>
</html>
<?php
$stmt->close();
$mysqli->close();
?>
