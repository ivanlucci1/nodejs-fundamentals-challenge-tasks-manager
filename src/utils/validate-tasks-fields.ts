export function validateTasksFields(requestBody: Record<string, string> | null) {
	const invalidFields = [];

	if (!requestBody?.title) {
		invalidFields.push('title');
	}
	if (!requestBody?.description) {
		invalidFields.push('description');
	}

	return invalidFields;
}
