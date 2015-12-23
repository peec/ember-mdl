import Ember from 'ember';
import RippleMixinMixin from '../../../mixins/ripple-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | ripple mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var RippleMixinObject = Ember.Object.extend(RippleMixinMixin);
  var subject = RippleMixinObject.create();
  assert.ok(subject);
});
