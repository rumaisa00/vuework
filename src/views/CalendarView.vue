  <div class="calendar-view">
    <h1>Pet Store Calendar</h1>

```
<div class="calendar-placeholder">
  <div class="icon">📅</div>
  <h2>Schedule & Tasks</h2>
  <p>Track store activities, orders, and appointments efficiently.</p>

  <div class="feature-list">
    <div class="feature-item">🐾 View all tasks by date</div>
    <div class="feature-item">🛒 Drag & drop to reschedule orders</div>
    <div class="feature-item">👥 Filter by staff or project</div>
    <div class="feature-item">📅 Monthly and weekly views</div>
  </div>
</div>
```

  </div>
</template>

<script setup>
// Future implementation for interactive calendar
</script>

<style scoped>
.calendar-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
  color: #2c3e50;
}

h1 {
  font-size: 2.5rem;
  color: #27ae60;
  text-align: center;
  margin-bottom: 2rem;
}

.calendar-placeholder {
  background: #dff9fb;
  padding: 3rem 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}
.calendar-placeholder:hover {
  transform: translateY(-5px);
}

.icon {
  font-size: 5rem;
  margin-bottom: 1rem;
}

h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.8rem;
}

p {
  color: #2d3436;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.feature-item {
  padding: 1rem;
  background: #81ecec22;
  border-radius: 8px;
  color: #2c3e50;
  font-weight: 500;
  transition: all 0.3s ease;
}
.feature-item:hover {
  background: #74b9ff22;
  transform: translateY(-3px);
}

@media (max-width: 768px) {
  .feature-list {
    grid-template-columns: 1fr;
  }
}
</style>
