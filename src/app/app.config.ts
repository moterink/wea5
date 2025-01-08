import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideHttpClient } from "@angular/common/http";
import { provideKeycloak } from "keycloak-angular";
import { provideNativeDateAdapter } from "@angular/material/core";
import {provideCharts, withDefaultRegisterables} from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideNativeDateAdapter(),
    provideCharts(withDefaultRegisterables()),
    provideKeycloak({
      config: {
        url: "http://localhost:8080",
        realm: "master",
        clientId: "nextstop-api",
      },
      initOptions: {
        onLoad: "login-required",
        checkLoginIframe: false,
      },
    }),
  ],
};
