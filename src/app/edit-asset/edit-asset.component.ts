import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetService } from '../Services/asset.service';
import { Asset } from '../model/Asset';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../Services/auth.service';
// import { EmailService } from '../Services/email.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-asset',
  templateUrl: './edit-asset.component.html',
  styleUrls: ['./edit-asset.component.css']
})
export class EditAssetComponent implements OnInit {

  assetForm: FormGroup;
  assetData: Asset | any; // To store asset data
  // editMode: boolean = false; // Edit mode flag
successMsg=false;
  errorMessage: string='';
  constructor(
    private fb: FormBuilder,
    private assetService: AssetService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) 
  {
    this.assetForm = this.fb.group({
      assetId:[''],
      assetName: ['', Validators.required],
      assetType: ['', Validators.required],
      assetPrice: ['', Validators.required],
      ipAddress:[''],
      assetStatus: ['', Validators.required],
      assetQuantity: ['', Validators.required],
      supplierName:['',Validators.required],
       supplierEmail:['',Validators.required]
    });
  }    

  ngOnInit(): void {
    this.loadAssets();
  }


  logout() {
    this.authService.logout();
  }

  loadAssets(){
    const assetId = this.route.snapshot.paramMap.get('id');
    if (assetId) {
      this.assetService.getAssetById(assetId).subscribe((asset) => {
        this.assetData = asset;
        console.log(asset);
        this.assetForm.setValue({
          assetId: asset.assetId,
          assetName: asset.assetName,
          assetType: asset.assetType,
          assetPrice: asset.assetPrice,
          ipAddress: asset.ipAddress,
          assetStatus: asset.assetStatus,
          assetQuantity: asset.assetQuantity,
          supplierName: asset.supplierName, 
        supplierEmail: asset.supplierEmail, 
         
        });
      });
    }
  }
  
  saveAsset() {
    if (this.assetForm.valid) {
      const assetData = this.assetForm.value;
      const assetId = this.route.snapshot.paramMap.get('id');
      if (assetId !== null) {
        // if (assetData.assetQuantity <= 1) {
        //   // Trigger email sending
        //   this.sendLowQuantityEmail(assetData).subscribe(
        //     () => {
        //       console.log('Email sent successfully');
        //     },
        //     (error: any) => {
        //       console.error('Error sending email:', error);
        //     }
        //   );
        // }
  
        this.assetService.editAsset(assetId, assetData).subscribe(
          (response) => {
            console.log('Assets updated successfully:', response);
            this.successMsg = true;
            this.router.navigate(['/view']);
          },
          (error: HttpErrorResponse) => {
            console.error('Error updating asset:', error);
            // Display a user-friendly error message
            this.errorMessage = 'Failed to update asset. Please try again later.';
          }
        );
      }
    }
  }
  
// send(){
//   if (this.assetForm.valid) {
//     const assetData = this.assetForm.value;
//     const assetId = this.route.snapshot.paramMap.get('id');
//   if (assetData.assetQuantity <= 1) {
//     // Send an email to the supplier
//     this.sendLowQuantityEmail(assetData).subscribe(
//       () => {
//         console.log('Email sent successfully');
//       },
//       (error: any) => {
//         console.error('Error sending email:', error);
//       }
//     );
//   }
//         }}
  
        // sendLowQuantityEmail(assetData: Asset): Observable<Object> {
        //   // Define the email data
        //   const emailData = {
        //     to: assetData.supplierEmail, // Use the supplier's email from the asset data
        //     subject: 'Low Quantity Alert',
        //     message: `The quantity of the asset "${assetData.assetName}" is now less than or equal to 1. Please restock.`,
        //   };
        
        //   // Send the email using the email service
        //   return this.emailService.sendEmail(emailData);
        // }
        

      }
