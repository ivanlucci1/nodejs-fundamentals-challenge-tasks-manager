import type { IncomingMessage } from 'node:http';
import type { GenericObject, StringObject } from './objects.ts';

declare module 'node:http' {
	interface IncomingMessage {
		body: Record<string, string> | null;
		params: StringObject;
		query: GenericObject;
	}
}
