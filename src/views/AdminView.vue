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
  <router-link to="/manage-pets" class="action-card">
    <h3>Manage Pets</h3>
    <p>Add, edit, or remove pets</p>
  </router-link>
  <router-link to="/manage-food" class="action-card">
    <h3>Manage Food</h3>
    <p>Add, edit, or remove food items</p>
  </router-link>
  <router-link to="/manage-supplies" class="action-card">
    <h3>Manage Supplies</h3>
    <p>Update stock and details</p>
  </router-link>
  <router-link to="/manage-orders" class="action-card">
    <h3>Manage Orders</h3>
    <p>View and update customer orders</p>
  </router-link>
  <router-link to="/manage-employees" class="action-card">
    <h3>Manage Employees</h3>
    <p>Add, edit, or remove employees</p>
  </router-link>
</div>
```

  </div>
</template>

<script setup>
// Placeholder for dynamic data fetching in the future
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
  margin-bottom: 2.5rem;
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
  transition: all 0.3s ease;
  cursor: default;
}
.stat-card:hover {
  transform: translateY(-5px);
  background: linear-gradient(135deg, #81ecec33 0%, #74b9ff33 100%);
}

.stat-card h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}
.stat-card p {
  font-size: 1.8rem;
  font-weight: bold;
  color: #0984e3;
}

/* Admin Action Cards */
.admin-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.action-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #dff9fb;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  text-decoration: none;
  color: #2d3436;
  transition: all 0.3s ease;
}
.action-card:hover {
  transform: translateY(-5px);
  background: #c7ecee;
}

.action-card h3 {
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}
.action-card p {
  font-size: 1rem;
}

/* Responsive tweaks */
@media (max-width: 768px) {
  .stats-cards, .admin-actions {
    grid-template-columns: 1fr;
  }
}
</style>
