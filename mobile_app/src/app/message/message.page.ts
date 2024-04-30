import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  @ViewChild(IonModal)
  modal!: IonModal;
  user:any;
  recipient: any;
  subject: any;
  messages:any;

  constructor(private router: Router) { 
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.user = navigation.extras.state['user'];
    } 
  }

  ngOnInit() {
  }
  back() {
    this.router.navigate(['/landing']);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    const data = { recipient: this.recipient, messages: this.messages };
    this.modal.dismiss(data, 'confirm');

    this.recipient = null;
    this.messages = null;
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<any>>;
    if (ev.detail.role === 'confirm') {
      this.messages = ev.detail.data.messages;
    }
  }
}
