package cn.zhku.jsj144.zk.financialManage.service;

import java.util.List;

import cn.zhku.jsj144.zk.financialManage.pojo.PageBean;
import cn.zhku.jsj144.zk.financialManage.pojo.WishList;

public interface WishListService {

	PageBean<WishList> findAllWishList(int uid, Integer currentPage);//查询所有心愿单[分页查询]

	int CountWishByTimeAndId(WishList wishList);//获取某人，某天的心愿单个数

	void addWish(WishList wishList);//添加心愿单

	WishList findWishById(int id);//根据id查询心愿单信息

	void editWish(WishList wishList);//编辑心愿单

	void deleteWish(int id);//删除心愿单
}
