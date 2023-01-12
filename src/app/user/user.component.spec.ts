import { ComponentFixture, TestBed } from '@angular/core/testing';
import { STRINGIFIED_USER } from '../_/interfaces/user.constant';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
	let component: UserComponent;
	let fixture: ComponentFixture<UserComponent>;

	describe('with a valid user', () => {
		beforeEach(async () => {
			await TestBed.configureTestingModule({
				declarations: [UserComponent]
			}).compileComponents();

			fixture = TestBed.createComponent(UserComponent);
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
			await TestBed.configureTestingModule({
				declarations: [UserComponent]
			}).compileComponents();

			fixture = TestBed.createComponent(UserComponent);
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
});
