import { Component, ElementRef, Renderer2} from '@angular/core';
import { Asset } from '../model/Asset';
import { AssetService } from '../Services/asset.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  assetForm: FormGroup;
  showSuccessMessage = false;


  

  constructor(private fb: FormBuilder, private assetService: AssetService,private authService: AuthService) {

    this.assetForm = this.fb.group({
      assetName: ['', Validators.required],
      assetType: ['', Validators.required],
      assetPrice: ['', Validators.required],
      assetStatus: ['', Validators.required],
      assetQuantity: ['', Validators.required],
      supplierName:['', Validators.required],
      supplierEmail:['', Validators.required]
    });
  }

  logout() {
    this.authService.logout();
  }

  addAsset() {
    if (this.assetForm.valid) {
      const assetData: Asset | Asset[] = this.assetForm.value;
      this.assetService.addAsset(assetData).subscribe(
        (response: Asset | Asset[]) => {
          console.log('Asset(s) added successfully:', response);
          this.assetForm.reset();
        
          // Show the success modal
          this.showSuccessMessage = true; // Show the success message
          console.log(this.showSuccessMessage)
          // Automatically hide the success message after a certain delay (e.g., 3 seconds)
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 5000);
        },
        (error) => {
          console.error('Error adding asset(s):', error);
        }
      );
    }
  }

}
