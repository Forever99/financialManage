package cn.zhku.jsj144.zk.financialManage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.zhku.jsj144.zk.financialManage.mapper.MemorandumMapper;
import cn.zhku.jsj144.zk.financialManage.pojo.Memorandum;
import cn.zhku.jsj144.zk.financialManage.pojo.PageBean;
import cn.zhku.jsj144.zk.financialManage.pojo.WishList;

@Transactional
@Service
public class MemorandumServiceImpl implements MemorandumService {

	@Autowired
	private MemorandumMapper memorandumMapper;
	
	@Override
	public void addMemorandum(Memorandum me) {//添加备忘
		memorandumMapper.addMemorandum(me);
	}

//	@Override
//	public List<Memorandum> listMemorandum(int uid) {//显示所有备忘录
//		return memorandumMapper.listMemorandum(uid);
//	}

	// 显示所有备忘录[分页查询]
	@Override
	public PageBean<Memorandum> listMemorandum(int uid, Integer currentPage) {
		if (currentPage == null) {
			currentPage = 0;
		}

		int pageRecord = 6;// 每页记录数
		int allRecord = memorandumMapper.findMemorandumCount(uid);// 查询备忘录总记录数
		
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
		List<Memorandum> pageList = memorandumMapper.findMemorandumList(map);// 分页查询,备忘录 的当前页记录列表

		PageBean<Memorandum> pageBean = new PageBean<Memorandum>();
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
//		return memorandumMapper.listMemorandum(uid);
//		return null;
	}
	
	
	@Override
	public Memorandum oneMemorandum(Memorandum me) {// 当前备忘录
		return memorandumMapper.oneMemorandum(me);
	}

	@Override
	public void editMemorandum(Memorandum memorandum) {// 编辑备忘录
		memorandumMapper.editMemorandum(memorandum);
	}

	@Override
	public void deleteMemorandum(int mid) {// 删除备忘录
		memorandumMapper.deleteMemorandum(mid);
	}

	@Override
	public int findMemorandumCount(int uid) {// 查询备忘录总记录数
		return memorandumMapper.findMemorandumCount(uid);// 查询备忘录总记录数
	}



}
