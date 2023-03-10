import { TrandsComponent } from './../trands/trands.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryContentComponent } from './components/category-content/category-content.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { TrendsNewsComponent } from '../trands/trends-news/trends-news.component';

const routes: Routes = [
  { path: 'category/:slug', component: CategoryContentComponent },
  { path: 'trends', component: TrendsNewsComponent },

  { path: 'trends/:slug', component: TrandsComponent },
  { path: 'articles', component:ArticlesComponent },
  {
    path: '',
    loadChildren: () =>
      import('../@news/newscontent.module').then((m) => m.NewscontentModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
