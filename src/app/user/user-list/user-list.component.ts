import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap, take } from 'rxjs';
import { UserApiService } from '../user-api.service';
import { User } from '../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users!: User[];
  totalUsers: number = 0;
  pageSize: number = 6;
  currentPageIndex: number = 0;

  @ViewChild('deleteConfirmationDialog')
  deleteConfirmationDialog!: TemplateRef<any>;

  constructor(
    private userApiService: UserApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userApiService
      .getUsers(this.currentPageIndex + 1)
      .subscribe((response: any) => {
        this.users = response.data;
        this.totalUsers = response.total;
      });
  }

  onPageChange(event: any): void {
    this.currentPageIndex = event.pageIndex;
    this.loadUsers();
  }

  deleteUser(event: MouseEvent, userId: number) {
    event.preventDefault();
    event.stopImmediatePropagation();
    const dialogRef = this.dialog.open(this.deleteConfirmationDialog);

    dialogRef
      .afterClosed()
      .pipe(
        filter((value) => Boolean(value)),
        switchMap((value) => this.userApiService.deleteUser(userId)),
        take(1)
      )
      .subscribe(
        () => (this.users = this.users.filter((user) => user.id !== userId))
      );
  }
}
