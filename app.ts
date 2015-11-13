import {bootstrap, Component, Inject, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import {HTTP_PROVIDERS, Http, Headers} from 'angular2/http';

@Component({
  selector: 'jarvis-chat',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  template: `
  <section class="container">
    <h1>Ze Jarvis Chat</h1>

    <div class="row">
      <div class="col-xs-9">
        <input class="form-control" type="text" #prompt>
      </div>
      <div class="col-xs-3">
        <span class="pull-right">
          <button class="btn btn-primary" (click)="getMessages()">
            Refresh <i class="fa fa-refresh"></i></button>
          <button class="btn btn-primary" (click)="sendToJarvis(username.value, prompt.value)">
            Send <i class="fa fa-arrow-down"></i></button>
        </span>
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
              <li *ng-for="#msg of jarvisMsg">
                <span class="timestamp">[{{msg.timestamp | date:'HH:mm:ss'}}]</span> <span class="user">{{msg.user}}</span> <i class="fa fa-angle-right"></i> <span class="message">{{msg.text}}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-2 col-xs-offset-6">
        <span class="pull-right username">Your name:</span>
      </div>
      <div class="col-xs-4">
        <input class="form-control" type="text" #username>
      </div>
    </div>
  </section>`
})
class AppComponent {
  jarvisMsg =[];

  _http: Http;

  constructor(@Inject(Http) http: Http) {
    this._http = http;
    this.getMessages();
  }

  sendToJarvis(username: string, msg: string): void {
    this._http.post('http://localhost:3000/messages',
      JSON.stringify({
        text: msg,
        user: username ? username : 'guest'
      }), {
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .subscribe((data) => {
        this.jarvisMsg.unshift(JSON.parse(data._body));
      });
  }

  getMessages(): void {
    console.log('get messages...');
    this._http.get('http://localhost:3000/messages')
      .map(res => res.json())
      .subscribe((msg: string[]) => {
        this.jarvisMsg = msg;
      });
  }

}

bootstrap(AppComponent, [HTTP_PROVIDERS]);
