package kr.wonyoungpark.api.user.domain;


import io.swagger.annotations.ApiModelProperty;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Getter;

import java.util.List;

@Component @Lazy @Getter
public class UserDTO{
	private long userNum;
	@ApiModelProperty(position = 0)
	private String username;
	@ApiModelProperty(position = 2)
	private String password;
	@ApiModelProperty(position = 3)
	private List<Role> roles;
	private String name;
	@ApiModelProperty(position = 1)
	private String email;
	private String gender;
	private String birthday;
	private String phoneNumber;
	private String preferGenre;

}
