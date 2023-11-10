// ユーザー作成
function createUser() {
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
  
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('User created successfully');
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error creating user');
    });
  }
  
  // ユーザー更新
  function updateUser() {
    const userId = document.getElementById('userId').value; // 更新するユーザーのID
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
  
    fetch(`/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('User updated successfully');
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error updating user');
    });
  }
  
  // ユーザー削除
  function deleteUser() {
    const userId = document.getElementById('userId').value; // 削除するユーザーのID
  
    fetch(`/users/${userId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('User deleted successfully');
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error deleting user');
    });
  }
  