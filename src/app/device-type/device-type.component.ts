import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { BreakpointObserverService } from '../breakpoint-observer.service';

@Component({
	selector: 'app-device-type',
	templateUrl: './device-type.component.html',
	styleUrls: ['./device-type.component.scss']
})
export class DeviceTypeComponent implements OnInit, OnDestroy {
	isDrawerOpen: boolean = false;
	onDestroy$: Subject<boolean> = new Subject();

	constructor(private _breakpointObserverService: BreakpointObserverService) { }

	isTabletPortrait$: Observable<boolean> = this._breakpointObserverService.observeTabletPortrait$.pipe(
		map(result => result.matches)
	);

	isTabletLandscape$: Observable<boolean> = this._breakpointObserverService.observeTabletLandscape$.pipe(
		map(result => {
			return result.matches
		})
	);

	ngOnInit() {
		this.isTabletPortrait$.pipe(
			takeUntil(this.onDestroy$)
		).subscribe(isHandset => this.closePrimaryDrawer(!isHandset));

		this.isTabletLandscape$.pipe(
			takeUntil(this.onDestroy$)
		).subscribe(isHandset => this.closePrimaryDrawer(isHandset));
	}

	closePrimaryDrawer(state: boolean) {
		this.isDrawerOpen = state;
	}

	ngOnDestroy(): void {
		this.onDestroy$.next(false);
		this.onDestroy$.complete();
	}
}
