import { randomUUID } from 'node:crypto';

import type { Route } from '../types/route.js';
import type { Task } from '../types/task.js';

import { Database } from '../database.js';

import { buildRoutePath } from '../utils/build-route-path.js';
import { processTasksFile } from '../streams/process-tasks-file.js';
import { validateTasksFields } from '../utils/validate-tasks-fields.js';

const database = new Database();

export const routes: Route[] = [
	{
		method: 'POST',
		path: buildRoutePath('/tasks'),
		handler: (req, res) => {
			const { title, description } = req.body ?? {};

			if (!title) {
				return res.writeHead(400).end(JSON.stringify({ message: 'title is required' }));
			}

			if (!description) {
				return res.writeHead(400).end(JSON.stringify({ message: 'description is required' }));
			}

			const task: Task = {
				id: randomUUID(),
				title: req.body?.title ?? '',
				description: req.body?.description ?? '',
				completed_at: null,
				created_at: new Date(),
				updated_at: new Date(),
			};

			database.insert('tasks', task);

			return res.writeHead(201).end();
		},
	},
	{
		method: 'GET',
		path: buildRoutePath('/tasks'),
		handler: (req, res) => {
			const { search } = req.query;

			const tasks = database.select(
				'tasks',
				search
					? {
							title: search,
							description: search,
					  }
					: null
			);

			return res.end(JSON.stringify(tasks));
		},
	},
	{
		method: 'PUT',
		path: buildRoutePath('/tasks/:id'),
		handler: (req, res) => {
			const { id } = req.params;
			const { title, description } = req.body ?? {};

			if (!title && !description) {
				return res.writeHead(400).end(JSON.stringify({ message: 'title or description are required' }));
			}

			const [task] = database.select('tasks', { id });

			if (!task) {
				return res.writeHead(400).end(
					JSON.stringify({
						message: 'The requested task ID does not exists.',
					})
				);
			}

			const invalidFields = validateTasksFields(req.body);

			if (invalidFields.length > 0) {
				return res.writeHead(400).end(`The following fields are missing: ${invalidFields.join(', ')}`);
			}

			database.update('tasks', id, {
				title,
				description,
				updated_at: new Date(),
			});

			return res.writeHead(201).end();
		},
	},
	{
		method: 'PATCH',
		path: buildRoutePath('/tasks/:id/complete'),
		handler: (req, res) => {
			const { id } = req.params;

			const [task] = database.select('tasks', { id });

			if (!task) {
				return res.writeHead(400).end(
					JSON.stringify({
						message: 'The requested task ID does not exists.',
					})
				);
			}

			database.update('tasks', id, {
				completed_at: new Date(),
			});

			return res.writeHead(201).end();
		},
	},
	{
		method: 'DELETE',
		path: buildRoutePath('/tasks/:id'),
		handler: (req, res) => {
			const { id } = req.params;

			const [task] = database.select('tasks', { id });

			if (!task) {
				return res.writeHead(404).end();
			}

			database.delete('tasks', id);

			return res.writeHead(204).end();
		},
	},
	{
		method: 'POST',
		path: buildRoutePath('/tasks/upload'),
		handler: async (req, res) => {
			const tasksFile = await processTasksFile();

			await new Promise((resolve) => {
				tasksFile.slice(1).forEach((row) => {
					const task: Task = {
						id: randomUUID(),
						title: row[0] ?? '',
						description: row[1] ?? '',
						completed_at: null,
						created_at: new Date(),
						updated_at: new Date(),
					};

					database.insert('tasks', task);
				});

				setTimeout(() => {
					resolve(null);
				}, 1000);
			});

			return res.writeHead(204).end();
		},
	},
];
