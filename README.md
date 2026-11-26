# n8n-nodes-odds-api-io

This is an n8n community node. It lets you use [Odds-API.io](https://odds-api.io) in your n8n workflows.

Odds-API.io is a sports odds API with pre-match and live odds from 500+ bookmakers across 37 sports, plus closing lines, value bets, dropping odds and arbitrage scanners.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation. The package name is `n8n-nodes-odds-api-io`.

## Operations

| Resource | Operation | Endpoint |
| --- | --- | --- |
| Arbitrage Bet | Get Many | `GET /arbitrage-bets` |
| Bookmaker | Get Many | `GET /bookmakers` |
| Bookmaker | Get Selected | `GET /bookmakers/selected` |
| Bookmaker | Select | `PUT /bookmakers/selected/select` |
| Event | Get | `GET /events/{id}` |
| Event | Get Live | `GET /events/live` |
| Event | Get Many | `GET /events` |
| Event | Search | `GET /events/search` |
| Historical | Get Closing Lines | `GET /historical/closing-lines` |
| Historical | Get Events | `GET /historical/events` |
| Historical | Get Odds | `GET /historical/odds` |
| Historical | Search Events | `GET /historical/events/search` |
| League | Get Many | `GET /leagues` |
| Market | Get Many | `GET /markets` |
| Odds Comparison | Get | `GET /odds` |
| Odds Comparison | Get Many | `GET /odds/multi` |
| Odds Comparison | Get Movements | `GET /odds/movements` |
| Odds Comparison | Get Updated | `GET /odds/updated` |
| Odds Drop | Get Many | `GET /dropping-odds` |
| Participant | Get | `GET /participants/{id}` |
| Participant | Get Many | `GET /participants` |
| Sport | Get Many | `GET /sports` |
| Value Bet | Get Many | `GET /value-bets` |

All operations call the Odds-API.io v3 REST API at `https://api.odds-api.io/v3`. List operations return one n8n item per result and support **Return All** / **Limit**.

## Credentials

1. Sign up at [odds-api.io](https://odds-api.io/pricing) and pick a plan. Rate limits, the number of bookmakers you can select and historical data access depend on the plan.
2. Copy the API key from your dashboard.
3. In n8n, create an **Odds-API.io API** credential and paste the key. n8n tests it against `GET /bookmakers/selected`.

The key is sent as the `apiKey` query parameter, which is how the API authenticates every request.

## Compatibility

Built with `@n8n/node-cli` 0.58 against `n8n-workflow` 2.49. Path parameters use `toPathSegment`, so n8n 2.46.1 or later is required.

## Usage

A typical workflow:

1. **Sport > Get Many** to find the sport slug (for example `football`).
2. **League > Get Many** with that slug to find the league slug.
3. **Event > Get Many** with sport, league and an optional date range to list upcoming events.
4. **Odds Comparison > Get Many** with up to 10 event IDs and a comma-separated list of bookmakers to fetch the current prices.

Bookmaker names must match the `name` field returned by **Bookmaker > Get Many**, and the bookmakers you query must be selected on your key (**Bookmaker > Select**). Market names come from **Market > Get Many**.

Example: fetch dropping odds for the Premier League every minute and post lines that dropped more than 10% to a chat channel. Use a Schedule Trigger, then **Odds Drop > Get Many** with `Sport Slug = football`, `League Slug = england-premier-league`, `Minimum Drop = 10` and **Include Event Details** enabled, then a Slack or Discord node.

The node can also be used as a tool by n8n AI Agent nodes.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Odds-API.io documentation](https://docs.odds-api.io)
- [Odds-API.io API reference (OpenAPI)](https://api.odds-api.io/v3/docs/doc.json)
- [Get an API key](https://odds-api.io/pricing)

## Version history

- 0.1.0: first release with 23 operations across 11 resources.
