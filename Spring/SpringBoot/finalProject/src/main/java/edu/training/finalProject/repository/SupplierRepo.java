package edu.training.finalProject.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.training.finalProject.model.Supplier;

@Repository
public interface SupplierRepo extends JpaRepository<Supplier, Integer> {



}
