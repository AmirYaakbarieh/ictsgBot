import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client, Account, ID, Storage, Functions, AppwriteException } from 'appwrite';
import { BehaviorSubject, Observable, Subject, catchError, throwError } from 'rxjs';
import { editORGInfo, editUserInfo, getUser, getUserInfo, listChatsOfBot, saveChatInfo, saveFile, singupModel } from 'src/models/chatbot-node.models';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = false;
  private client: Client;
  private account: Account;
  public storage: Storage;
  // public currentSessionId: string; // Store the current session ID
  public currentSessionId: string = ''; // Store the current session ID

  public userName: string;

  private functions: Functions

  private _userName: string;

  public serverUrl: string = 'http://192.168.100.217:5000'

  public userId: string = '';

  showPhotoInForm: boolean = true;

  botInformation: boolean = false;

  params: singupModel;


  paramsOfUsers: editUserInfo;

  editORG: editORGInfo;

  getUserDate: getUser;

  getUserInfoDate: getUserInfo;

  saveInputFileOfPhotos: saveFile;

  saveChatInfoOfCustomer: saveChatInfo;

  listChat: listChatsOfBot;

  lastObject: any;

  botFileList: any;

  botFileOfList: object

  botNameOfList: string;


  profilePicURL: string;

  logoPicURL: string;

  profilePicURLforMenu: string;

  logoPicURLforMenu: string;


  orgAddress: string

  paramsJSON: JSON;
  paramsJSONOfuser: JSON;
  paramsJSONOfORG: JSON;
  paramsJSONOfInfo: JSON;
  paramsJSONOfList: JSON;
  jsonArray: any;
  openDialog: boolean;
  botIdWhenHasError: string;
  flowIdWhenHasError: any;

  validationErrors: string[] = []

  endpoint: string = 'http://94.101.184.216/v1';

  project: string = '65d048cd51e4953221c7'


  nameOfUser: any;
  emailOfUser: any;
  passwordOfUser: any;
  phoneNumberOfUser: any = ""

  errorOfResponse: boolean = false;

  private selectedImageSource = new BehaviorSubject<string | null>(null);
  selectedImage$ = this.selectedImageSource.asObservable();

  private selectedImageSourceLogo = new BehaviorSubject<string | null>(null);
  selectedImageLogo$ = this.selectedImageSourceLogo.asObservable();

  constructor(private http: HttpClient, private sharedService: LanguageService) {
    this.client = new Client();

    this.storage = new Storage(this.client);
    this.account = new Account(this.client);
    this.client
      .setEndpoint(this.endpoint)
      .setProject(this.project);

    this.functions = new Functions(this.client)
  }


  setSelectedImage(imagePath: string): void {
    this.selectedImageSource.next(imagePath);
  }

  setSelectedImageLogo(imagePathLogo: string): void {
    this.selectedImageSourceLogo.next(imagePathLogo);
  }

  register(name: string, email: string, password: string): Promise<any> {

    const promise = this.account.create(ID.unique(), email, password, name);

    return promise.then(() => {
      console.log('User registered successfully');
      this.userName = name;
      console.log(this.userName)
      return promise;


    }).catch((error) => {
      console.log('Registration failed:', error);
      return false;
    });
  }


  singup(userName: string, useremail: string, userPassword: string, userPhone: number, type: string): Promise<any> {

    this.params = {
      path: '/singup',
      data: {
        name: userName,
        email: useremail,
        password: userPassword,
        phone: userPhone,
        type: type
      }
    };
    this.paramsJSON = JSON.parse(JSON.stringify(this.params));
    return this.executeFunction("656335e7c56159d871be", this.paramsJSON, '/singup', 'POST', false)
      .then((response) => {
        console.log("response: ", response)
        return response
      })
      .catch((error) => {
        console.error('error of response:', error);
        return false
      });
  }


  editUser(userId: string, fullNameOfUser: string, userName: string, cityOfUser: string, streetOfUser: string, addressOfUser: string, postcodeOfUser: string, type: string): Promise<any> {

    this.paramsOfUsers = {
      path: '/editUserInfo',
      data: {
        userId: userId,
        editdata: {
          fullName: fullNameOfUser,
          username: userName,
          city: cityOfUser,
          street: streetOfUser,
          address: addressOfUser,
          postcode: postcodeOfUser,
          type: type
        }
      }
    };
    this.paramsJSON = JSON.parse(JSON.stringify(this.paramsOfUsers));
    return this.executeFunction("656335e7c56159d871be", this.paramsJSON, '/editUserInfo', 'POST', false)
      .then((response) => {
        console.log("response: ", response)
        return response
      })
      .catch((error) => {
        console.error('error of response:', error);
        return false
      });
  }


  editORGInfo(ORGIdInfo: string, nameOfOrg: string, websiteOfOrg: string, emailOfOrg: string, phoneOfOrg: string, addressOfOrg: string, memberCountOfOrg: number, activityZoneOfOrg: string): Promise<any> {

    this.editORG = {
      path: '/editORGInfo',
      data: {
        orgId: ORGIdInfo,
        editdata: {
          name: nameOfOrg,
          website: websiteOfOrg,
          email: emailOfOrg,
          phone: phoneOfOrg,
          address: addressOfOrg,
          memberCount: memberCountOfOrg,
          activityZone: activityZoneOfOrg
        }
      }
    };
    this.paramsJSON = JSON.parse(JSON.stringify(this.editORG));
    return this.executeFunction("656335e7c56159d871be", this.paramsJSON, '/editORGInfo', 'POST', false)
      .then((response) => {
        console.log("response: ", response)
        return response
      })
      .catch((error) => {
        console.error('error of response:', error);
        return false
      });

  }

  saveInputFile(id: string, usageType: string, userId: string): Promise<any> {
    this.saveInputFileOfPhotos = {
      path: '/save',
      data: {
        fileId: id,
        usage: usageType,
        IDS: { userId: userId }
      }
    };
    this.paramsJSON = JSON.parse(JSON.stringify(this.saveInputFileOfPhotos));
    return this.executeFunction("656c3c9f89a7cfb3c5ba", this.paramsJSON, '/save', 'POST', false)
      .then((response) => {
        console.log("response: ", response);
        this.profilePicURL = response.profilePic.url;
        // this.logoPicURL = response.organizationId.logoPic;
        console.log(this.logoPicURL)
        return response
      })
      .catch((error) => {
        console.error('error of response:', error);
        return false
      });
  }

  saveChatInfo(id: string, chatJSON: any): Promise<any> {
    this.saveChatInfoOfCustomer = {
      path: '/create',
      data: {
        botId: id,
        chatJSONFile: JSON.stringify(chatJSON),
      }
    };
    this.paramsJSONOfInfo = JSON.parse(JSON.stringify(this.saveChatInfoOfCustomer));
    return this.executeFunction("656335651ddc61dccd3b", this.paramsJSONOfInfo, '/create', 'POST', false)
      .then((response) => {
        console.log("response of save chat Info: ", response);
        return response;
      })
      .catch((error) => {
        console.error('error of response:', error);
        return false
      });
  }

  listChatsOfBot(id: string, cusId: string): Promise<any> {
    this.listChat = {
      path: '/list',
      data: {
        botId: id,
        customerId: cusId
      }
    };
    this.paramsJSONOfList = JSON.parse(JSON.stringify(this.listChat));
    console.log(this.paramsJSONOfList)
    return this.executeFunction("656335651ddc61dccd3b", this.paramsJSONOfList, '/list', 'POST', false)
      .then((response) => {
        console.log("response of List : ", response);
        this.lastObject = response.documents[response.documents.length - 1];
        // console.log(this.lastObject);

        this.botFileList = this.lastObject.bots;
        // console.log("botFile : ", this.botFileList);


        this.botNameOfList = this.botFileList.botName;
        console.log(this.botNameOfList)

        this.botFileOfList = this.botFileList.botFile;
        // console.log(this.botFileOfList);



        // if (typeof this.botFileOfList === 'string') {
        //   this.jsonArray = JSON.parse(this.botFileOfList);


        //   this.jsonArray.forEach((element, index) => {
        //     console.log(`Element ${index + 1}:`, element);
        //     console.log(`ID of Element ${index + 1}:`, element.id);
        //     console.log(`Type of Element ${index + 1}:`, element.type);
        //     console.log(`Payload of Element ${index + 1}:`, element.payload);
        //     console.log(`Appointment Question of Element ${index + 1}:`, element.appointmentQuestion);
        //   });
        // } else {
        //   console.error('botFileOfList is not a string.');
        // }

        this.errorOfResponse = false;
        return response;
      })
      .catch((error) => {
        // this.errorOfResponse = true;
        console.error('error of response:', this.errorOfResponse = true);
        return false
      });
  }

  saveInputFileLogo(id: string, usageType: string, organizationId: string): Promise<any> {
    this.saveInputFileOfPhotos = {
      path: '/save',
      data: {
        fileId: id,
        usage: usageType,
        IDS: { orgId: organizationId }
      }
    };
    this.paramsJSON = JSON.parse(JSON.stringify(this.saveInputFileOfPhotos));
    return this.executeFunction("656c3c9f89a7cfb3c5ba", this.paramsJSON, '/save', 'POST', false)
      .then((response) => {
        console.log("response: ", response);
        // this.profilePicURL = response.profilePic.url;
        this.logoPicURL = response.logoPic;
        console.log(this.logoPicURL)
        return response
      })
      .catch((error) => {
        console.error('error of response:', error);
        return false
      });
  }

  getUser(userId: string): Promise<any> {
    this.getUserDate = {
      path: '/getUser',
      data: {
        userId: userId
      }
    };
    this.paramsJSON = JSON.parse(JSON.stringify(this.getUserDate));
    return this.executeFunction("656335e7c56159d871be", this.paramsJSON, '/getUser', 'POST', false)
      .then((response) => {
        console.log("response: ", response);
        console.log(response.email)
        console.log(response.name)
        console.log(response.phone)
        return response
      })
      .catch((error) => {
        console.error('error of response:', error);
        return false
      });
  }

  getUserInfo(userId: string): Promise<any> {
    this.getUserInfoDate = {
      path: '/getUserInfo',
      data: {
        userId: userId
      }
    };
    this.paramsJSON = JSON.parse(JSON.stringify(this.getUserInfoDate));
    return this.executeFunction("656335e7c56159d871be", this.paramsJSON, '/getUserInfo', 'POST', false)
      .then((response) => {
        console.log("response: ", response);
        if (response.profilePic != null) {
          this.profilePicURLforMenu = response.profilePic.url;
          console.log(this.profilePicURLforMenu);
        }
        if (response.organizationId.logoPic != null) {
          this.logoPicURLforMenu = response.organizationId.logoPic.url;
          console.log(this.logoPicURLforMenu);
        }


        // Pass data to the shared service
        this.sharedService.setProfilePicURL(this.profilePicURLforMenu);
        this.sharedService.setLogoPicURL(this.logoPicURLforMenu);

        return response
      })
      .catch((error) => {
        console.error('error of response:', error);
        return false
      });
  }


  // getUserInfo(userId: string): Promise<any> {
  //   this.getUserInfoDate = {
  //     path: '/getUserInfo',
  //     data: {
  //       userId: userId
  //     }
  //   };
  //   this.paramsJSON = JSON.parse(JSON.stringify(this.getUserInfoDate));
  //   return this.executeFunction("656335e7c56159d871be", this.paramsJSON, '/getUserInfo', 'POST', false)
  //     .then((response) => {
  //       console.log("response: ", response);
  //       this.profilePicURLforMenu = response.profilePic.url;
  //       console.log(this.profilePicURLforMenu);
  //       this.logoPicURLforMenu = response.organizationId.logoPic.url;
  //       console.log(this.logoPicURLforMenu);

  //       // Pass data to the shared service
  //       this.sharedService.setProfilePicURL(this.profilePicURLforMenu);
  //       this.sharedService.setLogoPicURL(this.logoPicURLforMenu);

  //       return response
  //     })
  //     .catch((error) => {
  //       console.error('error of response:', error);
  //       return false
  //     });
  // }





  updateUserEmail(email: string, password: string): Promise<any> {

    const promise = this.account.updateEmail(email, password);
    console.log(email)
    return promise.then((response) => {
      console.log('Upload Email successfully');
      console.log(response)
      return promise;


    }).catch((error) => {
      console.log('upload Email failed:', error);
      return false;
    });
  }


  updateUserName(name: string): Promise<any> {

    const promise = this.account.updateName(name);
    return promise.then((response) => {
      console.log('Upload Name successfully');
      console.log(response)
      return promise;


    }).catch((error) => {
      console.log('upload Name failed:', error);
      return false;
    });
  }


  updatePhoneNumber(phone: string, password: string): Promise<any> {

    const promise = this.account.updatePhone(phone, password);
    return promise.then((response) => {
      console.log('Upload Phone Number successfully');
      console.log(response)
      return promise;


    }).catch((error) => {
      console.log('upload Phone Number failed:', error);
      alert('شماره تلفن توسط شما یا کاربری دیگر ثبت شده است')
      return false;
    });
  }


  // updatePhoneNumber(phone: string, password: string): Observable<any> {
  //   const endpoint = 'your-api-endpoint'; // Replace with your actual API endpoint

  //   return this.http.post(endpoint, { phone, password }).pipe(
  //     catchError((error) => {
  //       if (error instanceof AppwriteException) {
  //         // Handle Appwrite specific exception
  //         console.log('Appwrite Exception:', error);
  //         // Do something specific for Appwrite exception
  //       } else {
  //         // Handle any other errors
  //         console.log('Unexpected Error:', error);
  //       }

  //       return throwError(error); // Rethrow the error to propagate it to the component
  //     })
  //   );
  // }


  createFile(bucketId: string, file: any): Promise<any> {

    const promise = this.storage.createFile(bucketId, ID.unique(), file);
    return promise.then(() => {
      console.log('File uploaded successfully');
      return promise;


    }).catch((error) => {
      console.log('File uploading is failed:', error);
      return false;
    });
  }



  // functionId: 656335e7c56159d871be
  // input: {“path”: “/singup”, “data”:{ “name”: “test10”, “email”:”test10@gmail.com”, “password”:”12345678”, “phone”:null, “type”:”manager”}}

  login(email: string, password: string): Promise<boolean> {

    const promise = this.account.createEmailSession(email, password);
    // const promise = this.account.createJWT(email, password);

    return promise.then((response) => {
      // const token = response.jwt;
      // // Save the token to local storage or cookie for future use
      // this.client.setJWT(token);
      this.isLoggedIn = true;
      console.log('Login successful:', response);
      this.userId = response.userId;
      console.log(this.nameOfUser)
      this.currentSessionId = response.$id;
      console.log('User Id is: ' + this.userId);
      console.log('$id Id is: ' + this.currentSessionId);
      console.log(this.isLoggedIn);
      console.log(this.currentSessionId);



      const promiseOne = this.account.get();
      const $this = this
      promiseOne.then(function (response1) {
        console.log(response1); // Success
        // this.nameOfUser = response.name;
        // console.log(this.nameOfUser)
        console.log(response1.name);
        console.log(response1.email);
        console.log(response1.phone);
        $this.nameOfUser = response1.name;
        $this.emailOfUser = response1.email;
        $this.passwordOfUser = password;
        if (response1.phone) {
          $this.phoneNumberOfUser = response1.phone;
        }
        if (!response1.phone) {
          $this.phoneNumberOfUser = '';
        }
        // console.log($this.passwordOfUser)
        // console.log($this.nameOfUser)
        // console.log($this.emailOfUser)
      }, function (error) {
        console.log(error); // Failure
      });
      this.nameOfUser = $this.nameOfUser;
      this.emailOfUser = $this.emailOfUser;
      return true;
    }).catch((error) => {
      console.log('Login failed:', error);
      return false;
    });


  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }


  async logout(): Promise<void> {
    try {
      if (this.currentSessionId) {
        await this.account.deleteSession(this.currentSessionId);
      }
      this.isLoggedIn = false;
      console.log(this.isLoggedIn);
      this.sharedService.clearProfileData();
      console.log(" you are Log out Now")
    } catch (error) {
      console.log('Logout failed:', error);
    }
  }


  sendRequest(method: string, serverUrl: string, endpoint: string, data: object): Promise<any> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            const res = xhr.responseText;
            const parsedResponse = JSON.parse(res);
            resolve(parsedResponse);  // Resolve with parsed response
          } else {
            reject(new Error(`Request failed with status ${xhr.status}`));
          }
        }
      });

      xhr.open(method, serverUrl + endpoint);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(data));
    });
  }


  sendRequestOne(method: string, serverUrl: string, endpoint: string, data: object): Promise<any> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            const res = xhr.responseText;
            let jsonObject = "";
            if (res === "")
              jsonObject = ""
            else
              jsonObject = JSON.parse(res);

            resolve(jsonObject);
          } else {
            reject(new Error(`Request failed with status ${xhr.status}`));
          }
        }
      });

      xhr.open(method, serverUrl + endpoint);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(data));
    });
  }


  executeFunction(id: string, data: JSON, path: string, method: string, async: boolean): Promise<any> {
    return new Promise(async (resolve, reject) => {

      const execution = await this.functions.createExecution(
        id,
        JSON.stringify(data),
        async,
        path,
        method,
        { 'content-type': 'application/x-www-form-urlencoded' }
      )

      console.log(execution)
      if (JSON.parse(execution.responseBody)) {
        const jsonObject = JSON.parse(execution.responseBody);
        resolve(jsonObject);
      }
      else {
        reject(new Error(`Request failed with status`));
      }

    })

  }

  doNotShowPhoto() {
    this.showPhotoInForm = !this.showPhotoInForm
  }



}
