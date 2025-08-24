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

// Open the database synchronously.
// For modern Expo, you can also use openDatabaseAsync()
export const getDBConnection = (): SQLite.SQLiteDatabase => {
  return SQLite.openDatabaseSync(DB_NAME);
};

// Create tables using transactionAsync and executeSqlAsync
export const createTables = async (db: SQLite.SQLiteDatabase): Promise<void> => {
  await db.transactionAsync(async (tx) => {
    await tx.executeSqlAsync(
      `CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT
      );`
    );
    await tx.executeSqlAsync(
      `CREATE TABLE IF NOT EXISTS bugs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        projectId INTEGER,
        title TEXT NOT NULL,
        description TEXT,
        severity TEXT,
        status TEXT,
        FOREIGN KEY (projectId) REFERENCES projects(id) ON DELETE CASCADE
      );`
    );
  });
};

// Get all projects
export const getProjects = async (db: SQLite.SQLiteDatabase): Promise<Project[]> => {
  return await db.readTransactionAsync(async (tx) => {
    const result = await tx.executeSqlAsync('SELECT * FROM projects;');
    return result.rows._array as Project[];
  });
};

// Get bugs for a specific project
export const getBugsByProject = async (
  db: SQLite.SQLiteDatabase,
  projectId: number
): Promise<Bug[]> => {
  return await db.readTransactionAsync(async (tx) => {
    const result = await tx.executeSqlAsync('SELECT * FROM bugs WHERE projectId = ?;', [projectId]);
    return result.rows._array as Bug[];
  });
};

// Insert a new project
export const insertProject = async (db: SQLite.SQLiteDatabase, p: Omit<Project
