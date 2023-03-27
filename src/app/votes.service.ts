import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApiResult {
        gameplay: number;
        music: number;
        design: number;
        story: number;
        difficulty: number;
        overallScore: number;
}

@Injectable({
  providedIn: 'root'
})
export class VotesService {
  url = 'http://localhost:3000';
  
constructor(private http: HttpClient) {

}
teamId=3

getTeamOverAll(teamId: number): Observable<ApiResult>{
  return this.http.get<ApiResult>(`${this.url}/api/getTeamOverall/${this.teamId}`)
}

getVotesByTeam(teamId: any): Observable < any > {
  return this.http.get(`${this.url}/getTeamOverall/${teamId}`);
}

createVote(data:any): Observable < any > {
  return this.http.post(`${this.url}/vote`, data);
}
}
