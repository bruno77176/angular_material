import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';

import { Store, select } from '@ngrx/store';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore,
    private store: Store<fromTraining.State>
    ) { }
  s
  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(select(fromRoot.getIsLoading));
    this.exercises$ = this.store.pipe(select(fromTraining.getAvailableExercises));
   this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();

  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  documentToDomainObject(document) {
    return {
      id: document.payload.doc.id,
      ...document.payload.doc.data()
    }
  }

}
