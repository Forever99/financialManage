package cn.zhku.jsj144.zk.financialManage.service;

import cn.zhku.jsj144.zk.financialManage.pojo.Admin;

public interface AdminService {

	Admin findAdmin(Admin admin);//后台登录

	int countShouzhiRecord(int uid);//收支记录

	int countBudget(int uid);//预算记录

	int countWishList(int uid);//心愿单记录

	int countMemorandum(int uid);//备忘录记录

}
