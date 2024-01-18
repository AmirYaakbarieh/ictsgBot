import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { isCreateBotGuard } from './services/is-create-bot.guard';

import { EditBotComponent } from './components/edit-bot/edit-bot.component';




const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
 
  { path: 'editbot/:id', component: EditBotComponent },
  // { path: 'editbot', component: EditBotComponent },
  { path: 'about', loadChildren: () => import('./components/about-us/about-us.module').then(m => m.AboutUsModule), data: { preload: false } },
  { path: 'contactus', loadChildren: () => import('./components/contact-us/contact-us.module').then(m => m.ContactUsModule), data: { preload: false } },
  { path: 'login', loadChildren: () => import('./components/log-in/log-in.module').then(m => m.LogInModule), data: { preload: false } },
  { path: 'logout', loadChildren: () => import('./components/log-out/log-out.module').then(m => m.LogOutModule), data: { preload: false } },
  { path: 'register', loadChildren: () => import('./components/register/register.module').then(m => m.RegisterModule), data: { preload: false } },
  // { path: 'view', loadChildren: () => import('./components/view/view.module').then(m => m.ViewModule), data: { preload: false }, canActivate: [isCreateBotGuard] },
  { path: 'view/:id', loadChildren: () => import('./components/view/view.module').then(m => m.ViewModule), data: { preload: false }, canActivate: [isCreateBotGuard] },
  { path: 'management', loadChildren: () => import('./components/management/management.module').then(m => m.ManagementModule), data: { preload: false }, canActivate: [isCreateBotGuard] },
  { path: 'sidebar', loadChildren: () => import('./components/side-bar/side-bar.module').then(m => m.SideBarModule), data: { preload: false }},
  { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule), data: { preload: false }, canActivate: [isCreateBotGuard] },
  { path: 'users', loadChildren: () => import('./components/users/users.module').then(m => m.UsersModule), data: { preload: false }},
  { path: 'bot/:id/:flowid', loadChildren: () => import('./components/create-bot/create-bot.module').then(m => m.CreateBotModule), data: { preload: false }, canActivate: [isCreateBotGuard] },
  { path: 'setting', loadChildren: () => import('./components/setting/setting.module').then(m => m.SettingModule), data: { preload: false } },
  { path: 'usermenu/:id', loadChildren: () => import('./components/usermenu/usermenu.module').then(m => m.UsermenuModule), data: { preload: false } },
  { path: 'frame/:id', loadChildren: () => import('./components/frame/frame.module').then(m => m.FrameModule), data: { preload: false } },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  // imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
