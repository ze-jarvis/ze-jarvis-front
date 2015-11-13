import {bootstrap, Component, Inject, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import {HTTP_PROVIDERS, Http, Headers} from 'angular2/http';

@Component({
  selector: 'jarvis-chat',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  template: `
  <section class="container">
    <h1>Ze Jarvis Chat</h1>

    <div class="row">
      <div class="col-xs-8">
        <input class="form-control" type="text" #prompt>
      </div>
      <div class="col-xs-4">
        <button class="btn btn-primary" (click)="getMessages()">
          Refresh <i class="fa fa-refresh"></i></button>
        <button class="btn btn-primary" (click)="sendToJarvis(prompt.value)">
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
                {{txt.user}} <i class="fa fa-angle-right"></i> {{txt.text}}               </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <hr/>
    {{jarvisMsg}}
  </section>`
})
class AppComponent {
  jarvisMsg =[];

  _http: Http;

  constructor(@Inject(Http) http: Http) {
    this._http = http;
  }

  sendToJarvis(msg: string): void {
    this._http.post('http://localhost:3000/messages',
      JSON.stringify({
        text: msg,
        user: 'romain'
      }), {
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .subscribe((data) => {
        this.jarvisMsg.push(JSON.parse(data._body));
      });
  }

  getMessages(): void {
    this._http.get('http://localhost:3000/messages')
      .map(res => res.json())
      .subscribe((msg: string[]) => {
        console.log('not believable', msg);
        this.jarvisMsg = msg;
      });
  }

}

bootstrap(AppComponent, [HTTP_PROVIDERS]);
