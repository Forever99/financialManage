package cn.zhku.jsj144.zk.financialManage.mapper;

import cn.zhku.jsj144.zk.financialManage.pojo.Budget;

public interface BudgetMapper {

	//Ìí¼ÓÔ¤Ëã
	void addBudget(Budget budget);

	//²éÕÒµ±Ç°ÔÂ·İÊÇ·ñ´æÔÚÔ¤Ëã
	Budget findBudget(Budget budget);

	//±à¼­Ô¤Ëã
	void editBudget(Budget budget);

	//É¾³ıÔ¤Ëã
	void deleteBudget(int wid);

}
