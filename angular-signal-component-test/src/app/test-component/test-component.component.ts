import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponentComponent {
  title = input.required<string>();
  count = model.required<number>();

  updateCount() {
    this.count.update((count) => count + 1);
  }
}
