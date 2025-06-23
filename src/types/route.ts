import type { IncomingMessage, ServerResponse } from 'node:http';

export type Route = {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
	path: RegExp;
	handler: (req: IncomingMessage, res: ServerResponse) => void;
};
