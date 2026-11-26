import type { INodeProperties } from 'n8n-workflow';

const show = { resource: ['market'] };
const showGetAll = { ...show, operation: ['getAll'] };

export const marketDescription: INodeProperties[] = [
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
				action: 'Get many markets',
				description:
					'Retrieve a list of markets per sport, with their shape and pre-match or live availability',
				routing: { request: { method: 'GET', url: '/markets' } },
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Sport Slug',
		name: 'sport',
		type: 'string',
		default: '',
		placeholder: 'e.g. football',
		description: 'Only return markets for this sport. Leave empty for all sports keyed by slug.',
		displayOptions: { show: showGetAll },
		routing: { send: { type: 'query', property: 'sport' } },
	},
];
