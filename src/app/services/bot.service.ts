import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthTestParams, ICodeBlocks } from 'src/models/chatbot-node.models';
import { SharedDataService } from './shared-data.service';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class BotService {

  // botNameEdit: string;
  // id: any;
  // flowid: string = '';

  botNameDesign: string;
  botFile: any;
  flowid: string = '';
  updatedJSON: any;
  SRC: string;
  srcSafe: any;
  codeBlocks: ICodeBlocks[] = [];
  botNameEdit: string;
  mainResult: any = [];

  constructor(private authService: AuthService, private sharedDataService: SharedDataService, private sanitizer: DomSanitizer, private router: Router,) { }

  navigateDesignBotForValidate(id: string) {
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
          .then((response) => {
            const flow = response;
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
              .then((response) => {
                console.log("response", response);
                for (let i = 0; i < response.documents.length; i++) {
                  if (response.documents[i].status == true)
                    var flow = response.documents[i].$id;
                  this.authService.sendRequestOne('DELETE', "http://192.168.100.16:1880", '/flow/' + flow, { id: flow })
                    .then((response) => {
                      console.log(response)

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
                  .then((response) => {
                    console.log("response", response);
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


}
