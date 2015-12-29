import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        doSomethingReallyCool(params, event) {
            alert(params.param1toaction + ' ' + params.someother);
        }
    }
});
