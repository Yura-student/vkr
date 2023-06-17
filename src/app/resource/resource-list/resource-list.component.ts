import { Component, ViewChild, OnInit } from '@angular/core';
import { map, of } from 'rxjs';
import { ResourceApiService } from '../resource-api.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

const Material = [MatIconModule];
@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss'],
})
export class ResourceListComponent {
  pageSize: number = 10;
  displayedColumns: string[] = ['rate', 'name', 'achievements'];

  users = [
    {
      rate: 10,
      achievements:
        'Благодарственное письмо от руководителя (2 шт.), подача рационализаторского предложения, опыт замещения руководителя (2 недели), внедрение нового проекта (1 шт.), участие в общественной жизни организации, повышение квалификаци Благодарственное письмо от руководителя (2 шт.), подача рационализаторского предложения, опыт замещения руководителя (2 недели), внедрение нового проекта (1 шт.), участие в общественной жизни организации, повышение квалификаци',
      name: 'Иванов Иван Иванович',
      age: 22,
    },
    {
      rate: 10,
      achievements: 'грамота',
      name: 'Иванов',
      age: 22,
    },

    {
      achievements: 'грамота',
      name: 'Мох',
      rate: 9,
      age: 22,
    },
  ];
  dataSource$ = of(this.users);

  dataSource = new MatTableDataSource(this.users);

  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  //
  //   ngOnInit() {
  //       this.dataSource.sort = this.sort;
  //       this.dataSource.paginator = this.paginator;
  //   }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private resourceApiService: ResourceApiService) {}
}
