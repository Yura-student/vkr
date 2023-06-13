import { Component } from '@angular/core';
import { map } from 'rxjs';
import { ResourceApiService } from '../resource-api.service';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss'],
})
export class ResourceListComponent {
  displayedColumns: string[] = ['name', 'year', 'color', 'pantone_value'];
  dataSource$ = this.resourceApiService
    .getResources()
    .pipe(map((response: any) => response.data));

  constructor(private resourceApiService: ResourceApiService) {}
}
