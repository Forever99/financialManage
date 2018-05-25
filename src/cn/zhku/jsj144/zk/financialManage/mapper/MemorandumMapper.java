package cn.zhku.jsj144.zk.financialManage.mapper;

import java.util.List;
import java.util.Map;

import cn.zhku.jsj144.zk.financialManage.pojo.Memorandum;

public interface MemorandumMapper {

	//添加备忘
	void addMemorandum(Memorandum me);

	//显示所有备忘录
	List<Memorandum> listMemorandum(int uid);

	// 当前备忘录
	Memorandum oneMemorandum(Memorandum me);

	// 编辑备忘录
	void editMemorandum(Memorandum memorandum);

	// 删除备忘录
	void deleteMemorandum(int mid);

	
	// 查询备忘录总记录数
	int findMemorandumCount(int uid);

	// 分页查询,备忘录 的当前页记录列表
	List<Memorandum> findMemorandumList(Map<String, Object> map);

}
