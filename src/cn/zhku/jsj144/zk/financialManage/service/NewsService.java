package cn.zhku.jsj144.zk.financialManage.service;

import java.util.List;

import cn.zhku.jsj144.zk.financialManage.pojo.News;
import cn.zhku.jsj144.zk.financialManage.pojo.PageBean;

public interface NewsService {

	//添加新闻
	void addNews(News news);

	//分页查询新闻列表
	PageBean<News> findNewsList(News news, Integer currentPage);//10条记录

	PageBean<News> findNewsList2(News news, Integer currentPage);//12条记录
	//通过id查询当前新闻信息
	News queryNewsById(Integer nid);

	//编辑新闻信息
	void editNews(News news);

	//删除新闻信息
	void deleteNews(int nid);

	//查询当前所有新闻记录数
	int countNews();

	//前台--------------------------------------------------------------
	
	//查出8条财务新闻，通过录入时间 和  访问量的多少来决定显示
	List<News> findNewsEightList();
	
	//查询显示，某条具体新闻信息
	//因为，后台中已经存在该代码，所以此处，不写
	//News queryNewsById(Integer nid);
}
