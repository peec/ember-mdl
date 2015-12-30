import Ember from 'ember';
import layout from '../templates/components/mdl-menu';

// @todo menu component can be refactored to more ember like, this code is from the mdl-menu js, but can be
// slowly refactored to Ember.

const Constant_ = {
  // Total duration of the menu animation.
  TRANSITION_DURATION_SECONDS: 0.3,
  // The fraction of the total duration we want to use for menu item animations.
  TRANSITION_DURATION_FRACTION: 0.8,
  // How long the menu stays open after choosing an option (so the user can see
  // the ripple).
  CLOSE_TIMEOUT: 150
};

const CssClasses_ = {
  CONTAINER: 'mdl-menu__container',
  OUTLINE: 'mdl-menu__outline',
  ITEM: 'mdl-menu__item',
  ITEM_RIPPLE_CONTAINER: 'mdl-menu__item-ripple-container',
  RIPPLE_EFFECT: 'mdl-js-ripple-effect',
  RIPPLE_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',
  RIPPLE: 'mdl-ripple',
  // Statuses
  IS_UPGRADED: 'is-upgraded',
  IS_VISIBLE: 'is-visible',
  IS_ANIMATING: 'is-animating',
  // Alignment options
  BOTTOM_LEFT: 'mdl-menu--bottom-left',  // This is the default.
  BOTTOM_RIGHT: 'mdl-menu--bottom-right',
  TOP_LEFT: 'mdl-menu--top-left',
  TOP_RIGHT: 'mdl-menu--top-right',
  UNALIGNED: 'mdl-menu--unaligned'
};

const Keycodes_ = {
  ENTER: 13,
  ESCAPE: 27,
  SPACE: 32,
  UP_ARROW: 38,
  DOWN_ARROW: 40
};

export default Ember.Component.extend({
  layout: layout,
  CssClasses_: CssClasses_,
  Keycodes_: Keycodes_,
  Constant_: Constant_,
  icon: 'more_vert',
  position: 'bottom-left',
  actions: {
    menuToggle(params, evt) {
      this.handleForClick_(evt.originalEvent);
    }
  },

  didInsertElement() {
    this.element_ = this.$().find('.mdl-menu')[0];
    this.container_ = this.$().find('.mdl-menu__container')[0];
    this.outline_ = this.$().find('.mdl-menu__outline')[0];
  },

  handleForClick_(evt) {
    if (this.element_ && this.forElement_) {
      var rect = this.forElement_.getBoundingClientRect();
      var forRect = this.forElement_.parentElement.getBoundingClientRect();

      if (this.element_.classList.contains(this.CssClasses_.UNALIGNED)) {
        // Do not position the menu automatically. Requires the developer to
        // manually specify position.
      } else if (this.element_.classList.contains(
              this.CssClasses_.BOTTOM_RIGHT)) {
        // Position below the "for" element, aligned to its right.
        this.container_.style.right = (forRect.right - rect.right) + 'px';
        this.container_.style.top =
            this.forElement_.offsetTop + this.forElement_.offsetHeight + 'px';
      } else if (this.element_.classList.contains(this.CssClasses_.TOP_LEFT)) {
        // Position above the "for" element, aligned to its left.
        this.container_.style.left = this.forElement_.offsetLeft + 'px';
        this.container_.style.bottom = (forRect.bottom - rect.top) + 'px';
      } else if (this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)) {
        // Position above the "for" element, aligned to its right.
        this.container_.style.right = (forRect.right - rect.right) + 'px';
        this.container_.style.bottom = (forRect.bottom - rect.top) + 'px';
      } else {
        // Default: position below the "for" element, aligned to its left.
        this.container_.style.left = this.forElement_.offsetLeft + 'px';
        this.container_.style.top =
            this.forElement_.offsetTop + this.forElement_.offsetHeight + 'px';
      }
    }

    this.toggle(evt);
  },
  toggle(evt) {
    if (this.container_.classList.contains(this.CssClasses_.IS_VISIBLE)) {
      this.hide();
    } else {
      this.show(evt);
    }
  },
  show(evt) {


    if (this.element_ && this.container_ && this.outline_) {
      // Measure the inner element.
      var height = this.element_.getBoundingClientRect().height;
      var width = this.element_.getBoundingClientRect().width;

      // Apply the inner element's size to the container and outline.
      this.container_.style.width = width + 'px';
      this.container_.style.height = height + 'px';
      this.outline_.style.width = width + 'px';
      this.outline_.style.height = height + 'px';

      var transitionDuration = this.Constant_.TRANSITION_DURATION_SECONDS *
          this.Constant_.TRANSITION_DURATION_FRACTION;

      // Calculate transition delays for individual menu items, so that they fade
      // in one at a time.
      var items = this.element_.querySelectorAll('.' + this.CssClasses_.ITEM);
      for (var i = 0; i < items.length; i++) {
        var itemDelay = null;
        if (this.element_.classList.contains(this.CssClasses_.TOP_LEFT) ||
            this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)) {
          itemDelay = ((height - items[i].offsetTop - items[i].offsetHeight) /
              height * transitionDuration) + 's';
        } else {
          itemDelay = (items[i].offsetTop / height * transitionDuration) + 's';
        }
        items[i].style.transitionDelay = itemDelay;
      }

      // Apply the initial clip to the text before we start animating.
      this.applyClip_(height, width);

      // Wait for the next frame, turn on animation, and apply the final clip.
      // Also make it visible. This triggers the transitions.
      window.requestAnimationFrame(function() {
        this.element_.classList.add(this.CssClasses_.IS_ANIMATING);
        this.element_.style.clip = 'rect(0 ' + width + 'px ' + height + 'px 0)';
        this.container_.classList.add(this.CssClasses_.IS_VISIBLE);
      }.bind(this));

      // Clean up after the animation is complete.
      this.addAnimationEndListener_();

      // Add a click listener to the document, to close the menu.
      var callback = function(e) {
        // Check to see if the document is processing the same event that
        // displayed the menu in the first place. If so, do nothing.
        // Also check to see if the menu is in the process of closing itself, and
        // do nothing in that case.
        // Also check if the clicked element is a menu item
        // if so, do nothing.
        if (e !== evt && !this.closing_ && e.target.parentNode !== this.element_) {
          document.removeEventListener('click', callback);
          this.hide();
        }
      }.bind(this);
      document.addEventListener('click', callback);
    }
  },
  hide() {
    if (this.element_ && this.container_ && this.outline_) {
      var items = this.element_.querySelectorAll('.' + this.CssClasses_.ITEM);

      // Remove all transition delays; menu items fade out concurrently.
      for (var i = 0; i < items.length; i++) {
        items[i].style.removeProperty('transition-delay');
      }

      // Measure the inner element.
      var rect = this.element_.getBoundingClientRect();
      var height = rect.height;
      var width = rect.width;

      // Turn on animation, and apply the final clip. Also make invisible.
      // This triggers the transitions.
      this.element_.classList.add(this.CssClasses_.IS_ANIMATING);
      this.applyClip_(height, width);
      this.container_.classList.remove(this.CssClasses_.IS_VISIBLE);

      // Clean up after the animation is complete.
      this.addAnimationEndListener_();
    }
  },
  addAnimationEndListener_() {
    this.element_.addEventListener('transitionend', this.removeAnimationEndListener_.bind(this));
    this.element_.addEventListener('webkitTransitionEnd', this.removeAnimationEndListener_.bind(this));
  },
  removeAnimationEndListener_(evt) {
    evt.target.classList.remove(this.CssClasses_.IS_ANIMATING);
  },
  applyClip_(height, width) {
    if (this.element_.classList.contains(this.CssClasses_.UNALIGNED)) {
      // Do not clip.
      this.element_.style.clip = '';
    } else if (this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT)) {
      // Clip to the top right corner of the menu.
      this.element_.style.clip =
          'rect(0 ' + width + 'px ' + '0 ' + width + 'px)';
    } else if (this.element_.classList.contains(this.CssClasses_.TOP_LEFT)) {
      // Clip to the bottom left corner of the menu.
      this.element_.style.clip =
          'rect(' + height + 'px 0 ' + height + 'px 0)';
    } else if (this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)) {
      // Clip to the bottom right corner of the menu.
      this.element_.style.clip = 'rect(' + height + 'px ' + width + 'px ' +
          height + 'px ' + width + 'px)';
    } else {
      // Default: do not clip (same as clipping to the top left corner).
      this.element_.style.clip = '';
    }
  },
  positionClass: Ember.computed('position', function () {
    return 'mdl-menu--' + this.get('position');
  })
});
