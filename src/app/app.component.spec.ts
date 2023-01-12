import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';

describe('AppComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			declarations: [
				AppComponent,
				UserComponent
			],
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it('should render FirstName', () => {
		const fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
		const compiled = fixture.nativeElement as HTMLElement;

		expect(compiled.textContent).toContain('Bill');
	});
});
