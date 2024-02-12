import { Component } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header-home',
  standalone: true,
  imports: [ NgbModule, NgClass ],
  templateUrl: './header-home.component.html',
  styleUrl: './header-home.component.css'
})
export class HeaderHomeComponent {

  isCollapsed = true;
  className:string = '';

    constructor(
      private breakpointObserver: BreakpointObserver,
    ) {
      this.breakpointObserver.observe([
        "(max-width: 991px)"
      ]).subscribe((result: BreakpointState) => {
        if (result.matches) {
          this.isCollapsed = false;
          this.className = 'btn-outline-secondary';
        } else {
          this.isCollapsed = true;
          this.className = 'btn-primary';
        }
      });
    }

}
