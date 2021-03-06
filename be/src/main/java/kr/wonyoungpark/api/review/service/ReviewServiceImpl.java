package kr.wonyoungpark.api.review.service;

import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import kr.wonyoungpark.api.review.domain.Review;
import kr.wonyoungpark.api.review.repository.ReviewRepository;
import kr.wonyoungpark.api.common.service.AbstractService;

@Service @RequiredArgsConstructor
public class ReviewServiceImpl extends AbstractService<Review> implements ReviewService{
	private final ReviewRepository repo;
	
	@Override public long save(Review r) { return (repo.save(r) != null) ? 1 : 0;}
	@Override public long delete(Review r) { repo.delete(r); return (getOne(r.getReviewNum()) == null) ? 1 : 0;}
	@Override public long count() { return (long)repo.count();}
	@Override public List<Review> findAll() { return repo.findAll();}
	@Override public Review getOne(long id) { return repo.getOne(id);}
	@Override public Optional<Review> findById(long id){ return repo.findById(id);}
	@Override public boolean existsById(long id) { return repo.existsById(id);}
}
