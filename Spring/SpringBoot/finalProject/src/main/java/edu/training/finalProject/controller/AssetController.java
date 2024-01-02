package edu.training.finalProject.controller;

import edu.training.finalProject.model.Asset;
import edu.training.finalProject.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/assets")
public class AssetController {

    private final AssetService assetService;

    @Autowired
    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }
    
    @PostMapping
    public ResponseEntity<Asset> createAsset(@RequestBody Asset asset)
    {
        asset.setIpAddress(assetService.generateRandomIpAddress());
        Asset savedAsset = assetService.addAsset(asset);
        return new ResponseEntity<>(savedAsset, HttpStatus.CREATED);
    } 

//    @PostMapping("/send-email")
//    public ResponseEntity<String> sendEmail(@RequestBody Map<String, String> emailData) {
//        String toEmail = emailData.get("toEmail");
//        String assetName = emailData.get("assetName");
//
//        assetService.sendEmail(toEmail, assetName);
//
//        return ResponseEntity.ok("Email sent successfully");
//    }
    

    
    
    @GetMapping
    public List<Asset> getAllAssets() {
        return assetService.getAllAssets();
    }

    @GetMapping("/id/{assetId}")
    public Asset getAssetById(@PathVariable Integer assetId) {
        return assetService.getAssetById(assetId);
    }

    @PutMapping("/{assetId}")
    public ResponseEntity<Asset> updateAsset(@PathVariable Integer assetId, @RequestBody Asset updatedAsset) {
        Asset updated = assetService.updateAsset(assetId, updatedAsset);
        if (updated != null) {
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{assetId}")
    public ResponseEntity<String> deleteAsset(@PathVariable Integer assetId) 
    {
        assetService.deleteAsset(assetId);
        return new ResponseEntity<>("Asset deleted", HttpStatus.NO_CONTENT);
    }

    
    @GetMapping("/search")
    public List<Asset> searchAssets(@RequestParam("assetName") String assetName) {
        return assetService.searchAssets(assetName);
    }

 

//@PostMapping("/send-email")
//public ResponseEntity<String> sendLowQuantityEmail(@RequestBody Asset asset) {
//    // You can include the logic to send the email here using the EmailService.
//    // Example: emailService.sendEmail(asset.getSupplierEmail(), "Low Quantity Alert", "The quantity of " + asset.getAssetName() + " is now less than or equal to 1. Please restock.");
//    assetService.checkLowQuantityAndSendEmail(asset);
//    return ResponseEntity.ok("Email sent successfully.");
//}
    }

