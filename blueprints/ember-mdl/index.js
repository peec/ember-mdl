var RSVP  = require('rsvp');

module.exports = {
    description: 'Add required packages for ember-mdl',

    normalizeEntityName: function() {
        // this prevents an error when the entityName is
        // not specified (since that doesn't actually matter
        // to us
    },

    afterInstall: function() {
        return RSVP.all([
            this.addBowerPackageToProject('material-design-lite', '~1.0.6'),
            this.addBowerPackageToProject('matchMedia', '0.2.0')
        ]);
    }
};
