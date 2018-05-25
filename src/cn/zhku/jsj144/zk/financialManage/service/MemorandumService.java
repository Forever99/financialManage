package cn.zhku.jsj144.zk.financialManage.service;

import java.util.List;

import cn.zhku.jsj144.zk.financialManage.pojo.Memorandum;
import cn.zhku.jsj144.zk.financialManage.pojo.PageBean;

public interface MemorandumService {

	void addMemorandum(Memorandum me);//添加备忘

	PageBean<Memorandum> listMemorandum(int uid, Integer currentPage);// 显示所有备忘录[分页查询]

	Memorandum oneMemorandum(Memorandum me);// 当前备忘录

	void editMemorandum(Memorandum memorandum);// 编辑备忘录

	void deleteMemorandum(int mid);// 删除备忘录

	int findMemorandumCount(int uid);// 查询备忘录总记录数

}
