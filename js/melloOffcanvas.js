//import {singleton, container, dependencies} from '../libs/needlepoint';

/*
    el : class without .
    trigger : class without .
    slided : ID without #
 */
export default function melloOffCanvas (el, trigger, slided, options){
  if (el.length){
    this.el = document.getElementsByClassName(el)[0];
    this.trigger = document.getElementsByClassName(trigger)[0];
    this.slided = document.getElementById(slided);
    this._init(options);
  }

}

melloOffCanvas.defaults = {
  option1: true,
  option2: false

}

/**
 * Merge defaults with user options
 * @private
 * @param {Object} defaults Default settings
 * @param {Object} options User options
 * @returns {Object} Merged values of defaults and options
 */
var extend = function ( defaults, options ) {
    var extended = {};
    var prop;
    for (prop in defaults) {
        if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
            extended[prop] = defaults[prop];
        }
    }
    for (prop in options) {
        if (Object.prototype.hasOwnProperty.call(options, prop)) {
            extended[prop] = options[prop];
        }
    }
    return extended;
};

/**
 * Get all DOM element up the tree that contain a class, ID, or data attribute
 * @param  {Node} elem The base element
 * @param  {String} selector The class, id, data attribute, or tag to look for
 * @return {Array} Null if no match
 */
var getParents = function (elem, selector) {
    var parents = [];
    if ( selector ) {
        var firstChar = selector.charAt(0);
    }

    // Get matches
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
        if ( selector ) {

            // If selector is a class
            if ( firstChar === '.' ) {
                if ( elem.classList.contains( selector.substr(1) ) ) {
                    parents.push( elem );
                }
            }

            // If selector is an ID
            if ( firstChar === '#' ) {
                if ( elem.id === selector.substr(1) ) {
                    parents.push( elem );
                }
            }

            // If selector is a data attribute
            if ( firstChar === '[' ) {
                if ( elem.hasAttribute( selector.substr(1, selector.length - 1) ) ) {
                    parents.push( elem );
                }
            }

            // If selector is a tag
            if ( elem.tagName.toLowerCase() === selector ) {
                parents.push( elem );
            }

        } else {
            parents.push( elem );
        }

    }

    // Return parents if any exist
    if ( parents.length === 0 ) {
        return [];
    } else {
        return parents;
    }

};

melloOffCanvas.prototype = {
    _init : function(options){
        console.log('offcanvas menu initialised');
        this.options = extend( melloOffCanvas.defaults, options );
        this.open = false;
        this._layout();
        this._initEvents();
    },
    _layout: function(){
        this.menuItems = this.el.getElementsByTagName("li");
    },
    _initEvents : function (){
        var self = this;
        // menu button handler
        this.trigger.addEventListener("click",function(ev){
            ev.stopPropagation();
            ev.preventDefault();
            if(self.open){
                self._resetMenu();
            }
            else{
                self._openMenu();
                document.addEventListener( "click", function( ev ) {
                    if ( self.open && !( getParents(ev.target,self.el.className).length > 0 || ev.target==self.el) ){
                        onBodyClick(this);
                    } 
                });
            }
        });

        var onBodyClick = function(el){
          self._resetMenu();
          self.el.removeEventListener("click", onBodyClick);
        }

        self.el.getElementsByTagName('a')[0].addEventListener('click', function(e) {
            if(self.open) {
                closeSiteNav();
            }
        });

        $(document).keyup(function(e) { 
            if (e.keyCode == 27) { self._toggleMenu() } 
        });
    },
    _openMenu : function( subLevel ) {
        this.el.classList.add("active");
        this.slided.classList.add("active");
        this.trigger.classList.add("active");
        this.open = true;
        this._onMenuOpen();
    },
    _resetMenu : function() {
        this.el.classList.remove("active");
        this.slided.classList.remove("active");
        this.trigger.classList.remove("active");
        this.open = false;
        this._onMenuClose();
    },
    _toggleMenu : function(){
        if(this.open === true){
            this._resetMenu();
        }
        else if(this.open === false){
            this._openMenu();
        }
    },
  _onMenuOpen: function() {
       // Disable mousewheel scroll when #site-nav is active
    document.getElementsByTagName('body')[0].addEventListener('mousewheel DOMMouseScroll', function(e) {
        if(self.open) {
            e.preventDefault();
        }
    });
    document.getElementsByTagName('body')[0].addEventListener('keydown', function(e) {
        var ar = new Array(33,34,35,36,37,38,39,40);
        var key = e.which;
        if(self.open) {
            if(ar.indexOf(key) > -1){
                e.preventDefault();
                return false;
            }
        }
    return true;
    });

    document.getElementsByTagName('body')[0].addEventListener('touchmove', function(e) { 
        if(self.open) {
            e.preventDefault();
        }
    });

  },
  _onMenuClose : function(){
    document.getElementsByTagName('body')[0].removeEventListener();
  }

};