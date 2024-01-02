import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Asset } from '../model/Asset';
import { AssetService } from '../Services/asset.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  assets: Asset[] = [];
  filteredAssets: Asset[] = [];
  searchQuery: string='';
  showDeleteMessage: boolean = false;
  

  constructor(private service: AssetService,private router:Router,private authService:AuthService) {}

  ngOnInit(): void {
    this.loadAssets();
  }
   
  logout() {
    this.authService.logout();
  }

  loadAssets(){
    this.service.getAllAssets().subscribe(
      (data) => {
        this.assets = data;
         this.filteredAssets = data;
         console.log(this.filteredAssets);
      },
      (error) => {
        console.error('Error fetching assets:', error);
      }
    );
  }
  
  performSearch(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredAssets = this.assets;
    } else {
      // Perform the search based on the asset name
      this.filteredAssets = this.assets.filter((asset) => {
        return asset.assetName.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  }
  onSubcategorySelected(subcategory: string) {
    // Filter assets based on the selected subcategory
    this.filteredAssets = this.assets.filter((asset) => asset.assetType === subcategory);
  }
  

  editAsset(assetId: string) {
    this.router.navigate([`/edit/${assetId}`]);
  }
  
    deleteAsset(assetId: any): void {
      const confirmDelete = confirm('Are you sure you want to delete?');
      if (confirmDelete) {
        this.service.deleteAsset(assetId).subscribe(
          () => {
            console.log('Asset deleted successfully');
            this.assets = this.assets.filter((asset: { assetId: any; }) => asset.assetId !== assetId);
            this.showDeleteMessage = true;
            setTimeout(() => {
              this.showDeleteMessage = false;
            }, 3000);
            this.loadAssets();
          },
          (error) => {
            console.error('Error deleting asset:', error);
          }
        );
      }
     
    }
    
    
}
