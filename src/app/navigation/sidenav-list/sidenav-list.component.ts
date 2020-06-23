import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  isAuth = false;
  authSubscription: Subscription;
  @Output() closeSidenav = new EventEmitter<void>();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authChange => {
      this.isAuth = authChange;
    })
  }

  onCloseSidenav() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.authService.logout();
    this.onCloseSidenav();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
