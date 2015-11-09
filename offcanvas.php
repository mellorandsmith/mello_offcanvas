<?php

namespace Modules\Mello_Offcanvas;

class Offcanvas {

	public static function render() {
		// display the wp3 menu if available
		return wp_nav_menu(array(
			'container' => false,                           // remove nav container
			'container_class' => 'menu clearfix',           // class of container (should you choose to use it)
			'menu' => __( 'The Main Menu', 'mellotheme' ),  // nav name
			'menu_class' => 'nav top-nav menu-wrap',         // adding custom nav class
			'theme_location' => 'main-nav',                 // where it's located in the theme
			'before' => '',                                 // before the menu
			'after' => '',                                  // after the menu
			'link_before' => '',                            // before each link
			'link_after' => '',                             // after each link
			'depth' => 0,                                   // limit the depth of the nav
			'echo'	=> false,
			'fallback_cb' => 'bones_main_nav_fallback',      // fallback function
			//'walker' => new Mello_Walker
		));
	} /* end bones main nav */
	
}

?>