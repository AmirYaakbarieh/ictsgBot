import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor(private http: HttpClient) { }

  private flowid: string;

  fetchDataFromNodeRed(): Observable<any> {
    const url = 'http://127.0.0.1:1880/some-jsonp-endpoint'; //  Node-RED JSONP endpoint

    // Construct HttpParams if needed
    const params = new URLSearchParams();
    params.set('param1', 'value1');

    // Use the "JSONP" response type to make a JSONP request
    return this.http.jsonp(url, 'callback');
  }

  setFlowId(flowid: string) {
    this.flowid = flowid;
    console.log(this.flowid)
  }

  getFlowId() {
    return this.flowid;
  }
}
