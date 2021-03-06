package kr.wonyoungpark.api.review.controller;

import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

import kr.wonyoungpark.api.review.domain.Review;
import kr.wonyoungpark.api.review.service.ReviewServiceImpl;
import kr.wonyoungpark.api.common.controller.AbstractController;

@RestController @CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/reviews") @RequiredArgsConstructor 
public class ReviewController extends AbstractController<Review>{
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	final ReviewServiceImpl service;
	
	@PostMapping("")
	public ResponseEntity<Long> save(@RequestBody Review t) {
		return ResponseEntity.ok(service.save(t));
	}
	@DeleteMapping("")
	public ResponseEntity<Long> delete(@RequestBody Review t) {
		return ResponseEntity.ok(service.delete(t));
	}
	@GetMapping("/count")
	public ResponseEntity<Long> count() {
		return ResponseEntity.ok(service.count());
	}
	@GetMapping("")
	public ResponseEntity<List<Review>> findAll() {
		return ResponseEntity.ok(service.findAll());
	}
	@GetMapping("/one/{id}")
	public ResponseEntity<Review> getOne(@PathVariable long id) {
		return ResponseEntity.ok(service.getOne(id));
	}
	@GetMapping("/find/{id}")
	public ResponseEntity<Optional<Review>> findById(@PathVariable long id) {
		return ResponseEntity.ok(service.findById(id));
	}
	@GetMapping("/exists/{id}")
	public ResponseEntity<Boolean> existsById(@PathVariable long id) {
		return ResponseEntity.ok(service.existsById(id));
	}
}