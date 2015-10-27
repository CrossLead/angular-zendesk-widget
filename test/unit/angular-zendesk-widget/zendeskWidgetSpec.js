'use strict';

describe('Angular Zendesk Widget', function() {

  describe('Module bootstrap', function() {

    it('should throw if no accountUrl provided', function() {
      module('zendeskWidget');
      expect(function() {
        inject()
      }).toThrow();
    });

  });

});
