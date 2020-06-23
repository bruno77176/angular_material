import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';

export class TrainingService {

  exerciseChanged = new Subject<Exercise>();

  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
    { id: 'toes-to-bar', name: 'Toes To Bar', duration: 180, calories: 15},
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18},
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8}
  ];

  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex=> ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise});
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  completeExercise() {
    this.exercises.push({...this.runningExercise, date: new Date(), state: 'completed'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress) {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getCompletedOrCancelledExercises() {
    return this.exercises.slice();
  }
}
