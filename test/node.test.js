const test = require('node:test');
const assert = require('node:assert/strict');

const { OddsApiIo } = require('../dist/nodes/OddsApiIo/OddsApiIo.node.js');
const { OddsApiIoApi } = require('../dist/credentials/OddsApiIoApi.credentials.js');

const description = new OddsApiIo().description;
const properties = description.properties;

const resources = properties.find((p) => p.name === 'resource').options.map((o) => o.value);
const operationsByResource = Object.fromEntries(
	properties
		.filter((p) => p.name === 'operation')
		.map((p) => [p.displayOptions.show.resource[0], p.options.map((o) => o.value)]),
);

test('every resource has an operation selector', () => {
	for (const resource of resources) {
		assert.ok(operationsByResource[resource], `missing operations for ${resource}`);
	}
});

test('every operation has a request route', () => {
	for (const p of properties.filter((p) => p.name === 'operation')) {
		for (const op of p.options) {
			assert.ok(op.routing?.request?.method, `${op.value} has no method`);
			assert.ok(op.routing?.request?.url, `${op.value} has no url`);
			assert.ok(op.action, `${op.value} has no action`);
		}
	}
});

test('every parameter is shown for an existing resource and operation', () => {
	for (const p of properties) {
		if (!p.displayOptions?.show || p.name === 'operation') continue;
		const { resource = [], operation = [] } = p.displayOptions.show;
		for (const r of resource) {
			assert.ok(resources.includes(r), `${p.name} references unknown resource ${r}`);
			for (const o of operation) {
				assert.ok(
					operationsByResource[r].includes(o),
					`${p.name} references unknown operation ${r}.${o}`,
				);
			}
		}
	}
});

test('limit parameters cap the output', () => {
	for (const p of properties.filter((p) => p.name === 'limit')) {
		assert.equal(p.routing.output.maxResults, '={{$value}}');
		assert.equal(p.displayOptions.show.returnAll[0], false);
	}
});

test('credential sends the API key as a query parameter', () => {
	const cred = new OddsApiIoApi();
	assert.equal(cred.name, description.credentials[0].name);
	assert.equal(cred.authenticate.properties.qs.apiKey, '={{$credentials.apiKey}}');
	assert.equal(cred.properties[0].typeOptions.password, true);
	assert.equal(cred.test.request.baseURL, description.requestDefaults.baseURL);
});
