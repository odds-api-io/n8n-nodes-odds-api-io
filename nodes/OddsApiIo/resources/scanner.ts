import type { INodeProperties } from 'n8n-workflow';
import {
	bookmakerField,
	bookmakersField,
	includeEventDetailsField,
	returnAllAndLimit,
} from '../shared/descriptions';

const showValueBet = { resource: ['valueBet'] };
const showValueBetGetAll = { ...showValueBet, operation: ['getAll'] };

export const valueBetDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showValueBet },
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many value bets',
				description: 'Retrieve a list of value bets for a bookmaker, refreshed every 5 seconds',
				routing: { request: { method: 'GET', url: '/value-bets' } },
			},
		],
		default: 'getAll',
	},
	bookmakerField(showValueBetGetAll),
	...returnAllAndLimit(showValueBetGetAll),
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: showValueBetGetAll },
		options: [
			includeEventDetailsField(),
			{
				displayName: 'League Slug',
				name: 'league',
				type: 'string',
				default: '',
				placeholder: 'e.g. usa-mlb',
				description: 'Only return value bets in this league. Requires a sport slug.',
				routing: { send: { type: 'query', property: 'league' } },
			},
			{
				displayName: 'Sport Slug',
				name: 'sport',
				type: 'string',
				default: '',
				placeholder: 'e.g. baseball',
				description: 'Only return value bets in this sport',
				routing: { send: { type: 'query', property: 'sport' } },
			},
		],
	},
];

const showArbitrage = { resource: ['arbitrageBet'] };
const showArbitrageGetAll = { ...showArbitrage, operation: ['getAll'] };

export const arbitrageBetDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showArbitrage },
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many arbitrage bets',
				description:
					'Retrieve a list of active arbitrage opportunities where every leg is priced at one of the given bookmakers',
				routing: { request: { method: 'GET', url: '/arbitrage-bets' } },
			},
		],
		default: 'getAll',
	},
	bookmakersField(
		showArbitrageGetAll,
		'Comma-separated bookmaker names. Only opportunities where all legs use these bookmakers are returned.',
	),
	...returnAllAndLimit(showArbitrageGetAll, { maxValue: 500, queryProperty: 'limit' }),
	includeEventDetailsField(showArbitrageGetAll),
];

const showDropping = { resource: ['oddsDrop'] };
const showDroppingGetAll = { ...showDropping, operation: ['getAll'] };

export const droppingOddsDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showDropping },
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many odds drops',
				description:
					'Retrieve a list of prices that dropped from their opening or recent values, refreshed about every 30 seconds',
				routing: { request: { method: 'GET', url: '/dropping-odds' } },
			},
		],
		default: 'getAll',
	},
	...returnAllAndLimit(showDroppingGetAll, { maxValue: 200, queryProperty: 'limit' }),
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: showDroppingGetAll },
		options: [
			includeEventDetailsField(),
			{
				displayName: 'League Slug',
				name: 'league',
				type: 'string',
				default: '',
				placeholder: 'e.g. england-premier-league',
				description:
					"Only return drops in this league. Requires a sport slug; not combinable with 'League Slugs'.",
				routing: { send: { type: 'query', property: 'league' } },
			},
			{
				displayName: 'League Slugs',
				name: 'leagues',
				type: 'string',
				default: '',
				placeholder: 'e.g. england-premier-league,spain-la-liga',
				description: "Comma-separated league slugs. Not combinable with 'League Slug'.",
				routing: { send: { type: 'query', property: 'leagues' } },
			},
			{
				displayName: 'Markets',
				name: 'markets',
				type: 'string',
				default: '',
				placeholder: 'e.g. ML,Totals',
				description: 'Comma-separated market names, for example ML, Spread or Totals',
				routing: { send: { type: 'query', property: 'markets' } },
			},
			{
				displayName: 'Minimum Drop (%)',
				name: 'minDrop',
				type: 'number',
				default: 0,
				typeOptions: { minValue: 0 },
				description:
					'Only return drops of at least this percentage within the selected time window',
				routing: { send: { type: 'query', property: 'minDrop' } },
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				typeOptions: { minValue: 1 },
				description: 'Page number, starting at 1',
				routing: { send: { type: 'query', property: 'page' } },
			},
			{
				displayName: 'Sport Slug',
				name: 'sport',
				type: 'string',
				default: '',
				placeholder: 'e.g. football',
				description: 'Only return drops in this sport',
				routing: { send: { type: 'query', property: 'sport' } },
			},
			{
				displayName: 'Time Window',
				name: 'timeWindow',
				type: 'options',
				default: 'opening',
				description: 'Which reference price the drop is measured and sorted against',
				options: [
					{ name: '12 Hours', value: '12h' },
					{ name: '24 Hours', value: '24h' },
					{ name: '48 Hours', value: '48h' },
					{ name: 'Opening Price', value: 'opening' },
				],
				routing: { send: { type: 'query', property: 'timeWindow' } },
			},
		],
	},
];
