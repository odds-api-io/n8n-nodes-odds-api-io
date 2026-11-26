import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { bookmakerDescription } from './resources/bookmaker';
import { eventDescription } from './resources/event';
import { historicalDescription } from './resources/historical';
import { leagueDescription } from './resources/league';
import { marketDescription } from './resources/market';
import { oddsDescription } from './resources/odds';
import { participantDescription } from './resources/participant';
import {
	arbitrageBetDescription,
	droppingOddsDescription,
	valueBetDescription,
} from './resources/scanner';
import { sportDescription } from './resources/sport';

export class OddsApiIo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Odds-API.io',
		name: 'oddsApiIo',
		icon: {
			light: 'file:../../icons/odds-api-io.svg',
			dark: 'file:../../icons/odds-api-io.dark.svg',
		},
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description:
			'Sports odds from 500+ bookmakers: events, pre-match and live odds, closing lines, value bets and dropping odds',
		defaults: {
			name: 'Odds-API.io',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'oddsApiIoApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.odds-api.io/v3',
			headers: {
				Accept: 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Arbitrage Bet', value: 'arbitrageBet' },
					{ name: 'Bookmaker', value: 'bookmaker' },
					{ name: 'Event', value: 'event' },
					{ name: 'Historical', value: 'historical' },
					{ name: 'League', value: 'league' },
					{ name: 'Market', value: 'market' },
					{ name: 'Odds Comparison', value: 'odds' },
					{ name: 'Odds Drop', value: 'oddsDrop' },
					{ name: 'Participant', value: 'participant' },
					{ name: 'Sport', value: 'sport' },
					{ name: 'Value Bet', value: 'valueBet' },
				],
				default: 'event',
			},
			...arbitrageBetDescription,
			...bookmakerDescription,
			...eventDescription,
			...historicalDescription,
			...leagueDescription,
			...marketDescription,
			...oddsDescription,
			...droppingOddsDescription,
			...participantDescription,
			...sportDescription,
			...valueBetDescription,
		],
	};
}
