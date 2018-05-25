package cn.zhku.jsj144.zk.financialManage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.zhku.jsj144.zk.financialManage.mapper.AdminMapper;
import cn.zhku.jsj144.zk.financialManage.pojo.Admin;

@Transactional
@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private AdminMapper adminMapper;

	@Override
	public Admin findAdmin(Admin admin) {//后台登录
		return adminMapper.findAdmin(admin);//查找用户是否存在
	}

	@Override
	public int countShouzhiRecord(int uid) {
		return adminMapper.countShouzhiRecord(uid);
	}

	@Override
	public int countBudget(int uid) {
		return adminMapper.countBudget(uid);
	}

	@Override
	public int countWishList(int uid) {
		return adminMapper.countWishList(uid);
	}

	@Override
	public int countMemorandum(int uid) {
		return adminMapper.countMemorandum(uid);
	}
}
