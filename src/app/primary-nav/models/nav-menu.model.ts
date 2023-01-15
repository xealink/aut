import { NavMenuChild } from './nav-menu-child.model';

/**
 * A model for the list of menus in the primary nav.
 */
export interface NavMenu {
	id: string;
	text: string;
	subTitle: string;
	description: string;
	children: NavMenuChild[];
	href?: string;
	expanded?: boolean;
	hasSearch?: boolean;
	active?: boolean;
	mobileOnly?: boolean;
}
