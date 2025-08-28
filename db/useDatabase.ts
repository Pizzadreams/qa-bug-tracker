import * as SQLite from 'expo-sqlite';

export type Project = {
  id: number;
  name: string;
  description?: string;
};

export type Bug = {
  id: number;
  projectId: number;
  title: string;
  description?: string;
  severity?: string;
  status?: string;
};

const DB_NAME = 'bugtracker.db';

// Open database (use async openDatabaseAsync if available, else fallback to sync)
export const getDBConnection = async (): Promise<SQLite.SQLiteDatabase> => {
  if (SQLite.openDatabaseAsync) {
    return await SQLite.openDatabaseAsync(DB_NAME);
  }
  return SQLite.openDatabaseSync(DB_NAME);
};

// Create tables if they don't exist
export const createTables = async (db: SQLite.SQLiteDatabase): Promise<void> => {
  await db.withTransactionAsync(async () => {
    await db.execAsync(`CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT
    );`);
    await db.execAsync(`CREATE TABLE IF NOT EXISTS bugs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      projectId INTEGER,
      title TEXT NOT NULL,
      description TEXT,
      severity TEXT,
      status TEXT,
      FOREIGN KEY (projectId) REFERENCES projects(id) ON DELETE CASCADE
    );`);
  });
};

// Get all projects
export const getProjects = async (db: SQLite.SQLiteDatabase): Promise<Project[]> => {
  const projects = await db.getAllAsync<Project>('SELECT * FROM projects;');
  return projects;
};

// Insert a project
export const insertProject = async (
  db: SQLite.SQLiteDatabase,
  project: Omit<Project, 'id'>
): Promise<void> => {
  await db.runAsync(
    'INSERT INTO projects (name, description) VALUES (?, ?);',
    [project.name, project.description || null]
  );
};


// Delete a project
export const deleteProject = async (db: SQLite.SQLiteDatabase, id: number): Promise<void> => {
  await db.runAsync('DELETE FROM projects WHERE id = ?;', [id]);
};

// Get bugs for a project
export const getBugsByProject = async (
  db: SQLite.SQLiteDatabase,
  projectId: number
): Promise<Bug[]> => {
  // For reads, you can use getAllAsync to get the rows, or execAsync + extract rows
  const bugs = await db.getAllAsync<Bug>('SELECT * FROM bugs WHERE projectId = ?;', [projectId]);
  return bugs;
};

// Insert a new bug
export const insertBug = async (
  db: SQLite.SQLiteDatabase,
  bug: Omit<Bug, 'id'>
): Promise<void> => {
  await db.runAsync(
    'INSERT INTO bugs (projectId, title, description, severity, status) VALUES (?, ?, ?, ?, ?);',
    [bug.projectId, bug.title, bug.description || null, bug.severity || null, bug.status || null]
  );
};

// Update a project
export const updateProject = async (
  db: SQLite.SQLiteDatabase,
  project: Project
): Promise<void> => {
  await db.runAsync(
    'UPDATE projects SET name = ?, description = ? WHERE id = ?;',
    [project.name, project.description || null, project.id]
  );
};

// Update a bug
export const updateBug = async (
  db: SQLite.SQLiteDatabase,
  bug: Bug
): Promise<void> => {
  await db.runAsync(
    'UPDATE bugs SET title = ?, description = ?, severity = ?, status = ? WHERE id = ?;',
    [bug.title, bug.description || null, bug.severity || null, bug.status || null, bug.id]
  );
};

// Delete a bug
export const deleteBug = async (db: SQLite.SQLiteDatabase, id: number): Promise<void> => {
  await db.runAsync('DELETE FROM bugs WHERE id = ?;', [id]);
};

