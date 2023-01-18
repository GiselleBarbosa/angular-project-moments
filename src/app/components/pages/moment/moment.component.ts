import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Moment } from 'src/app/Moment';
import { Comment } from '@angular/compiler';

import { MomentService } from '../../../services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';

import { environment } from 'src/environments/environment';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.scss']
})
export class MomentComponent implements OnInit {

  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;

  faTimes = faTimes;
  faEdit = faEdit;

  constructor(
    private MomentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.MomentService
      .getMoment(id)
      .subscribe((item) =>
        (this.moment = item.data));
  }

  async removeHandler(id: number) {
    await this.MomentService.removeMoment(id).subscribe();

    this.messagesService.add("Momento excluido com sucesso!");

    this.router.navigate(['/']);
  }
}
