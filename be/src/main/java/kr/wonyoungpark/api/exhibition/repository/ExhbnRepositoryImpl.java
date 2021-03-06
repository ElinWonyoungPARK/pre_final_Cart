package kr.wonyoungpark.api.exhibition.repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;

import static kr.wonyoungpark.api.exhibition.domain.QExhbn.exhbn;
import static kr.wonyoungpark.api.hall.domain.QHall.hall;


import com.querydsl.core.Tuple;
import lombok.RequiredArgsConstructor;
import kr.wonyoungpark.api.exhibition.domain.ExhbnDTO;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import kr.wonyoungpark.api.exhibition.domain.Exhbn;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
public class ExhbnRepositoryImpl extends QuerydslRepositorySupport implements ExhbnCustomRepository{
	private final JPAQueryFactory qf;
	private final EntityManager em;
	public ExhbnRepositoryImpl(EntityManager em, JPAQueryFactory qf) {
		super(Exhbn.class);
		this.em = em;
		this.qf = qf;
	}
	
	@Override
	public List<Exhbn> searchTitle(String exhbnTitle) {
		//return em.createQuery("select exh from Exhbn exh where exh.exhbnTitle like CONCAT('%',:title,'%')")
		//		.setParameter("title", exhbnTitle).getResultList();
		return qf.selectFrom(exhbn).where(exhbn.exhbnTitle.contains(exhbnTitle)).fetch();
	}

	@Override
	public List<Exhbn> sortList(){
		return qf.selectFrom(exhbn).orderBy(exhbn.startDate.desc()).fetch();
	}

	@Override
	public List<Exhbn> nowInExhbn(){
		Date nowDate = new Date();
		return qf.selectFrom(exhbn).where(exhbn.startDate.before(nowDate), exhbn.endDate.after(nowDate)).fetch();
	}

	@Override
	public List<Exhbn> finExhbn(){
		Date nowDate = new Date();
		return qf.selectFrom(exhbn).where(exhbn.endDate.before(nowDate)).fetch();
	}

	@Override
	public List<Exhbn> findByHall(long id){
		return qf.selectFrom(exhbn).join(exhbn.hall, hall).on(hall.hallNum.eq(id)).fetch();
	}

	@Override
	public List<ExhbnDTO> findByHallNum(long id){
		List<Tuple> list = qf.select(exhbn, hall.hallName).from(exhbn)
				.join(exhbn.hall, hall).on(hall.hallNum.eq(id)).fetch();
		System.out.println(list);
		return null;
	}
}