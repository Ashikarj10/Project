package edu.training.finalProject.service;


import java.util.List;
import java.util.Optional;
import java.util.Properties;
import java.util.Random;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.training.finalProject.model.Asset;
import edu.training.finalProject.repository.AssetRepo;
import edu.training.finalProject.repository.SupplierRepo;

@Service
public class AssetService {
	  private final AssetRepo assetRepo;
//	    private final SupplierRepo supplierRepo;
	  
//	  @Autowired
//	    private EmailService emailService;

	    @Autowired
	    public AssetService(AssetRepo assetRepo) {
	        this.assetRepo = assetRepo;
	        
	        
	    }

//	    public void sendEmail(String toEmail, String assetName) {
//	        final String fromEmail = "priya.jp0210@outlook.com"; //sender email address
//	        final String password = "Welcome@123"; //sender  email password
//
//	        String subject = "Low Quantity Notification";
//	        String messageBody = "Dear Supplier,\n\nThe quantity of " + assetName + " is low. Please take action.";
//
//	        // Set up mail server properties
//	        Properties props = new Properties();
//	        props.put("mail.smtp.host", "smtp.email.com"); // Replace with your SMTP server
//	        props.put("mail.smtp.port", "587");
//	        props.put("mail.smtp.auth", "true");
//	        props.put("mail.smtp.starttls.enable", "true");
//
//	        // Create a session with your email credentials
//	        Session session = Session.getInstance(props, new Authenticator() {
//	            protected PasswordAuthentication getPasswordAuthentication() {
//	                return new PasswordAuthentication(fromEmail, password);
//	            }
//	        });
//
//	        try {
//	            // Create a MimeMessage object
//	            Message message = new MimeMessage(session);
//
//	            message.setFrom(new InternetAddress(fromEmail));
//	            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
//	            message.setSubject(subject);
//	            message.setText(messageBody);
//
//	            // Send the message
//	            Transport.send(message);
//	            System.out.println("Email Sent Successfully!");
//	        } catch (MessagingException e) {
//	            e.printStackTrace();
//	        }
//	    }
    
//	    public void checkLowQuantityAndSendEmail(Asset asset) {
//	        if (asset.getAssetQuantity() <= 1) {
//	            // Send an email to the supplier
//	            String to = asset.getSupplierEmail();
//	            String subject = "Low Quantity Alert";
//	            String text = "The quantity of the asset " + asset.getAssetName() + " is now less than or equal to 1. Please restock.";
//
//	            emailService.sendEmail(to, subject, text);
//	        }
//	    }

    public Asset addAsset(Asset asset) {
        assetRepo.save(asset);
        return asset;
    }
    
    public String generateRandomIpAddress() 
    {
        Random rand = new Random();
        return rand.nextInt(256) + "." + rand.nextInt(256) + "." + rand.nextInt(256) + "." + rand.nextInt(256);
    }

    public List<Asset> getAllAssets() {
    	return assetRepo.findAll();
        
    }

    public Asset getAssetById(Integer assetId) 
    {
        Optional<Asset> assetOptional = assetRepo.findById(assetId);
        if (assetOptional.isPresent()) {
            return assetOptional.get();
        }
        else
        {
            return null;
        }
    }


    public Asset updateAsset(Integer assetId, Asset updatedAsset) {
        Optional<Asset> assetOptional = assetRepo.findById(assetId);
        if (assetOptional.isPresent()) {
            Asset existingAsset = assetOptional.get();

            existingAsset.setAssetName(updatedAsset.getAssetName());
            existingAsset.setAssetType(updatedAsset.getAssetType());
            existingAsset.setAssetPrice(updatedAsset.getAssetPrice());
//            existingAsset.setIpAddress(updatedAsset.getIpAddress());
            existingAsset.setAssetStatus(updatedAsset.getAssetStatus());
            existingAsset.setAssetQuantity(updatedAsset.getAssetQuantity());
            existingAsset.setSupplierName(updatedAsset.getSupplierName());
            existingAsset.setSupplierEmail(updatedAsset.getSupplierEmail());
            
            assetRepo.save(existingAsset); 
            return existingAsset;
        } 
        else 
        {
            return null;
        }
    }

    public String deleteAsset(Integer assetId) 
    {
        assetRepo.deleteById(assetId);
        return "DELETED";
    }

	public List<Asset> searchAssets(String assetName) 
	{
		
		
		return assetRepo.findByAssetName(assetName);
	}

}
