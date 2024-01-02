import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier } from '../model/Supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

   Url: string = 'http://localhost:5010'; 

  constructor(private http: HttpClient) {}

  getSupplierById(id: any): Observable<Supplier> {
    const url = `${this.Url}/suppliers/${id}`;
    return this.http.get<Supplier>(url); 
  }

  getSupplierEmail(assetName: string): Observable<string> {
    const url = `${this.Url}/suppliers/email?assetName=${assetName}`; // Adjust the endpoint as per your backend API
    return this.http.get<string>(url);
  }

  // Get a list of all suppliers
  getAllSuppliers(): Observable<Supplier[]> 
  {
    return this.http.get<Supplier[]>(`${this.Url}/suppliers`);
  }

  // Add a new supplier
  addSupplier(supplier: Supplier): Observable<Supplier> 
  {
    return this.http.post<Supplier>(`${this.Url}/suppliers`, supplier);
  }

  updateSupplier(id: number, updatedSupplier: Supplier): Observable<boolean> 
  {
    // Make an HTTP PUT request to update the supplier with the given ID
    return this.http.put<boolean>(`${this.Url}/suppliers/id/${id}`, updatedSupplier);
  }
  

  // Delete a supplier by ID
  deleteSupplier(id: number): Observable<boolean> 
  {
    // Implement your delete logic here using an HTTP DELETE request
    return this.http.delete<boolean>(`${this.Url}/suppliers/${id}`);
  }
  
}
