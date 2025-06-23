import fs from 'node:fs/promises';

const databasePath = new URL('../db.json', import.meta.url);

import type { GenericObject } from './types/objects.js';

interface DatabaseTables {
	[key: string]: GenericObject[];
}

export class Database {
	#database: DatabaseTables = {};

	constructor() {
		fs.readFile(databasePath, 'utf-8')
			.then((data) => {
				this.#database = JSON.parse(data);
			})
			.catch(() => {
				this.#persist();
			});
	}

	#persist() {
		fs.writeFile(databasePath, JSON.stringify(this.#database));
	}

	select(table: string, search: GenericObject | null) {
		let data = this.#database[table] ?? [];

		if (search) {
			data = data.filter((row) => {
				return Object.entries(search).some(([key, value]) => {
					if (!value) return true;

					return String(row[key])?.includes(String(value));
				});
			});
		}

		return data;
	}

	insert(table: string, data: GenericObject) {
		if (Array.isArray(this.#database[table])) {
			this.#database[table].push(data);
		} else {
			this.#database[table] = [data];
		}

		this.#persist();

		return data;
	}

	update(table: string, id: string, data: GenericObject) {
		const rowIndex = this.#database[table].findIndex((row) => row.id === id);

		if (rowIndex > -1) {
			const row = this.#database[table][rowIndex];
			this.#database[table][rowIndex] = { id, ...row, ...data };
			this.#persist();
		}

		return data;
	}

	delete(table: string, id: string) {
		const rowIndex = this.#database[table].findIndex((row) => row.id === id);

		if (rowIndex > -1) {
			this.#database[table].splice(rowIndex, 1);
			this.#persist();
		}
	}
}
