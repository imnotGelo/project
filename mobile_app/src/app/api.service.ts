import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
 
 
  headers: HttpHeaders
    
  constructor(
    private http: HttpClient
    ) {
    this.headers = new HttpHeaders();
    this.headers.append("Accept", 'application/json');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin','*');
  }


  signUp(NewData: any) {
    return this.http.post('http://192.168.1.107/CAPSTONE/backend/create.php', NewData);
  }

  verifyOtp(requestBody : any) {
    return this.http.post('http://192.168.1.107/CAPSTONE/backend/verifyOtp.php', requestBody);
  }
  requestNewOTP() {
    const requestBody = { request_new_otp: true };
    return this.http.post('http://192.168.1.107/CAPSTONE/backend/create.php', requestBody);
  }  
  login(LRN:number, password: string){
    return this.http.post('http://192.168.1.107/CAPSTONE/backend/login.php', { LRN, password });
  }

  getAnnouncements() {
    return this.http.get('http://192.168.1.107/CAPSTONE/backend/announcement.php'); 
  }

  addStudent(NewData: FormData) {
    return this.http.post('http://192.168.1.107/CAPSTONE/backend/createNew.php', NewData);
  }

  addOldStudent(oldstudentData: FormData) {
    return this.http.post('http://192.168.1.107/CAPSTONE/backend/createOld.php', oldstudentData);
  }

  checkLRN(LRN: string) {
    const requestData = { LRN: LRN };
    return this.http.post('http://192.168.1.107/CAPSTONE/backend/createOld.php', requestData);
  }

  requested(data:any){
    return this.http.post('http://192.168.1.107/CAPSTONE/backend/request.php', data);
  }

   getScheduleList() {
    return this.http.get('http://192.168.1.107/CAPSTONE/backend/calendar.php'); 
  }
  
  thesis() {
    return this.http.get('http://192.168.1.107/CAPSTONE/backend/research.php'); 
  }
  
  checkApplicationStatus(LRN:any){
    return this.http.post('http://192.168.1.107/CAPSTONE/backend/notif.php', LRN); 
  }

}