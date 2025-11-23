import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref([
    { id: 1, name: 'Pet Shop', description: 'Redesign website UI/UX', status: 'active', taskCount: 12, memberCount: 5, createdAt: '2024-01-15' }
  ])

  const loading = ref(false)
  const error = ref(null)

  const activeProjects = computed(() => projects.value.filter(p => p.status === 'active'))
  const completedProjects = computed(() => projects.value.filter(p => p.status === 'completed'))
  const totalProjects = computed(() => projects.value.length)

  function addProject(project) {
    const newProject = { id: Date.now(), ...project, taskCount: 0, memberCount: 1, status: 'active', createdAt: new Date().toISOString() }
    projects.value.push(newProject)
  }

  function updateProject(id, updates) { const idx = projects.value.findIndex(p=>p.id===id); if(idx!==-1) projects.value[idx]={...projects.value[idx], ...updates} }
  function deleteProject(id) { const idx = projects.value.findIndex(p=>p.id===id); if(idx!==-1) projects.value.splice(idx,1) }
  function getProjectById(id) { return projects.value.find(p => p.id === parseInt(id)) }

  async function fetchProjects() {
    loading.value = true
    error.value = null
    try { await new Promise(r => setTimeout(r,500)) }
    catch(err){ error.value=err.message }
    finally{ loading.value=false }
  }

  return { projects, loading, error, activeProjects, completedProjects, totalProjects, addProject, updateProject, deleteProject, getProjectById, fetchProjects }
})
