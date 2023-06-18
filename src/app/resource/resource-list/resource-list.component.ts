import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { filter, take } from 'rxjs';
import { ResourceApiService } from '../resource-api.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../resource';
import { Router } from '@angular/router';

const Material = [MatIconModule];

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss'],
})
export class ResourceListComponent implements AfterViewInit {
  displayedColumns: string[] = ['rate', 'name', 'achievements'];

  selectedUser: any; // Placeholder for the selected user

  editAchievement(id: string) {
    this.router.navigate(['/resources/', id]);
  }

  dataSource = new MatTableDataSource(this.resourceApiService.users);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('deleteConfirmationDialog')
  deleteConfirmationDialog!: TemplateRef<any>;
  //
  //   ngOnInit() {
  //       this.dataSource.sort = this.sort;
  //       this.dataSource.paginator = this.paginator;
  //   }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getRateCellStyle(rate: number) {
    if (rate >= 9.1) {
      return { 'background-color': 'rgba(79,227,31,0.88)' };
    } else if (rate >= 8.0 && rate <= 9.0) {
      return { 'background-color': 'rgba(255,214,0,0.83)' };
    } else if (rate >= 7.0 && rate <= 7.9) {
      return { 'background-color': 'rgba(244,67,54,0.92)' };
    } else {
      return {}; // Возвращаем пустой объект, если нет соответствующего условия
    }
  }

  constructor(
    private resourceApiService: ResourceApiService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  handleDelete(user: User) {
    const dialogRef = this.dialog.open(this.deleteConfirmationDialog);

    dialogRef
      .afterClosed()
      .pipe(
        filter((value) => Boolean(value)),
        take(1)
      )
      .subscribe(() => {
        this.resourceApiService.users = this.resourceApiService.users.filter(
          (item) => item !== user
        );
        this.dataSource.data = this.resourceApiService.users;
      });
  }
}
