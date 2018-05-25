package cn.zhku.jsj144.zk.financialManage.pojo;

//收支类型
public class ShouzhiCategory {

	private int szcid;//收支类型编号
	private String parent_category;//收支类型（’收入’或者’支出’）
	private String son_category;//收支子类型
	
	public int getSzcid() {
		return szcid;
	}
	public void setSzcid(int szcid) {
		this.szcid = szcid;
	}
	public String getParent_category() {
		return parent_category;
	}
	public void setParent_category(String parent_category) {
		this.parent_category = parent_category;
	}
	public String getSon_category() {
		return son_category;
	}
	public void setSon_category(String son_category) {
		this.son_category = son_category;
	}
	
}
