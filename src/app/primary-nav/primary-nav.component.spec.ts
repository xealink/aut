import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { waitForAsync, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PrimaryNavComponent } from './primary-nav.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { User } from '../_/interfaces/user.interface';
import { Subject, Observable, BehaviorSubject, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { STRINGIFIED_USER } from '../_/interfaces/user.constant';
import { Injectable } from '@angular/core';


@Injectable()
class MockBreakpointObserver {
	portrait$: Subject<any> = new Subject();
	landscape$: Subject<any> = new Subject();

	observe(query: string) {
		if (query === '(max-width: 995.98px)')
			return this.portrait$;
		else
			return this.landscape$;
	}
}

describe('PrimaryNavComponent', () => {
	let component: PrimaryNavComponent;
	let fixture: ComponentFixture<PrimaryNavComponent>;

	describe('with a valid user', () => {
		beforeEach(async () => {
			let mockService: MockBreakpointObserver = new MockBreakpointObserver();
			await TestBed.configureTestingModule({
				declarations: [PrimaryNavComponent],
			}).compileComponents();

			fixture = TestBed.createComponent(PrimaryNavComponent);
			component = fixture.componentInstance;
			component.user = STRINGIFIED_USER;
			fixture.detectChanges();


		});

		it('should create component', () => {
			expect(component).toBeTruthy();
		});


		it('should return "Bill" for userDisplayName', () => {
			expect(component.userDisplayName).toBe('Bill');
		})
	});


	describe('with a invalid user (null)', () => {

		beforeEach(async () => {
			let mockService: MockBreakpointObserver = new MockBreakpointObserver();
			await TestBed.configureTestingModule({
				declarations: [PrimaryNavComponent],
			}).compileComponents();

			fixture = TestBed.createComponent(PrimaryNavComponent);
			component = fixture.componentInstance;
			component.user = <any>null;
			fixture.detectChanges();
		});

		it('should create component', () => {
			expect(component).toBeTruthy();
		});


		it('should return "" for userDisplayName', () => {
			expect(component.userDisplayName).toBe('');
		})
	});

	describe('portrait mode', () => {
		let mockService: MockBreakpointObserver = new MockBreakpointObserver();
		beforeEach(async () => {
			await TestBed.configureTestingModule({
				declarations: [PrimaryNavComponent],
				providers: [
					{ provide: BreakpointObserver, useValue: mockService }
				]
			}).compileComponents();

			fixture = TestBed.createComponent(PrimaryNavComponent);
			component = fixture.componentInstance;
			fixture.detectChanges();

		});

		it('should create component with portrait mode', () => {
			mockService.portrait$.next({ matches: true });
			expect(component).toBeTruthy();
		});
	});

	describe('landscape mode', () => {
		let mockService: MockBreakpointObserver;
		beforeEach(async () => {
			mockService = new MockBreakpointObserver();
			await TestBed.configureTestingModule({
				declarations: [PrimaryNavComponent],
				providers: [
					{ provide: BreakpointObserver, useValue: mockService }
				]
			}).compileComponents();

			fixture = TestBed.createComponent(PrimaryNavComponent);
			component = fixture.componentInstance;
			fixture.detectChanges();

		});

		it('should create component with landscape mode', async () => {
			component.isTabletLandscape$.pipe(take(1)).subscribe();
			mockService.landscape$.next({ matches: true });
			expect(component).toBeTruthy();
		});
	})
});


/*
	Solution 1: (Recommended)
		1. Encapsulate the below lines into a method and consume this method in ngOnInit

			public isTabletPortrait$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 995.98px)')
				.pipe(
					map(result => result.matches),
					shareReplay()
				);

			public isTabletLandscape$: Observable<boolean> = this.breakpointObserver.observe('(min-width: 996px) and (max-width: 1180px)')
				.pipe(
					map(result => result.matches),
					shareReplay()
				);

		2. Mock using breakpointObserver (spyOn)

	Solution 2: (Invalid)
		2. Mock isTabletPortrait$ by assigning a new BehaviorSubject
*/


// describe('Primary Nav Component', () => {
// 	let component: PrimaryNavComponent;
// 	let fixture: ComponentFixture<PrimaryNavComponent>;
// 	let user: User = {
// 		FirstName: 'Alistair',
// 		LastName: 'Bowen-Davies'
// 	};

// 	// beforeEach(waitForAsync(() => {
// 	// 	TestBed.configureTestingModule({
// 	// 		declarations: [PrimaryNavComponent],
// 	// 		imports: [
// 	// 			NoopAnimationsModule,
// 	// 			LayoutModule,
// 	// 			HttpClientModule,
// 	// 			ReactiveFormsModule,
// 	// 			FormsModule
// 	// 		],
// 	// 		providers: [

// 	// 		]
// 	// 	}).compileComponents();
// 	// }));

// 	fdescribe('portrait mode', () => {
// 		beforeEach(() => {
// 			fixture = TestBed.createComponent(PrimaryNavComponent);
// 			component = fixture.componentInstance;
// 			component.user = JSON.stringify(user);
// 			const returnObservable$ = () => ({ matches: true });
// 			// spyOn((<any>component).breakpointObserver, 'observe').withArgs('(max-width: 995.98px)').and.returnValue(returnObservable$)
// 			const isTabletPortraitMock$: BehaviorSubject<boolean> = new BehaviorSubject(false);
// 			component.isTabletPortrait$ = <any>isTabletPortraitMock$
// 			isTabletPortraitMock$.next(true);
// 			fixture.detectChanges();
// 		});

// 		it('should return true for portrait mode', () => {
// 			component.isTabletPortrait$.subscribe((result) => {
// 				expect(result).toBe(true);
// 			});
// 		});
// 	})


// 	describe('landscape mode', () => {
// 		beforeEach(() => {
// 			fixture = TestBed.createComponent(PrimaryNavComponent);
// 			component = fixture.componentInstance;
// 			component.user = JSON.stringify(user);
// 			const returnObservable$ = () => ({ matches: 'true' });
// 			// spyOn((<any>component).breakpointObserver, 'observe').withArgs('(min-width: 996px) and (max-width: 1180px)')
// 			// 	.and.returnValue(returnObservable$)

// 			const isTabletLandscapeMock$: BehaviorSubject<boolean> = new BehaviorSubject(false);
// 			component.isTabletLandscape$ = <any>isTabletLandscapeMock$
// 			isTabletLandscapeMock$.next(true);

// 			fixture.detectChanges();
// 		});

// 		it('should return false for portrait mode', () => {
// 			component.isTabletLandscape$.subscribe((result) => {
// 				console.log(result);
// 				expect(result).toBe(true);
// 			});
// 		});
// 	})


// 	// beforeEach(waitForAsync(() => {
// 	// 	TestBed.configureTestingModule({
// 	// 		declarations: [PrimaryNavComponent],
// 	// 		imports: [
// 	// 			NoopAnimationsModule,
// 	// 			LayoutModule,
// 	// 			HttpClientModule,
// 	// 			ReactiveFormsModule,
// 	// 			FormsModule
// 	// 		],
// 	// 		providers: [

// 	// 		]
// 	// 	}).compileComponents();
// 	// }));


// 	// describe('valid user', () => {
// 	// 	beforeEach(waitForAsync(() => {
// 	// 		TestBed.configureTestingModule({
// 	// 			declarations: [PrimaryNavComponent]
// 	// 		}).compileComponents();

// 	// 		fixture = TestBed.createComponent(PrimaryNavComponent);
// 	// 		component = fixture.componentInstance;
// 	// 		component.user = JSON.stringify(user);
// 	// 		fixture.detectChanges();
// 	// 	}));


// 	// 	// beforeEach(async () => {
// 	// 	// 	fixture = await TestBed.createComponent(PrimaryNavComponent);
// 	// 	// 	component = fixture.componentInstance;
// 	// 	// 	component.user = JSON.stringify(user);
// 	// 	// 	fixture.detectChanges();
// 	// 	// });

// 	// 	it('should compile', () => {
// 	// 		expect(component).toBeTruthy();
// 	// 	});

// 	// 	fit('shoud set the user', () => {
// 	// 		console.log(component.user);
// 	// 		expect(JSON.stringify(component.user)).toBe(JSON.stringify(user));
// 	// 	});

// 	// 	it('should return "Alistair" for userDisplayName', () => {
// 	// 		expect(component.userDisplayName).toBe('Alistair');
// 	// 	});

// 	// })

// 	// describe('invalid user', () => {
// 	// 	beforeEach(() => {
// 	// 		fixture = TestBed.createComponent(PrimaryNavComponent);
// 	// 		component = fixture.componentInstance;
// 	// 		component.user = <any>null;
// 	// 		fixture.detectChanges();
// 	// 	});

// 	// 	it('should compile', () => {
// 	// 		expect(component).toBeTruthy();
// 	// 	});

// 	// 	it('shoud set the user to null', () => {
// 	// 		expect(component.user).toBeNull();
// 	// 	});

// 	// 	it('should return "" for userDisplayName', () => {
// 	// 		expect(component.userDisplayName).toBe('');
// 	// 	});
// 	// })

// 	// it('should toggle the sidenav', () => {
// 	// 	const spy = spyOn(component.primaryDrawer, 'toggle');
// 	// 	component.onTogglePrimaryNav();
// 	// 	expect(spy).toHaveBeenCalled();
// 	// });	

// 	// it('should convert user to an object', () => {
// 	// 	component.closePrimaryDrawer(true);
// 	// 	fixture.detectChanges();
// 	// 	expect(component.primaryDrawer.opened).toBe(false);
// 	// });

// 	// it('should get the first initials of the user', () => {
// 	// 	expect(component.userInitials).toBe('AB');
// 	// });

// 	// it('should return empty string when user names are invalid', () => {
// 	// 	component._user = {} as any;
// 	// 	expect(component.userInitials).toBe('');
// 	// });

// 	// it('should convert user to an object', () => {
// 	// 	expect(component._user?.FirstName).toBe('Alistair');
// 	// });

// 	// it('should subscribe to the isHandset observable', () => {
// 	// 	expect(isHandsetSpy).toHaveBeenCalled();
// 	// });

// 	// it('should return empty string when user does not exist', () => {
// 	// 	component._user = null;
// 	// 	expect(component.userInitials).toBe('');
// 	// 	expect(component.userDisplayName).toBe('');
// 	// });

// 	// it('should set user to null if value is blank', () => {
// 	// 	component.user = '';
// 	// 	expect(component._user).toBe(null);
// 	// });

// 	// it('should convert user to an object', () => {
// 	// 	component.isTabletPortrait$.subscribe((val) => {
// 	// 		expect(val).toEqual(true);
// 	// 	});
// 	// });
// });
