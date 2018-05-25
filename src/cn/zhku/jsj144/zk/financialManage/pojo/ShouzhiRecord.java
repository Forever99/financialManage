package cn.zhku.jsj144.zk.financialManage.pojo;

import java.util.Date;

//收支明细
public class ShouzhiRecord {
	private int szrid;//账单编号
	private int szr_num;//收支金额
	
	//注意：定义的数据类型是String类型
	private String szr_date;//收支日期
	
	//private Date szr_date;//收支日期
	
	private String szr_comment;//收支备注
	
	//外键
	//private int shouzhi_category_id;//收支类型编号
	private ShouzhiCategory shouzhiCategory;//收支类型对象
	
	//外键
	private int user_id;//用户编号
	
	public int getSzrid() {
		return szrid;
	}
	public void setSzrid(int szrid) {
		this.szrid = szrid;
	}
	public int getSzr_num() {
		return szr_num;
	}
	public void setSzr_num(int szr_num) {
		this.szr_num = szr_num;
	}
	public String getSzr_date() {
		return szr_date;
	}
	public void setSzr_date(String szr_date) {
		this.szr_date = szr_date;
	}
	public String getSzr_comment() {
		return szr_comment;
	}
	public void setSzr_comment(String szr_comment) {
		this.szr_comment = szr_comment;
	}
	/*public int getShouzhi_category_id() {
		return shouzhi_category_id;
	}
	public void setShouzhi_category_id(int shouzhi_category_id) {
		this.shouzhi_category_id = shouzhi_category_id;
	}*/
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	
	public ShouzhiCategory getShouzhiCategory() {
		return shouzhiCategory;
	}
	public void setShouzhiCategory(ShouzhiCategory shouzhiCategory) {
		this.shouzhiCategory = shouzhiCategory;
	}
}
