package cn.zhku.jsj144.zk.financialManage.mapper;

import java.util.List;
import java.util.Map;

import cn.zhku.jsj144.zk.financialManage.pojo.User;
import cn.zhku.jsj144.zk.financialManage.pojo.WishList;

public interface WishListMapper {

	//查询所有心愿单
	List<WishList> findAllWishList(int uid);

	//获取某人，某天的心愿单个数
	int CountWishByTimeAndId(WishList wishList);

	//添加心愿单
	void addWish(WishList wishList);

	//根据id查询心愿单信息
	WishList findWishById(int id);

	//编辑心愿单
	void editWish(WishList wishList);

	//删除心愿单
	void deleteWish(int id);

	// 查询心愿单总记录数
	int findWishListCount(int uid);

	// 分页查询,心愿单 的当前页记录列表
	List<WishList> findWishList(Map<String, Object> map);

}
