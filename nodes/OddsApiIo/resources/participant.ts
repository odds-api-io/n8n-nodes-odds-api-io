import type { INodeProperties } from 'n8n-workflow';
import { returnAllAndLimit, sportField } from '../shared/descriptions';

const show = { resource: ['participant'] };
const showGet = { ...show, operation: ['get'] };
const showGetAll = { ...show, operation: ['getAll'] };

export const participantDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a participant',
				description: 'Retrieve a single team or player by its ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/participants/{{ toPathSegment($parameter.participantId) }}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many participants',
				description: 'Retrieve a list of teams or players for a sport',
				routing: { request: { method: 'GET', url: '/participants' } },
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Participant ID',
		name: 'participantId',
		type: 'number',
		default: 0,
		required: true,
		description: 'ID of the participant to retrieve',
		displayOptions: { show: showGet },
	},
	sportField(showGetAll),
	...returnAllAndLimit(showGetAll),
	{
		displayName: 'Search',
		name: 'search',
		type: 'string',
		default: '',
		placeholder: 'e.g. Real Madrid',
		description: 'Only return participants whose name contains this text',
		displayOptions: { show: showGetAll },
		routing: { send: { type: 'query', property: 'search' } },
	},
];
