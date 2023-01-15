import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakpointObserverService } from '../breakpoint-observer.service';

import { DeviceTypeComponent } from './device-type.component';

describe('DeviceTypeComponent', () => {
	let component: DeviceTypeComponent;
	let fixture: ComponentFixture<DeviceTypeComponent>;

	describe('Landscape Mode', () => {
		beforeEach(async () => {
			await TestBed.configureTestingModule({
				declarations: [DeviceTypeComponent]
			}).compileComponents();

			fixture = TestBed.createComponent(DeviceTypeComponent);
			component = fixture.componentInstance;
			(<BreakpointObserverService>(<any>component)._breakpointObserverService).switchToLandscapeMode();
			fixture.detectChanges();
		});

		it('should close the drawer in landscape mode', () => {
			expect(component.isDrawerOpen).toBe(true);
		})
	});

	describe('Portrait Mode', () => {
		beforeEach(async () => {
			await TestBed.configureTestingModule({
				declarations: [DeviceTypeComponent]
			}).compileComponents();

			fixture = TestBed.createComponent(DeviceTypeComponent);
			component = fixture.componentInstance;
			(<BreakpointObserverService>(<any>component)._breakpointObserverService).switchToPortraitMode();
			fixture.detectChanges();
		});

		it('should close the drawer in portrait mode', () => {
			expect(component.isDrawerOpen).toBe(false);
		})
	});
});
