describe('zendeskWidget', function() {
  'use strict';

  beforeEach(module('zendeskWidget'));

  it('throws an error when `accountUrl` is blank', function() {
    expect(function() { inject() }).toThrowError(
      'Missing accountUrl. Please set in app config via ZendeskWidgetProvider'
    );
  });
});
