import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

// import './_designTheme/css/application.css';
// import "./admin/_styles/style.css";
import "./styles.scss";

const platform = platformBrowserDynamic();

platform.bootstrapModule(AppModule);