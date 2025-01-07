const userTable = document.querySelector('#user-table tbody');

// Функция для получения пользователей
async function fetchUsers() {
  try {
    const response = await fetch('http://localhost:5000/api/users');
    const users = await response.json();

    // Очищаем таблицу перед добавлением новых данных
    userTable.innerHTML = '';

    // Добавляем пользователей в таблицу
    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.participation_type}</td>
        <td>${user.performance_title || '-'}</td>
        <td>${user.emotion}</td>
        <td>
          <button onclick="deleteUser(${user.id})">Удалить</button>
        </td>
      `;
      userTable.appendChild(row);
    });
  } catch (error) {
    console.error('Ошибка загрузки пользователей:', error);
  }
}

// Функция для удаления пользователя
async function deleteUser(userId) {
  try {
    const response = await fetch(`http://localhost:5000/api/users/${userId}`, { method: 'DELETE' });
    if (response.ok) {
      alert('Пользователь удален');
      fetchUsers(); // Перезагружаем данные после удаления
    } else {
      alert('Ошибка удаления пользователя');
    }
  } catch (error) {
    console.error('Ошибка удаления:', error);
  }
}

// Загружаем пользователей при загрузке страницы
fetchUsers();
