package cn.zhku.jsj144.zk.financialManage.mapper;

import java.util.List;
import java.util.Map;

import cn.zhku.jsj144.zk.financialManage.pojo.User;

public interface UserMapper {

	User queryUserByUser(User user);//通过用户名和密码查询用户是否存在

	User queryUserByUsername(String username);//通过用户名查询用户是否存在

	void updatePasswordByUsername(User user);//修改密码（找回密码）

	void insertUser(User user);//用户注册（添加用户）

	void editUser(User user);//用户信息设置

	int findUsersCount(User user);//查询用户总记录数

	List<User> findUsers(Map<String, Object> map);//分页查询用户当前页记录列表

	User queryUserById(Integer uid);//编辑用户信息页面

	void editUserAll(User user);//编辑全部用户信息

	void deleteUser(int uid);//删除用户

	int countUser();//当前所有用户总记录数

}
