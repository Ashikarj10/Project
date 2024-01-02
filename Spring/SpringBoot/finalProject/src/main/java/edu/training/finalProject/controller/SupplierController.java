package edu.training.finalProject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import edu.training.finalProject.model.Supplier;
import edu.training.finalProject.service.SupplierService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/suppliers")
public class SupplierController {
    private final SupplierService supplierService;

    @Autowired
    public SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @PostMapping
    public Supplier addSupplier(@RequestBody Supplier supplier) {
        return supplierService.addSupplier(supplier);
    }

    @GetMapping
    public List<Supplier> getAllSuppliers() {
        return supplierService.getAllSuppliers();
    }
    
    @GetMapping("/{id}")
    public Supplier getSupplierById(@PathVariable Integer id) {
        // Call the service to retrieve the supplier by ID
        Supplier supplier = supplierService.getSupplierById(id);

        if (supplier == null) {
            // You can handle the case where the supplier is not found, for example, by returning a 404 status code.
            System.out.println("Supplier not found with ID: " + id);
        }

        return supplier;
    }


    @PutMapping("/id/{id}")
    public Supplier updateSupplier(@PathVariable Integer id, @RequestBody Supplier updatedSupplier) {
        return supplierService.updateSupplier(id, updatedSupplier);
    }

    @DeleteMapping("/{id}")
    public String deleteSupplier(@PathVariable Integer id) {
        supplierService.deleteSupplier(id);
        return "DELETED";
    }
}
