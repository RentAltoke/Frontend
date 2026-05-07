import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../features/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar {
  collapsed = false;

  constructor(private router: Router, private authService: AuthService) {}

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/inicio']);
  }
  
}
