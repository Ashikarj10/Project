package edu.training.finalProject.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Supplier 
{
	
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id; 
  String name; 
  String contactPerson; 
  String email; 
  String phone; 
  String location;
  String assetName;

}
