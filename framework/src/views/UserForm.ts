import { User, UserProps } from '../models/User';
import { View } from './View';
export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetAgeclick,
      'click:.set-name': this.onSetNameclick,
      'click:.save-model': this.saveModel,
    };
  }
  saveModel = (): void => {
    this.model.save();
  };
  onSetNameclick = (): void => {
    const input = this.parent.querySelector('input');
    if (input) {
      const name = input.value;
      this.model.set({ name });
    }
  };
  onSetAgeclick = (): void => {
    this.model.setRandomAge();
  };

  template(): string {
    return `
      <div>
        <input placeholder="${this.model.get('name')}"/>
        <button class="set-name">chane name</button>
        <button class="set-age">Set Random Age</button>
        <button class="save-model">Save</button>

      </div>
    `;
  }
}
