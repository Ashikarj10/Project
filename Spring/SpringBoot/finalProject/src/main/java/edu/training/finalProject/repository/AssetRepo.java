package edu.training.finalProject.repository;

import edu.training.finalProject.model.Asset;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetRepo extends JpaRepository<Asset, Integer> {



	List<Asset> findByAssetName(String assetName);

}

