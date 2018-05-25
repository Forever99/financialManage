package cn.zhku.jsj144.zk.financialManage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.zhku.jsj144.zk.financialManage.mapper.UserMapper;
import cn.zhku.jsj144.zk.financialManage.pojo.PageBean;
import cn.zhku.jsj144.zk.financialManage.pojo.User;

//事务管理
@Transactional
@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserMapper userMapper;// 注入UserMapper

	// 通过用户名和密码查询用户是否存在
	@Override
	public User queryUserByUser(User user) {
		return userMapper.queryUserByUser(user);
	}

	// 通过用户名查询用户是否存在
	@Override
	public User queryUserByUsername(String username) {
		return userMapper.queryUserByUsername(username);
	}

	// 修改密码（找回密码）
	@Override
	public void updatePasswordByUsername(User user) {
		userMapper.updatePasswordByUsername(user);

	}

	// 用户注册（添加用户）
	@Override
	public void insertUser(User user) {
		userMapper.insertUser(user);
	}

	// 用户信息设置
	@Override
	public void editUser(User user) {
		userMapper.editUser(user);
	}

	// 分页查询用户列表 --封装分页数据
	@Override
	public PageBean<User> findUsers(User user, Integer currentPage) {

		if (currentPage == null) {
			currentPage = 0;
		}

		int pageRecord = 10;// 每页记录数
		int allRecord = userMapper.findUsersCount(user);// 查询用户总记录数
		
		int allPage = 0;// 总页数
		if (allRecord % pageRecord == 0) {
			allPage = allRecord / pageRecord;
		} else {
			allPage = allRecord / pageRecord + 1;
		}
		int startPosition = currentPage * pageRecord;// 开始位置

		Map<String, Object> map = new HashMap<String, Object>();// 分页查询条件
		map.put("user", user);
		map.put("startPosition", startPosition);
		map.put("pageRecord", pageRecord);
		List<User> pageList = userMapper.findUsers(map);// 分页查询用户当前页记录列表

		PageBean<User> pageBean = new PageBean<User>();
		pageBean.setAllPage(allPage);
		pageBean.setAllRecord(allRecord);
		pageBean.setCurrentPage(currentPage);
		pageBean.setPageRecord(pageRecord);
		pageBean.setStartPosition(startPosition);
		pageBean.setPageList(pageList);

		//调试
//		System.out.println("allRecord：" + allRecord);
//		System.out.println("currentPage:"+currentPage);
//		System.out.println("pageList.size()"+pageList.size());
		return pageBean;
	}

	@Override
	public User queryUserById(Integer uid) {//编辑用户信息页面
		return userMapper.queryUserById(uid);
	}

	@Override
	public void editUserAll(User user) {//编辑全部用户信息
		userMapper.editUserAll(user);
	}

	@Override
	public void deleteUser(int uid) {//删除用户
		userMapper.deleteUser(uid);
	}

	@Override
	public int countUser() {//当前所有用户总记录数
		return userMapper.countUser();
	}

}
