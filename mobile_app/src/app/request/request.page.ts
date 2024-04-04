import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {
  user: any;
  file_requested:any;
  school_year:any;

  constructor(private router: Router,
    private apiService: ApiService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.user = navigation.extras.state['user'];
    } 
   }

  ngOnInit() {
  }

  back(){
    this.router.navigate(['/landing'])
  }

  forms(data: any) {
    this.apiService.requested(data).subscribe(
      (res: any) => {
        console.log("SUCCESS ===", res);
      },
      (error: any) => {
        alert('Try Again');
        console.log("ERROR ===", error);
      }
    );
  }

  submit() {
    if (this.validateForm()) {
      const data = {
        student_name: this.user.firstname + ' ' + this.user.middlename.charAt(0) + ' ' + this.user.lastname,
        email: this.user.email,
        file_requested: this.file_requested,
        school_year:this.school_year
      };

      if (this.file_requested === 'Diploma' || this.file_requested === 'Cert. of Gradudation') {
        data.school_year = this.school_year;
      }
      this.forms(data);

    } else {
      this.presentValidationErrorAlert();
    }
  }
  validateForm(): boolean {
    return true;
  }
  
  presentValidationErrorAlert() {
    alert('Please fill in all required fields with valid information.');
  }

  

}
