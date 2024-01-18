import * as jalaliMoment from 'jalali-moment'
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ChatbotDataService } from 'src/app/services/chatbot-data.service';
import { AuthTestParams, IChatbotNode } from 'src/models/chatbot-node.models';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BotService } from 'src/app/services/bot.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy {

  reactiveForm: FormGroup;

  idBot: string

  currentNode: { id: string; type: string } | null = null;
  flowsArray: IChatbotNode[] = [];

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

    // Add more image filenames here
  ];
  totalScore: number = 0;
  randomImageSrc: string;
  doNOtOpen: boolean = true;
  currentNodeFirst: string = 'start-node'
  selectedNodeType: string = 'start-node';
  selectedNodeId: string = '1';
  startNodeName: string = '';
  startNodeId: string = '';
  startNodeType: string = '';
  startNodeWires: string[] = [];
  startNodepayload: string;

  descriptiveFaNodeName: string;
  descriptiveFaNodeId: string;
  descriptiveFaNodeWires: string[] = [];
  descriptiveFaNodeType: string;
  descriptiveFaNodeQuestion: any;
  descriptiveRequired: boolean;
  disableDescriptiveRequired: boolean = true;
  disableMultiSelectEnRequired: boolean = true;
  isAnswerEmpty: boolean = true;
  answer: string;
  descriptiveProperty: boolean;
  descriptiveProperties: any;
  descriptiveFaValue: any



  notificationNodeName: string;
  notificationNodeQuestion: string;

  endNodeName: string;
  endNodeId: string;
  endNodeType: string;
  endNodepayload: string

  currentNodeType: string = '';
  currentNodeId: string = '';


  nextNodes: { type: string; id: string; }[];


  multiSelectEnNodeName: string;
  multiSelectEnNodeTypeFile: string;
  multiSelectEnNodeQuestion: string;
  multiSelectEnNodeQuestionFile: any;
  multiSelectEnNodeSrc: string;
  multiSelectEnRequired: boolean
  multiSelectEnNodeAnswers: any
  multiSelectEnNodeWires: string[];
  vPropertyValue: string = '';
  sPropertyValue: number;
  multiSelectEnNodeAnswersArray: string[] = [];
  selectedAnswer: string | null = null;
  multiSelectEnNodeWiresArray: any;
  selectedValue: string = '';
  selectedIndices: number[] = [];


  multiImageNodeName: string;
  multiImageNodeQuestion: string;
  multiImageNodeQuestionFileType: any;
  multiImageNodeSrc: string;
  multiImageRequired: boolean
  multiImageNodeAnswers: any
  multiImageNodeWires: string[];
  fPropertyValue: string = '';
  sPropertyValueImage: any;
  tPropertyValue: string;
  multiImageNodeAnswersArray: string[] = [];
  selectedAnswerImage: string | null = null;
  multiImageNodeWiresArray: any;

  selectedIndicesImage: number[] = [];


  scoreNodeName: string = '';
  scoreNodeQuestion: string = '';
  maxScoreOfScoreNode: number;
  thumbLabel: boolean = false;
  max: number;
  min: number = 1;
  showTicks: boolean = false;
  value: number = 0;
  valueScore: number = 0;
  scoreValue: number = 0;
  maxScore: number;

  delayNodeName: string = '';
  delayNodeQuestion: string = '';
  durationTypeOfDelay: number;
  delayUnits: string = '';
  delayNodeWires: string[];
  mainUnit: number;
  waitingTimeOut: any;
  openDelay: boolean = true;
  isButtonDisabled: boolean = true;
  countdown: number;

  personalInformationName: string = '';
  personalInformationSecurityEmail: boolean;
  personalInformationSecurityAdress: boolean;
  personalInformationSecurityPhoneNumber: boolean;
  personalInformationUsername: boolean;
  personalInformationPayload: string = '';
  personalInformationRequiredSecurityPhoneNumber: boolean;
  personalInformationRequiredSecurityAdress: boolean;
  personalInformationRequiredUsername: boolean;
  personalInformationRequiredSecurityEmail: boolean;

  tureFalseNodeName: string;
  tureFalseNodeQuestion: string;
  tureFalseRequired: boolean;
  tureFalseNodeWires: string[];
  tureFalseNodeWiresArray: any;
  tureFalseNodeWiresTrue: string;
  tureFalseNodeWiresFalse: string;
  selectedValueTrueFalse: string = '';
  trueFalsePropertyValue: string = '';
  trueFalseNodeAnswersArray: string[] = [];
  tureFalseNodeAnswer: string[];

  UserFormFaNodeName: string
  UserFormFaQuestion: string;
  UserFormFaOptionsLabel: string;
  UserFormFaOptionsValue: string;
  UserFormFaOptionsType: string;
  UserFormFaOptionsRequired: Boolean;
  UserFormFaOptionsRows: number;
  UserFormFaNodeWires: string;
  UserFormFaOptions: any;

  UserFormEmailValue: string;
  UserFormNumberValue: number;
  UserFormPassValue: string;
  UserFormDateValue: string;
  UserFormTimeValue: string;
  UserFormNameValue: string;
  UserFormMultiValue: string;

  multilineOption: any;
  multilineOptionRequired: boolean;
  multilineOptionType: string;
  textOption: any;
  textOptionRequired: boolean;
  textOptionType: string;
  timeOption: any;
  timeOptionRequired: boolean;
  timeOptionType: string;
  passwordOption: any;
  passwordOptionRequired: boolean;
  passwordOptionType: string;
  dateOption: any;
  dateOptionRequired: boolean;
  dateOptionType: string;
  numberOption: any;
  numberOptionRequired: boolean;
  numberOptionType: string;
  emailOption: any;
  emailOptionRequired: boolean;
  emailOptionType: string;

  newMediaNodeName: string;
  newMediaNodeWires: string[] = [];
  newMediaNodeCategory: string;
  newMediaNodeFile: any;

  uploadFilesNodeTopic: string;
  uploadFilesNodeWires: string[] = [];

  multiMediaName: string;
  multiMediaFileType: string;
  multiMediaQuestion: string;
  multiMediaSrc: string;
  multiMediaWires: string[] = [];


  appoinmentDateNodeName: string = '';
  appoinmentDateNodeWires: string[] = [];
  appointmentQuestionNode: any;
  appointmentDurationType: boolean;
  appointmentWaitingUnit: boolean;
  appointmentValueFour: string
  appointmentValueTree: string;
  appointmentValueTwo: string;
  appointmentValueOne: string;
  period: string;

  params1: AuthTestParams;
  paramsJSON: JSON

  userInformation: any = {};

  userInformationMain: any = [];
  resultUser: any = [];

  userFormTimeValues: string[] = [];


  emailIsValid: boolean = false

  selectIndex: any;

  nextNodeOfMultiType: string;
  nextNodeOfMultiID: string;

  minLength = 8;

  isDatePickerOpen = false;

  showPhotoInForm: boolean = true;

  selectedFileInfo: string;

  profileImageUrl: SafeResourceUrl;
  fileType: string;

  nextFlag: boolean = false;

  botId: string;

  resultOfList: any;

  lastObject: object;
  botNameOfList: any;
  botFile: object;

  openDialog: boolean;

  validationErrors: string[] = []


  // profileImageUrl: string | ArrayBuffer | null

  constructor(private chatbotDataService: ChatbotDataService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private appComponent: AppComponent,
    private sanitizer: DomSanitizer,
    private botService: BotService) {
    // this.reactiveForm = this.formBuilder.group({
    //   answer: ['', Validators.required]
    // });

  }
  ngOnDestroy(): void {
    this.appComponent.showHeader = true;
    this.appComponent.showSecondMenu = false;
    this.openDialog = this.authService.openDialog;
  }

  ngOnInit(): void {

    this.validationErrors = this.authService.validationErrors

    this.openDialog = this.authService.openDialog;


    this.appComponent.showHeader = false;
    this.appComponent.showSecondMenu = true

    this.route.params.subscribe(params => {
      this.idBot = params['id'];
      console.log(this.idBot)
    })
    this.getFlows();
    this.reactiveForm = new FormGroup({
      personalDetails: new FormGroup({
        userEmail: new FormControl(null, [Validators.required, Validators.email, this.emailFormatValidator()]),
        userPhone: new FormControl(null, [Validators.required, , this.phoneNumberFormatValidator()]),
        userAddress: new FormControl(null, [Validators.required, this.addressFormatValidator()]),
        userName: new FormControl(null, [Validators.required, this.nameFormatValidator()]),
      }),
    })
    this.reactiveForm = new FormGroup({
      personalDetails: new FormGroup({
        userEmail: new FormControl(null, [Validators.required, Validators.email, this.emailFormatValidator()]),
        userPhone: new FormControl(null, [Validators.required, , this.phoneNumberFormatValidator()]),
        userAddress: new FormControl(null, [Validators.required, this.addressFormatValidator()]),
        userText: new FormControl(null, [Validators.required, this.addressFormatValidator()]),
        userTextMulti: new FormControl(null, [Validators.required, this.addressMultiFormatValidator()]),
        userNnmber: new FormControl(null, [Validators.required, this.numberFormatValidator()]),
        userPass: new FormControl(null, [Validators.required, this.passwordFormatValidator()]),
        userName: new FormControl(null, [Validators.required, this.nameFormatValidator()]),
        dateUser: new FormControl(null, [Validators.required, this.numberFormatValidator()]),
        timeUser: new FormControl(null, [Validators.required, this.numberFormatValidator()]),
        ans: new FormControl(null, [Validators.required, this.addressMultiFormatValidator()]),
      }),
    })

    const randomIndex = Math.floor(Math.random() * this.imageFilenames.length);
    console.log(this.imageFilenames[randomIndex])
    this.randomImageSrc = `${this.imageFilenames[randomIndex]}`;

    this.countdown = Math.ceil(this.mainUnit / 1000);


  }

  getFlows() {
    //const $this = this;
    // this.chatbotDataService.getFlowsJson().subscribe({
    //   next: (flows: any[]) => {
    //     this.flowsArray = flows;
    //     console.log(this.flowsArray);
    this.params1 = {
      path: '/get',
      data: {
        botId: this.idBot,
      }
    };

    this.paramsJSON = JSON.parse(JSON.stringify(this.params1));


    this.authService.executeFunction("654cce698458b074ddd0", this.paramsJSON, '/get', 'POST', false)
      .then((response) => {
        this.flowsArray = JSON.parse(response.botFile);
        console.log(this.flowsArray);
        const startNode = this.flowsArray.find(node => node.type === 'start-node');
        this.startNodeName = startNode.name;
        this.startNodepayload = startNode.payload,
          this.startNodeId = startNode.id;
        this.startNodeWires = startNode.wires;
        this.startNodeType = startNode.type;
        this.selectedNodeId = startNode.id;

        // this.userInformation = {
        //   ...this.userInformation,
        //   startNodeName: startNode.name,
        //   startNodeId: startNode.id,
        //   startNodeType: startNode.type,
        // };
        this.resultUser.push({
          label: "start",
          text: this.startNodepayload,
        });
        this.resultUser.push({
          label: "user info",
          userId: this.authService.userId,
        });
        const endNode = this.flowsArray.find(node => node.type === 'end-node');
        this.endNodeName = endNode.name;
        this.endNodepayload = endNode.payload,
          this.endNodeId = endNode.id;
        this.endNodeType = endNode.type;

        // this.userInformation = {
        //   ...this.userInformation,
        //   endNodeName: endNode.name,
        //   endNodeId: endNode.id,
        //   endNodeType: endNode.type,
        // };


        console.log("start-node-ID: ", this.selectedNodeId)
      })
      .catch((error) => {
        console.error('Error list of Bot:', error);
      });


    // const descriptiveFaNode = this.flowsArray.find(node => node.type === 'descriptive-fa');
    // const endNode = this.flowsArray.find(node => node.type === 'end-node');
    //   },
    //   error: (error) => {
    //     console.error('Error retrieving flows.json:', error);
    //   }
    // });
  }


  next() {
    let currentNode;
    this.nextFlag = false;
    do {
      let current: any
      current = this.flowsArray.find(node => node.id === this.selectedNodeId);
      console.log(current)


      if (this.selectedNodeType === 'multi-select-fa') {
        var type = this.getSelectedWireType()

        currentNode = this.flowsArray.find(node => node.id === this.nextNodeOfMultiID)
        this.selectedNodeType = currentNode.type;
        this.selectedNodeId = currentNode.id;
        //score
        current.rules.forEach(element => {
          if (element.v == this.selectedValue) {
            this.totalScore += parseInt(element.s);
          }
        })
        console.log("totalScore ", this.totalScore)
        if (this.selectedNodeType != 'property-condition' && this.selectedNodeType != 'goal-condition' && this.selectedNodeType != 'condition-box-fa' && this.selectedNodeType != 'goal-setting') {
          break;
        }
      } else if (this.selectedNodeType === 'multi-image') {
        var type = this.getSelectedWireTypeMulti()

        currentNode = this.flowsArray.find(node => node.id === this.nextNodeOfMultiID)
        this.selectedNodeType = currentNode.type;
        this.selectedNodeId = currentNode.id;

        current.rules.forEach(element => {
          if (element.f == this.selectedValue) {
            this.totalScore += parseInt(element.s);
          }
        })
        console.log("totalScore ", this.totalScore)
        if (this.selectedNodeType != 'property-condition' && this.selectedNodeType != 'goal-condition' && this.selectedNodeType != 'condition-box-fa' && this.selectedNodeType != 'goal-setting') {
          break;
        }
      }
      else if (this.selectedNodeType === 'true-false') {
        // var type = this.getSelectedWireType()
        currentNode = this.flowsArray.find(node => node.id === this.nextNodeOfMultiID)
        this.selectedNodeType = currentNode.type
        this.selectedNodeId = currentNode.id;
        console.log(this.selectedNodeId)

        if (this.selectedValue == "درست") {
          this.totalScore += parseInt(current.scoreTrue);
        }
        else if (this.selectedValue == "نادرست") {
          this.totalScore += parseInt(current.scoreFalse);
        }
        else if (this.selectedValue == "نظری ندارم") {
          this.totalScore += parseInt(current.scoreFr);
        }
        console.log("totalScore ", this.totalScore)
        if (this.selectedNodeType != 'property-condition' && this.selectedNodeType != 'goal-condition' && this.selectedNodeType != 'condition-box-fa' && this.selectedNodeType != 'goal-setting') {
          break;
        }
      }
      else if (this.selectedNodeType === 'condition-box-fa') {
        let next1;
        let rulewires1 = current.wires.map(wires => wires[0]);
        for (var i = 0; i < current.rules.length; i++) {
          var element = current.rules[i]
          if (element.t == 'eq') {
            if (this.totalScore == element.v) {
              next1 = rulewires1[i]
              break;
            }
          }
          else if (element.t == "neq") {
            if (this.totalScore != element.v) {
              next1 = rulewires1[i]
              break;
            }

          }
          else if (element.t == "lte") {
            if (this.totalScore <= element.v) {
              next1 = rulewires1[i]
              break;
            }

          }
          else if (element.t == "gte") {
            if (this.totalScore >= element.v) {
              next1 = rulewires1[i]
              break;
            }
          }
          else if (element.t == "btwn") {
            if (this.totalScore >= element.v && this.totalScore <= element.v2) {
              next1 = rulewires1[i]
              break;
            }
          }

        }
        this.nextNodeOfMultiID = next1;
        currentNode = this.flowsArray.find(node => node.id === this.nextNodeOfMultiID)
        this.selectedNodeType = currentNode.type;
        this.selectedNodeId = currentNode.id;
        if (this.selectedNodeType != 'property-condition' && this.selectedNodeType != 'goal-condition' && this.selectedNodeType != 'condition-box-fa' && this.selectedNodeType != 'goal-setting') {
          break;

        }
      }
      else if (this.selectedNodeType == 'goal-condition') {
        for (var i = 0; i <= current.rules.length; i++) {
          var element = current.rules[i]
          for (var j = 0; j <= this.resultUser.length; j++) {
            if (this.resultUser[j].label == "goal") {
              for (var k = 0; k <= this.resultUser[j].goal.length; k++) {
                if (this.resultUser[j].goal[k] == element.g) {
                  this.nextNodeOfMultiID = current.wires[0][i]
                  currentNode = this.flowsArray.find(node => node.id === this.nextNodeOfMultiID)
                  this.selectedNodeType = currentNode.type;
                  this.selectedNodeId = currentNode.id;
                  //break;
                }
              }
            }
          }

        }
        if (this.selectedNodeType != 'property-condition' && this.selectedNodeType != 'goal-condition' && this.selectedNodeType != 'condition-box-fa' && this.selectedNodeType != 'goal-setting') {
          break;
        }

      }
      else if (this.selectedNodeType == 'property-condition') {
        let next;
        let rulewires = current.wires.map(wires => wires[0]);
        for (var i = 0; i < current.rules.length; i++) {
          var element = current.rules[i]
          for (var j = 0; j < this.resultUser.length; j++) {
            if (this.resultUser[j].label == "property") {
              for (var k = 0; k < this.resultUser[j].property.length; k++) {
                if ((this.resultUser[j].property[k].key == element.F) && (this.resultUser[j].property[k].value == element.T)) {

                  next = rulewires[i]
                  break;
                }
              }

            }
          }


        }
        this.nextNodeOfMultiID = next
        currentNode = this.flowsArray.find(node => node.id === this.nextNodeOfMultiID)
        this.selectedNodeType = currentNode.type;
        this.selectedNodeId = currentNode.id;
        if (this.selectedNodeType != 'property-condition' && this.selectedNodeType != 'goal-condition' && this.selectedNodeType != 'condition-box-fa' && this.selectedNodeType != 'goal-setting') {
          break;
        }

      }
      else if (this.selectedNodeType == 'goal-setting') {

        var goal = this.resultUser.find(element => element.label == "goal")
        if (goal) {
          this.resultUser.forEach(element => element.label == "goal")
          {
            element.goal.push(current.goal)
          }
        }
        else {
          this.resultUser.push({
            label: "goal",
            goal: [current.goal]
          })
        }
        currentNode = this.flowsArray.find(node => node.id === current.wires[0][0])
        this.selectedNodeType = currentNode.type;
        this.selectedNodeId = currentNode.id;
        if (this.selectedNodeType != 'property-condition' && this.selectedNodeType != 'goal-condition' && this.selectedNodeType != 'condition-box-fa' && this.selectedNodeType != 'goal-setting') {
          break;
        }


      }

      else {
        if (current.type == "descriptive-fa") {
          this.totalScore += parseInt(current.score);
        }
        currentNode = this.flowsArray.find(node => node.id === current.wires[0][0])
        this.selectedNodeType = currentNode.type
        this.selectedNodeId = currentNode.id
        if (this.selectedNodeType != 'property-condition' && this.selectedNodeType != 'goal-condition' && this.selectedNodeType != 'condition-box-fa' && this.selectedNodeType != 'goal-setting') {
          break;
        }

      }


    }
    while (true)

    this.showNext(currentNode)


  }

  showNext(currentNode) {
    switch (this.selectedNodeType) {


      case 'score-node':
        this.scoreNodeName = currentNode.name;
        this.scoreNodeQuestion = currentNode.question;
        this.maxScore = currentNode.maxScore;

        // this.userInformation = {
        //   ...this.userInformation,
        //   scoreNodeName: this.scoreNodeName,
        //   scoreNodeQuestion: this.scoreNodeQuestion,
        //   scoreMaxScore: this.maxScore,
        //   scoreValue: this.scoreValue,
        // };
        break;
      case 'new-media':
        this.newMediaNodeName = currentNode.name;
        this.newMediaNodeWires = currentNode.wires;
        this.newMediaNodeCategory = currentNode.category;
        this.newMediaNodeFile = "./assets/images/7.jpg";
        console.log(this.value)
        break;
      case 'upload-files':
        this.uploadFilesNodeTopic = currentNode.topic;
        this.uploadFilesNodeWires = currentNode.wires;
        console.log(this.value)
        break;
      case 'multi-media':
        this.multiMediaName = currentNode.name;
        this.multiMediaFileType = currentNode.questionFileType1;
        this.multiMediaQuestion = currentNode.question;
        this.multiMediaSrc = currentNode.src;
        this.multiMediaWires = currentNode.wires;
        console.log(this.value);
        this.resultUser.push({
          label: "multi-media",
          text: this.multiMediaQuestion,
          src: this.multiMediaSrc,
          type: this.multiMediaFileType

        });
        break;
      case 'appoinment-date':
        this.appoinmentDateNodeName = currentNode.name;
        this.appoinmentDateNodeWires = currentNode.wires;
        this.appointmentQuestionNode = currentNode.appointmentQuestion;
        this.appointmentDurationType = currentNode.required.durationType;
        this.appointmentWaitingUnit = currentNode.required.waitingUnit;

        this.resultUser.push({
          label: "appoinment-date",
          text: this.appointmentQuestionNode,
        });

        // this.userInformation = {
        //   ...this.userInformation,
        //   appoinmentDateNodeName: this.appoinmentDateNodeName,
        //   appointmentQuestionNode: this.appointmentQuestionNode,
        //   appointmentDurationType: this.appointmentDurationType,
        //   appointmentWaitingUnit: this.appointmentWaitingUnit,
        //   appointmentValueTwo: this.appointmentValueTwo,
        //   appointmentValueOne: this.appointmentValueOne,
        //   // this.userInformation.scoreValue = this.scoreValue;
        // };

        break;

      case 'new-media':
        this.newMediaNodeName = currentNode.name;
        this.newMediaNodeWires = currentNode.wires;
        this.newMediaNodeFile = currentNode.file;
        this.newMediaNodeCategory = currentNode.category;


        break;
      case 'descriptive-fa':
        this.descriptiveFaNodeName = currentNode.name;
        this.descriptiveFaNodeId = currentNode.id;
        this.descriptiveFaNodeWires = currentNode.wires;
        this.descriptiveFaNodeType = currentNode.type;
        this.descriptiveFaNodeQuestion = currentNode.question;
        this.descriptiveRequired = currentNode.required;
        this.descriptiveProperty = currentNode.property;
        this.descriptiveProperties = currentNode.properties;

        // this.userInformation = {
        //   ...this.userInformation,
        //   descriptiveFaNodeName: this.descriptiveFaNodeName,
        //   descriptiveFaNodeId: this.descriptiveFaNodeId,
        //   descriptiveFaNodeType: this.descriptiveFaNodeType,
        //   descriptiveFaNodeQuestion: this.descriptiveFaNodeQuestion,
        //   descriptiveRequired: this.descriptiveRequired,
        //   descriptiveProperty: this.descriptiveProperty,
        //   descriptiveProperties: this.descriptiveProperties,
        //   descriptiveFaValue: this.descriptiveFaValue
        //   // this.userInformation.scoreValue = this.scoreValue;
        // };
        break;
      case 'notification-fa':
        this.notificationNodeName = currentNode.name;
        this.notificationNodeQuestion = currentNode.question;
        this.resultUser.push({
          label: "notification",
          text: this.notificationNodeQuestion,
        });
        break;
      case 'multi-select-fa':
        this.multiSelectEnNodeName = currentNode.name;
        this.multiSelectEnNodeTypeFile = currentNode.questionFileType2;
        this.multiSelectEnNodeQuestion = currentNode.question;
        this.multiSelectEnNodeSrc = currentNode.src;
        this.multiSelectEnNodeQuestionFile = currentNode.questionFile;
        this.multiSelectEnRequired = currentNode.required;
        this.multiSelectEnNodeAnswers = currentNode.rules;
        this.multiSelectEnNodeWires = currentNode.wires;

        console.log(this.multiSelectEnNodeAnswers)

        console.log(this.multiSelectEnNodeWires);
        this.multiSelectEnNodeWiresArray = this.multiSelectEnNodeWires.map(wire => wire[0]);
        console.log(this.multiSelectEnNodeWiresArray)


        for (const answer of this.multiSelectEnNodeAnswers) {
          this.vPropertyValue = answer.v; // Access the "v" property of the current object
          console.log(this.vPropertyValue);
        }
        this.multiSelectEnNodeAnswersArray = this.multiSelectEnNodeAnswers.map(answer => answer.v);

        console.log(this.multiSelectEnNodeAnswersArray)
        for (const answer of this.multiSelectEnNodeAnswers) {
          this.sPropertyValue = answer.s; // Access the "v" property of the current object
          console.log(this.sPropertyValue);
        }
        break;
      case 'multi-image':
        this.multiImageNodeName = currentNode.name;
        this.multiImageNodeQuestion = currentNode.question;
        this.multiImageNodeSrc = currentNode.src;
        this.multiImageNodeQuestionFileType = currentNode.questionFileType;
        this.multiImageRequired = currentNode.required;
        this.multiImageNodeAnswers = currentNode.rules;
        this.multiImageNodeWires = currentNode.wires;



        console.log(this.multiImageNodeAnswers)

        console.log(this.multiImageNodeWires);
        this.multiImageNodeWiresArray = this.multiImageNodeWires.map(wire => wire[0]);
        console.log(this.multiImageNodeWiresArray)


        for (const answer of this.multiImageNodeAnswers) {
          this.fPropertyValue = answer.f; // Access the "v" property of the current object
          console.log(this.fPropertyValue);
        }
        this.multiImageNodeAnswersArray = this.multiImageNodeAnswers.map(answer => answer.f);

        console.log(this.multiImageNodeAnswersArray)
        for (const answer of this.multiImageNodeAnswers) {
          this.sPropertyValueImage = answer.s; // Access the "v" property of the current object
          console.log(this.sPropertyValueImage);
        }
        break;


      case 'true-false':
        this.tureFalseNodeName = currentNode.name;
        this.tureFalseNodeQuestion = currentNode.question;
        this.tureFalseRequired = currentNode.required;
        this.tureFalseNodeWires = currentNode.wires;
        this.tureFalseNodeAnswer = ["درست", "نادرست", "نظری ندارم"];

        // this.userInformation = {
        //   ...this.userInformation,
        //   tureFalseNodeName: this.tureFalseNodeName,
        //   tureFalseNodeQuestion: this.tureFalseNodeQuestion,
        //   tureFalseRequired: this.tureFalseRequired,
        //   tureFalseNodeAnswer: this.tureFalseNodeAnswer,
        //   trueFalsePropertyValue: this.trueFalsePropertyValue
        // };



        this.tureFalseNodeWiresArray = this.tureFalseNodeWires.map(wire => wire[0]);
        console.log(this.tureFalseNodeWiresArray)

        for (const answer of this.tureFalseNodeWiresArray) {
          this.trueFalsePropertyValue = answer;

          console.log(this.trueFalsePropertyValue);
        }

        break;

      case 'delay':
        this.durationTypeOfDelay = currentNode.durationType;
        this.delayUnits = currentNode.units;
        this.delayNodeQuestion = currentNode.question;
        this.delayNodeWires = currentNode.wires;
        switch (this.delayUnits) {
          case "ساعت":
            this.mainUnit = this.durationTypeOfDelay * 3600000;
            console.log(this.mainUnit);
            this.enableButtonAfterDelay();
            break;
          case "دقیقه":
            this.mainUnit = this.durationTypeOfDelay * 60000;
            console.log(this.mainUnit);
            this.enableButtonAfterDelay()
            break;
          case "ثانیه":
            this.mainUnit = this.durationTypeOfDelay * 1000;
            console.log(this.mainUnit);
            this.enableButtonAfterDelay()
            break;

          default:
            break;
        };

        this.resultUser.push({
          label: "delay",
          text: this.delayNodeQuestion,
          units: this.delayUnits,
          duration: this.durationTypeOfDelay
        });

        // this.userInformation = {
        //   ...this.userInformation,
        //   durationTypeOfDelay: currentNode.durationType,
        //   delayUnits: currentNode.units,
        //   delayNodeQuestion: currentNode.question,
        //   delayNodeWires: currentNode.wires
        // };
        this.waitingTimeOut = setTimeout(this.waiting, this.mainUnit);



        break;
      case 'user-form-fa':
        this.UserFormFaNodeName = currentNode.name
        this.UserFormFaQuestion = currentNode.question;
        this.UserFormFaOptions = currentNode.options
        this.UserFormFaOptionsLabel = currentNode.options.label;
        this.UserFormFaOptionsValue = currentNode.options.value;
        this.UserFormFaOptionsType = currentNode.options.type;
        this.UserFormFaOptionsRequired = currentNode.options.required;
        this.UserFormFaOptionsRows = currentNode.options.rows;
        this.UserFormFaNodeWires = currentNode.wires;

        // this.userInformation = {
        //   ...this.userInformation,
        //   UserFormFaNodeName: this.UserFormFaNodeName,
        //   UserFormFaQuestion: this.UserFormFaQuestion,
        //   UserFormFaOptions: this.UserFormFaOptions,
        //   // UserFormFaOptionsLabel: this.UserFormFaOptionsLabel,
        //   // UserFormFaOptionsValue: this.UserFormFaOptionsValue,
        //   // UserFormFaOptionsType: this.UserFormFaOptionsType,
        //   // UserFormFaOptionsRequired: this.UserFormFaOptionsRequired,
        //   // UserFormFaOptionsRows: this.UserFormFaOptionsRows,

        //   UserFormEmailValue: this.UserFormEmailValue,
        //   UserFormNumberValue: this.UserFormNumberValue,
        //   UserFormPassValue: this.UserFormPassValue,
        //   UserFormDateValue: this.UserFormDateValue,
        //   UserFormTimeValue: this.UserFormTimeValue,
        //   UserFormNameValue: this.UserFormNameValue,
        //   UserFormMultiValue: this.UserFormMultiValue,
        // };




        this.UserFormFaOptions.forEach(option => {
          switch (option.type) {
            case 'multiline':
              this.multilineOption = this.UserFormFaOptions.filter(option => option.type === 'multiline');
              this.multilineOptionRequired = this.multilineOption[0].required;
              this.multilineOptionType = this.multilineOption[0].type;
              break;
            case 'text':
              this.textOption = this.UserFormFaOptions.filter(option => option.type === 'text');
              this.textOptionRequired = this.textOption[0].required;
              this.textOptionType = this.textOption[0].type;
              break;
            case 'time':
              this.timeOption = this.UserFormFaOptions.filter(option => option.type === 'time');
              this.timeOptionRequired = this.timeOption[0].required;
              this.timeOptionType = this.timeOption[0].type;
              break;
            case 'password':
              this.passwordOption = this.UserFormFaOptions.filter(option => option.type === 'password');
              this.passwordOptionRequired = this.passwordOption[0].required;
              this.passwordOptionType = this.passwordOption[0].type;
              break;
            case 'date':
              this.dateOption = this.UserFormFaOptions.filter(option => option.type === 'date');
              this.dateOptionRequired = this.dateOption[0].required;
              this.dateOptionType = this.dateOption[0].type;
              break;
            case 'number':
              this.numberOption = this.UserFormFaOptions.filter(option => option.type === 'number');
              this.numberOptionRequired = this.numberOption[0].required;
              this.numberOptionType = this.numberOption[0].type;
              break;
            case 'email':
              this.emailOption = this.UserFormFaOptions.filter(option => option.type === 'email');
              this.emailOptionRequired = this.emailOption[0].required;
              this.emailOptionType = this.emailOption[0].type;
              break;
          }
        });


        // this.multilineOption = this.UserFormFaOptions.filter(option => option.type === 'multiline');
        // this.multilineOptionRequired = this.multilineOption[0].required;
        // this.multilineOptionType= this.multilineOption[0].type;


        // this.textOption = this.UserFormFaOptions.filter(option => option.type === 'text');
        // this.textOptionRequired = this.textOption[0].required;
        // this.textOptionType = this.textOption[0].type;

        // this.timeOption = this.UserFormFaOptions.filter(option => option.type === 'time');
        // this.timeOptionRequired = this.timeOption[0].required;
        // this.timeOptionType = this.timeOption[0].type;

        // this.passwordOption = this.UserFormFaOptions.filter(option => option.type === 'password');
        // this.passwordOptionRequired = this.passwordOption[0].required;
        // this.passwordOptionType = this.passwordOption[0].type;

        // this.dateOption = this.UserFormFaOptions.filter(option => option.type === 'date');
        // this.dateOptionRequired = this.dateOption[0].required;
        // this.dateOptionType = this.dateOption[0].type;

        // this.numberOption = this.UserFormFaOptions.filter(option => option.type === 'number');
        // this.numberOptionRequired = this.numberOption[0].required;
        // this.numberOptionType = this.numberOption[0].type;

        // this.emailOption = this.UserFormFaOptions.filter(option => option.type === 'email');
        // this.emailOptionRequired = this.emailOption[0].required;
        // this.emailOptionType = this.emailOption[0].type;



        break;
      case 'personal-information':
        this.personalInformationName = currentNode.name;
        this.personalInformationUsername = currentNode.username
        this.personalInformationSecurityEmail = currentNode.securityEmail;
        this.personalInformationSecurityAdress = currentNode.securityAdress;
        this.personalInformationSecurityPhoneNumber = currentNode.securityPhoneNumber;

        this.personalInformationPayload = currentNode.payload;
        this.personalInformationRequiredUsername = currentNode.required.username;
        this.personalInformationRequiredSecurityEmail = currentNode.required.securityEmail;
        this.personalInformationRequiredSecurityAdress = currentNode.required.securityAdress;
        this.personalInformationRequiredSecurityPhoneNumber = currentNode.required.securityPhoneNumber;
        break;

      default:
        break;
    }

  }
  onRadioChange(value: string) {
    this.selectedValue = value; // Update the selected value when a radio button is clicked
    // this.userInformation.multiSelectPropertyValue = this.selectedValue;
  }
  onRadioChangeImage(value: any) {
    this.selectedValue = value.f; // Update the selected value when a radio button is clicked
    // this.userInformation.multiSelectPropertyValue = this.selectedValue;
  }

  onRadioChangeForTrueFalse(value: string) {
    this.selectedValue = value;
    // this.userInformation.trueFalsePropertyValue = this.selectedValue;
    console.log(this.selectedValue)
    var t = this.getSelectNextNode()
  }

  getSelectNextNode(): string {
    let selectedWireID = ""
    if (this.selectedValue === "درست") {
      selectedWireID = this.tureFalseNodeWiresArray[0];

    }
    else if (this.selectedValue === "نادرست") {
      selectedWireID = this.tureFalseNodeWiresArray[1];
    }
    else {
      selectedWireID = this.tureFalseNodeWiresArray[2];
    }

    const selectedNode: IChatbotNode | undefined = this.flowsArray.find(node => node.id === selectedWireID);

    if (selectedNode) {
      this.nextNodeOfMultiType = selectedNode.type;
      this.nextNodeOfMultiID = selectedNode.id;
      console.log(this.nextNodeOfMultiType);
      return selectedNode.type;

    }
    return '';
  }



  getSelectedWireType(): string {
    const selectedValue = this.selectedValue;
    const selectedRule = this.multiSelectEnNodeAnswers.find(rule => rule.v === selectedValue);

    if (selectedRule) {
      const selectedIndex = this.multiSelectEnNodeAnswers.indexOf(selectedRule);
      const selectedWireID = this.multiSelectEnNodeWiresArray[selectedIndex];

      // Find the node with the selectedWireID in the nodes array
      const selectedNode: IChatbotNode | undefined = this.flowsArray.find(node => node.id === selectedWireID);

      if (selectedNode) {
        this.nextNodeOfMultiType = selectedNode.type;
        this.nextNodeOfMultiID = selectedNode.id;
        console.log(this.nextNodeOfMultiType);
        return selectedNode.type;
      }
    }

    return '';
  }

  getSelectedWireTypeMulti(): string {
    const selectedValue = this.selectedValue;
    const selectedRule = this.multiImageNodeAnswers.find(rule => rule.f == selectedValue);

    if (selectedRule) {
      const selectedIndex = this.multiImageNodeAnswers.indexOf(selectedRule);
      const selectedWireID = this.multiImageNodeWiresArray[selectedIndex];

      // Find the node with the selectedWireID in the nodes array
      const selectedNode: IChatbotNode | undefined = this.flowsArray.find(node => node.id === selectedWireID);

      if (selectedNode) {
        this.nextNodeOfMultiType = selectedNode.type;
        this.nextNodeOfMultiID = selectedNode.id;
        console.log(this.nextNodeOfMultiType);
        return selectedNode.type;
      }
    }

    return '';
  }





  // getSelectedTrueFalseWireType(): string {

  //   if (this.tureFalseNodeWires) {
  //     const selectedIndex = this.multiSelectEnNodeAnswers.indexOf(selectedRule);
  //     const selectedIndex = this.multiSelectEnNodeAnswers.indexOf(selectedRule);
  //     const selectedWireID = this.tureFalseNodeWiresArray[selectedIndex];

  //     // Find the node with the selectedWireID in the nodes array
  //     const selectedNode: IChatbotNode | undefined = this.flowsArray.find(node => node.id === selectedWireID);

  //     if (selectedNode) {
  //       this.nextNodeOfMultiType = selectedNode.type;
  //       this.nextNodeOfMultiID = selectedNode.id;
  //       console.log(this.nextNodeOfMultiType);
  //       return selectedNode.type;
  //     }
  //   }

  //   return '';
  // }





  updateValueFromEvent(newValue: number): number {
    this.scoreValue = newValue;
    console.log(this.scoreValue);
    // this.userInformation.scoreValue = this.scoreValue;
    return this.scoreValue;

  }








  updateMessage() {
    this.isAnswerEmpty = !this.descriptiveFaNodeQuestion.answer || this.descriptiveFaNodeQuestion.answer.trim() === '';
  }


  answerValidator() {
    if (this.descriptiveRequired) {
      alert('پاسخگویی به این سوال الزامی است. لطفا کادر پاسخ را پر کنید');
      return;
    }
    if (this.disableMultiSelectEnRequired) {
      alert('انتخاب یکی از گزینه ها الزامی می باشد');
      return;
    }
  }


  // Custom validator function for checking email format with a period in the domain part
  emailFormatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValid = emailRegex.test(control.value);
      return isValid ? null : { emailFormat: true };
    };
  }

  // passwordFormatValidator(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     const value: string = control.value;

  //     // Define regular expressions for each character type
  //     const hasUppercase = /[A-Z]/.test(value);
  //     const hasLowercase = /[a-z]/.test(value);
  //     const hasDigit = /\d/.test(value);
  //     const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value);
  //     const minLen = value.length >= 8;

  //     // Check if the password meets the complexity criteria
  //     const isValid =
  //       hasUppercase && hasLowercase && hasDigit && hasSpecialChar && minLen;

  //     return isValid ? null : { passwordComplexity: true };
  //   }
  // }

  passwordFormatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const phoneRegex = /^[a-zA-Z0-9.!@#$%^&*()_+{}\[\]:;<>,?~\\-]{8,15}$/;
      const isValid = phoneRegex.test(control.value);
      return isValid ? null : { passwordComplexity: true };
    };
  }
  phoneNumberFormatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const phoneRegex = /^[0-9]{11}$/;
      const isValid = phoneRegex.test(control.value);
      return isValid ? null : { phoneNumberFormat: true };
    };
  }
  numberFormatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const phoneRegex = /^[0-9]{0,11}$/;
      const isValid = phoneRegex.test(control.value);
      return isValid ? null : { numberFormat: true };
    };
  }



  addressFormatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // Define your address format regex here (modify as needed)
      const addressRegex = /^[\u0600-\u06FF\s\.,'-]+$/;
      const isValid = addressRegex.test(control.value);
      return isValid ? null : { addressFormat: true };
    };
  }

  addressMultiFormatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // Define your address format regex here (modify as needed)
      const addressRegex = /^[\u0600-\u06FF0-9\s\.,'-]+$/;
      const isValid = addressRegex.test(control.value);
      return isValid ? null : { addressMultiFormat: true };
    };
  }



  nameFormatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // Define your address format regex here (modify as needed)
      const nameRegex = /^[\u0600-\u06FF\s\.,'-]+$/;
      const isValid = nameRegex.test(control.value);
      return isValid ? null : { nameFormat: true };
    };
  }




  selectedFile: File | undefined;



  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {

    if (!this.selectedFile) {
      return;
    }

    this.authService.createFile('123456789', this.selectedFile);

    // const formData: FormData = new FormData();
    // formData.append('file', this.selectedFile, this.selectedFile.name);

    // const data = { "bucketId": '123456789', "fileID": '11112222', "file": this.selectedFile }


    // // const apiUrl = 'https://file-upload-api.free.beeceptor.com';
    // const apiUrl = 'http://192.168.100.217:5000/api/files/createFile';



    // this.http.post(apiUrl, data).subscribe({
    //   next: (response) => {
    //     console.log('File uploaded successfully:', response);
    //   },
    //   error: (error) => {
    //     console.error('Error uploading file:', error);
    //   },
    // });

  }




  sendRequest(method, serverUrl, endpoint, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
        var res = this.responseText;
        callback(JSON.parse(res))
      }
      else
        callback(null)
    });
    xhr.open(method, serverUrl + endpoint);
    //   xhr.setRequestHeader("x-auth-token", token);
    //   xhr.setRequestHeader("x-user-id", userId);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));

  }


  // onFileSelectedNew(input: HTMLInputElement): void {
  //   const file = input?.files?.[0];

  //   if (file) {
  //     // Log file details
  //     console.log('File Name:', file.name);
  //     console.log('File Size:', file.size, 'bytes');
  //     console.log('File Type:', file.type);
  //     console.log('File Type:', file);

  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.profileImageUrl = reader.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }



  waiting() {
    this.openDelay = !this.openDelay
    console.log(this.openDelay)
  }


  enableButtonAfterDelay(): void {
    this.countdown = Math.ceil(this.mainUnit / 1000); // Reset countdown when button is clicked

    const countdownInterval = setInterval(() => {
      this.countdown = this.countdown - 1;

      if (this.countdown === 0) {
        console.log("You can go tne next step")
        this.openDelay = false
        clearInterval(countdownInterval);
      }
    }, 1000);
  }


  getUserInformationAsJson(): string {
    // console.log(this.userInformation)
    this.resultUser.push({
      label: "score",
      score: this.totalScore
    })
    this.resultUser.push({
      label: "end",
      text: this.endNodepayload
    })

    console.log("Result", this.resultUser)
    this.botId = this.chatbotDataService.bitIdInMenu;
    console.log(this.botId)
    this.authService.saveChatInfo(this.botId, this.resultUser);

    this.lastObject = this.authService.lastObject;
    console.log("lastObject :", this.lastObject);

    this.botFile = this.authService.botFileList

    // this.botNameOfList = this.lastObject.chatJSONFile



    //save resultUser in database *******
    // this.router.navigate(['/sidebar']);
    this.router.navigate(['/management']);
    return JSON.stringify(this.resultUser, null, 2);

  }

  onTimeChange(event: Event) {
    const selectedTime = (event.target as HTMLInputElement).value;

    // Parse the input time
    const parsedTime = new Date(`2000-01-01T${selectedTime}`);

    // Determine if it's AM or PM based on the hours
    this.period = parsedTime.getHours() >= 12 ? 'بعد از ظهر' : 'قبل از ظهر';

    console.log('Selected time:', selectedTime);
    console.log('Period:', this.period);
    // this.userInformation.appointmentValueOne = this.appointmentValueOne
    // this.userInformation.appointmentValueTwo = this.appointmentValueTwo
    // this.userInformation.appointmentValueTwoPeriod = this.period
  }

  // convertToJalali(gregorianDate: string): string {
  //   const gregorianMoment = jalaliMoment(gregorianDate, 'YYYY-MM-DD');
  //   const jalaliDate = gregorianMoment.format('jYYYY-jMM-jDD');  // Convert to Jalali format
  //   return jalaliDate;
  // }

  convertToJalali(gregorianDate: string): string {
    if (!gregorianDate) {
      return '';
    }

    const gregorianMoment = jalaliMoment(gregorianDate, 'YYYY-MM-DD');

    // Check if the Gregorian date is valid
    if (!gregorianMoment.isValid()) {
      console.error('Invalid Gregorian date:', gregorianDate);
      return '';
    }

    try {
      const jalaliDate = gregorianMoment.format('jYYYY-jMM-jDD');  // Convert to Jalali format
      return jalaliDate;
    } catch (error) {
      console.error('Error converting to Jalali:', error);
      return '';
    }
  }



  getUserMultiValue(mulitValue: any) {
    this.UserFormMultiValue = mulitValue;
    //this.userInformation.UserFormMultiValue = this.UserFormMultiValue
  }

  getEmailValue(emailValue: string, itemId: any) {
    const uniqueName = `UserFormTimeValue_${itemId}`;

    console.log(emailValue);
    console.log(itemId);

    this.resultUser.push({
      label: itemId.label,
      value: emailValue
    });

    console.log(this.resultUser);
  }

  getNumberValue(numberValue: string, itemId: any) {
    const uniqueName = `UserFormTimeValue_${itemId}`;

    console.log(numberValue);
    console.log(itemId);

    this.resultUser.push({
      label: itemId.label,
      value: numberValue
    });

    console.log(this.resultUser);
  }

  getPassValue(passValue: string, itemId: any) {
    const uniqueName = `UserFormTimeValue_${itemId}`;

    console.log(passValue);
    console.log(itemId);

    this.resultUser.push({
      label: itemId.label,
      value: passValue
    });

    console.log(this.resultUser);
  }

  // getDateValue(dateValue: string, itemId: any) {
  //   const uniqueName = `UserFormTimeValue_${itemId}`;

  //   console.log(dateValue);
  //   console.log(itemId);

  //   this.resultUser.push({
  //     label: itemId.label,
  //     value: dateValue
  //   });

  //   console.log(this.resultUser);
  // }


  getDateValue(dateValue: string, itemId: any) {
    // Check if the email field is valid
    const emailField = this.reactiveForm.get('personalDetails.userEmail');
    if (emailField.valid) {
      const uniqueName = `UserFormTimeValue_${itemId}`;

      console.log(dateValue);
      console.log(itemId);

      this.resultUser.push({
        label: itemId.label,
        value: dateValue
      });

      console.log(this.resultUser);
    } else {
      console.log('Email is not valid. getDateValue function will not be executed.');
    }
  }

  getTimeValue(timeValue: string, itemId: any) {
    const uniqueName = `UserFormTimeValue_${itemId}`;

    console.log(timeValue);
    console.log(itemId);

    this.resultUser.push({
      label: itemId.label,
      value: timeValue
    });

    console.log(this.resultUser);
  }

  getUserNameValue(textValue: string, itemId: any) {

    const uniqueName = `UserFormNameValue_${itemId}`;

    console.log(textValue);
    console.log(itemId);

    this.resultUser.push({
      label: itemId.label,
      value: textValue
    })
    console.log(this.resultUser)
  }

  getMultiValue(multiValue: string, itemId: any) {

    const uniqueName = `UserFormNameValue_${itemId}`;

    console.log(multiValue);
    console.log(itemId);

    this.resultUser.push({
      label: itemId.label,
      value: multiValue
    })
    console.log(this.resultUser)
  }




  addResultUser(id: string, type: string, question: string, answerOne: any, answerTwo?: any, answerThree?: any, answerFour?: any) {
    const item = this.resultUser.find(item => item.id === id);
    // const answer = answerTwo !== undefined ? { answerOne, answerTwo } : { answerOne };

    const answer = {
      answerOne,
      ...(answerTwo !== undefined && { answerTwo }),
      ...(answerThree !== undefined && { answerThree }),
      ...(answerFour !== undefined && { answerFour }),
    };

    const itemOfProperty = this.flowsArray.find(item => item.id === id);
    if (itemOfProperty.property) {
      console.log(`property of ${itemOfProperty.id} is: ` + itemOfProperty.properties)

      console.log(this.resultUser)
      if (item) {
        item.answer = answerOne;
        item.propertyValue = answerOne;
      } else {
        this.resultUser.push({
          id: id,
          // type: type,
          label: type,
          question: question,
          answer: answerOne,
          propertyKey: itemOfProperty.properties,
          propertyValue: answerOne

        });
      }
      const property = this.resultUser.find(item => item.label === 'property');
      if (property) {
        this.resultUser.forEach(element => {
          if (element.label == "property") {
            element.property.push({ key: itemOfProperty.properties, value: answerOne })
          }
        })

      }
      else {
        this.resultUser.push({
          label: "property",
          property: [{ key: itemOfProperty.properties, value: answerOne }]
        })
      }
    }
    else {
      if (item) {
        item.answer = answer;
      } else {
        this.resultUser.push({
          id: id,
          // type: type,
          label: type,
          question: question,
          answer: answer,

        });
      }
    }


    console.log(this.resultUser);

  }


  doNotShowPhoto() {
    this.showPhotoInForm = !this.showPhotoInForm
  }


  onFileSelectedNew(fileInput: any) {
    const file: File = fileInput.files[0];

    if (file) {
      // Determine the file type based on the file extension
      const fileType = this.getFileType(file.name);
      this.authService.createFile("651134e7bb7d7d3c4fe1", file)
        .then((response) => {



          console.log("file uploaded ", response)
          this.resultUser.push({
            label: "file_upload",
            fileId: response.$id,
            bucketId: response.bucketId,
            src: this.authService.endpoint + "/storage/buckets/" + response.bucketId + "/files/" + response.$id + "/view?project=" + this.authService.project + "&mode=admin"
          });
        })
        .catch((error) => {
          console.error('Error in file upload', error);
        });

      // Set the appropriate variables based on the file type
      switch (fileType) {
        case 'image':
          this.fileType = 'image';
          this.profileImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
          break;
        case 'video':
          this.fileType = 'video';
          this.profileImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
          break;
        case 'audio':
          this.fileType = 'audio';
          this.profileImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
          break;
        default:
          // Handle other file types or show an error message
          break;
      }
    }
  }

  // Function to get the file type based on the file extension
  getFileType(fileName: string): string {
    const extension = fileName.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
      return 'image';
    } else if (['mp4', 'mkv', 'avi'].includes(extension)) {
      return 'video';
    } else if (['mp3', 'wav', 'ogg'].includes(extension)) {
      return 'audio';
    } else {
      // Handle other file types
      return 'unknown';
    }
  }




  errorCorrectionValidate() {

    let botId = this.authService.botIdWhenHasError;
    let flowId = this.authService.flowIdWhenHasError


    this.botService.navigateDesignBotForValidate(botId)

  }

  doNotImportantValidate() {
    this.openDialog = !this.openDialog
  }







}
