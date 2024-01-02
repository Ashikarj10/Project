import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Supplier } from '../model/Supplier';
import { SupplierService } from '../Services/supplier.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-supplier-info',
  templateUrl: './supplier-info.component.html',
  styleUrls: ['./supplier-info.component.css']
})
export class SupplierInfoComponent {
  suppliers: Supplier[] = [];
  showDeleteMessage: boolean=false;

  constructor(private supplierService: SupplierService,private router: Router,private authService:AuthService) {}

  ngOnInit(): void {
    this.loadSupplier(); // Fetch suppliers data
  }

  logout() {
    this.authService.logout();
  }

  loadSupplier() {
    this.supplierService.getAllSuppliers().subscribe(
      (data) => {
        this.suppliers = data;
      },
      (error) => {
        console.error('Error fetching suppliers:', error);
      }
    );
  }


  updateSupplier(id: number) {
    this.router.navigate([`/edit-supplier/${id}`]);
  }

  deleteSupplier(id: any): void {
      const confirmDelete = confirm('Are you sure you want to delete?');
      if (confirmDelete) {
        this.supplierService.deleteSupplier(id).subscribe(
          () => {
            console.log('Asset deleted successfully');
            this.suppliers = this.suppliers.filter((supplier: {id: any; }) => supplier.id !== id);
            this.showDeleteMessage = true;
            setTimeout(() => {
              this.showDeleteMessage = false;
            }, 3000);
            this.loadSupplier();
          },
          (error) => {
            console.error('Error deleting asset:', error);
          }
        );
      }
     
    }
}
