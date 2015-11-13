import {bootstrap, Component, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';

@Component({
  selector: 'jarvis-chat',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  template: `
  <section class="container">
    <h1>Ze Jarvis Chat</h1>
    <div class="row">
      <div class="col-xs-10">
        <input class="form-control" type="text" #prompt>
      </div>
      <div class="col-xs-2">
        <button class="btn btn-primary" (click)="sendToJarvis(prompt.value)">Send</button>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12" class="form-control">
        <ul>
          <li *ng-for="#txt of jarvisMsg">
            {{txt}}
          </li>
        </ul>
      </div>
    </div>
  </section>`
})
class AppComponent {
  jarvisMsg: string[]=[];

  constructor() {
  }

  sendToJarvis(msg: string): void {
    console.log('pushing ', msg);
    this.jarvisMsg.push(msg);
  }

}

bootstrap(AppComponent);
