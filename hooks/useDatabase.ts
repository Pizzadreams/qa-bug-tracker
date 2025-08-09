// hooks/useDatabase.ts
import { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('bugtracker.db'); // use openDatabaseSync for SDK 51+

export type Project = {
  id: number;
  name: string;
  description?: string;
};

export function useDatabase() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Create tables if they don't exist
    (async () => {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS projects (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          description TEXT
        );
      `);
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS bugs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          projectId INTEGER,
          title TEXT NOT NULL,
          description TEXT,
          severity TEXT,
          status TEXT,
          FOREIGN KEY (projectId) REFERENCES projects(id)
        );
      `);
      setIsReady(true);
    })();
  }, []);

  // Fetch all projects
  const getProjects = async (): Promise<Project[]> => {
    const result = await db.execAsync('SELECT * FROM projects ORDER BY id DESC;');
    return result.rows as Project[];
  };

  // Add a new project
  const addProject = async (name: string, description?: string) => {
    await db.execAsync(
      'INSERT INTO projects (name, description) VALUES (?, ?);',
      [name, description || null]
    );
  };

  // [Optionally add update/delete functions here]

  return { isReady, getProjects, addProject };
}
