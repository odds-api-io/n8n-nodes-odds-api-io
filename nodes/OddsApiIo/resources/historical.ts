import type { INodeProperties } from 'n8n-workflow';
import {
	bookmakersField,
	eventIdField,
	fromField,
	leagueField,
	marketsField,
	returnAllAndLimit,
	sportField,
	toField,
} from '../shared/descriptions';

const show = { resource: ['historical'] };
const showGetEvents = { ...show, operation: ['getEvents'] };
const showSearchEvents = { ...show, operation: ['searchEvents'] };
const showGetOdds = { ...show, operation: ['getOdds'] };
const showGetClosingLines = { ...show, operation: ['getClosingLines'] };

export const historicalDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [
			{
				name: 'Get Closing Lines',
				value: 'getClosingLines',
				action: 'Get historical closing lines',
				description:
					'Retrieve closing odds for every settled event in one or more leagues over a date range',
				routing: { request: { method: 'GET', url: '/historical/closing-lines' } },
			},
			{
				name: 'Get Events',
				value: 'getEvents',
				action: 'Get historical events',
				description: 'Retrieve finished events for a league within a date range of up to 31 days',
				routing: { request: { method: 'GET', url: '/historical/events' } },
			},
			{
				name: 'Get Odds',
				value: 'getOdds',
				action: 'Get historical odds',
				description: 'Retrieve closing odds and scores for one finished event',
				routing: { request: { method: 'GET', url: '/historical/odds' } },
			},
			{
				name: 'Search Events',
				value: 'searchEvents',
				action: 'Search historical events',
				description: 'Search finished events by team name',
				routing: { request: { method: 'GET', url: '/historical/events/search' } },
			},
		],
		default: 'getEvents',
	},

	// getEvents
	sportField(showGetEvents),
	leagueField(showGetEvents, true),
	fromField(showGetEvents, true),
	toField(showGetEvents, true, 'End of the date range (RFC 3339), at most 31 days after From'),
	...returnAllAndLimit(showGetEvents),

	// searchEvents
	{
		displayName: 'Search Term',
		name: 'query',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. Liverpool',
		description:
			'Team name fragment, at least 3 characters. Returns up to 100 events, newest first.',
		displayOptions: { show: showSearchEvents },
		routing: { send: { type: 'query', property: 'query' } },
	},
	...returnAllAndLimit(showSearchEvents, { maxValue: 100 }),
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: showSearchEvents },
		options: [
			{
				displayName: 'From',
				name: 'from',
				type: 'dateTime',
				default: '',
				description: 'Start of the date range (RFC 3339). Defaults to 31 days ago.',
				routing: { send: { type: 'query', property: 'from' } },
			},
			{
				displayName: 'Sport Slug',
				name: 'sport',
				type: 'string',
				default: '',
				placeholder: 'e.g. football',
				description: 'Only search events in this sport',
				routing: { send: { type: 'query', property: 'sport' } },
			},
			{
				displayName: 'To',
				name: 'to',
				type: 'dateTime',
				default: '',
				description: 'End of the date range (RFC 3339), at most 31 days after From',
				routing: { send: { type: 'query', property: 'to' } },
			},
		],
	},

	// getOdds
	eventIdField(showGetOdds),
	bookmakersField(showGetOdds),
	marketsField(showGetOdds),

	// getClosingLines
	sportField(showGetClosingLines),
	{
		displayName: 'League Slugs',
		name: 'leagues',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. england-premier-league,spain-la-liga',
		description: 'Comma-separated league slugs (max 10)',
		displayOptions: { show: showGetClosingLines },
		routing: { send: { type: 'query', property: 'leagues' } },
	},
	fromField(showGetClosingLines, true),
	toField(
		showGetClosingLines,
		true,
		'End of the date range (RFC 3339), at most 366 days after From so a full season fits in one sweep',
	),
	marketsField(showGetClosingLines, true),
	bookmakersField(showGetClosingLines),
	...returnAllAndLimit(showGetClosingLines, { maxValue: 100, queryProperty: 'limit' }),
	{
		displayName: 'Skip',
		name: 'skip',
		type: 'number',
		default: 0,
		typeOptions: { minValue: 0 },
		description: 'Number of events to skip, for paging. Each response holds at most 100 events.',
		displayOptions: { show: showGetClosingLines },
		routing: { send: { type: 'query', property: 'skip' } },
	},
];
