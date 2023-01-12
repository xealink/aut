import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BreakpointChange } from './_/interfaces/breakpoint-change.interface';

@Injectable({
	providedIn: 'root'
})
export class BreakpointObserverService {
	observeTabletPortrait$: BehaviorSubject<BreakpointChange> = new BehaviorSubject(<BreakpointChange>{ matches: false });
	observeTabletLandscape$: BehaviorSubject<BreakpointChange> = new BehaviorSubject(<BreakpointChange>{ matches: false });
	constructor() {
		// setInterval(() => {
		// 	this._portraitMode = !this._portraitMode;
		// 	const who$ = this._portraitMode ? this.observeTabletPortrait$ : this.observeTabletLandscape$;
		// 	who$.next({ matches: true })
		// }, 5000);
	}

	// rotate() {
	// 	this._portraitMode = !this._portraitMode;
	// 	const who$ = this._portraitMode ? this.observeTabletPortrait$ : this.observeTabletLandscape$;
	// 	who$.next({ matches: true })
	// }

	switchToPortraitMode() {
		this.observeTabletPortrait$.next({ matches: true });
		this.observeTabletLandscape$.next({ matches: false });
	}

	switchToLandscapeMode() {
		this.observeTabletPortrait$.next({ matches: false });
		this.observeTabletLandscape$.next({ matches: true });
	}
}
