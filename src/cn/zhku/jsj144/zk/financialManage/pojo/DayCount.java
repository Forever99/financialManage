package cn.zhku.jsj144.zk.financialManage.pojo;


/*
 *用途：在绘制图表时需要：（1）每天的收入，支出金额
 *				       （2）一个月[28，或29，或30，或31天]的各种类型的收入，支出金额】 
 */
public class DayCount {
	private int dayName;//天
	private int moneyName;//金额
	private String categoryName;//类型名
	public int getDayName() {
		return dayName;
	}
	public void setDayName(int dayName) {
		this.dayName = dayName;
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