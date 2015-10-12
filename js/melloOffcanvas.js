//import {singleton, container, dependencies} from '../libs/needlepoint';
import $ from '../../../library/js/libs/jquery';


export default function melloOffCanvas (el, trigger, slided, options){
  
  if ($(el).length){
    this.$el = $(el);
    this.$trigger = $(trigger);
    this.$slided = $(slided);

    this._init(options);

  }

}

melloOffCanvas.defaults = {
  option1: true,
  option2: false

}

melloOffCanvas.prototype = {
    _init : function(options){
        console.log('offcanvas menu initialised');
        this.options = $.extend( true, {}, melloOffCanvas.defaults, options );
        this.open = false;
        this._layout();
        this._initEvents();
    },
    _layout: function(){
        this.menuItems = this.$el.find("li");
    },
    _initEvents : function (){
        var self = this;
        // menu button handler
        this.$trigger.on("click",function(ev){
            ev.stopPropagation();
            ev.preventDefault();
            if(self.open){
                self._resetMenu();
            }
            else{
                self._openMenu();
                document.addEventListener( "click", function( ev ) {
                    if ( self.open && !( $(ev.target).parents(self.$el.selector).length || ev.target==self.$el[0]) ){
                        onBodyClick(this);
                    } 
                });
            }
        });

        var onBodyClick = function(el){
          self._resetMenu();
          self.$el.off("click", onBodyClick);
        }

        self.$el.children('a').on('click', function(e) {
            if(self.open) {
                closeSiteNav();
            }
        });

        $(document).keyup(function(e) { 
            if (e.keyCode == 27) { self._toggleMenu() } 
        });
    },
    _openMenu : function( subLevel ) {
        this.$el.addClass("active");
        this.$slided.addClass("active");
        this.$trigger.addClass("active");
        this.open = true;
        this._onMenuOpen();
    },
    _resetMenu : function() {
        this.$el.removeClass("active");
        this.$slided.removeClass("active");
        this.$trigger.removeClass("active");
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
    $('body').on('mousewheel DOMMouseScroll', function(e) {
        if(self.open) {
            e.preventDefault();
        }
    });
    $('body').keydown(function(e) {
        var ar = new Array(33,34,35,36,37,38,39,40);
        var key = e.which;
        if(self.open) {
            if($.inArray(key,ar) > -1){
                e.preventDefault();
                return false;
            }
        }
    return true;
    });

    $('body').on('touchmove', function(e) { 
        if(self.open) {
            e.preventDefault();
        }
    });

  },
  _onMenuClose : function(){
    $('body').off();
  }

};