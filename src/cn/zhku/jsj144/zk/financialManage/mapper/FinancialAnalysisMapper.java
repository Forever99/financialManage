package cn.zhku.jsj144.zk.financialManage.mapper;

import java.util.Map;

public interface FinancialAnalysisMapper {

	int findMonthincomeRecordCount(Map<String, String> paramMap);//收入记录

	int findMonthspendsRecordCount(Map<String, String> paramMap);//支出记录

	Integer findMonthincomeMoney(Map<String, String> paramMap);//收入金额

	Integer findMonthspendsMoney(Map<String, String> paramMap);//支出金额

}
