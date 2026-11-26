import type { INodeProperties } from 'n8n-workflow';
import { bookmakerField, bookmakersField, eventIdField } from '../shared/descriptions';

const show = { resource: ['odds'] };
const showGet = { ...show, operation: ['get'] };
const showGetMany = { ...show, operation: ['getAll'] };
const showGetMovements = { ...show, operation: ['getMovements'] };
const showGetUpdated = { ...show, operation: ['getUpdated'] };

export const oddsDescription: INodeProperties[] = [
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
				action: 'Get odds for an event',
				description: 'Retrieve odds for one event from the selected bookmakers',
				routing: { request: { method: 'GET', url: '/odds' } },
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many odds',
				description: 'Retrieve odds for up to 10 events in one request',
				routing: { request: { method: 'GET', url: '/odds/multi' } },
			},
			{
				name: 'Get Movements',
				value: 'getMovements',
				action: 'Get odds movements',
				description: 'Retrieve the recorded price history of one market line at one bookmaker',
				routing: { request: { method: 'GET', url: '/odds/movements' } },
			},
			{
				name: 'Get Updated',
				value: 'getUpdated',
				action: 'Get updated odds',
				description:
					'Retrieve events whose odds a bookmaker changed since a timestamp (max 90 seconds old)',
				routing: { request: { method: 'GET', url: '/odds/updated' } },
			},
		],
		default: 'get',
	},

	// get
	eventIdField(showGet),
	bookmakersField(showGet),

	// getAll
	{
		displayName: 'Event IDs',
		name: 'eventIds',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. 123456,123457',
		description: 'Comma-separated list of up to 10 event IDs',
		displayOptions: { show: showGetMany },
		routing: { send: { type: 'query', property: 'eventIds' } },
	},
	bookmakersField(showGetMany),

	// getMovements
	eventIdField(showGetMovements),
	bookmakerField(showGetMovements),
	{
		displayName: 'Market',
		name: 'market',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. Totals',
		description: 'Market name, for example ML, Spread or Totals',
		displayOptions: { show: showGetMovements },
		routing: { send: { type: 'query', property: 'market' } },
	},
	{
		displayName: 'Market Line',
		name: 'marketLine',
		type: 'string',
		default: '',
		placeholder: 'e.g. 2.5',
		description: 'Handicap or total line. Leave empty for ML markets.',
		displayOptions: { show: showGetMovements },
		routing: { send: { type: 'query', property: 'marketLine' } },
	},

	// getUpdated
	{
		displayName: 'Since',
		name: 'since',
		type: 'dateTime',
		default: '',
		required: true,
		description: 'Return odds updated after this time. Must be within the last 90 seconds.',
		displayOptions: { show: showGetUpdated },
		routing: {
			send: {
				type: 'query',
				property: 'since',
				value: '={{ Math.floor(DateTime.fromISO($value).toSeconds()) }}',
			},
		},
	},
	bookmakerField(showGetUpdated),
	{
		displayName: 'Sport Name',
		name: 'sport',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. Football',
		description: 'Sport name (not the slug) as returned by the Sport > Get Many operation',
		displayOptions: { show: showGetUpdated },
		routing: { send: { type: 'query', property: 'sport' } },
	},
];
