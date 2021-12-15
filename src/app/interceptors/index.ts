import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

export const httpInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true // menandakan HTTP_INTERCEPTORS digunakan di dalam
        // berbagai provider dalam bentuk array
    },
];