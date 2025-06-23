import fs from 'node:fs';
import { parse } from 'csv-parse';

const __dirname = new URL('.', import.meta.url).pathname;

export const processTasksFile = async () => {
	const records = [];
	const parser = fs.createReadStream(`${__dirname}../data/example-tasks.csv`).pipe(parse());
	for await (const record of parser) {
		records.push(record);
	}
	return records;
};
