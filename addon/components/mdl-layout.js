import Ember from 'ember';
import layout from '../templates/components/mdl-layout';
import LayoutInnerComponent from './mdl-layout-inner';


export default Ember.Component.extend({
  layout: layout,
  classNames: ['mdl-layout__container'],
  mode: 'standard',
  classNameBindings: ['innerComponent.isScrollMode:has-scrolling-header'],

  innerComponent: Ember.computed('_subComponents.[]', function () {
    return this.get('_subComponents').filter(a => a instanceof LayoutInnerComponent)[0];
  }),
  init() {
    this._super(...arguments);
    this.set('_subComponents', Ember.A([]));
  }
});
