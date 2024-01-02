import { Injectable } from '@angular/core';
import { Asset } from '../model/Asset';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Supplier } from '../model/Supplier';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  // private assets: Asset[] = [];

  url: string = 'http://localhost:5010';
  


  constructor(private http: HttpClient) {}

  addAsset(asset: Asset[] | Asset): Observable<Asset | Asset[]> 
  {
    if (Array.isArray(asset))
    {
      return this.http.post<Asset[]>(`${this.url}/assets`, asset);
    } 
    else 
    {
      return this.http.post<Asset>(`${this.url}/assets`, asset);
    }
  }

  getAllAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>(`${this.url}/assets`);
  }

  getAssetById(assetId: string): Observable<Asset> {
    const Url = `${this.url}/assets/id/${assetId}`;
    return this.http.get<Asset>(Url); 
  // console.log(asset)
 }

  // Add a function to update an asset
  editAsset(assetId: string, updatedAsset: Asset): Observable<Asset> {
    return this.http.put<Asset>(`${this.url}/assets/${assetId}`, updatedAsset);
  }

  // Add a function to delete an asset
  deleteAsset(assetId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/assets/${assetId}`);
  }
 
  searchAssets(assetName: string, query: string): Observable<Asset[]> {
    // Construct the URL with query parameters
    const searchUrl = `${this.url}/assets/search?assetName=${assetName}&query=${query}`;

    return this.http.get<Asset[]>(searchUrl);
  }

  // sendEmail(emailEndpoint: string, emailData: any): Observable<any> {
    
  //   return this.http.post(emailEndpoint, emailData);
  // }
 }
 
