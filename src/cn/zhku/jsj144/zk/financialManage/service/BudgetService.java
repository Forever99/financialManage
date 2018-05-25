package cn.zhku.jsj144.zk.financialManage.service;

import cn.zhku.jsj144.zk.financialManage.pojo.Budget;

public interface BudgetService {

	void addBudget(Budget budget);//Ìí¼ÓÔ¤Ëã

	Budget findBudget(Budget budget);//²éÕÒµ±Ç°ÔÂ·İÊÇ·ñ´æÔÚÔ¤Ëã

	void editBudget(Budget budget);//±à¼­Ô¤Ëã

	void deleteBudget(int wid);//É¾³ıÔ¤Ëã

}
