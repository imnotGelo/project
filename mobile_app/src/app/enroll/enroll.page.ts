import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.page.html',
  styleUrls: ['./enroll.page.scss'],
})
export class EnrollPage implements OnInit {
  user: any;
  good_moral: any;
  birth_cert: any;
  cert_trans: any;
  report_card: any;
  grade_level:any;
  strand:any;



  constructor(private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private alertController: AlertController) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.user = navigation.extras.state['user'];
    }    
  }
  isOld = false;
  onCheckboxChange(event: any) {
    this.isOld = event.target.checked;
  }

  ngOnInit() {
  }

  landing(){
    this.router.navigate(['/landing'])
  }
  enroll(){
    this.router.navigate(['/landing'])
  }

  async presentValidationErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Validation Error',
      message: 'Please fill out all required fields.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async success() {
    const alert = await this.alertController.create({
      header: 'Application Submitted',
      message: 'Please wait for the enrollment status in your email.',
      buttons: ['OK']
    });
    await alert.present();
    this.router.navigate(['/landing'])
  }


  addStudent(studentData: any) {
    this.apiService.addStudent(studentData).subscribe(
      (res: any) => {
        console.log("SUCCESS ===", res);
      },
      (error: any) => {
        alert('Try Again');
        console.log("ERROR ===", error);
      }
    );
  }

  addOldStudent(oldstudentData: any) {
    this.apiService.addOldStudent(oldstudentData).subscribe(
      (res: any) => {
        console.log("SUCCESS ===", res);
      },
      (error: any) => {
        alert('Try Again');
        console.log("ERROR ===", error);
      }
    );
  }

  NewEnroll() {
    if (!this.good_moral || !this.birth_cert || !this.cert_trans || !this.report_card || !this.grade_level) {
      this.presentValidationErrorAlert();
      return;
    }
  
    const studentData = {
      LRN: this.user.LRN,
      firstname: this.user.firstname,
      middlename: this.user.middlename,
      lastname: this.user.lastname,
      email: this.user.email,
      address: this.user.address,
      report_card: this.report_card,
      grade_level: this.grade_level,
      strand: this.strand,
      good_moral: this.good_moral,
      birth_cert: this.birth_cert,
      cert_trans: this.cert_trans,
    };

    if (this.grade_level === '11' || this.grade_level === '12') {
      studentData.strand = this.strand;
    }
    
    this.addStudent(studentData);
    this.success();
  }

  

  OldEnroll(){
    if (!this.report_card || !this.grade_level){
      this.presentValidationErrorAlert();
      return;
    }
  
    const oldstudentData = {
      LRN: this.user.LRN,
      firstname: this.user.firstname,
      middlename: this.user.middlename,
      lastname: this.user.lastname,
      email: this.user.email,
      address: this.user.address,
      report_card: this.report_card,
      grade_level: this.grade_level,
      strand: this.strand,
      good_moral: this.good_moral,
      birth_cert: this.birth_cert,
      cert_trans: this.cert_trans,
    };

    if (this.grade_level === '11' || this.grade_level === '12') {
      oldstudentData.strand = this.strand;
    }
      this.addOldStudent(oldstudentData);
      this.success();
  }

}
