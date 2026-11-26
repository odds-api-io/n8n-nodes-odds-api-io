import type { INodeProperties } from 'n8n-workflow';

const show = { resource: ['sport'] };

export const sportDescription: INodeProperties[] = [
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
				action: 'Get many sports',
				description: 'Retrieve a list of sports with their slugs',
				routing: { request: { method: 'GET', url: '/sports' } },
			},
		],
		default: 'getAll',
	},
];
