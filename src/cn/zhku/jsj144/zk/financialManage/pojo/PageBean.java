package cn.zhku.jsj144.zk.financialManage.pojo;

import java.util.List;
//分页实体类
/*
 	mysql的分页查询
 	SELECT * FROM table LIMIT 5,10; // 检索记录行 6-15 
           第一个参数5：开始位置
           第二个参数10：每页记录数
 参数关系
 （1）开始位置
 	startPosition=(currentPage-1)*pageRecord
 （2）总页数
  allRecord/pageRecord=allPage;
  if( allRecord%pageRecord!=0) 
    allPage=allPage+1;  总页数 allPage
  （3）每页记录数
    设置为8【固定】
    
 （4）当前页的记录数【mysql会完成，忽略】
  【1】最后一页记录数=allRecord-(currentPage-1)*pageRecord
  【2】其他页记录数=pageRecord
 */
public class PageBean<T> {

	private int startPosition;//开始位置
	private int currentPage;//当前页
	private int allPage;//总页数
	private int pageRecord;//每页记录数   
	private int allRecord;//总记录数
	
	private List<T> pageList;//当前页记录（实际数据）
	
	public int getStartPosition() {
		return startPosition;
	}
	public void setStartPosition(int startPosition) {
		this.startPosition = startPosition;
	}
	public int getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
	public int getAllPage() {
		return allPage;
	}
	public void setAllPage(int allPage) {
		this.allPage = allPage;
	}
	public int getPageRecord() {
		return pageRecord;
	}
	public void setPageRecord(int pageRecord) {
		this.pageRecord = pageRecord;
	}
	public int getAllRecord() {
		return allRecord;
	}
	public void setAllRecord(int allRecord) {
		this.allRecord = allRecord;
	}
	public List<T> getPageList() {
		return pageList;
	}
	public void setPageList(List<T> pageList) {
		this.pageList = pageList;
	}
}
