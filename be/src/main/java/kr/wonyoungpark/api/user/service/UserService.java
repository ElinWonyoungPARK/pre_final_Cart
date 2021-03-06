package kr.wonyoungpark.api.user.service;

import kr.wonyoungpark.api.user.domain.UserVO;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import java.util.Optional;


public interface UserService {
    String save(UserVO userVo);
    List<UserVO> all();
    UserVO one(long id);
    String edit(UserVO userVo);
    String delete(long id);
    public boolean checkId(String id);
    public boolean checkEmail(String email);
    public Map<String, Object> signin(String username, String password);
    public String signup(UserVO user);
    public UserVO search(String username);
    public UserVO whoami(HttpServletRequest req);
    public String refresh(String username);

}