import { Component, OnInit } from '@angular/core';

import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];
  isMobile = false;
  title = 'DISCONT // WWW // SPHERE';
  visible = true;

  constructor() {}

  ngOnInit(): void {
    this.initMenu();

    this.isMobile = this.getIsMobile();
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
      // console.log(this.isMobile);
    };
  }

  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 960;
    if (w <= breakpoint) {
      return true;
    } else {
      return false;
    }
  }

  changeTheme(theme: string) {
    let themeElement = document.getElementById('theme-link');
    // const currentThemeHref = themeElement.getAttribute('href');
    themeElement.setAttribute('href', `assets/themes/${theme}.css`);
  }

  initMenu() {
    this.items = [
      {
        label: 'Home',
        routerLink: ['/home'],
        visible: this.visible,
      },
      {
        label: 'Login',
        routerLink: ['/login'],
        visible: this.visible,
      },
      {
        label: 'Themes',
        icon: PrimeIcons.COG,
        styleClass: 'right',
        items: [
          {
            label: 'Arya Green',
            command: () => this.changeTheme('arya-green'),
          },
          {
            label: 'Luna Amber',
            command: () => this.changeTheme('luna-amber'),
          },
          {
            label: 'Luna Blue',
            command: () => this.changeTheme('luna-blue'),
          },
          {
            label: 'Saga Green',
            command: () => this.changeTheme('saga-green'),
          },
        ],
      },
    ];
  }

  activeMenu(event) {
    console.log(event.target.classList);
  }
}
