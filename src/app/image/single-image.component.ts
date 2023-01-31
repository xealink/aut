import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subject, takeUntil } from 'rxjs';

/**
 * Component that presents a single image in either landscape or portrait.
 */
@Component({
	selector: 'igd-dev-single-image',
	templateUrl: './single-image.component.html',
	styleUrls: [],
	animations: [
		trigger('expandedButton', [
			state('hovering', style({
				display: 'block'
			})),
			state('notHovering', style({
				display: 'none'
			})),
			transition('hovering => notHovering', [
				animate('300ms')
			]),
			transition('notHovering => hovering', [
				animate('300ms')
			])
		])
	]
})
export class SingleImageComponent implements OnDestroy, OnInit {

	//#region Public properties.
	public hovering = false;
	public destroyComponent = new Subject<void>();
	//#endregion

	//#region Inputs

	@Input() public src!: string;

	@Input() public srcPrefix!: string;

	@Input() public description!: string;

	//#endregion

	public constructor(public matDialog: MatDialog) { }

	/**
	 * On destroy, all subscriptions should be unsubscribed from.
	 */
	public ngOnDestroy(): void {
		this.destroyComponent.next();
		this.destroyComponent.complete();
	}


	public ngOnInit(): void {
		const image = new Image();
		image.src = `${this.srcPrefix}/cdn-cgi/image/width=708,quality=75/${this.src}`;
		image.onload = (): void => {
			const ratio = image.width / image.height;
			// this.componentType = ratio < 1 ? FeatureComponent.COM21 : FeatureComponent.COM20;
		};
	}


	/**
	 * When use clicks the zoom button, open the dialog to display
	 * the enlarged image.
	 */
	public zoomIn(): void {
		// this.matDialog.open<SingleImageDialogComponent, SingleImageDialogData>(SingleImageDialogComponent, {
		// 	hasBackdrop: true,
		// 	data: {
		// 		componentType: this.componentType,
		// 		src: this.src,
		// 		description: this.description,
		// 		srcPrefix: this.srcPrefix
		// 	},
		// 	panelClass: 'single-image-dialog-panel'
		// }).afterClosed().pipe(
		// 	takeUntil(this.destroyComponent)
		// ).subscribe();
	}
}
