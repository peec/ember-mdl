import Ember from 'ember';

export default Ember.Mixin.create({

    classNameBindings: ['isFocused:is-focused'],


    focusIn() {
        this.set('isFocused', true);
    },

    focusOut() {
        this.set('isFocused', false);
    }

});
