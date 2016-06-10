describe('zendeskWidgetSettings', function() {
  'use strict';

  var subject;

  beforeEach(module('zendeskWidget'));
  beforeEach(inject(function(_zendeskWidgetSettings_) {
    subject = _zendeskWidgetSettings_;
  }));

  describe('by default', function() {
    it('has a blank `accountUrl`', function() {
      expect(subject['accountUrl']).toEqual('');
    });

    it('does a no-op on `beforePageLoad`', function() {
      expect(subject['beforePageLoad']).toEqual(angular.noop);
    });
  });
})
