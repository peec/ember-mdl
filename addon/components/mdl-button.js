import Ember from 'ember';
import layout from '../templates/components/mdl-button';
import RippleUtil from '../util/ripple';

const CssClasses_ = {
    RIPPLE_EFFECT: 'mdl-js-ripple-effect',
    RIPPLE_CONTAINER: 'mdl-button__ripple-container',
    RIPPLE: 'mdl-ripple'
};

export default Ember.Component.extend({
    tagName: 'button',
    layout: layout,
    classNames:  ['mdl-button'],
    classNameBindings: [
        'fab:mdl-button--fab',
        'colored:mdl-button--colored',
        'raised:mdl-button--raised',
        'accent:mdl-button--accent',
        'mini:mdl-button--mini-fab',
        'icon:mdl-button--icon',
        'disabled:demo-button__fab-disabled',
        'primary:mdl-button--primary',
        'accent:mdl-button--accent'
    ],
    attributeBindings: ['disabled'],
    blurHandler_(event) {
        if (event) {
              this.$().blur();
        }
    },
    mouseUp(event) {
        this.blurHandler_(event);
    },
    mouseLeave(event) {
        this.blurHandler_(event);
    },
    didInsertElement() {
       if (this.get('ripple')) {
           var rippleContainer = document.createElement('span');
           rippleContainer.classList.add(CssClasses_.RIPPLE_CONTAINER);
           this.rippleElement_ = document.createElement('span');
           this.rippleElement_.classList.add(CssClasses_.RIPPLE);
           rippleContainer.appendChild(this.rippleElement_);
           this.boundRippleBlurHandler = this.blurHandler_.bind(this);
           this.rippleElement_.addEventListener('mouseup', this.boundRippleBlurHandler);
           this.get('element').appendChild(rippleContainer);
           new RippleUtil(this.get('element'));

       }
    },

    click(e) {
        this.sendAction('action', this.get('attrs'), e);
    }
});
