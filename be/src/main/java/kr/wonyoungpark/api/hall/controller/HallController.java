package kr.wonyoungpark.api.hall.controller;

import java.util.List;
import java.util.Optional;

import kr.wonyoungpark.api.analysis.service.AnalysisServiceImpl;
import kr.wonyoungpark.api.common.controller.AbstractController;
import kr.wonyoungpark.api.hall.domain.Hall;
import kr.wonyoungpark.api.hall.service.HallServiceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController 
@RequiredArgsConstructor 
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/halls")
public class HallController extends AbstractController<Hall> {
	final HallServiceImpl service;

	@PostMapping("")
	public ResponseEntity<Long> save(@RequestBody Hall h) {
		return ResponseEntity.ok(service.save(h));
	}

	@DeleteMapping("")
	public ResponseEntity<Long> delete(@RequestBody Hall h) {
		return ResponseEntity.ok(service.delete(h));
	}

	@GetMapping("/count")
	public ResponseEntity<Long> count() {
		return ResponseEntity.ok(service.count());
	}

	@GetMapping("/one/{id}")
	public ResponseEntity<Hall> getOne(@PathVariable long id) {
		return ResponseEntity.ok(service.getOne(id));
	}

	@GetMapping("/find/{id}")
	public ResponseEntity<Optional<Hall>> findById(@PathVariable long id) {
		return ResponseEntity.ok(service.findById(id));
	}

	@GetMapping("/exists/{id}")
	public ResponseEntity<Boolean> existsById(@PathVariable long id) {
		return ResponseEntity.ok(service.existsById(id));
	}

	@GetMapping("")
	public ResponseEntity<List<Hall>> findAll() {
		return ResponseEntity.ok(service.findAll());
	}
	
}
