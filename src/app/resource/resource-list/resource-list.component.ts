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
    },
    {
      rate: 9.7,
      achievements:
        'Благодарственное письмо от руководителя (1 шт.), подача рационализаторского предложения, опыт замещения руководителя (2 недели), внедрение нового проекта (1 шт.), участие в общественной жизни организации, повышение квалификации',
      name: 'Сидоров Константин Гринорьевич',
    },

    {
      achievements:
        'Подача рационализаторского предложения, опыт замещения руководителя (1 недели), внедрение нового проекта (1 шт.), участие в общественной жизни организации, повышение квалификации',
      name: 'Мох Сергей Иванович',
      rate: 9.0,
    },
    {
      achievements:
        'Подача рационализаторского предложения, опыт замещения руководителя (1 недели), внедрение нового проекта (1 шт.), участие в общественной жизни организации, повышение квалификации',
      name: 'Мох Сергей Иванович',
      rate: 9.0,
    },
    {
      achievements:
        'Подача рационализаторского предложения, опыт замещения руководителя (1 недели), внедрение нового проекта (1 шт.), участие в общественной жизни организации, повышение квалификации',
      name: 'Мох Сергей Иванович',
      rate: 8.9,
    },
    {
      achievements:
        'Подача рационализаторского предложения, опыт замещения руководителя (1 недели), внедрение нового проекта (1 шт.), участие в общественной жизни организации, повышение квалификации',
      name: 'Мох Сергей Иванович',
      rate: 7.0,
    },
    {
      achievements:
        'Подача рационализаторского предложения, опыт замещения руководителя (1 недели), внедрение нового проекта (1 шт.), участие в общественной жизни организации, повышение квалификации',
      name: 'Мох Сергей Иванович',
      rate: 6.3,
    },
  ];
  dataSource$ = of(this.users);

  selectedUser: any; // Placeholder for the selected user

  addAchievement() {
    if (this.selectedUser) {
      // Logic to add an achievement to the selected user
      this.selectedUser.achievements.push('New Achievement');
    }
  }
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
  constructor(private resourceApiService: ResourceApiService) {}
}
