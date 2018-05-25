package cn.zhku.jsj144.zk.financialManage.service;

import java.util.List;
import java.util.Map;

import cn.zhku.jsj144.zk.financialManage.pojo.DayCount;
import cn.zhku.jsj144.zk.financialManage.pojo.MonthCount;
import cn.zhku.jsj144.zk.financialManage.pojo.PageBean;
import cn.zhku.jsj144.zk.financialManage.pojo.ShouzhiRecord;
import cn.zhku.jsj144.zk.financialManage.pojo.User;

public interface ShouzhiRecordService {

	//查询账单明细
	PageBean<ShouzhiRecord> findShouzhiRecord(int currentPage, User user, ShouzhiRecord shouzhiRecord);

	//根据id查询收支记录信息
	ShouzhiRecord findShouzhiRecordById(Map<String, Integer> map);

	//修改用户收支信息
	void editShouzhiRecord(ShouzhiRecord shouzhiRecord);

	//删除用户收支信息（一条）
	void deleteOneShouzhiRecord(int id);

	//批量删除用户收支信息（批量，多条）
	void deleteBatchShouzhiRecord(String id);

	//添加收支记录信息（收入 或者  支出）  
	void addShouzhiRecord(ShouzhiRecord shouzhiRecord);
	/*------------------------年度统计---------------------------------------------*/
	//每个月的收入，支出统计      每个月的收入 -->月 ：金额
	List<MonthCount> findYearInMonthCountIncome(Map<String, String> paramMap);
	//每个月的收入，支出统计     每个月的支出 -->月 ：金额
	List<MonthCount> findYearInMonthCountSpend(Map<String, String> paramMap);

	//一年的，各种收入类别统计     
	List<MonthCount> findYearInCategoryCountIncome(Map<String, String> paramMap);

	//一年的，各种支出类别统计     
	List<MonthCount> findYearInCategoryCountSpend(Map<String, String> paramMap);
	
	/*------------------------月份统计---------------------------------------------*/
	//每天的收入统计       ->天：金额
	List<DayCount> findMonthInDayCountIncome(Map<String, String> paramMap);

	//每天的支出统计    -->天：金额
	List<DayCount> findMonthInDayCountSpend(Map<String, String> paramMap);

	//一个月的，各种收入类别统计    
	List<DayCount> findMonthInCategoryCountIncome(Map<String, String> paramMap);

	//一个月，各种支出类别统计
	List<DayCount> findMonthInCategoryCountSpend(Map<String, String> paramMap);

	/*------------------------时间统计---------------------------------------------*/
	//某个时间段的不同类型的收入统计
	List<DayCount> findDayInTimeCountIncomes(Map<String, String> paramMap);
	//某个时间段的不同类型的支出统计
	List<DayCount> findDayInTimeCountSpends(Map<String, String> paramMap);

	//通过收支类别id 查询是收入 还是 支出
	String findParentCategoryById(int szcid);

}
