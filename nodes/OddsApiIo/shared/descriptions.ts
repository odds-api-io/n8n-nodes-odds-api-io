import type { IDisplayOptions, INodeProperties } from 'n8n-workflow';

type Show = IDisplayOptions['show'];

function query(property: string): INodeProperties['routing'] {
	return { send: { type: 'query', property } };
}

export function sportField(show: Show, required = true): INodeProperties {
	return {
		displayName: 'Sport Slug',
		name: 'sport',
		type: 'string',
		default: '',
		required,
		placeholder: 'e.g. football',
		description: 'Sport slug as returned by the Sport > Get Many operation',
		displayOptions: { show },
		routing: query('sport'),
	};
}

export function leagueField(show: Show, required = false): INodeProperties {
	return {
		displayName: 'League Slug',
		name: 'league',
		type: 'string',
		default: '',
		required,
		placeholder: 'e.g. england-premier-league',
		description: 'League slug as returned by the League > Get Many operation',
		displayOptions: { show },
		routing: query('league'),
	};
}

export function bookmakersField(show: Show, description?: string): INodeProperties {
	return {
		displayName: 'Bookmakers',
		name: 'bookmakers',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. Bet365,DraftKings',
		description:
			description ??
			'Comma-separated bookmaker names (max 30), as returned by the Bookmaker > Get Many operation',
		displayOptions: { show },
		routing: query('bookmakers'),
	};
}

export function bookmakerField(show: Show, required = true): INodeProperties {
	return {
		displayName: 'Bookmaker',
		name: 'bookmaker',
		type: 'string',
		default: '',
		required,
		placeholder: 'e.g. Bet365',
		description: 'Bookmaker name as returned by the Bookmaker > Get Many operation',
		displayOptions: { show },
		routing: query('bookmaker'),
	};
}

export function eventIdField(show: Show): INodeProperties {
	return {
		displayName: 'Event ID',
		name: 'eventId',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. 123456',
		description: 'ID of the event as returned by the Event operations',
		displayOptions: { show },
		routing: query('eventId'),
	};
}

export function fromField(show: Show, required = false): INodeProperties {
	return {
		displayName: 'From',
		name: 'from',
		type: 'dateTime',
		default: '',
		required,
		description: 'Start of the date range (RFC 3339)',
		displayOptions: { show },
		routing: query('from'),
	};
}

export function toField(show: Show, required = false, description?: string): INodeProperties {
	return {
		displayName: 'To',
		name: 'to',
		type: 'dateTime',
		default: '',
		required,
		description: description ?? 'End of the date range (RFC 3339)',
		displayOptions: { show },
		routing: query('to'),
	};
}

export function marketsField(show: Show, required = false): INodeProperties {
	return {
		displayName: 'Markets',
		name: 'markets',
		type: 'string',
		default: '',
		required,
		placeholder: 'e.g. ML,Totals,Spread',
		description: 'Comma-separated market names as returned by the Market > Get Many operation',
		displayOptions: { show },
		routing: query('markets'),
	};
}

export function includeEventDetailsField(show?: Show): INodeProperties {
	return {
		displayName: 'Include Event Details',
		name: 'includeEventDetails',
		type: 'boolean',
		default: false,
		description: 'Whether to include home, away, date, sport and league for each entry',
		...(show ? { displayOptions: { show } } : {}),
		routing: query('includeEventDetails'),
	};
}

/**
 * Return All + Limit pair. The API returns plain arrays, so the limit is applied
 * to the response with `maxResults`; `queryProperty` additionally forwards it to
 * endpoints that accept a `limit` parameter.
 */
export function returnAllAndLimit(
	show: Show,
	options: { maxValue?: number; queryProperty?: string } = {},
): INodeProperties[] {
	const limitRouting: INodeProperties['routing'] = {
		output: { maxResults: '={{$value}}' },
	};
	if (options.queryProperty) {
		limitRouting.send = { type: 'query', property: options.queryProperty };
	}
	return [
		{
			displayName: 'Return All',
			name: 'returnAll',
			type: 'boolean',
			default: false,
			description: 'Whether to return all results or only up to a given limit',
			displayOptions: { show },
		},
		{
			displayName: 'Limit',
			name: 'limit',
			type: 'number',
			default: 50,
			typeOptions: { minValue: 1, ...(options.maxValue ? { maxValue: options.maxValue } : {}) },
			description: 'Max number of results to return',
			displayOptions: { show: { ...show, returnAll: [false] } },
			routing: limitRouting,
		},
	];
}
