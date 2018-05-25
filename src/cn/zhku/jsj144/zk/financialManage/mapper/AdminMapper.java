package cn.zhku.jsj144.zk.financialManage.mapper;

import cn.zhku.jsj144.zk.financialManage.pojo.Admin;

public interface AdminMapper {

	//查找用户是否存在
	Admin findAdmin(Admin admin);

	int countShouzhiRecord(int uid);

	int countBudget(int uid);

	int countWishList(int uid);

	int countMemorandum(int uid);

}
