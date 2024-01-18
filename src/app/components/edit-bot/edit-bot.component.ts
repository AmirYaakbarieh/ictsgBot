import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';
import { AuthTestParams, BotChange, BotData, IBotId, IUserId } from 'src/models/chatbot-node.models';


@Component({
  selector: 'app-edit-bot',
  templateUrl: './edit-bot.component.html',
  styleUrls: ['./edit-bot.component.css']
})
export class EditBotComponent implements OnInit, OnDestroy {


  capturedBotName: string;

  reactiveForm: FormGroup;

  selectedFile: File | null = null;

  userName: string;

  id: string;

  botName: string;

  botNameEdit: string



  constructor(private authService: AuthService, 
              private http: HttpClient, 
              private router: Router, 
              private route: ActivatedRoute,
              private appComponent: AppComponent) { }


  ngOnDestroy(): void {
    this.appComponent.showHeader = true;
    this.appComponent.showSecondMenu = false
  }

  @Output() idEmitter: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {

    this.appComponent.showHeader = false;
    this.appComponent.showSecondMenu = true


    this.reactiveForm = new FormGroup({
      personalDetails: new FormGroup({
        botName: new FormControl(null, [Validators.required, this.nameFormatValidator()]),
        typeBot: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required])
      })
    });


    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    // this.route.paramMap.subscribe(params => {
    //   this.id = params.get('id');
    //   this.botName = params.get('botName');
    //   console.log('ID:', this.id);
    //   console.log('Bot Name:', this.botName);
    // });

    // const data: IBotId = {
    //   botId: this.id,
    // };
    // console.log(this.id)





    // this.authService.sendRequest('POST', 'http://192.168.100.217:5000', '/api/bots', data)
    //   .then((response) => {
    //     this.botNameEdit = response.response.botName
    //     console.log('Bot data saved:', response.response.botName);
    //     console.log(response)
    //   })
    //   .catch((error) => {
    //     console.error('Error saving bot data:', error);
    //   });

    const params: AuthTestParams = {
      path: '/get',
      data: {
        botId: this.id
      }
    };

    const paramsJSON: JSON = JSON.parse(JSON.stringify(params));

    this.authService.executeFunction('654cce698458b074ddd0', paramsJSON, '/get', 'POST', false)
      .then((response) => {
        // console.log("response", response);
        this.botNameEdit = response.botName;
        console.log('Bot data saved:', response.botName);

      })
      .catch((error) => {
        console.error('Error list of Bot:', error);
      });

  }


  onSubmit() {

    const botName = this.reactiveForm.get('personalDetails.botName')?.value;
    console.log(botName)
    const typeBot = this.reactiveForm.get('personalDetails.typeBot')?.value;
    console.log(typeBot)
    const description = this.reactiveForm.get('personalDetails.description')?.value;
    console.log(description)
    const userId = this.authService.userId;
    console.log(userId);



    // const dataMain: BotChange = {
    //   botId: this.id,
    //   data: {
    //     botName: botName
    //   }
    // };

    // this.authService.sendRequest('POST', 'http://192.168.100.217:5000', '/api/bots/update', dataMain)
    //   .then((response) => {
    //     // this.idEmitter.emit(this.id);
    //     console.log('Bot data saved:', response);
    //     this.router.navigate(['/management']);
    //   })
    //   .catch((error) => {
    //     console.error('Error saving bot data:', error);
    //   });

    const params: AuthTestParams = {
      path: '/update',
      data: {
        botId: this.id,
          editdata: {
            botName: botName
          }
      }
    };

    const paramsJSON: JSON = JSON.parse(JSON.stringify(params));

    this.authService.executeFunction('654cce698458b074ddd0', paramsJSON, '/update', 'POST', false)
      .then((response) => {
        // console.log("response", response);
        this.router.navigate(['/management'])

      })
      .catch((error) => {
        console.error('Error list of Bot:', error);
      });



  }

  CancelEdit() {
    this.router.navigate(['/management']);
  }


  nameFormatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const nameRegex = /^[\u0600-\u06FF\s\.,'-]+$/;
      const isValid = nameRegex.test(control.value);
      return isValid ? null : { nameFormat: true };
    };
  }




}
