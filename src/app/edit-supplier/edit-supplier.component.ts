import { Component } from '@angular/core';
import { Supplier } from '../model/Supplier';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SupplierService } from '../Services/supplier.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css']
})
export class EditSupplierComponent {

  id: any;
  supplier: Supplier;
  showSuccessMessage=false;
  errorMessage='';
  
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supplierService: SupplierService,private authService: AuthService
  ) {
    this.supplier = new Supplier(0, '', '', '', '', '',''); // Initialize with default values
  }

  ngOnInit(): void {
    this.loadSuppliers();
  }


  logout() {
    this.authService.logout();
  }

  loadSuppliers(){
    // Retrieve the supplier ID from the route parameters
    const id = this.route.snapshot.paramMap.get('id');
  
    
      if (id !== null) {
      const supplierId = +id;
  
      // Fetch the supplier details by ID
      this.supplierService.getSupplierById(supplierId).subscribe(
        (response) => {
          this.supplier = response;
          
        },
        (error) => {
          console.error('Error fetching supplier details:', error);
        }
      );
    } else {
      console.error('Supplier ID is null. Handle this case accordingly.');
    }
  }
  

  updateSupplier() {
    this.supplierService.updateSupplier(this.supplier.id,this.supplier).subscribe(
      (response) => {
        // Handle supplier update success
        console.log('Supplier updated successfully:', response);
        this.showSuccessMessage=true;
        // Optionally, navigate back to the supplier list
        this.router.navigate(['/suppliers']);
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating asset:', error);
        // Display a user-friendly error message
        this.errorMessage = 'Failed to update asset. Please try again later.';
      }
    );

  }

}

  
