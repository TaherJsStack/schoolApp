import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendRoutingModule } from './frontend-routing.module';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FrontEndComponent } from './front-end.component';
import { HeaderComponent } from './header/header.component';
import { PagesComponent } from './pages/pages.component';
import { FooterComponent } from './footer/footer.component';
import { IndexComponent } from './pages/index/index.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SheardHeaderComponent } from './sheard-header/sheard-header.component';
import { FeaturesComponent } from './pages/features/features.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ServicesComponent } from './pages/services/services.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ParallaxDirective } from './directives/parallax.directive';
import { ScrollMenuDirective } from './directives/scroll-menu.directive';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { LoadingScreenDirective } from './directives/loading-screen.directive';
import { ScrollTopDirective } from './directives/scroll-top.directive';
import { NumberCounterDirective } from './directives/number-counter.directive';
import { GallerySectionComponent } from './components/gallery-section/gallery-section.component';
import { AboutSectionComponent } from './components/about-section/about-section.component';
// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    LoadingScreenDirective,
    ScrollMenuDirective,
    ParallaxDirective,
    FrontEndComponent,
    HeaderComponent,
    PagesComponent,
    FooterComponent,
    IndexComponent,
    AboutComponent,
    ContactComponent,
    SheardHeaderComponent,
    FeaturesComponent,
    GalleryComponent,
    ServicesComponent,
    BlogComponent,
    LoadingScreenComponent,
    ScrollTopDirective,
    NumberCounterDirective,
    GallerySectionComponent,
    AboutSectionComponent,

  ],
  imports: [
    CommonModule,
    FrontendRoutingModule,
    FlashMessagesModule.forRoot(),
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
  }),
  NgCircleProgressModule.forRoot({
    // set defaults here
    radius: 100,
    outerStrokeWidth: 16,
    innerStrokeWidth: 8,
    outerStrokeColor: "#78C000",
    innerStrokeColor: "#C7E596",
    animationDuration: 300,
  })
  ]
})
export class FrontendModule { }
