import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private primengConfig: PrimeNGConfig,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.translate.addLangs(['en', 'de']);
    // this.translate.setDefaultLang('de');

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|de/) ? browserLang : 'en');
    this.translate.get('primeng').subscribe((res) => {
      this.primengConfig.setTranslation(res);
    });
  }
}
