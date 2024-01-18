import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { AuthTestParams, IBotId, IGlobal, IUserId } from 'src/models/chatbot-node.models';
import { Client, Account, ID, Storage, Functions } from 'appwrite';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-create-bot',
  templateUrl: './create-bot.component.html',
  styleUrls: ['./create-bot.component.css']
})
export class CreateBotComponent implements OnInit {

  botid: string;

  botFile: any;
  flowid: string;
  updatedJSON: any;
  SRC: string;
  srcSafe: any;
  paramsJSONEdit: JSON

  botNameDesign: string;
  validation: boolean;
  openDialog: boolean = false;

  validationErrors: string[] = []


  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedDataService: SharedDataService,
    private appComponent: AppComponent,
    private sanitizer: DomSanitizer) { }

  ngOnDestroy(): void {
    this.appComponent.showHeader = true;
    this.appComponent.showSecondMenu = false;

  }


  ngOnInit(): void {



    this.appComponent.showHeader = false;
    this.appComponent.showSecondMenu = true

    const global: IGlobal = {
      id: "global",
      label: "label1",
      nodes: [],
      configs: []
    };


    this.route.params.subscribe(params => {
      this.botid = params['id'];
      this.flowid = params['flowid']

    });

    console.log("botId", this.botid)
    console.log("flowId", this.flowid)
    this.SRC = 'http://192.168.100.16:1880/#flow/' + this.flowid
    console.log(this.SRC);
    this.srcSafe =
      this.sanitizer.bypassSecurityTrustResourceUrl(this.SRC);

    // const data: IBotId = {
    //   botId: this.id,
    // };
    // console.log(this.id)





    // this.authService.sendRequest('POST', 'http://192.168.100.217:5000', '/api/bots', data)
    //   .then((response) => {
    //     this.botNameDesign = response.response.botName
    //     console.log('Bot data saved:', response.response.botName);
    //     console.log(response)
    //   })
    //   .catch((error) => {
    //     console.error('Error saving bot data:', error);
    //   });

    // const params: AuthTestParams = {
    //   path: '/get',
    //   data: {
    //     botId: this.id,
    //   }
    // };

    // const paramsJSON: JSON = JSON.parse(JSON.stringify(params));

    // this.authService.executeFunction("", paramsJSON)
    //   .then((response) => {
    //     console.log("response", response);
    //     this.botNameDesign = response.botName;
    //     console.log(this.botFile)
    //     if (response.botFile != "")
    //       this.botFile = JSON.parse(response.botFile);
    //     else 
    //       this.botFile = ""
    //     console.log(this.botFile)
    //     console.log('Bot data saved:', response.botName);
    //     this.authService.sendRequestOne('POST', "http://192.168.100.16:1880", '/flow/', { "id": "global", "label": this.botNameDesign, "nodes": [], "configs": [] })
    //       .then((response) => {
    //         const flow = response;
    //         this.flowid = flow.id;
    //         this.sharedDataService.setFlowId(this.flowid); // Set the "flowid" in the service

    //         if (this.botFile != "") {
    //           console.log(this.botFile)
    //           this.updatedJSON = (this.botFile)
    //           this.updatedJSON.forEach(node => {
    //             node.z = this.flowid
    //           });
    //           console.log('Updated botFile:', this.updatedJSON);
    //           console.log(this.flowid);
    //           console.log('flow outside the function:', flow);

    //           this.authService.sendRequestOne('PUT', "http://192.168.100.16:1880", '/flow/' + this.flowid, { "id": "global", "label": this.botNameDesign, "nodes": this.updatedJSON, "configs": [] })
    //             .then((response) => {
    //               this.SRC = 'http://192.168.100.16:1880/#flow/' + this.flowid
    //               console.log(this.SRC);
    //               this.srcSafe =
    //                 this.sanitizer.bypassSecurityTrustResourceUrl(this.SRC);
    //             })
    //             .catch((error) => {
    //               console.error('Request failed:', error);
    //             })
    //         }
    //         else 
    //         {
    //           this.SRC = 'http://192.168.100.16:1880/#flow/' + this.flowid
    //           console.log(this.SRC);
    //           this.srcSafe =
    //             this.sanitizer.bypassSecurityTrustResourceUrl(this.SRC);
    //         }

    //       })
    //       .catch((error) => {
    //         console.error('Request failed:', error);
    //       });
    //   })
    //   .catch((error) => {
    //     console.error('Error list of Bot:', error);
    //   });

    // this.SRC = 'http://192.168.100.16:1880/#flow/' + "9dd2f0c6c7958d5f"
    // console.log(this.SRC);
    // this.srcSafe =
    // this.sanitizer.bypassSecurityTrustResourceUrl(this.SRC);

  }

  // ngOnDestroy(): void {
  //   console.log('OK');

  //   this.authService.executeFunction("", this.paramsJSONEdit)
  //     .then((response) => {
  //       console.log(response)
  //       //delete from nodered

  //       this.authService.sendRequestOne('DELETE', "http://192.168.100.16:1880", '/flow/' + this.flowid, { id: this.flowid })
  //         .then((response) => {
  //           console.log(response)
  //           //show message to user
  //           this.router.navigate(['/view', this.id]);

  //         })
  //         .catch((error) => {
  //           console.error('Request failed:', error);
  //         })
  //     })
  //     .catch((error) => {
  //       console.error('Request failed:', error);
  //     })
  // }

  // -------------------------------------------
  // async showBot() {

  //   // this.router.navigate(['/view'])

  //   this.authService.sendRequestOne('GET', "http://192.168.100.16:1880", '/flow/' + this.flowid, {})
  //     .then((response) => {
  //       console.log(response)
  //       //save in appwrie 

  //       const paramsEdit: AuthTestParams = {
  //         path: '/update',
  //         data: {
  //           botId: this.botid,
  //           editdata: {
  //             botFile: JSON.stringify(response.nodes)
  //           }
  //         }
  //       };


  //       // const paramsJSONEdit: JSON = JSON.parse(JSON.stringify(paramsEdit));
  //       this.paramsJSONEdit = JSON.parse(JSON.stringify(paramsEdit));
  //       //save files if exist
  //       console.log(response.nodes)
  //       let flowFile = response.nodes;
  //       console.log(flowFile);
  //       this.authService.flowIdWhenHasError = this.flowid

  //       // let validationErrors: string[] = [];
  //       this.validationErrors = []; 

  //       flowFile.forEach(node => {
  //         console.log(node);


  //         function isValidNode(node: any):boolean {
  //           if (
  //             node
  //             // node.id &&
  //             // node.type &&
  //             // node.name &&
  //             // node.payload &&
  //             // Array.isArray(node.wires) &&
  //             // typeof node.x === 'number' &&
  //             // typeof node.y === 'number'
  //             // Add additional validation criteria as needed
  //           ) {


  //               if (!node.payload) {
  //                 this.validationErrors.push(`گره شماره ' (${node.name}): فاقد متن گره می باشد`);
  //                 return false;
  //               }
  //             if (node.type === 'start-node' && !node.wires.length ) {
  //               this.validationErrors.push(`گره شروع '(${node.name}) فاقد گره خروجی است`, node);
  //               return false;
  //             }

  //             if (node.type === 'end-node' && !node.wires.length ) {
  //               this.validationErrors.push(`گره پایانی '(${node.name}) فاقد اتصال ورودی است`, node);
  //               return false;
  //             }

  //             // Add more specific validation criteria based on node type if needed
  //             console.log(`اعتبار سنجی برای گره ${node} کامل نیست`)
  //             return true;
  //           }
  //           console.log('اعتبار سنجی کامل نیست')
  //           return false;

  //         }

  //         this.validation = isValidNode(node)
  //         if (!this.validation) {
  //           console.error('Invalid node:', node);
  //           this.authService.openDialog = true
  //         }



  //       });

  //       if (this.validationErrors.length > 0) {
  //         this.authService.validationErrors = this.validationErrors
  //         const errorMessage = this.validationErrors.join('\n');
  //         alert(`خطاهای اعتبارسنجی:\n${errorMessage}`);
  //       }



  //       //validation on flowfile
  //       //1.input and output
  //       //2. required items 

  //       // flowFile.forEach(node => {
  //       //   console.log(node)
  //       //   if (this.validation) {
  //       //     console.log('OK')
  //       //     // if (node.type == "multi-image") {

  //       //     // }
  //       //   } else {
  //       //     console.error('Invalid node:', node);

  //       //   }
  //       // })

  //       //

  //       this.authService.executeFunction("654cce698458b074ddd0", this.paramsJSONEdit)
  //         .then((response) => {
  //           console.log(response)
  //           //delete from nodered

  //           this.authService.sendRequestOne('DELETE', "http://192.168.100.16:1880", '/flow/' + this.flowid, { id: this.flowid })
  //             .then((response) => {
  //               console.log(response)
  //               //show message to user
  //               //remove flow botId correspondant
  //               const params1: AuthTestParams = {
  //                 path: '/delete',
  //                 data: {
  //                   flowId: this.flowid,

  //                 }
  //               };
  //               const paramsJSON1: JSON = JSON.parse(JSON.stringify(params1));
  //               this.authService.executeFunction('655b1a2fab234d537552', paramsJSON1)
  //                 .then((response) => {
  //                   console.log("response", response);
  //                   this.router.navigate(['/view', this.botid]);
  //                 })
  //                 .catch((error) => {
  //                   console.error('Error list of Bot:', error);
  //                 });
  //               //******************************* */


  //             })
  //             .catch((error) => {
  //               console.error('Request failed:', error);
  //             })
  //         })
  //         .catch((error) => {
  //           console.error('Request failed:', error);
  //         })

  //     })
  //     .catch((error) => {
  //       console.error('Request failed:', error);
  //     })

  // }

  // -----------------------------------------------
  async showBot() {

    try {

      const response = await this.authService.sendRequestOne('GET', "http://192.168.100.16:1880", '/flow/' + this.flowid, {});
      console.log(response);

      const paramsEdit: AuthTestParams = {
        path: '/update',
        data: {
          botId: this.botid,
          editdata: {
            botFile: JSON.stringify(response.nodes)
          }
        }
      };


      this.paramsJSONEdit = JSON.parse(JSON.stringify(paramsEdit));
      console.log(response.nodes);

      let flowFile = response.nodes;
      console.log(flowFile);

      this.authService.flowIdWhenHasError = this.flowid;

      let validationErrors: string[] = [];
      // this.validationErrors = [];

      try {
        for (const node of flowFile) {
          console.log(node);

          console.log(this.validationErrors)

          this.validation = this.isValidNode(node);

          if (!this.validation) {
            console.error('Invalid node:', node);
            this.authService.openDialog = true;
            // this.authService.openDialog = false
          } else {
            this.authService.openDialog = false;
          }
        }

        if (this.validationErrors.length > 0) {
          this.authService.validationErrors = this.validationErrors
          const errorMessage = this.validationErrors.join('\n');
          alert(`خطاهای اعتبارسنجی:\n${errorMessage}`);
          this.authService.openDialog = true;
          console.log(errorMessage)
        } else {
          this.authService.openDialog = false;
        }
        this.authService.executeFunction("654cce698458b074ddd0", this.paramsJSONEdit, '/update', 'POST', false)
          .then((response) => {
            console.log(response)


            this.authService.sendRequestOne('DELETE', "http://192.168.100.16:1880", '/flow/' + this.flowid, { id: this.flowid })
              .then((response) => {
                console.log(response)

                const params1: AuthTestParams = {
                  path: '/delete',
                  data: {
                    flowId: this.flowid,

                  }
                };
                const paramsJSON1: JSON = JSON.parse(JSON.stringify(params1));
                this.authService.executeFunction('655b1a2fab234d537552', paramsJSON1, '/delete', 'POST', false)
                  .then((response) => {
                    console.log("response", response);
                    this.router.navigate(['/view', this.botid]);
                  })
                  .catch((error) => {
                    console.error('Error list of Bot:', error);
                  });
                //******************************* */


              })
              .catch((error) => {
                console.error('Request failed:', error);
              })
          })
          .catch((error) => {
            console.error('Request failed:', error);
          })
      }

      catch (error) {
        console.log(error.message)
        this.authService.executeFunction("654cce698458b074ddd0", this.paramsJSONEdit, '/update', 'POST', false)
          .then((response) => {
            console.log(response)


            this.authService.sendRequestOne('DELETE', "http://192.168.100.16:1880", '/flow/' + this.flowid, { id: this.flowid })
              .then((response) => {
                console.log(response)

                const params1: AuthTestParams = {
                  path: '/delete',
                  data: {
                    flowId: this.flowid,

                  }
                };
                const paramsJSON1: JSON = JSON.parse(JSON.stringify(params1));
                this.authService.executeFunction('655b1a2fab234d537552', paramsJSON1, '/delete', 'POST', false)
                  .then((response) => {
                    console.log("response", response);
                    this.router.navigate(['/view', this.botid]);
                  })
                  .catch((error) => {
                    console.error('Error list of Bot:', error);
                  });
                //******************************* */


              })
              .catch((error) => {
                console.error('Request failed:', error);
              })
          })
          .catch((error) => {
            console.error('Request failed:', error);
          })

      }







    } catch (error) {
      console.error('Request failed:', error);
    }

  }
  // -----------------------------------------------
  isValidNode(node: any): boolean {
    var flag = true
    if (node) {

      if (node.wires[0]) {
        console.log(node.type)
        if (node.wires[0].length == 0) {
          this.validationErrors.push(`گره شماره  (${node.name}): فاقد اتصال خروجی است`);
        }
      } else {
        if (node.type != "end-node") {
          this.validationErrors.push(`گره شماره  (${node.name}): فاقد اتصال خروجی است`);
          flag = false
        }
        console.log(node.type)
      }
      if (node.type == "personal-information") {
        console.log(node.wires)
        for (let i = 1; i < node.wires.length; i++) {
          if (node.wires[i].length == 0) {
            this.validationErrors.push(`گره شماره  (${node.name}): فاقد اتصال خروجی است`);
          }
        }
      }
      if (node.type == "condition-box-fa") {
        console.log(node.wires)
        for (let i = 1; i < node.wires.length; i++) {
          if (node.wires[i].length == 0) {
            this.validationErrors.push(`گره شماره  (${node.name}): فاقد اتصال خروجی است`);
          }
        }
      }
      if (node.type == "multi-image") {
        console.log(node.wires)
        for (let i = 1; i < node.wires.length; i++) {
          if (node.wires[i].length == 0) {
            this.validationErrors.push(`گره شماره  (${node.name}): فاقد اتصال خروجی است`);
          }
        }
      }
      if (node.type == "multi-select-fa") {
        console.log(node.wires)
        for (let i = 1; i < node.wires.length; i++) {
          if (node.wires[i].length == 0) {
            this.validationErrors.push(`گره شماره  (${node.name}): فاقد اتصال خروجی است`);
          }
        }
      }
      if (node.type == "true-false") {
        console.log(node.wires)
        for (let i = 1; i < node.wires.length; i++) {
          if (node.wires[i].length == 0) {
            this.validationErrors.push(`گره شماره  (${node.name}): فاقد اتصال خروجی است`);
          }
        }
      }
      if (node.type == "goal-condition") {
        console.log(node.wires)
        for (let i = 1; i < node.wires.length; i++) {
          if (node.wires[i].length == 0) {
            this.validationErrors.push(`گره شماره  (${node.name}): فاقد اتصال خروجی است`);
          }
        }
        for (let i = 0; i < node.rules.length; i++) {
          if (node.rules[i].g === "") {
            this.validationErrors.push(`گره شماره  (${node.name}): فاقد متن هدف  می باشد`);
          }
        }
      }
      if (node.type == "property-condition") {
        console.log(node.wires)
        for (let i = 1; i < node.wires.length; i++) {
          if (node.wires[i].length == 0) {
            this.validationErrors.push(`گره شماره  (${node.name}): فاقد اتصال خروجی است`);
          }
        }

        for (let i = 0; i < node.rules.length; i++) {
          if (node.rules[i].T === "") {
            this.validationErrors.push(`گره شماره  (${node.name}): فاقد نوع  خصیصه می باشد`);
          }
        }
        for (let i = 0; i < node.rules.length; i++) {
          if (node.rules[i].F === "") {
            this.validationErrors.push(`گره شماره  (${node.name}): فاقد عنوان خصیصه می باشد`);
          }
        }
      }

      // ---------------------------------------------------------------------------
      console.log(node.wires)
      if (node.type == "start-node") {
        if (!node.payload) {
          this.validationErrors.push(`گره شماره  (${node.name}): فاقد متن گره می باشد`);
          flag = false
        }
      }
      if (node.type == "end-node") {
        if (!node.payload) {
          this.validationErrors.push(`گره شماره  (${node.name}): فاقد متن گره می باشد`);
          flag = false
        }
      }
      if (node.type == "appoinment-date") {
        if (!node.appointmentQuestion) {
          this.validationErrors.push(`گره شماره  (${node.name}): فاقد متن گره می باشد`);
          flag = false
        }
      }
      if (node.type == "delay") {
        if (!node.question) {
          this.validationErrors.push(`گره شماره  (${node.name}): فاقد متن گره می باشد`);
          flag = false
        }
        if (!node.durationType) {
          this.validationErrors.push(`گره شماره  (${node.name}): فاقد مدت زمان تاخیر در گره می باشد`);
          flag = false
        }
      }
      if (node.type == "notification-fa") {
        if (!node.question) {
          this.validationErrors.push(`گره شماره  (${node.name}): فاقد متن گره می باشد`);
          flag = false
        }
        if (node.displayTime == "") {
          this.validationErrors.push(`گره شماره  (${node.name}): فاقد زمان وقفه می باشد`);
          flag = false
        }
      }
      if (node.type == "score-node") {
        if (!node.question) {
          this.validationErrors.push(`گره شماره  (${node.name}): فاقد متن گره می باشد`);
          flag = false
        }
        if (node.maxScore == "") {
          this.validationErrors.push(`گره شماره  (${node.name}): فاقد  حداکثر امتیاز می باشد`);
          flag = false
        }
      }
      if (node.type == "descriptive-fa") {
        if (node.question == "") {
          this.validationErrors.push(`گره شماره  (${node.name}): فاقد متن گره می باشد`);
          flag = false
        }
      }
      if (node.type == "multi-image") {
        if (node.question == "") {
          this.validationErrors.push(`گره شماره  (${node.name}): فاقد متن گره می باشد`);
          flag = false
        }
      }
      if (node.type == "multi-select-fa") {
        if (node.question == "") {
          this.validationErrors.push(`گره شماره  (${node.name}): فاقد متن گره می باشد`);
          flag = false
        }
      }
      if (node.type == "true-false") {
        if (node.question == "") {
          this.validationErrors.push(`گره شماره  (${node.name}): فاقد متن گره می باشد`);
          flag = false
        }
      }
      if (node.type == "multi-media") {
        if (node.question == "") {
          this.validationErrors.push(`گره شماره  (${node.name}): فاقد متن گره می باشد`);
          flag = false
        }
      }
      if (node.type == "upload-files") {
        if (node.topic == "") {
          this.validationErrors.push(`گره شماره  (${node.name}): فاقد متن گره می باشد`);
          flag = false
        }
      }
      if (node.type == "goal-setting") {
        if (node.goal == "") {
          this.validationErrors.push(`گره شماره  (${node.name}): فاقد متن هدف می باشد`);
          flag = false
        }
      }
      if (node.type == "personal-information") {
        if (node.payload == "") {
          this.validationErrors.push(`گره شماره  (${node.name}): فاقد عنوان می باشد`);
          flag = false
        }
      }

    }

    return flag;
  }

  // -------------------------------------------------------------------------
  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      this.convertBlobToFile(selectedFile);
    }
  }

  convertBlobToFile(blob: Blob) {



    var xhr = new XMLHttpRequest();
    xhr.open('GET', "blob:http://127.0.0.1:1880/d9a5a80f-ff24-44fa-b04b-c8da541f82b5", true);
    xhr.responseType = 'blob';
    xhr.withCredentials = false;


    xhr.onload = function (e) {
      if (this.status == 200) {
        var myBlob = this.response;
        console.log("res", myBlob)
        var file = new File([myBlob], "name.jpg");
        console.log("file file ", file)
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(file);
        downloadLink.download = file.name;
        downloadLink.click();
        console.log(downloadLink);
        console.log(downloadLink.href);
        console.log(downloadLink.download)

        // myBlob is now the blob that the object URL pointed to.
      }
    };
    xhr.send();
    //convert blob to file
    // file = convert blob to file
    // const promise = storage.createFile(
    //     '651134e7bb7d7d3c4fe1',
    //      ID.unique(),
    //      file

    // );
    // promise.then(function (response) {
    //     console.log(response); // Success
    // }, function (error) {
    //     console.log(error); // Failure
    // });


    //const file = new File([blob], "test.jpg");

  }



}



