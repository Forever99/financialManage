package cn.zhku.jsj144.zk.financialManage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.zhku.jsj144.zk.financialManage.mapper.ShouzhiRecordMapper;
import cn.zhku.jsj144.zk.financialManage.pojo.DayCount;
import cn.zhku.jsj144.zk.financialManage.pojo.MonthCount;
import cn.zhku.jsj144.zk.financialManage.pojo.PageBean;
import cn.zhku.jsj144.zk.financialManage.pojo.ShouzhiRecord;
import cn.zhku.jsj144.zk.financialManage.pojo.ShouzhiRecordQueryVo;
import cn.zhku.jsj144.zk.financialManage.pojo.User;

@Transactional
@Service
public class ShouzhiRecordServiceImpl implements ShouzhiRecordService {

	@Autowired
	private ShouzhiRecordMapper shouzhiRecordMapper;
	
	// 查询账单明细
	@Override
	public PageBean<ShouzhiRecord> findShouzhiRecord(int currentPage, User user, ShouzhiRecord shouzhiRecord) {
		
		// 开始位置
		int pageRecord = 8;// 每页记录数
//		int pageRecord = 6;// 每页记录数
		int startPosition=0;
		//注意：因为当前页   currentPage  比实际的当前页  少1
		//比如：currentPage=0时，当前页是第1页     ；    currentPage=1时，当前页是第2页  
		if(currentPage!=0){
			//失败
			//startPosition = (currentPage - 1) * pageRecord;// 开始位置
			startPosition = currentPage * pageRecord;// 开始位置
		}
		// 总记录数
		int allRecord = 0;
		//通过查询，获得总记录数【1】查询
		Map<String,Object> map=new HashMap<String,Object>();
		
		map.put("user", user);
//		System.out.println("map1:"+user.getUid());
		if(shouzhiRecord!=null){
			if(shouzhiRecord.getSzr_date()!=null&&shouzhiRecord.getSzr_date()!=""){
				map.put("szr_date", shouzhiRecord.getSzr_date());
//				System.out.println("map2:"+map.get("szr_date"));
			}
			if(shouzhiRecord.getSzr_comment()!=null&&shouzhiRecord.getSzr_comment()!=""){
				map.put("szr_comment", shouzhiRecord.getSzr_comment());
//				System.out.println("map3:"+map.get("szr_comment"));
			}
		}
//		System.out.println("map:----"+map.size());
		allRecord=shouzhiRecordMapper.findShouzhiRecordCount(map);
//		System.out.println("总记录数：------"+allRecord);
		// 总页数
		int allPage = allRecord / pageRecord;
		if (allRecord % pageRecord != 0)
			allPage = allPage + 1;
		
		//当前页记录数     【2】查询
		
		//mysql的分页查询   SELECT * FROM table LIMIT 5,10;  检索记录行 6-15 
		
	/*	Map<String,Object> map=new HashMap<String,Object>();
		map.put("uid", user.getUid()+"");//uid
		map.put("startPosition", startPosition+"");//startPosition
		map.put("pageRecord", pageRecord+"");//pageRecord
		//保存查询条件
		if(shouzhiRecord!=null){
			if(shouzhiRecord.getSzr_date()!=null){
				map.put("date_condition", shouzhiRecord.getSzr_date());
			}
			if(shouzhiRecord.getSzr_comment()!=null){
				map.put("comment_condition", shouzhiRecord.getSzr_comment());
			}
		}*/
		
		ShouzhiRecordQueryVo queryVo=new ShouzhiRecordQueryVo();
		queryVo.setUid(user.getUid());
		queryVo.setStartPosition(startPosition);
		queryVo.setPageRecord(pageRecord);
		//保存查询条件
		if(shouzhiRecord!=null){
			if(shouzhiRecord.getSzr_date()!=null&&shouzhiRecord.getSzr_date()!=""){
				queryVo.setSzr_date(shouzhiRecord.getSzr_date());
			}
			if(shouzhiRecord.getSzr_comment()!=null&&shouzhiRecord.getSzr_comment()!=""){
				queryVo.setSzr_comment(shouzhiRecord.getSzr_comment());
			}
		}
		
		//调试！！！！！
		/*System.out.println("uid:--------"+user.getUid());
		System.out.println("startPosition:--------"+startPosition);
		System.out.println("pageRecord:--------"+pageRecord);*/
		
		//收支明细
		//List<ShouzhiRecord> pageList=shouzhiRecordMapper.findCurrenPageRecordList(map);
		List<ShouzhiRecord> pageList=shouzhiRecordMapper.findCurrenPageRecordList(queryVo);
		/*调试
	 	if(pageList!=null){
			//空数据
			for (ShouzhiRecord shouzhiRecord : pageList) {
				System.out.println("记录id  id:"+shouzhiRecord.getShouzhiCategory().getSzcid());
			}
		}*/
		
		//分页查询情况
		PageBean<ShouzhiRecord> pageBean = new PageBean<ShouzhiRecord>();
		pageBean.setAllPage(allPage);
		pageBean.setAllRecord(allRecord);
		pageBean.setCurrentPage(currentPage);
		pageBean.setPageList(pageList);
		pageBean.setPageRecord(pageRecord);
		pageBean.setStartPosition(startPosition);
		
	/*	System.out.println("分页各项数据：allPage--"+allPage);
		System.out.println("分页各项数据：allRecord--"+allRecord);
		System.out.println("分页各项数据：currentPage--"+currentPage);
		System.out.println("分页各项数据：pageRecord--"+pageRecord);
		System.out.println("分页各项数据：startPosition--"+startPosition);*/
		return pageBean;
	}

	//根据id查询收支记录信息
	@Override
	public ShouzhiRecord findShouzhiRecordById(Map<String, Integer> map) {
		ShouzhiRecord shouzhiRecord=shouzhiRecordMapper.findShouzhiRecordById(map);
		return shouzhiRecord;
	}

	//修改用户收支信息
	@Override
	public void editShouzhiRecord(ShouzhiRecord shouzhiRecord) {
		shouzhiRecordMapper.editShouzhiRecord(shouzhiRecord);
	}

	//删除用户收支信息（一条）
	@Override
	public void deleteOneShouzhiRecord(int id) {
		shouzhiRecordMapper.deleteOneShouzhiRecord(id);		
	}

	//批量删除用户收支信息（批量，多条）
	@Override
	public void deleteBatchShouzhiRecord(String id) {
		String[] strArray = id.split(",");
		//System.out.println("测试："+strArray[0]+":"+strArray[1]);
		//批量删除记录
		for (String s : strArray) {
			shouzhiRecordMapper.deleteOneShouzhiRecord(Integer.parseInt(s));
		}
	}

	//添加收支记录信息（收入 或者  支出）  
	@Override
	public void addShouzhiRecord(ShouzhiRecord shouzhiRecord) {
		shouzhiRecordMapper.addShouzhiRecord(shouzhiRecord);
	}

	//每个月的收入，支出统计      每个月的收入 -->月 ：金额
	@Override
	public List<MonthCount> findYearInMonthCountIncome(Map<String, String> paramMap) {
		return shouzhiRecordMapper.findYearInMonthCountIncome(paramMap);
	}

	//每个月的收入，支出统计     每个月的支出 -->月 ：金额
	@Override
	public List<MonthCount> findYearInMonthCountSpend(Map<String, String> paramMap) {
		return shouzhiRecordMapper.findYearInMonthCountSpend(paramMap);
	}

	//一年的，各种收入类别统计     
	@Override
	public List<MonthCount> findYearInCategoryCountIncome(
			Map<String, String> paramMap) {
		return shouzhiRecordMapper.findYearInCategoryCountIncome(paramMap);
	}

	//一年的，各种支出类别统计     
	@Override
	public List<MonthCount> findYearInCategoryCountSpend(
			Map<String, String> paramMap) {
		return shouzhiRecordMapper.findYearInCategoryCountSpend(paramMap);
	}

	//每天的收入统计       ->天：金额
	@Override
	public List<DayCount> findMonthInDayCountIncome(
			Map<String, String> paramMap) {
		return shouzhiRecordMapper.findMonthInDayCountIncome(paramMap);
	}

	//每天的支出统计    -->天：金额
	@Override
	public List<DayCount> findMonthInDayCountSpend(
			Map<String, String> paramMap) {
		return shouzhiRecordMapper.findMonthInDayCountSpend(paramMap);
	}

	//一个月的，各种收入类别统计    
	@Override
	public List<DayCount> findMonthInCategoryCountIncome(
			Map<String, String> paramMap) {
		return shouzhiRecordMapper.findMonthInCategoryCountIncome(paramMap);
	}

	//一个月，各种支出类别统计
	@Override
	public List<DayCount> findMonthInCategoryCountSpend(
			Map<String, String> paramMap) {
		return shouzhiRecordMapper.findMonthInCategoryCountSpend(paramMap);
	}

	//某个时间段的不同类型的收入统计
	@Override
	public List<DayCount> findDayInTimeCountIncomes(Map<String, String> paramMap) {
		return shouzhiRecordMapper.findDayInTimeCountIncomes(paramMap);
	}

	//某个时间段的不同类型的支出统计
	@Override
	public List<DayCount> findDayInTimeCountSpends(
			Map<String, String> paramMap) {
		return shouzhiRecordMapper.findDayInTimeCountSpends(paramMap);
	}

	//通过收支类别id 查询是收入 还是 支出
	@Override
	public String findParentCategoryById(int szcid) {
		// TODO Auto-generated method stub
		return shouzhiRecordMapper.findParentCategoryById(szcid);
	}
}
