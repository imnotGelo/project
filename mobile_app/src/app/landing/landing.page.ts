import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  user: any;
  avatarUrl: any;
  @ViewChild('fileInput') fileInput!: ElementRef;
  post_code: any;
  items: any[] = [];
  isStudent: boolean = false;
  isEnrollDisabled: boolean = false;

  constructor(private router: Router,
    private apiService: ApiService,
    private navCtrl: NavController) {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras?.state) {
          const userData = navigation.extras.state['user'];
          if (userData && userData.studentData) {
              const userDataWithStudentData = { ...userData, ...userData.studentData };
              this.user = userDataWithStudentData;
              this.isEnrollDisabled = true;
              this.isStudent = true; 
          } else {
              this.user = userData;
              this.isStudent = false; 
          }
      }
  }

  ngOnInit(): void {
    this.getAnnouncements();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.avatarUrl = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  uploadAvatar() {
    this.fileInput.nativeElement.click();
  }

  getAnnouncements() {
    this.apiService.getAnnouncements().subscribe(
      (res: any) => {
        this.items = res;
      },
      (error: any) => {
        alert('Try Again');
        console.log("ERROR ===", error);
      }
    );
  }

  toggleMinimized(item: any): void {
    item.minimized = !item.minimized;
  }

  enroll() {
    this.navCtrl.navigateForward('/enroll', { state: { user: this.user } });
  }
  request() {
    this.navCtrl.navigateForward('/request', { state: { user: this.user } });
  }
  archive() {
    this.router.navigate(['/archive']);
  }
  grade() {
    this.router.navigate(['/grades']);
  }
  calendar() {
    this.router.navigate(['/calendar']);
  }
  notification() {
    this.router.navigate(['/notification']);
  }
  message() {
    this.router.navigate(['/message']);
  }
  others() {
    this.router.navigate(['/others']);
  }
}
