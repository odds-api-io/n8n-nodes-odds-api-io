import type { INodeProperties } from 'n8n-workflow';

const show = { resource: ['bookmaker'] };
const showSelect = { ...show, operation: ['select'] };

export const bookmakerDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many bookmakers',
				description: 'Retrieve a list of supported bookmakers',
				routing: { request: { method: 'GET', url: '/bookmakers' } },
			},
			{
				name: 'Get Selected',
				value: 'getSelected',
				action: 'Get selected bookmakers',
				description: 'Retrieve the bookmakers selected on your API key',
				routing: { request: { method: 'GET', url: '/bookmakers/selected' } },
			},
			{
				name: 'Select',
				value: 'select',
				action: 'Select bookmakers',
				description: 'Add bookmakers to the selection on your API key',
				routing: { request: { method: 'PUT', url: '/bookmakers/selected/select' } },
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Bookmakers',
		name: 'bookmakers',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. Bet365,DraftKings',
		description:
			'Comma-separated bookmaker names to add. The number of bookmakers you can select depends on your plan.',
		displayOptions: { show: showSelect },
		routing: { send: { type: 'query', property: 'bookmakers' } },
	},
];
