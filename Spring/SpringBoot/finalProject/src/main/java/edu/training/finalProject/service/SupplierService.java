package edu.training.finalProject.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import edu.training.finalProject.model.Supplier;
import edu.training.finalProject.repository.SupplierRepo;


@Service
public class SupplierService {
    @Autowired
    SupplierRepo supplierRepo;

    public Supplier addSupplier(Supplier supplier) {
        return supplierRepo.save(supplier);
    }

    public Supplier getSupplierById(int id) {
        Optional<Supplier> supplier = supplierRepo.findById(id);

        if (supplier.isPresent()) {
            return supplier.get();
        } else {
            return null; // You can return null or throw an exception as needed
        }
    }
    
    
    public List<Supplier> getAllSuppliers() {
        return supplierRepo.findAll();
    }

    public Supplier updateSupplier(int id, Supplier updatedSupplier) {
        Optional<Supplier> existingSupplier = supplierRepo.findById(id);

        if (existingSupplier.isPresent()) {
            Supplier supplier = existingSupplier.get();

            
            supplier.setName(updatedSupplier.getName());
            supplier.setContactPerson(updatedSupplier.getContactPerson());
            supplier.setEmail(updatedSupplier.getEmail());
            supplier.setPhone(updatedSupplier.getPhone());
            supplier.setLocation(updatedSupplier.getLocation());
            return supplierRepo.save(supplier);
        }
        else 
        {
            return null;
        }
    }

    public void deleteSupplier(int id) {
        supplierRepo.deleteById(id);
    }
}
