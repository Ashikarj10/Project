package edu.training.finalProject.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Asset 
{
	
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "asset_id", nullable = false)
  Integer assetId;
  String assetName;
  String assetType;
  Integer assetPrice;
  String ipAddress;
  String assetStatus;
  Integer assetQuantity;
  String supplierName;
  String supplierEmail;
  
//  @ManyToOne
//  @JoinColumn(name = "supplier_id") // This should match the actual column name in your Asset table
//  private Supplier supplier;
}
