package cn.zhku.jsj144.zk.financialManage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.zhku.jsj144.zk.financialManage.mapper.WishListMapper;
import cn.zhku.jsj144.zk.financialManage.pojo.PageBean;
import cn.zhku.jsj144.zk.financialManage.pojo.User;
import cn.zhku.jsj144.zk.financialManage.pojo.WishList;

@Transactional
@Service
public class WishListServiceImpl implements WishListService {
	
	@Autowired
	private WishListMapper wishListMapper;

	
	//查询所有心愿单[分页查询]
	@Override
	public PageBean<WishList> findAllWishList(int uid, Integer currentPage) {
		if (currentPage == null) {
			currentPage = 0;
		}

		int pageRecord = 6;// 每页记录数
		int allRecord = wishListMapper.findWishListCount(uid);// 查询心愿单总记录数
		
		int allPage = 0;// 总页数
		if (allRecord % pageRecord == 0) {
			allPage = allRecord / pageRecord;
		} else {
			allPage = allRecord / pageRecord + 1;
		}
		int startPosition = currentPage * pageRecord;// 开始位置

		Map<String, Object> map = new HashMap<String, Object>();// 分页查询条件
		map.put("uid", uid);
		map.put("startPosition", startPosition);
		map.put("pageRecord", pageRecord);
		List<WishList> pageList = wishListMapper.findWishList(map);// 分页查询,心愿单 的当前页记录列表

		PageBean<WishList> pageBean = new PageBean<WishList>();
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
	
//	@Override
//	public List<WishList> findAllWishList(int uid) {//查询所有心愿单
//		return wishListMapper.findAllWishList(uid);
//	}

	@Override
	public int CountWishByTimeAndId(WishList wishList) {//获取某人，某天的心愿单个数
		return wishListMapper.CountWishByTimeAndId(wishList);
	}

	@Override
	public void addWish(WishList wishList) {//添加心愿单
		 wishListMapper.addWish(wishList);
	}

	@Override
	public WishList findWishById(int id) {//根据id查询心愿单信息
		return wishListMapper.findWishById(id);
	}

	@Override
	public void editWish(WishList wishList) {	//编辑心愿单
		wishListMapper.editWish(wishList);
	}

	@Override
	public void deleteWish(int id) {//删除心愿单
		wishListMapper.deleteWish(id);
	}


}
