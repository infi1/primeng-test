import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { MenuItem, PrimeIcons, PrimeNGConfig } from 'primeng/api';

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

  constructor(
    public translate: TranslateService,
    // private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.initMenu('header');

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
    // console.log(navigator.language);
    // const currentThemeHref = themeElement.getAttribute('href');
    themeElement.setAttribute('href', `assets/themes/${theme}.css`);
  }

  buildMenu(labels) {
    this.items = [
      {
        label: labels.home, // Home',
        routerLink: ['/home'],
        visible: this.visible,
      },
      {
        label: labels.login,
        routerLink: ['/login'],
        visible: this.visible,
      },
      {
        label: labels.translate,
        items: [
          {
            label: labels.lang.en,
            command: () => this.changeLang('en'),
          },
          {
            label: labels.lang.de,
            command: () => this.changeLang('de'),
          },
        ],
      },
      {
        label: labels.themes,
        icon: PrimeIcons.COG,
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
    // console.log(event.target.classList);
  }

  initMenu(key: string) {
    // console.log(key);
    this.translate.get(key).subscribe((labels) => {
      // console.log(res);
      this.buildMenu(labels);
    });
  }

  changeLang(lang: string) {
    this.translate.use(lang);
    // this.translate
    //   .get('primeng')
    //   .subscribe((res) => this.primengConfig.setTranslation(res));
    this.initMenu('header');
  }
}
