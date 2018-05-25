package cn.zhku.jsj144.zk.financialManage.pojo;

/*
 *用途：在绘制图表时需要【（1）每个月的收入，支出金额（2）一年[12个月]的各种类型的收入，支出金额】 
 */
public class MonthCount {
	private int monthName;//月份
	private int moneyName;//金额
	
	//粗心大意，mysql查询之类型不匹配
	//Invalid value for getInt()是一个java.sql.SQLException异常
	//查询SQL会看到查询的字段是vachar型  ,3但是我们使用mybatis时，写的返回值接收是int型，所以转换出错了
	//private int categoryName;//类型名  --错误
	
	private String categoryName;//类型名
	public int getMonthName() {
		return monthName;
	}
	public void setMonthName(int monthName) {
		this.monthName = monthName;
	}
	public int getMoneyName() {
		return moneyName;
	}
	public void setMoneyName(int moneyName) {
		this.moneyName = moneyName;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	
}
