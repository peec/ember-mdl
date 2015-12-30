import Ember from 'ember';
import layout from '../templates/components/mdl-tooltip';

const CssClasses_ = {
  IS_ACTIVE: 'is-active',
  BOTTOM: 'mdl-tooltip--bottom',
  LEFT: 'mdl-tooltip--left',
  RIGHT: 'mdl-tooltip--right',
  TOP: 'mdl-tooltip--top'
};

export default Ember.Component.extend({
  layout: layout,
  triggerId: Ember.computed('elementId', function () {
    return this.get('elementId') + '-tt';
  }),
  CssClasses_: CssClasses_,
  handleMouseEnter_(event) {
    var props = event.target.getBoundingClientRect();
    var left = props.left + (props.width / 2);
    var top = props.top + (props.height / 2);
    var marginLeft = -1 * (this.element_.offsetWidth / 2);
    var marginTop = -1 * (this.element_.offsetHeight / 2);

    if (this.element_.classList.contains(this.CssClasses_.LEFT) || this.element_.classList.contains(this.CssClasses_.RIGHT)) {
      left = (props.width / 2);
      if (top + marginTop < 0) {
        this.element_.style.top = 0;
        this.element_.style.marginTop = 0;
      } else {
        this.element_.style.top = top + 'px';
        this.element_.style.marginTop = marginTop + 'px';
      }
    } else {
      if (left + marginLeft < 0) {
        this.element_.style.left = 0;
        this.element_.style.marginLeft = 0;
      } else {
        this.element_.style.left = left + 'px';
        this.element_.style.marginLeft = marginLeft + 'px';
      }
    }

    if (this.element_.classList.contains(this.CssClasses_.TOP)) {
      this.element_.style.top = props.top - this.element_.offsetHeight - 10 + 'px';
    } else if (this.element_.classList.contains(this.CssClasses_.RIGHT)) {
      this.element_.style.left = props.left + props.width + 10 + 'px';
    } else if (this.element_.classList.contains(this.CssClasses_.LEFT)) {
      this.element_.style.left = props.left - this.element_.offsetWidth - 10 + 'px';
    } else {
      this.element_.style.top = props.top + props.height + 10 + 'px';
    }

    this.element_.classList.add(this.CssClasses_.IS_ACTIVE);
  },
  handleMouseLeave_() {
    this.element_.classList.remove(this.CssClasses_.IS_ACTIVE);
  },
  didInsertElement() {
    this.forElement_ = this.$('#' + this.get('triggerId'))[0];
    this.element_ = this.$('.mdl-tooltip')[0];


    this.boundMouseEnterHandler = this.handleMouseEnter_.bind(this);
    this.boundMouseLeaveHandler = this.handleMouseLeave_.bind(this);

    this.forElement_.addEventListener('mouseenter', this.boundMouseEnterHandler, false);
    this.forElement_.addEventListener('touchend', this.boundMouseEnterHandler, false);
    this.forElement_.addEventListener('mouseleave', this.boundMouseLeaveHandler, false);
    window.addEventListener('touchstart', this.boundMouseLeaveHandler);


  },
  willDestroyElement() {
    window.removeEventListener('touchstart', this.boundMouseLeaveHandler);
  }
});
