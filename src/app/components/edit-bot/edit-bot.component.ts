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

  botNameEdit: string;
  coverPhoto: string;
  coverPhotoPic: string
  coverPhotoPicAlt: string = "/assets/images/cover-photo.png";
  coverFileId: string;
  deleteIcon: boolean = true



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
    this.appComponent.showSecondMenu = true;

    this.deleteIcon = true


    this.reactiveForm = new FormGroup({
      personalDetails: new FormGroup({
        botName: new FormControl(null, [Validators.required, this.nameFormatValidator()]),
        typeBot: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required]),
        // photo: new FormControl(null, [Validators.required])
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
        console.log("response", response);
        this.botNameEdit = response.botName;
        console.log('Bot data saved:', response.botName);
        if (response.coverPic == null) {
          this.coverPhoto = this.coverPhotoPicAlt;
          this.deleteIcon = false;
          console.log(this.coverPhoto)
        } else {
          this.coverPhoto = response.coverPic.url;
          console.log(this.coverPhoto)
        }

      })
      .catch((error) => {
        console.error('Error list of Bot:', error);
      });

  }


  onSubmit() {


    const botName = this.reactiveForm.get('personalDetails.botName')?.value;
    console.log(botName)
    if (botName) {
      this.botNameEdit = botName
    }
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
          botName: this.botNameEdit
        }
      }
    };

    const paramsJSON: JSON = JSON.parse(JSON.stringify(params));

    this.authService.executeFunction('654cce698458b074ddd0', paramsJSON, '/update', 'POST', false)
      .then((response) => {
        console.log("response", response);
        this.authService.saveBotCover(this.coverFileId, 'cover', response.$id)
        this.router.navigate(['/sidebar'])

      })
      .catch((error) => {
        console.error('Error list of Bot:', error);
      });
  }

  CancelEdit() {
    this.router.navigate(['/management']);
  }

  deletcoverPhoto() {
    if (this.coverPhotoPicAlt) {
      this.deleteIcon = false
      var r = confirm(`آیا مطمئن هستید می خواهید تصویر  "${this.botNameEdit}" را حذف کنید؟`);
      if (r) {
        this.coverPhoto = this.coverPhotoPicAlt;
        console.log(this.coverPhoto);


        const botName = this.reactiveForm.get('personalDetails.botName')?.value;
        console.log(botName)
        if (botName) {
          this.botNameEdit = botName;
        }

        const params: AuthTestParams = {
          path: '/update',
          data: {
            botId: this.id,
            editdata: {
              botName: this.botNameEdit,
              coverPic: "65e84aaa07d12cefbad0"
            }
          }
        };

        const paramsJSON: JSON = JSON.parse(JSON.stringify(params));

        this.authService.executeFunction('654cce698458b074ddd0', paramsJSON, '/update', 'POST', false)
          .then((response) => {
            console.log("response", response);
            // this.authService.saveBotCover(this.coverFileId, 'cover', response.$id)
            // this.router.navigate(['/sidebar'])

          })
          .catch((error) => {
            console.error('Error list of Bot:', error);
          });

        // this.coverPhotoPic = "http://94.101.184.216/v1/storage/buckets/651134e7bb7d7d3c4fe1/files/" + 65e84aaa07d12cefbad0 + "/view?project=65d048cd51e4953221c7&mode=admin"

      }
    }
  }


  nameFormatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const nameRegex = /^[\u0600-\u06FF\s\.,'-]+$/;
      const isValid = nameRegex.test(control.value);
      return isValid ? null : { nameFormat: true };
    };
  }


  onCoverPhotoSelected(event: any): void {
    this.deleteIcon = false
    const fileInput = event.target;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];

    }
    this.authService.createFile("651134e7bb7d7d3c4fe1", fileInput.files[0])
      .then((response) => {
        console.log('****************************************************')
        console.log(response);
        this.coverFileId = response.$id;
        console.log(this.coverFileId)
        this.coverPhotoPic = "http://94.101.184.216/v1/storage/buckets/651134e7bb7d7d3c4fe1/files/" + response.$id + "/view?project=65d048cd51e4953221c7&mode=admin"

        console.log(this.coverPhotoPic)
        // this.authService.saveFile("656c3c9f89a7cfb3c5ba", response.$id)

        // this.fileId = response.$id;
        // console.log(this.fileId)
      })

    // this.authService.saveFile("656c3c9f89a7cfb3c5ba", fileInput.files[0])

  }







}
