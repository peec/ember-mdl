import Ember from 'ember';
import FocusableMixin from '../../../mixins/focusable';
import { module, test } from 'qunit';

module('Unit | Mixin | focusable');

// Replace this with your real tests.
test('it works', function(assert) {
  var FocusableObject = Ember.Object.extend(FocusableMixin);
  var subject = FocusableObject.create();
  assert.ok(subject);
});
