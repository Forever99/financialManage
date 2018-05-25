package cn.zhku.jsj144.zk.financialManage.service;

import java.util.Map;

public interface FinancialAnalysisService {

	int findMonthincomeRecordCount(Map<String, String> paramMap);//收入记录

	int findMonthspendsRecordCount(Map<String, String> paramMap);//支出记录

	int findMonthincomeMoney(Map<String, String> paramMap);//收入金额

	int findMonthspendsMoney(Map<String, String> paramMap);//支出金额


}
