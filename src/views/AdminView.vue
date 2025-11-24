<template>
  <div class="admin-dashboard">
    <h1>Pet Store Admin Dashboard</h1>

```
<!-- Stats Cards -->
<div class="stats-cards">
  <div class="stat-card">
    <h3>🐶 Animals</h3>
    <p>120</p>
  </div>
  <div class="stat-card">
    <h3>👥 Customers</h3>
    <p>85</p>
  </div>
  <div class="stat-card">
    <h3>🛒 Orders</h3>
    <p>230</p>
  </div>
  <div class="stat-card">
    <h3>🧑‍💼 Employees</h3>
    <p>15</p>
  </div>
</div>

<!-- Admin Action Cards -->
<div class="admin-actions">
  <div class="action-card">
    <h3>Manage Pets</h3>
    <p>Add, edit, or remove pets</p>
  </div>
  <div class="action-card">
    <h3>Manage Food</h3>
    <p>Add, edit, or remove food items</p>
  </div>
  <div class="action-card">
    <h3>Manage Supplies</h3>
    <p>Update stock and details</p>
  </div>
  <div class="action-card">
    <h3>Manage Orders</h3>
    <p>View and update customer orders</p>
  </div>
  <div class="action-card">
    <h3>Manage Employees</h3>
    <p>Add, edit, or remove employees</p>
  </div>
</div>
```

  </div>
</template>

<script setup>
// Future dynamic data fetching can be added here
</script>

<style scoped>
.admin-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
  color: #2c3e50;
}

h1 {
  text-align: center;
  color: #27ae60;
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

/* Stats Cards */
.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: linear-gradient(135deg, #81ecec22 0%, #74b9ff22 100%);
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-card h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.stat-card p {
  font-size: 1.2rem;
  color: #2c3e50;
}

/* Admin Action Cards */
.admin-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.action-card {
  background: linear-gradient(135deg, #ffeaa722 0%, #fab1a022 100%);
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.action-card:hover {
  transform: translateY(-5px);
}

.action-card h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.action-card p {
  font-size: 1rem;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .stats-cards, .admin-actions {
    grid-template-columns: 1fr;
  }
}
</style>
