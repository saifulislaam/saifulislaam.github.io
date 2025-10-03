// scripts.js
function confirmDelete(roll){
  return confirm('Are you sure you want to delete record for Roll No: ' + roll + '?');
}

// simple client validation for add/edit forms
function svalidateStudentForm(formId){
  const f = document.getElementById(formId);
  const roll = f.roll_no.value.trim();
  const name = f.name.value.trim();
  if(!roll){ alert('Roll No is required'); f.roll_no.focus(); return false; }
  if(!name){ alert('Student name is required'); f.name.focus(); return false; }
  return true;
}
