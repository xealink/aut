/**
 * A model for the list of links in a nav menu.
 */
export interface NavMenuChild {
    id: string;
    text: string;
    column: number;
    row: number;
    description: string;
    href?: string;
    hovering?: boolean;
    active?: boolean;
}
