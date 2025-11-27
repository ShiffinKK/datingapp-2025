import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { InitService } from '../core/service/init-service';
import { lastValueFrom } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes,withViewTransitions()),
    provideHttpClient(),
    provideAppInitializer(async()=>{
      const initService=inject(InitService)
      return new Promise<void>((resolve)=>{
        setInterval(async()=>{
          try
      {
        return lastValueFrom(initService.init());
      }finally{
        const Splash=document.getElementById('initial-splash');
        if(Splash){
          Splash.remove();
        }
        resolve();
      }
        },500)
      })
      
    })
  ]
};
