package cn.zhku.jsj144.zk.financialManage.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.zhku.jsj144.zk.financialManage.mapper.FinancialAnalysisMapper;

@Transactional
@Service
public class FinancialAnalysisServiceImpl implements FinancialAnalysisService {

	@Autowired
	private FinancialAnalysisMapper financialAnalysisMapper;
	
	
	@Override
	public int findMonthincomeRecordCount(Map<String, String> paramMap) {
		int count=financialAnalysisMapper.findMonthincomeRecordCount(paramMap);
		return count;//收入记录
	}

	@Override
	public int findMonthspendsRecordCount(Map<String, String> paramMap) {
		int count=financialAnalysisMapper.findMonthspendsRecordCount(paramMap);
		return count;//支出记录
	}

	@Override
	public int findMonthincomeMoney(Map<String, String> paramMap) {
		int num = 0;
		Integer count=financialAnalysisMapper.findMonthincomeMoney(paramMap);//此处查询返回之后的结果是null，所以将int改为integer来
		if(count==null){
			num=0;
		}
		else{
			num=count;
		}
		return num;//收入金额
	}

	@Override
	public int findMonthspendsMoney(Map<String, String> paramMap) {
		int num = 0;
		Integer count=financialAnalysisMapper.findMonthspendsMoney(paramMap);
		if(count==null){
			num=0;
		}
		else{
			num=count;
		}
		return num;//支出金额
	}

}
