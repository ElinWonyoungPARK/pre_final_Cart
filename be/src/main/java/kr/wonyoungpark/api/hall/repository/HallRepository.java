package kr.wonyoungpark.api.hall.repository;

import kr.wonyoungpark.api.exhibition.domain.Exhbn;
import kr.wonyoungpark.api.hall.domain.Hall;
import kr.wonyoungpark.api.hall.domain.HallDto;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

interface HallCustomRepository {

	List<Hall> findByLocation(String location);
	
}

public interface HallRepository extends JpaRepository<Hall, Long>, HallCustomRepository {
	@Query(value="update hall h set h.hall_closed = :hallClosed "
			+ " where h.hall_num = :hallNum", nativeQuery = true)
	public long update(@Param("hallClosed") String hallClosed,
						@Param("hallNum") long hallNum);
	public List<Hall> findByHallNameAndHallLocation(String hallName, String hallLocation);
}
