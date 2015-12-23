import Ember from 'ember';

/* global MaterialRipple */

export default Ember.Mixin.create({
    registerRippleComponent(rippleComponent) {
        this.set('rippleComponent', rippleComponent);
    },

    _rippleMouseUp: Ember.on('mouseUp', 'mouseLeave', 'touchEnd', function (e) {
        if (!this.get('ripple')) {
            return;
        }
        this.get('rippleComponent').upHandler_.call(this.get('rippleComponent'), e);
    }),
    _rippleMouseLeave: Ember.on('mouseDown', 'touchStart', function (e) {
        if (!this.get('ripple')) {
            return;
        }
        this.get('rippleComponent').downHandler_.call(this.get('rippleComponent'), e);
    }),


});
