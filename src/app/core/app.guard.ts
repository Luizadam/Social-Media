import { Injectable } from "@angular/core";
import { CanActivate, CanLoad, Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AppGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router
  ) { }

  canActivate() {
    return this.canLoad();
  }

  canLoad() {
    if (! localStorage.getItem('user')) {
      this.router.navigate(["/login"]);
    }
    return true 
  }
}
