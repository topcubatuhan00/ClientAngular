import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { importProvidersFrom } from "@angular/core";
import { RouterModule } from "@angular/router";
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(),
        importProvidersFrom(
            ToastrModule.forRoot(),
            BrowserModule, 
            RouterModule.forRoot([
            {
                path: "",
                loadComponent: () => import("./app/ui/components/layouts/layouts.component").then(c => c.LayoutsComponent),
                children: [
                    {
                        path: "",
                        loadComponent: () => import("./app/ui/components/home/home.component").then(c => c.HomeComponent),
                    }
                ]
            },
            {
                path: "login",
                loadComponent: () => import("./app/ui/components/auth/login/login.component").then(c => c.LoginComponent),
            }
        ])),
        provideAnimations(),
    ]
})