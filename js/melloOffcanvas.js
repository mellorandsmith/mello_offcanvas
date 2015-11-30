import * as utils from './utils/offcanvas_utils'

/*
    el : class without .
    trigger : class without .
    slided : ID without #
 */
export default function melloOffCanvas (el, trigger, slided, options){
  if (el.length){
    this.el = document.getElementsByClassName(el)[0];
    this.trigger = document.getElementsByClassName(trigger);
    this.slided = document.getElementById(slided);
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
        this.options = utils.extend( melloOffCanvas.defaults, options );
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

        self.triggersHandler();

       document.addEventListener('keyup', function(e) { 
            if (e.keyCode == 27) { self._toggleMenu() } 
        });
    },
    onBodyClick:function(el){
        var self = this;
        self._resetMenu();
        self.el.removeEventListener("click", self.onBodyClick);
    },
    triggersHandler:function(){

        var self = this;

        var triggersCount = this.trigger.length;

        if ( !triggersCount ){
            buttonAction( self.trigger );
        }else{
            for( var i = 0; i < triggersCount; i++){
                buttonAction(self.trigger[i]);
            }
        }

        function buttonAction(el){

            el.addEventListener("click",function(ev){
                ev.stopPropagation();
                ev.preventDefault();
                if( self.open ){
                    self._resetMenu();
                }
                else{
                    self._openMenu();
                    document.addEventListener( "click", function( ev ) {
                        if ( self.open && !( utils.getParents(ev.target,self.el.className).length > 0 || ev.target==self.el) ){
                            self.onBodyClick(this);
                        } 
                    });
                }
            });
        }

    },
    _openMenu : function( subLevel ) {

        var self = this;

        this.el.classList.add("active");
        this.slided.classList.add("active");

        var triggersCount = this.trigger.length;

        if ( !triggersCount ){
            this.trigger.classList.add("active");
        }else{
            for( var i = 0; i < triggersCount; i++){
                this.trigger[i].classList.add("active");
            }
        }
        
        this.open = true;
        this._onMenuOpen();
    },
    _resetMenu : function() {
        this.el.classList.remove("active");
        this.slided.classList.remove("active");
        var triggersCount = this.trigger.length;

        if ( !triggersCount ){
            this.trigger.classList.remove("active");
        }else{
            for( var i = 0; i < triggersCount; i++){
                this.trigger[i].classList.remove("active");
            }
        }
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