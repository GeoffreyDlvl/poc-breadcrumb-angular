import { Component } from '@angular/core';
import { Breadcrumb, BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'sandbox';

  constructor(protected breadcrumbService: BreadcrumbService) {}
}
