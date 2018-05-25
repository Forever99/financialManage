package cn.zhku.jsj144.zk.financialManage.mapper;

import java.util.List;
import java.util.Map;

import cn.zhku.jsj144.zk.financialManage.pojo.News;

public interface NewsMapper {

	//添加新闻
	void addNews(News news);

	// 查询新闻总记录数
	int findNewsCount(News news);

	// 分页查询新闻当前页记录列表
	List<News> findNewsCurrentPageList(Map<String, Object> map);

	//通过id查询当前新闻信息
	News queryNewsById(Integer nid);

	//编辑新闻信息
	void editNews(News news);

	//删除新闻信息
	void deleteNews(int nid);

	//查询当前所有新闻记录数
	int countNews();

	//查出8条财务新闻，通过录入时间 和  访问量的多少来决定显示
	List<News> findNewsEightList();

}
