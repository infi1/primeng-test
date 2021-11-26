import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import { MenuItem, PrimeIcons, PrimeNGConfig } from 'primeng/api';
import { DomHandler } from 'primeng/dom';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  isMobile = false;
  title = 'DISCONT // WWW // SPHERE';
  visible = false;
  slideItems: MenuItem[];
  isFilled = true;

  constructor(
    public translate: TranslateService,
    private config: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.initMenu('header');
    this.slideItems = [
      {
        label: 'File',
        icon: 'pi pi-fw pi-file',
        visible: false,
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Left',
            icon: 'pi pi-fw pi-align-left',
          },
          {
            label: 'Right',
            icon: 'pi pi-fw pi-align-right',
          },
          {
            label: 'Center',
            icon: 'pi pi-fw pi-align-center',
          },
          {
            label: 'Justify',
            icon: 'pi pi-fw pi-align-justify',
          },
        ],
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus',
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus',
          },
        ],
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
        visible: false,
      },
    ];

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // console.log(event.translations.header);
      this.buildMenu(event.translations.header, this.visible);
    });

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

  buildMenu(labels, visible) {
    this.items = [
      {
        label: labels.home, // Home',
        routerLink: ['/home'],
        visible: visible,
      },
      {
        label: labels.login,
        routerLink: ['/login'],
        visible: visible,
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
            label: 'Legacy',
            items: [
              {
                label: 'Luna Amber',
                command: () => this.changeTheme('luna-amber'),
              },
              {
                label: 'Luna Blue',
                command: () => this.changeTheme('luna-blue'),
              },
            ],
          },
          {
            label: 'PrimeOne 2021',
            items: [
              {
                label: 'Arya Green',
                command: () => this.changeTheme('arya-green'),
              },
              {
                label: 'Saga Green',
                command: () => this.changeTheme('saga-green'),
              },
            ],
          },
          {
            label: 'Bootstrap',
            items: [
              {
                label: 'Light Blue',
                command: () => this.changeTheme('light-blue'),
              },
              {
                label: 'Dark Blue',
                command: () => this.changeTheme('dark-blue'),
              },
            ],
          },
        ],
      },
    ];
  }

  activeMenu(event) {
    console.log(event.target.classList);
  }

  simulateLogin() {
    this.visible = true;
    this.initMenu('header');
    // console.log(this.items);
  }

  simulateLogOut() {
    this.visible = false;
    this.initMenu('header');
    // console.log(this.items);1
  }

  initMenu(key: string) {
    // console.log(key);
    this.translate.get(key).subscribe((labels) => {
      // console.log(res);
      this.buildMenu(labels, this.visible);
    });
  }

  changeLang(lang: string) {
    this.translate.use(lang);
    // this.translate
    //   .get('primeng')
    //   .subscribe((res) => this.primengConfig.setTranslation(res));
    // this.initMenu('header');
  }

  onChangeInput() {
    if (this.isFilled) {
      DomHandler.addClass(document.body, 'p-input-filled');
    } else {
      DomHandler.removeClass(document.body, 'p-input-filled');
    }
  }
}
