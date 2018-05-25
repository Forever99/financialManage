package cn.zhku.jsj144.zk.financialManage.pojo;

/*
map.put("uid", user.getUid()+"");//uid
map.put("startPosition", startPosition+"");//startPosition
map.put("pageRecord", pageRecord+"");//pageRecord
//保存查询条件
map.put("date_condition", shouzhiRecord.getSzr_date());
map.put("comment_condition", shouzhiRecord.getSzr_comment());

}*/
//保存查询时候的一些数据
public class ShouzhiRecordQueryVo {
	
	private int uid;//用户id
	private int startPosition;//开始位置
	private int pageRecord;//每页记录数
	private String szr_date;//查询--收支日期条件
	private String szr_comment;//查询--收支备注条件
	public int getUid() {
		return uid;
	}
	public void setUid(int uid) {
		this.uid = uid;
	}
	public int getStartPosition() {
		return startPosition;
	}
	public void setStartPosition(int startPosition) {
		this.startPosition = startPosition;
	}
	public int getPageRecord() {
		return pageRecord;
	}
	public void setPageRecord(int pageRecord) {
		this.pageRecord = pageRecord;
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
	
}
