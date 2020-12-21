import { BlogComponent } from './pages/blog/blog.component';
import { ServicesComponent } from './pages/services/services.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { FeaturesComponent } from './pages/features/features.component';
import { FrontEndComponent } from './front-end.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';


const routes: Routes = [

  { path: '', component: FrontEndComponent, children: [

    { path: '', component: IndexComponent},
    
    { path: 'index', component: IndexComponent},
    { path: 'about', component: AboutComponent},
    { path: 'features', component: FeaturesComponent},
    { path: 'gallery', component: GalleryComponent},
    { path: 'services', component: ServicesComponent},
    { path: 'blog', component: BlogComponent},
    { path: 'contact', component: ContactComponent},

          
    // { path: 'library', 
    //   loadChildren: () => 
    //   import('./pages/library/library.module').then(m => m.LibraryModule) },
    
    // { path: 'notice',  component: NoticeComponent},

    // { path: '', redirectTo: '/heroes', pathMatch: 'full' },
    // { path: '**', component: DashboardComponent }
  ] },

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendRoutingModule { }
