import Ember from 'ember';
import layout from '../templates/components/mdl-spinner';

const Constant_ = {
  MDL_SPINNER_LAYER_COUNT: 4
};

export default Ember.Component.extend({
  layout: layout,
  classNames: ['is-upgraded', 'is-active', 'mdl-spinner'],
  classNameBindings: ['singleColor:mdl-spinner--single-color']
});
