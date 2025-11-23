<template>
  <div class="projects-view">

    <!-- Calendar Placeholder -->
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

    <!-- Projects Header -->
    <div class="header">
      <h1>Projects</h1>
      <button class="btn btn-primary" @click="showCreateModal = true">
        + New Project
      </button>
    </div>

    <!-- Search Bar -->
    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search projects..."
        class="search-input"
      />
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading projects...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredProjects.length === 0" class="empty-state">
      <div class="icon">🐾</div>
      <h2>No projects yet</h2>
      <p>Create your first project to get started</p>
      <button class="btn btn-primary" @click="showCreateModal = true">
        + Create Project
      </button>
    </div>

    <!-- Projects Grid -->
    <div v-else class="projects-grid">
      <div
        v-for="project in filteredProjects"
        :key="project.id"
        class="project-card"
        @click="goToBoard(project.id)"
      >
        <div class="project-header">
          <h3>{{ project.name }}</h3>
          <span class="status-badge" :class="project.status">{{ project.status }}</span>
        </div>
        <p class="description">{{ project.description }}</p>
        <div class="project-footer">
          <span class="task-count">{{ project.taskCount }} tasks</span>
          <span class="members">👥 {{ project.memberCount }}</span>
        </div>
      </div>
    </div>

    <!-- Create Project Modal -->
    <div v-if="showCreateModal" class="modal-overlay" @click="showCreateModal = false">
      <div class="modal" @click.stop>
        <h2>Create New Project</h2>
        <p>Project creation form coming in Milestone 3</p>
        <button class="btn btn-secondary" @click="showCreateModal = false">Close</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'


const router = useRouter()
const projectsStore = useProjectsStore()

const searchQuery = ref('')
const loading = ref(false)
const showCreateModal = ref(false)

const filteredProjects = computed(() => {
  if (!searchQuery.value) return projectsStore.projects
  return projectsStore.projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const goToBoard = projectId => {
  router.push({ name: 'project-board', params: { id: projectId } })
}
</script>

<style scoped>
.projects-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
}

/* Calendar Placeholder */
.calendar-placeholder {
  background: #dff9fb;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.calendar-placeholder .icon { font-size: 4rem; margin-bottom: 1rem; }
.calendar-placeholder h2 { font-size: 1.8rem; margin-bottom: 0.5rem; color: #2c3e50; }
.calendar-placeholder p { margin-bottom: 1.5rem; color: #2d3436; font-size: 1.1rem; }
.feature-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; max-width: 800px; margin: 0 auto; }
.feature-item { background: #81ecec22; padding: 1rem; border-radius: 8px; transition: all 0.3s ease; }
.feature-item:hover { background: #74b9ff22; transform: translateY(-3px); }

/* Projects Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
.header h1 { font-size: 2.5rem; color: #27ae60; }
.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn-primary {
  background: linear-gradient(135deg, #81ecec 0%, #74b9ff 100%);
  color: white;
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(116, 185, 255, 0.4); }
.btn-secondary {
  background: white;
  color: #27ae60;
  border: 2px solid #27ae60;
}

/* Search Bar */
.search-bar { margin-bottom: 2rem; }
.search-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}
.search-input:focus { outline: none; border-color: #27ae60; }

/* Loading Spinner */
.loading { text-align: center; padding: 4rem; }
.spinner {
  width: 50px; height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #27ae60;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Empty State */
.empty-state { text-align: center; padding: 4rem; background: #dff9fb; border-radius: 12px; }
.empty-state .icon { font-size: 4rem; margin-bottom: 1rem; }
.empty-state h2 { color: #2c3e50; margin-bottom: 0.5rem; }
.empty-state p { color: #2d3436; margin-bottom: 2rem; }

/* Projects Grid */
.projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
.project-card {
  background: white; padding: 1.5rem; border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1); cursor: pointer;
  transition: all 0.3s ease;
}
.project-card:hover { transform: translateY(-5px); box-shadow: 0 6px 20px rgba(0,0,0,0.15); }
.project-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem; }
.project-header h3 { color: #2c3e50; font-size: 1.3rem; }
.status-badge { padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.85rem; font-weight: 600; }
.status-badge.active { background: #d4edda; color: #155724; }
.status-badge.completed { background: #cce5ff; color: #004085; }
.status-badge.archived { background: #f8d7da; color: #721c24; }
.description { color: #7f8c8d; margin-bottom: 1rem; line-height: 1.5; }
.project-footer { display: flex; justify-content: space-between; color: #95a5a6; font-size: 0.9rem; }

/* Modal */
.modal-overlay { position: fixed; top:0; left:0; right:0; bottom:0; background: rgba(0,0,0,0.5); display:flex; justify-content:center; align-items:center; z-index:1000; }
.modal { background:white; padding:2rem; border-radius:12px; max-width:500px; width:90%; text-align:center; }
.modal h2 { margin-bottom:1rem; color:#2c3e50; }
.modal p { margin-bottom:2rem; color:#7f8c8d; }

@media (max-width:768px) {
  .header { flex-direction: column; align-items: stretch; gap: 1rem; }
  .projects-grid { grid-template-columns: 1fr; }
  .feature-list { grid-template-columns: 1fr; }
}
</style>
