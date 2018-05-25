package cn.zhku.jsj144.zk.financialManage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.zhku.jsj144.zk.financialManage.mapper.CategoryManageMapper;
import cn.zhku.jsj144.zk.financialManage.pojo.PageBean;
import cn.zhku.jsj144.zk.financialManage.pojo.ShouzhiCategory;
import cn.zhku.jsj144.zk.financialManage.pojo.User;

@Transactional
@Service
public class CategoryManageServiceImpl implements CategoryManageService {

	@Autowired
	private CategoryManageMapper categoryManageMapper;

	//分页查询收支类别
	@Override
	public PageBean<ShouzhiCategory> findCategorys(
			ShouzhiCategory shouzhiCategory, Integer currentPage) {//封装PageBean

		if (currentPage == null) {
			currentPage = 0;
		}

		int pageRecord = 10;// 每页记录数
		int allRecord = categoryManageMapper.findCategorysCount(shouzhiCategory);// 查询收支类别总记录数
		
		int allPage = 0;// 总页数
		if (allRecord % pageRecord == 0) {
			allPage = allRecord / pageRecord;
		} else {
			allPage = allRecord / pageRecord + 1;
		}
		int startPosition = currentPage * pageRecord;// 开始位置

		Map<String, Object> map = new HashMap<String, Object>();// 分页查询条件
		map.put("shouzhiCategory", shouzhiCategory);
		map.put("startPosition", startPosition);
		map.put("pageRecord", pageRecord);
		List<ShouzhiCategory> pageList = categoryManageMapper.findCategorysCurrentPageList(map);// 分页查询收支类别当前页记录列表

		PageBean<ShouzhiCategory> pageBean = new PageBean<ShouzhiCategory>();
		pageBean.setAllPage(allPage);
		pageBean.setAllRecord(allRecord);
		pageBean.setCurrentPage(currentPage);
		pageBean.setPageRecord(pageRecord);
		pageBean.setStartPosition(startPosition);
		pageBean.setPageList(pageList);

//		//调试
//		System.out.println("allRecord：" + allRecord);
//		System.out.println("currentPage:"+currentPage);
//		System.out.println("pageList.size()"+pageList.size());
		return pageBean;
	}

	//判断当前子类型是否存在
	@Override
	public ShouzhiCategory findCategory(ShouzhiCategory shouzhiCategory) {
		return categoryManageMapper. findCategory(shouzhiCategory);
	}

	//添加收支类型
	@Override
	public void insertCategory(ShouzhiCategory shouzhiCategory) {
		categoryManageMapper.insertCategory(shouzhiCategory);
	}

	//通过id查询当前收支类型信息
	@Override
	public ShouzhiCategory queryShouzhiCategoryById(Integer szcid) {
		return categoryManageMapper.queryShouzhiCategoryById(szcid);
	}

	//编辑收支类型信息
	@Override
	public void editShouzhiCategory(ShouzhiCategory shouzhiCategory) {
		categoryManageMapper.editShouzhiCategory(shouzhiCategory);
	}

	//查找当前收支子类型下的收支记录
	@Override
	public int countShouzhiRecord(int szcid) {
		return categoryManageMapper.countShouzhiRecord(szcid);
	}

	//删除收支子类型
	@Override
	public void deleteShouzhiCategory(int szcid) {
		categoryManageMapper.deleteShouzhiCategory(szcid);
	}

	//当前所有收支子类型记录数
	@Override
	public int countShouzhiCategorys() {
		return categoryManageMapper.countShouzhiCategorys();
	}
}
