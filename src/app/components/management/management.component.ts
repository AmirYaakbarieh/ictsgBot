import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { AuthTestParams, BotData, IBotId, ICodeBlocks, IUserId } from 'src/models/chatbot-node.models';
import { ChatbotDataService } from 'src/app/services/chatbot-data.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { AppComponent } from 'src/app/app.component';
import { BotService } from 'src/app/services/bot.service';
import { Ripple, initTE } from "tw-elements";

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit, OnDestroy {

  @Input() receivedId: string;

  imageFilenames: string[] = [
    "/assets/images/4.jpg",
    "/assets/images/3.jpg",
    "/assets/images/5.jpg",
    "/assets/images/1.jpg",
    "/assets/images/2.jpg",
    "/assets/images/6.jpg",
    "/assets/images/7.jpg",
    "/assets/images/8.jpg",
    "/assets/images/9.jpg",
    "/assets/images/10.jpg",
    "/assets/images/11.jpg",
    "/assets/images/12.jpg",
    "/assets/images/13.jpg",
    "/assets/images/14.jpg",
    "/assets/images/15.jpg",
    "/assets/images/16.jpg",
    "/assets/images/17.jpg",
  ];


  codeBlocks: ICodeBlocks[] = [];
  codeBlock: ICodeBlocks;
  // codeBlockId: string


  reactiveForm: FormGroup;
  nameOfBot: string;
  randomIndex: any;
  randomImageSrc: string;
  userId: IUserId;
  isUserMenuOpen: boolean = false;
  isDropdownOpen: boolean = false;

  botNameEdit: string;
  botEditor: string;
  codeBlockId: any;

  userID: string;
  jsonOfFlow: any;

  flowid: string = '';

  session: any;
  botFile: any;
  updatedJSON: any;
  SRC: string;
  srcSafe: any;
  paramsJSONEdit: JSON

  botNameDesign: string;

  name: string;
  privateView: boolean = true;
  closeMenu: boolean = true;

  botFileList: object;

  botNameOfList: string;
  botIdOfList: string;

  errorOfResponse: boolean;




  // ---------------------------------------
  startElementPayload: string;
  paramsOfList: AuthTestParams;
  // ---------------------------------------


  isMenuOpen: boolean = false;

  isMainMenuOpen = false;
  languageMode = false;
  languageModeMin = false;

  public sidebarShow: boolean = false;



  bitIdInMenu: any;
  bitIdInMenuName: string;

  openBotMenu: boolean = false;

  isFrameOpen = false;

  isOpen = false;

  showComposeView = false;

  openComposeView() {
    this.showComposeView = true;
  }

  closeComposeView() {
    this.showComposeView = false;
  }


  closePhotoModal() {
    this.isFrameOpen = false;
    this.closeMenu = true
  }



  // ---------------------------------------

  // @Output() botNameEmitter: EventEmitter<string> = new EventEmitter<string>

  constructor(private authService: AuthService,
    private chatbotDataService: ChatbotDataService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private sharedDataService: SharedDataService,
    private sanitizer: DomSanitizer,
    private appComponent: AppComponent,
    private botService: BotService) { }


  ngOnDestroy(): void {
    this.appComponent.showHeader = true;
    this.appComponent.showThirdMenu = false
  }



  ngOnInit(): void {

    // this.errorOfResponse = this.authService.errorOfResponse;

    initTE({ Ripple });
    this.appComponent.showHeader = false;
    this.appComponent.showThirdMenu = true;
    // if (this.appComponent.showHeader){
    //   this.appComponent.showThirdMenu = false;
    // }


    // this.flowid = this.sharedDataService.getFlowId(); 
    // console.log(this.flowid) 


    this.reactiveForm = new FormGroup({
      personalDetails: new FormGroup({
        botName: new FormControl(null, [Validators.required, this.nameFormatValidator()]),
        typeBot: new FormControl(null, [Validators.required])
      })
    });

    const list: IUserId = {
      userId: this.authService.userId
    };



    // this.authService.sendRequest('POST', 'http://192.168.100.217:5000', '/api/bots/list', list)
    //   .then((response) => {
    //     for (let i = 0; i < response.response.documents.length; i++) {
    //       this.codeBlocks.push({
    //         id: response.response.documents[i].$id,
    //         botName: response.response.documents[i].botName,
    //         photo: `${this.imageFilenames[this.randomIndex]}`,
    //         open: false,

    //       }) ;
    //     }
    //     console.log('Bot List:', response);
    //     console.log('codeblocks List:', this.codeBlocks);
    //   })
    //   .catch((error) => {
    //     console.error('Error list of Bot:', error);
    //   });

    const listparams: AuthTestParams = {
      path: '/list',
      data: { userId: this.authService.userId }
    };

    const listparamsJSON: JSON = JSON.parse(JSON.stringify(listparams));

    this.authService.executeFunction('654cce698458b074ddd0', listparamsJSON, '/list', 'POST', false)
      .then((response) => {
        console.log("response", response)
        for (let i = 0; i < response.documents.length; i++) {
          this.codeBlocks.push({
            id: response.documents[i].$id,
            botName: response.documents[i].botName,
            photo: `${this.imageFilenames[this.randomIndex]}`,
            open: false,

          });
        }
        console.log('Bot List:', response);
        console.log('codeblocks List:', this.codeBlocks);
      })
      .catch((error) => {
        console.error('Error list of Bot:', error);
      });


    this.randomIndex = Math.floor(Math.random() * this.imageFilenames.length);
    this.randomImageSrc = `${this.imageFilenames[this.randomIndex]}`;


    this.userID = this.authService.userId;
    console.log("userID:" + this.userID);



    // // const $this = this;
    // this.chatbotDataService.getFlowsJson().subscribe({
    //   next: (flows: any[]) => {
    //     this.jsonOfFlow = flows;
    //     console.log(this.jsonOfFlow);
    //   },
    //   error: (error) => {
    //     console.error('Error retrieving flows.json:', error);
    //   }
    // });



  }



  addNewBlock() {
    const newBlock = {
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
      imageAlt: 'Desk with accessories',
      category: 'Desk and Office',
      description: 'Work from home accessories'
    };

    // this.codeBlocks.push(newBlock);

    const botName = this.reactiveForm.get('personalDetails.botName')?.value;
    console.log(botName)
    const typeBot = this.reactiveForm.get('personalDetails.typeBot')?.value;
    console.log(typeBot)
    const userId = this.authService.userId;
    console.log(userId);


    const data: BotData = {
      botName: botName,
      botFile: "",
      status: true,
      template: true,
      userId: userId
    };



    // this.authService.sendRequest('POST', 'http://192.168.100.217:5000', '/api/bots/create', data)
    //   .then((response) => {
    //     console.log('Bot data saved:', response);
    //   })
    //   .catch((error) => {
    //     console.error('Error saving bot data:', error);
    //   });

    const params: AuthTestParams = {
      path: '/create',
      data: {
        botName: botName,
        botFile: "",
        status: true,
        template: true,
        userId: userId
      }
    };

    const paramsJSON: JSON = JSON.parse(JSON.stringify(params));

    this.authService.executeFunction('654cce698458b074ddd0', paramsJSON, '/create', 'POST', false)
      .then((response) => {
        console.log("response", response)

      })
      .catch((error) => {
        console.error('Error list of Bot:', error);
      });
  }


  nameFormatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // Define your address format regex here (modify as needed)
      const nameRegex = /^[\u0600-\u06FF\s\.,'-]+$/;
      const isValid = nameRegex.test(control.value);
      return isValid ? null : { nameFormat: true };
    };
  }

  botNameValue(): string {
    this.nameOfBot = this.reactiveForm.get('personalDetails.botName').value;
    this.randomIndex = Math.floor(Math.random() * this.imageFilenames.length);
    console.log(this.imageFilenames[this.randomIndex])
    this.randomImageSrc = `${this.imageFilenames[this.randomIndex]}`;
    return this.reactiveForm.get('personalDetails.botName').value;
  }

  toggleDropdown(sectionId: string): void {
    const block = this.codeBlocks.find(sec => sec.id === sectionId);
    const name = block.botName;
    if (block) {
      block.open = !block.open;
      this.closeMenu = true;

      setTimeout(() => {
        block.open = false;
        this.closeMenu = false;
      }, 1500);
    }

    this.chatbotDataService.bitIdInMenu = sectionId;
    console.log(this.chatbotDataService.bitIdInMenu);

    this.chatbotDataService.bitIdInMenuName = name;
    console.log(this.chatbotDataService.bitIdInMenuName)
    this.authService.botInformation = true;


  }

  toggleDropdownMenu(sectionId: string): void {
    const block = this.codeBlocks.find(sec => sec.id === sectionId);
    const name = block.botName;

    if (block) {
      block.open = !block.open;
    } else {
      this.router.navigate(['/']);
    }

    this.chatbotDataService.bitIdInMenu = sectionId;
    console.log(this.chatbotDataService.bitIdInMenu);
    this.router.navigate(['/usermenu', sectionId]);
    this.authService.botInformation = true;


    this.appComponent.showHeader = false;
    this.appComponent.showSecondMenu = true;

    this.chatbotDataService.bitIdInMenuName = name
  }


  goToBotRegister() {
    this.router.navigate(['/users']);
  }

  navigateToEditBot(id: string) {
    // this.privateView = !this.privateView
    this.router.navigate(['/editbot', id]);
    this.codeBlockId = id;

    this.bitIdInMenu = id
    // this.appComponent.showHeader = false;
    // this.appComponent.showSecondMenu = true;

    const codeBlock = this.codeBlocks.find(block => block.id === id);
    // this.codeBlock = this.codeBlocks.find(block => block.id === id);

    if (codeBlock) {

      this.botNameEdit = codeBlock.botName;
      console.log('Bot Name:', this.botNameEdit);
    }

  }


  // navigateDesignBot(id: string) {
  //   //get JSOn from appwrite
  //   //create flow
  //   //put json to flow
  //   this.bitIdInMenu = id

  //   const params: AuthTestParams = {
  //     path: '/get',
  //     data: {
  //       botId: id,
  //     }
  //   };

  //   const paramsJSON: JSON = JSON.parse(JSON.stringify(params));

  //   this.authService.executeFunction("654cce698458b074ddd0", paramsJSON)
  //     .then((response) => {
  //       console.log("response", response);
  //       this.botNameDesign = response.botName;
  //       console.log(response.botFile)
  //       if (response.botFile != "")
  //         this.botFile = JSON.parse(response.botFile);
  //       else
  //         this.botFile = ""
  //       console.log(this.botFile)
  //       console.log('Bot data saved:', response.botName);
  //       this.authService.sendRequestOne('POST', "http://192.168.100.16:1880", '/flow/', { "id": "global", "label": this.botNameDesign, "nodes": [], "configs": [] })
  //         .then((response) => {
  //           const flow = response;
  //           this.flowid = flow.id;
  //           // this.botService.flowid = flow.id;
  //           this.sharedDataService.setFlowId(this.flowid); // Set the "flowid" in the service

  //           if (this.botFile != "") {
  //             console.log(this.botFile)
  //             this.updatedJSON = (this.botFile)
  //             this.updatedJSON.forEach(node => {
  //               node.z = this.flowid
  //               node.name = ""
  //             });
  //             console.log('Updated botFile:', this.updatedJSON);
  //             console.log(this.flowid);
  //             console.log('flow outside the function:', flow);

  //             this.authService.sendRequestOne('PUT', "http://192.168.100.16:1880", '/flow/' + this.flowid, { "id": "global", "label": this.botNameDesign, "nodes": this.updatedJSON, "configs": [] })
  //               .then((response) => {
  //                 //****************** */
  //                 // const params1: AuthTestParams = {
  //                 //   path: '/create',
  //                 //   data: {
  //                 //     botId: this.codeBlockId.id,
  //                 //     userId: this.authService.userId,
  //                 //     flowId: this.flowid,
  //                 //     status: true
  //                 //   }
  //                 // };
  //                 // const paramsJSON1: JSON = JSON.parse(JSON.stringify(params1));
  //                 // this.authService.executeFunction('655b1a2fab234d537552', paramsJSON1)
  //                 //   .then((response) => {
  //                 //     console.log("response", response);

  //                 //     this.SRC = 'http://192.168.100.16:1880/#flow/' + this.flowid
  //                 //     console.log(this.SRC);
  //                 //     this.srcSafe =
  //                 //       this.sanitizer.bypassSecurityTrustResourceUrl(this.SRC);
  //                 //     this.router.navigate(['/bot', id, this.flowid]);
  //                 //   })
  //                 //   .catch((error) => {
  //                 //     console.error('Error list of Bot:', error);
  //                 //   });
  //                 //***************** */

  //               })
  //               .catch((error) => {
  //                 console.error('Request failed:', error);
  //               })
  //           }
  //           else {
  //             this.SRC = 'http://192.168.100.16:1880/#flow/' + this.flowid
  //             console.log(this.SRC);
  //             this.srcSafe =
  //               this.sanitizer.bypassSecurityTrustResourceUrl(this.SRC);
  //             this.router.navigate(['/bot', id, this.flowid]);

  //           }

  //         })
  //         .catch((error) => {
  //           console.error('Request failed:', error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.error('Error list of Bot:', error);
  //     });

  //   // this.router.navigate(['/bot', id, this.flowid]);

  //   const codeBlock = this.codeBlocks.find(block => block.id === id);

  //   if (codeBlock) {
  //     this.botNameEdit = codeBlock.botName;
  //     // this.botService.botNameEdit = codeBlock.botName
  //     console.log('Bot Name:', this.botNameEdit);
  //   }
  // }


  navigateDesignBot(id: string) {                    //this function is in bot.service too 

    this.authService.botIdWhenHasError = id;

    // this.botService.navigateDesignBotForValidate(id) 


    //get JSOn from appwrite
    //create flow
    //put json to flow
    this.authService.botInformation = false;

    const params: AuthTestParams = {
      path: '/get',
      data: {
        botId: id,
      }
    };

    const paramsJSON: JSON = JSON.parse(JSON.stringify(params));

    this.authService.executeFunction("654cce698458b074ddd0", paramsJSON, '/get', 'POST', false)
      .then((response) => {
        console.log("response", response);
        this.botNameDesign = response.botName;
        console.log(response.botFile)
        if (response.botFile != "")
          this.botFile = JSON.parse(response.botFile);
        else
          this.botFile = ""
        console.log(this.botFile)
        console.log('Bot data saved:', response.botName);
        this.authService.sendRequestOne('POST', "http://192.168.100.16:1880", '/flow/', { "id": "global", "label": this.botNameDesign, "nodes": [], "configs": [] })
          .then((response_nodered) => {
            const flow = response_nodered;
            this.flowid = flow.id;
            // this.botService.flowid = flow.id;
            this.sharedDataService.setFlowId(this.flowid); // Set the "flowid" in the service
            //remove old flow bot correspondant
            const params2: AuthTestParams = {
              path: '/list',
              data: {
                botId: id,
                userId: ""
              }
            };
            const paramsJSON2: JSON = JSON.parse(JSON.stringify(params2));
            this.authService.executeFunction('655b1a2fab234d537552', paramsJSON2, '/list', 'POST', false)
              .then((response1) => {
                console.log("response", response1);
                for (let i = 0; i < response1.documents.length; i++) {
                  if (response1.documents[i].status == true)
                    var flow = response1.documents[i].$id;
                  this.authService.sendRequestOne('DELETE', "http://192.168.100.16:1880", '/flow/' + flow, { id: flow })
                    .then((response2) => {
                      console.log(response2)

                    })
                    .catch((error) => {
                      console.error('Request failed:', error);
                    })


                }
                // ----------------------------------------------------------
                //add new flow bot correspondant
                const params1: AuthTestParams = {
                  path: '/create',
                  data: {
                    botId: id,
                    userId: this.authService.userId,
                    flowId: this.flowid,
                    status: true
                  }
                };
                const paramsJSON1: JSON = JSON.parse(JSON.stringify(params1));
                this.authService.executeFunction('655b1a2fab234d537552', paramsJSON1, '/create', 'POST', false)
                  .then((response3) => {
                    console.log("response", response3);
                    if (this.botFile != "") {
                      console.log(this.botFile)
                      this.updatedJSON = (this.botFile)
                      this.updatedJSON.forEach(node => {
                        node.z = this.flowid;
                        node.name = "";
                      });
                      console.log('Updated botFile:', this.updatedJSON);
                      console.log(this.flowid);
                      console.log('flow outside the function:', flow);

                      this.authService.sendRequestOne('PUT', "http://192.168.100.16:1880", '/flow/' + this.flowid, { "id": "global", "label": this.botNameDesign, "nodes": this.updatedJSON, "configs": [] })
                        .then((response) => {


                          this.SRC = 'http://192.168.100.16:1880/#flow/' + this.flowid
                          console.log(this.SRC);
                          this.srcSafe =
                            this.sanitizer.bypassSecurityTrustResourceUrl(this.SRC);
                          this.router.navigate(['/bot', id, this.flowid]);
                        })
                        .catch((error) => {
                          console.error('Request failed:', error);
                        })
                    }
                    else {
                      this.SRC = 'http://192.168.100.16:1880/#flow/' + this.flowid
                      console.log(this.SRC);
                      this.srcSafe =
                        this.sanitizer.bypassSecurityTrustResourceUrl(this.SRC);
                      this.router.navigate(['/bot', id, this.flowid]);

                    }

                  })
                  .catch((error) => {
                    console.error('Error list of Bot:', error);
                  });
                // ------------------------------------------------------------
              })



          })
          .catch((error) => {
            console.error('Request failed:', error);
          });
      })
      .catch((error) => {
        console.error('Error list of Bot:', error);
      });

    // this.router.navigate(['/bot', id, this.flowid]);

    const codeBlock = this.codeBlocks.find(block => block.id === id);

    if (codeBlock) {
      this.botNameEdit = codeBlock.botName;
      // this.botService.botNameEdit = codeBlock.botName
      console.log('Bot Name:', this.botNameEdit);
    }
  }



  navigateViewBot(id: string) {
    this.router.navigate(['/view', id]);
    this.bitIdInMenu = id;
  }

  // --------------------------------------------
  // --------------------------------------------


  releaseBot(id: string) {
    this.isFrameOpen = !this.isFrameOpen;
    this.closeMenu = false
    this.bitIdInMenu = id;
    console.log(this.bitIdInMenu)

    // --------------------------------------------------
    const list: AuthTestParams = {
      path: '/get',
      data: { botId: this.bitIdInMenu }
    };

    const listparamsJSON: JSON = JSON.parse(JSON.stringify(list));

    this.authService.executeFunction('654cce698458b074ddd0', listparamsJSON, '/get', 'POST', false)
      .then((response) => {
        console.log("response", response)

        console.log('Bot Name:', response.botName);
        this.botNameOfList = response.botName

      })
      .catch((error) => {
        console.error('Error list of Bot:', error);
      });
    // --------------------------------------------------

    this.authService.listChatsOfBot(this.bitIdInMenu, "");


    this.botIdOfList = this.chatbotDataService.bitIdInMenu;
    const customerId = '65745729cff80b609396';

    this.authService.listChatsOfBot(this.botIdOfList, customerId)
      .then(response => {

        console.log(response)
        console.log('Response in ManagementComponent:', response);

        const botFileList = this.authService.botFileList;

        // this.botNameOfList = this.authService.botNameOfList;```````````````````````````````````````````````
        const botFileOfList = this.authService.botFileOfList;

        console.log('botFileList:', botFileList);
        // console.log('botNameOfList:', this.botNameOfList);
        console.log('botFileOfList:', botFileOfList);

        if (typeof botFileOfList === 'string') {
          const jsonArray = JSON.parse(botFileOfList);


          jsonArray.forEach((element, index) => {
            // console.log(`Element ${index + 1}:`, element);
            // console.log(`Type of Element ${index + 1}:`, element.type);
            // console.log(`Appointment Question of Element ${index + 1}:`, element.appointmentQuestion);

            switch (element.type) {
              case 'start-node':
                this.startElementPayload = element.payload;
                break;
              case 'appoinment-date':
                console.log(element.appointmentQuestion);
                break;
              case 'end-node':
                console.log(element.payload);
                break;
              default:
                console.log('This element is of an unknown type.');
                break;
            }
          });
          this.runButtonClick()
        } else {
          console.error('botFileOfList is not a string.');
          this.runButtonClick()
        }

      })
      .catch(error => {
        console.error('Error in ManagementComponent:', error);
      });



  }

  runButtonClick() {
    this.errorOfResponse = this.authService.errorOfResponse
  }


  navigateToDeletBot(id: string, name) {
    var r = confirm(`آیا مطمئن هستید می خواهید بات "${name}" را حذف کنید؟`);

    this.bitIdInMenu = id;
    this.bitIdInMenuName = name;
    this.chatbotDataService.bitIdInMenuName = name

    if (r == true) {
      this.codeBlockId = this.codeBlocks.find(block => block.id === id);

      console.log(this.codeBlockId);
      console.log(this.codeBlockId.id);

      // const dataMain: IBotId = {
      //   botId: this.codeBlockId.id,
      // };


      // this.authService.sendRequest('DELETE', 'http://192.168.100.217:5000', '/api/bots', dataMain)
      //   .then((response) => {
      //     // this.idEmitter.emit(this.id);
      //     console.log('Bot data deleted:', response);
      //     this.router.navigate(['/sidebar']);

      //   })
      //   .catch((error) => {
      //     console.error('Error saving bot data:', error);
      //   });
      const params: AuthTestParams = {
        path: '/delete',
        data: {
          botId: this.codeBlockId.id
        }
      };

      const paramsJSON: JSON = JSON.parse(JSON.stringify(params));

      this.authService.executeFunction('654cce698458b074ddd0', paramsJSON, '/delete', 'POST', false)
        .then((response) => {
          console.log("response", response);
          this.router.navigate(['/sidebar'])

        })
        .catch((error) => {
          console.error('Error list of Bot:', error);
        });
    }
  }


  saveToLocalStorage(): void {
    this.localStorageService.save('exampleKey', 'exampleValue');
  }

  getFromLocalStorage(): void {
    const value = this.localStorageService.get('exampleKey');
    console.log('Value from local storage:', value);
  }

  // saveData(){
  //   let data = {id:1, name: 'xyz'};
  //   localStorage.setItem('sessin', JSON.stringify(data))
  // }

  // loadData(){
  //   let data: any = localStorage.getItem('session');
  //   this.session = JSON.parse(data);
  //   console.log(this.session)
  // }

  // ---------------------------------------------------------------




}
