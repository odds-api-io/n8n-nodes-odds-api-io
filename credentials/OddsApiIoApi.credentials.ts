import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class OddsApiIoApi implements ICredentialType {
	name = 'oddsApiIoApi';

	displayName = 'Odds-API.io API';

	icon: Icon = {
		light: 'file:../icons/odds-api-io.svg',
		dark: 'file:../icons/odds-api-io.dark.svg',
	};

	documentationUrl = 'https://docs.odds-api.io/authentication';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Your Odds-API.io API key from the dashboard at odds-api.io',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				apiKey: '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.odds-api.io/v3',
			url: '/bookmakers/selected',
			method: 'GET',
		},
	};
}
