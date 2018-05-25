package cn.zhku.jsj144.zk.financialManage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.zhku.jsj144.zk.financialManage.mapper.BudgetMapper;
import cn.zhku.jsj144.zk.financialManage.pojo.Budget;

@Transactional
@Service
public class BudgetServiceImpl implements BudgetService{

	@Autowired
	private BudgetMapper budgetMapper;

	@Override
	public void addBudget(Budget budget) {//Ìí¼ÓÔ¤Ëã
		budgetMapper.addBudget(budget);
	}

	@Override
	public Budget findBudget(Budget budget) {//²éÕÒµ±Ç°ÔÂ·İÊÇ·ñ´æÔÚÔ¤Ëã
		return budgetMapper.findBudget(budget);
	}

	@Override
	public void editBudget(Budget budget) {//±à¼­Ô¤Ëã
		 budgetMapper.editBudget(budget);
	}

	@Override
	public void deleteBudget(int wid) {//É¾³ıÔ¤Ëã
		 budgetMapper.deleteBudget(wid);
	}
}
