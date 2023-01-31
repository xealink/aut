import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SingleImageComponent } from './single-image.component';

class ImageMock {
	constructor() {
		this.mockImageOnLoadAfter100ms();
	}

	mockImageOnLoadAfter100ms() {
		// @ts-ignore
		setTimeout(() => this.onload());
	}
}

class MockMatDialog {

}



fdescribe('SingleImageComponent', () => {
	// it('Image load test', (done) => {
	// 	const callback = (status: any) => {
	// 		done();
	// 	}


	// });

	let component: SingleImageComponent;
	let fixture: ComponentFixture<SingleImageComponent>;

	describe('with a valid user', () => {
		beforeEach(async () => {
			window.Image = <any>ImageMock;
			await TestBed.configureTestingModule({
				declarations: [SingleImageComponent],
				providers: [
					{ provide: MatDialog, useValue: MockMatDialog }
				]
			}).compileComponents();

			fixture = TestBed.createComponent(SingleImageComponent);
			component = fixture.componentInstance;
			component.srcPrefix = 'somePrefix';
			component.src = 'someSrc';
			fixture.detectChanges();
		});

		it('should create component', () => {
			expect(component).toBeTruthy();
		});


		// it('should return "Bill" for userDisplayName', () => {
		// 	expect(component.userDisplayName).toBe('Bill');
		// })
	});

	// beforeEach(async () => {
	// 	await TestBed.configureTestingModule({
	// 		declarations: [SingleImageComponent],
	// 		imports: [
	// 			BrowserAnimationsModule
	// 		]
	// 	})
	// 		.compileComponents();

	// 	fixture = TestBed.createComponent(SingleImageComponent);
	// 	component = fixture.componentInstance;
	// 	component.componentType = 21;
	// 	component.src = 'test.png';
	// 	component.description = 'test';
	// 	component.srcPrefix = 'https://igd.com';
	// 	fixture.detectChanges();
	// });

	// it('should create', () => {
	// 	expect(component).toBeTruthy();
	// });

	// it('should convert type to a feature component type', () => {
	// 	expect(component.componentType).toEqual(FeatureComponent.COM21);
	// });

	// it('should open the dialog with the correct configuration', fakeAsync(() => {
	// 	const spy = spyOn(component.matDialog, 'open').and.callThrough();
	// 	component.zoomIn();
	// 	tick(1000);
	// 	expect(spy).toHaveBeenCalledWith(SingleImageDialogComponent, {
	// 		hasBackdrop: true,
	// 		data: {
	// 			componentType: FeatureComponent.COM21,
	// 			src: 'test.png',
	// 			description: 'test',
	// 			srcPrefix: 'https://igd.com'
	// 		},
	// 		panelClass: 'single-image-dialog-panel'
	// 	});
	// }));

	// it('should destroy subscription', () => {
	// 	const spy = spyOn(component.destroyComponent, 'complete');
	// 	component.ngOnDestroy();
	// 	expect(spy).toHaveBeenCalled();
	// });
});
