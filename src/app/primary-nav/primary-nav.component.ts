import { Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, tap, shareReplay, takeUntil } from 'rxjs/operators';
import { MatDrawer } from '@angular/material/sidenav';
import { NavMenu } from './models/nav-menu.model';
import { User } from '../_/interfaces/user.interface';
import { TaggedTemplateExpr } from '@angular/compiler';

class PrimaryDrawerMock {
	opened: boolean = false;
	close() {
		this.opened = false;
	}

	open() {
		this.opened = true;
	}
}

@Component({
	selector: 'igd-dev-primary-nav',
	templateUrl: './primary-nav.component.html',
	styleUrls: ['./primary-nav.component.scss'],
	encapsulation: ViewEncapsulation.ShadowDom
})
export class PrimaryNavComponent implements OnInit, OnDestroy {
	@ViewChild('primaryDrawer') public primaryDrawer: MatDrawer = <any>(new PrimaryDrawerMock());
	public _user: User | null = null;
	public onDestroy$ = new Subject();
	public get userDisplayName(): string {
		if (this._user) {
			return `${this._user.FirstName}`;
		}
		return '';
	}

	@Input() public set user(value: string) {
		if (value) {
			this._user = JSON.parse(value);
		} else {
			this._user = null;
		}
	}

	/**
  * Observable that tracks the breakpoint of the screen that is a handset.
  */
	public isTabletPortrait$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 995.98px)')
		.pipe(
			tap(result => console.log(result)),
			map(result => result.matches),
			shareReplay()
		);

	/**
	* Observable that tracks the breakpoint of the screen that is a handset.
	*/
	public isTabletLandscape$: Observable<boolean> = this.breakpointObserver.observe('(min-width: 996px) and (max-width: 1180px)')
		.pipe(
			tap(result => console.log(result)),
			map(result => result.matches),
			shareReplay()
		);

	public constructor(private breakpointObserver: BreakpointObserver) { }


	/**
	 * Subscribe to the isHandset observer and close if it is not a handset.
	 */
	public ngOnInit(): void {
		// this.method1();
		this.isTabletPortrait$.pipe(
			takeUntil(this.onDestroy$)
		).subscribe(isHandset => {
			this.closePrimaryDrawer(!isHandset);
		});

	}


	/**
	 * Unsubscribe from the handset observable.
	 */
	public ngOnDestroy(): void {
		this.onDestroy$.next(null);
		this.onDestroy$.complete();
	}

	/**
	 * Close the primary drawer if the breakpoint is desktop.
	 * @param isDesktop If the current breakpoint is desktop.
	 */
	public closePrimaryDrawer(isDesktop: boolean): void {
		if (isDesktop) {
			this.primaryDrawer?.close();
		}
	}

}
