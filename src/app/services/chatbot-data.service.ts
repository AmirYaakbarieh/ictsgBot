import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IChatbotNode } from 'src/models/chatbot-node.models';

@Injectable({
  providedIn: 'root'
})
export class ChatbotDataService {

  bitIdInMenu: any;
  bitIdInMenuName: string;

  public mainJson = 'http://192.168.100.16:1880/flows'
  // public mainJson = 'http://127.0.0.1:1880/flow/c200adc6f8f7d02f'

  private chatbotstart = 'assets/chatbot-data.json';
  private chatbotDescriptive = 'assets/chatbot-descriptive.json';
  private chatbotend = 'assets/chatbot-end.json';
  private chatbotAppointment = 'assets/chatbot-appointment.json';
  public chatbotNodes = 'assets/chatbot-node.model.json'

  constructor(private http: HttpClient) { }

  getChatbotStart() {
    return this.http.get<any[]>(this.chatbotstart);
  }

  getChatbotDescriptive() {
    return this.http.get<any[]>(this.chatbotDescriptive);
  }

  getChatbotEnd(){
    return this.http.get<any[]>(this.chatbotend);
  }
  
  getchatbotAppointment(){
    return this.http.get<any[]>(this.chatbotAppointment);
  }

  getChatbotNodes(){
    return this.http.get<any[]>(this.chatbotNodes);
  }


  getFlowsJson() {
    // const url = `${this.baseUrl}/flows`;
  //  return this.http.get<any[]>(this.mainJson);

  }


  findNextNodes(nodeId: string, flowsArray: IChatbotNode[]): { type: string; id: string; }[] {
    const node = flowsArray.find(node => node.id === nodeId);
    const nextNodes: { id: string; type: string }[] = [];

    if (node && node.wires) {
      for (const subArray of node.wires) {
        for (const nextNodeId of subArray) {
          const nextNode = flowsArray.find(node => node.id === nextNodeId);
          if (nextNode) {
            nextNodes.push({ type: nextNode.type, id: nextNode.id });
          }
        }
      }
    }

    return nextNodes;
  }


}
