import { Component } from '@angular/core';
import { STRINGIFIED_USER, USER } from './_/interfaces/user.constant';
import { User } from './_/interfaces/user.interface';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	stringifiedUser: string = '';

	ngOnInit() {
		this.stringifiedUser = STRINGIFIED_USER;
	}
}
