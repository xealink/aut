import { Component, Input, OnInit } from '@angular/core';
import { User } from '../_/interfaces/user.interface';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
	private _user: User | null = null;

	@Input() public set user(value: string) {
		if (value) {
			this._user = JSON.parse(value);
		}
		else
			this._user = null;
	}


	public get userDisplayName(): string {
		if (this._user) {
			return `${this._user.FirstName}`;
		}
		return '';
	}

	constructor() { }

	ngOnInit(): void {
	}

}
