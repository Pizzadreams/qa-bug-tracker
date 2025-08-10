import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

enablePromise(true);

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

const projectTable = 'projects';
const bugTable = 'bugs';

export const getDBConnection = async (): Promise<SQLiteDatabase> => {
  return openDatabase({ name: 'bugtracker.db', location: 'default' });
};

export const createTables = async (db: SQLiteDatabase) => {
  await db.executeSql(
    `CREATE TABLE IF NOT EXISTS ${projectTable} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT
    );`
  );

  await db.executeSql(
    `CREATE TABLE IF NOT EXISTS ${bugTable} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      projectId INTEGER,
      title TEXT NOT NULL,
      description TEXT,
      severity TEXT,
      status TEXT,
      FOREIGN KEY (projectId) REFERENCES ${projectTable}(id) ON DELETE CASCADE
    );`
  );
};

/* ==== PROJECT CRUD ==== */
export const getProjects = async (db: SQLiteDatabase): Promise<Project[]> => {
  const results = await db.executeSql(`SELECT * FROM ${projectTable};`);
  const projects: Project[] = [];
  results.forEach(r => {
    for (let i = 0; i < r.rows.length; i++) projects.push(r.rows.item(i));
  });
  return projects;
};

export const insertProject = async (db: SQLiteDatabase, p: Omit<Project, 'id'>) => {
  await db.executeSql(
    `INSERT INTO ${projectTable} (name, description) VALUES (?, ?);`,
    [p.name, p.description || null]
  );
};

export const updateProject = async (db: SQLiteDatabase, p: Project) => {
  await db.executeSql(
    `UPDATE ${projectTable} SET name = ?, description = ? WHERE id = ?;`,
    [p.name, p.description || null, p.id]
  );
};

export const deleteProject = async (db: SQLiteDatabase, id: number) => {
  await db.executeSql(`DELETE FROM ${projectTable} WHERE id = ?;`, [id]);
};

/* ==== BUG CRUD (scoped to a project) ==== */
export const getBugsByProject = async (db: SQLiteDatabase, projectId: number): Promise<Bug[]> => {
  const results = await db.executeSql(
    `SELECT * FROM ${bugTable} WHERE projectId = ?;`,
    [projectId]
  );
  const bugs: Bug[] = [];
  results.forEach(r => {
    for (let i = 0; i < r.rows.length; i++) bugs.push(r.rows.item(i));
  });
  return bugs;
};

export const insertBug = async (db: SQLiteDatabase, b: Omit<Bug, 'id'>) => {
  await db.executeSql(
    `INSERT INTO ${bugTable} (projectId, title, description, severity, status)
     VALUES (?, ?, ?, ?, ?);`,
    [b.projectId, b.title, b.description || null, b.severity || null, b.status || null]
  );
};

export const updateBug = async (db: SQLiteDatabase, b: Bug) => {
  await db.executeSql(
    `UPDATE ${bugTable}
     SET title = ?, description = ?, severity = ?, status = ?
     WHERE id = ?;`,
    [b.title, b.description || null, b.severity || null, b.status || null, b.id]
  );
};

export const deleteBug = async (db: SQLiteDatabase, id: number) => {
  await db.executeSql(`DELETE FROM ${bugTable} WHERE id = ?;`, [id]);
};
