export type ID = string;
export type Role = 'admin' | 'member';
export type ProjectStatus = 'active' | 'archived';
export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';
export type EntityType = 'project' | 'task' | 'comment';
export type ActivityAction = 'created' | 'updated' | 'deleted' | 'status_changed' | 'commented';

export interface User { id: ID; name: string; email: string; role: Role; createdAt: string; updatedAt: string; }
export interface Project { id: ID; ownerId: ID; name: string; description?: string; status: ProjectStatus; createdAt: string; updatedAt: string; }
export interface Task {
  id: ID; projectId: ID; title: string; description?: string;
  status: TaskStatus; priority: TaskPriority; assigneeId?: ID | null;
  dueDate?: string | null; createdAt: string; updatedAt: string; labelIds?: ID[];
}
export interface Comment { id: ID; taskId: ID; authorId: ID; body: string; createdAt: string; }
export interface Label { id: ID; name: string; colorHex: `#${string}`; createdAt: string; }
export interface TaskLabel { taskId: ID; labelId: ID; }
export interface ActivityLog {
  id: ID; actorId: ID; entityType: EntityType; entityId: ID;
  action: ActivityAction; metadata?: Record<string, unknown>; createdAt: string;
}
