'use strict';

class TestPlugin {
  constructor(serverless) {
    serverless.configSchemaHandler.defineProvider('someProvider', {
      function: {
        properties: {
          handler: { type: 'string' },
        },
      },
      functionEvents: {
        existingEvent: {
          type: 'object',
          properties: { existingProp: { type: 'string' } },
        },
        existingComplexEvent: {
          anyOf: [
            { type: 'string' },
            {
              type: 'object',
              properties: { existingPropForObjectEventDefinition: { type: 'string' } },
            },
          ],
        },
      },
    });

    serverless.configSchemaHandler.defineCustomProperties({
      properties: {
        someCustomStringProp: { type: 'string' },
      },
      required: ['someCustomStringProp'],
    });

    serverless.configSchemaHandler.defineFunctionEvent('someProvider', 'someEvent', {
      type: 'object',
      properties: {
        someRequiredStringProp: { type: 'string' },
        someNumberProp: { type: 'number' },
      },
      required: ['someRequiredStringProp'],
      additionalProperties: false,
    });

    serverless.configSchemaHandler.defineFunctionEventProperties('someProvider', 'existingEvent', {
      properties: {
        somePluginAdditionalEventProp: { type: 'string' },
      },
      required: ['somePluginAdditionalEventProp'],
    });

    serverless.configSchemaHandler.defineFunctionEventProperties(
      'someProvider',
      'existingComplexEvent',
      {
        properties: {
          somePluginAdditionalComplexEventProp: { type: 'string' },
        },
        required: ['somePluginAdditionalComplexEventProp'],
      }
    );

    serverless.configSchemaHandler.defineFunctionProperties(['someProvider', 'otherProvider'], {
      properties: {
        otherFunctionStringProp: { type: 'string' },
        otherRequiredFunctionNumberProp: { type: 'number' },
      },
      required: ['otherRequiredFunctionNumberProp'],
    });

    serverless.configSchemaHandler.defineFunctionProperties({
      properties: {
        yetAnotherFunctionStringProp: { type: 'string' },
        yetAnotherRequiredFunctionNumberProp: { type: 'number' },
      },
      required: ['yetAnotherRequiredFunctionNumberProp'],
    });

    serverless.configSchemaHandler.defineTopLevelProperty('top', {
      type: 'string',
    });
  }
}

module.exports = TestPlugin;
