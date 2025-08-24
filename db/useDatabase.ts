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

const DB_NAME = 'bugtracker.db';s

export const getDBConnection = () => {
  return SQLite.openDatabaseSync(DB_NAME);
};

// Create tables using transaction
export const createTables = (db: SQLite.SQLiteDatabase) => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT
      );`
    );
    tx.executeSql(
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

export const getProjects = (db: SQLite.SQLiteDatabase): Promise<Project[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM projects;`,
        [],
        (_, result) => {
          const projects: Project[] = [];
          for (let i = 0; i < result.rows.length; i++) {
            projects.push(result.rows.item(i));
          }
          resolve(projects);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const getBugsByProject = (db: SQLite.SQLiteDatabase, projectId: number): Promise<Bug[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM bugs WHERE projectId = ?;`,
        [projectId],
        (_, result) => {
          const bugs: Bug[] = [];
          for (let i = 0; i < result.rows.length; i++) {
            bugs.push(result.rows.item(i));
          }
          resolve(bugs);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

// Similarly add insertProject, updateProject, insertBug, updateBug, delete functions following this pattern
