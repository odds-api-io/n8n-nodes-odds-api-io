import type { INodeProperties } from 'n8n-workflow';
import { sportField } from '../shared/descriptions';

const show = { resource: ['league'] };
const showGetAll = { ...show, operation: ['getAll'] };

export const leagueDescription: INodeProperties[] = [
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
				action: 'Get many leagues',
				description: 'Retrieve a list of leagues for a sport',
				routing: { request: { method: 'GET', url: '/leagues' } },
			},
		],
		default: 'getAll',
	},
	sportField(showGetAll),
	{
		displayName: 'Include Inactive Leagues',
		name: 'all',
		type: 'boolean',
		default: false,
		description: 'Whether to include leagues that currently have no upcoming or live events',
		displayOptions: { show: showGetAll },
		routing: { send: { type: 'query', property: 'all' } },
	},
];
