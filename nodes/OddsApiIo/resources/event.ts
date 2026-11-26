import type { INodeProperties } from 'n8n-workflow';
import { returnAllAndLimit, sportField } from '../shared/descriptions';

const show = { resource: ['event'] };
const showGet = { ...show, operation: ['get'] };
const showGetAll = { ...show, operation: ['getAll'] };
const showGetLive = { ...show, operation: ['getLive'] };
const showSearch = { ...show, operation: ['search'] };

export const eventDescription: INodeProperties[] = [
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
				action: 'Get an event',
				description: 'Retrieve a single event by its ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/events/{{ toPathSegment($parameter.eventId) }}',
					},
				},
			},
			{
				name: 'Get Live',
				value: 'getLive',
				action: 'Get live events',
				description: 'Retrieve a list of events that are in play right now',
				routing: { request: { method: 'GET', url: '/events/live' } },
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many events',
				description: 'Retrieve a list of events for a sport',
				routing: { request: { method: 'GET', url: '/events' } },
			},
			{
				name: 'Search',
				value: 'search',
				action: 'Search events',
				description: 'Search events by team or league name',
				routing: { request: { method: 'GET', url: '/events/search' } },
			},
		],
		default: 'getAll',
	},

	// get
	{
		displayName: 'Event ID',
		name: 'eventId',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. 123456',
		description: 'ID of the event to retrieve',
		displayOptions: { show: showGet },
	},

	// getAll
	sportField(showGetAll),
	...returnAllAndLimit(showGetAll, { maxValue: 5000, queryProperty: 'limit' }),
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: showGetAll },
		options: [
			{
				displayName: 'Bookmaker',
				name: 'bookmaker',
				type: 'string',
				default: '',
				placeholder: 'e.g. Bet365',
				description: 'Only return events that have odds from this bookmaker',
				routing: { send: { type: 'query', property: 'bookmaker' } },
			},
			{
				displayName: 'From',
				name: 'from',
				type: 'dateTime',
				default: '',
				description: 'Only return events starting at or after this time',
				routing: { send: { type: 'query', property: 'from' } },
			},
			{
				displayName: 'League Slug',
				name: 'league',
				type: 'string',
				default: '',
				placeholder: 'e.g. england-premier-league',
				description: 'Only return events in this league',
				routing: { send: { type: 'query', property: 'league' } },
			},
			{
				displayName: 'Participant ID',
				name: 'participantId',
				type: 'number',
				default: 0,
				description: 'Only return events where this participant plays home or away',
				routing: { send: { type: 'query', property: 'participantId' } },
			},
			{
				displayName: 'Skip',
				name: 'skip',
				type: 'number',
				default: 0,
				typeOptions: { minValue: 0 },
				description: 'Number of events to skip, for paging through large ranges',
				routing: { send: { type: 'query', property: 'skip' } },
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'multiOptions',
				default: [],
				description: 'Only return events with these statuses',
				options: [
					{ name: 'Live', value: 'live' },
					{ name: 'Pending', value: 'pending' },
					{ name: 'Settled', value: 'settled' },
				],
				routing: {
					send: { type: 'query', property: 'status', value: '={{ $value.join(",") }}' },
				},
			},
			{
				displayName: 'To',
				name: 'to',
				type: 'dateTime',
				default: '',
				description: 'Only return events starting before this time. Defaults to 14 days from now.',
				routing: { send: { type: 'query', property: 'to' } },
			},
		],
	},

	// getLive
	sportField(showGetLive, false),
	...returnAllAndLimit(showGetLive),

	// search
	{
		displayName: 'Search Term',
		name: 'query',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. Arsenal',
		description: 'Team or league name, at least 3 characters. Returns up to 10 matches.',
		displayOptions: { show: showSearch },
		routing: { send: { type: 'query', property: 'query' } },
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		default: 'upcoming',
		description: 'Which events to search',
		displayOptions: { show: showSearch },
		options: [
			{ name: 'Live', value: 'live' },
			{ name: 'Upcoming', value: 'upcoming' },
		],
		routing: { send: { type: 'query', property: 'status' } },
	},
];
