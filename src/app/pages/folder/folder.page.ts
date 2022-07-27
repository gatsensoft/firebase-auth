import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@capacitor-firebase/authentication';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  
  folder: string;

  user: User;

  constructor(private activatedRoute: ActivatedRoute, private auth: AuthService, private router: Router) { }

  async ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    await this.auth.getCurrentUser().then((user: User) => {
      this.user = user;
      console.log(this.user);
    });
  }

  async signOut() {
    await this.auth.signOut().then(async () => {
      await this.router.navigateByUrl('/login', { replaceUrl: true });
    });
  }

}
