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
        <button class="btn btn-primary pull-right" (click)="sendToJarvis(prompt.value)">
        Send <i class="fa fa-arrow-down"></i></button>
      </div>
    </div>

    <hr/>

    <div class="row">
      <div class="col-xs-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Chat room</h3>
          </div>
          <div class="panel-body">
            <ul class="fa fa-ul">
              <li *ng-for="#txt of jarvisMsg">
                <i class="fa fa-angle-right"></i> {{txt}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>`
})
class AppComponent {
  jarvisMsg: string[]=['abc', 'def'];

  constructor() {
  }

  sendToJarvis(msg: string): void {
    console.log('pushing ', msg);
    this.jarvisMsg.push(msg);
  }

}

bootstrap(AppComponent);
