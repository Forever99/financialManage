package cn.zhku.jsj144.zk.financialManage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.zhku.jsj144.zk.financialManage.mapper.NewsMapper;
import cn.zhku.jsj144.zk.financialManage.pojo.News;
import cn.zhku.jsj144.zk.financialManage.pojo.PageBean;
import cn.zhku.jsj144.zk.financialManage.pojo.ShouzhiCategory;

@Transactional
@Service
public class NewsServiceImpl implements NewsService {

	@Autowired
	private NewsMapper newsMapper;

	//添加新闻
	@Override
	public void addNews(News news) {
		newsMapper.addNews(news);
	}

	//分页查询新闻列表[10条记录]
	@Override
	public PageBean<News> findNewsList(News news, Integer currentPage) {//封装分页Bean
		if (currentPage == null) {
			currentPage = 0;
		}

		int pageRecord = 10;// 每页记录数
		int allRecord = newsMapper.findNewsCount(news);// 查询新闻总记录数
		
		int allPage = 0;// 总页数
		if (allRecord % pageRecord == 0) {
			allPage = allRecord / pageRecord;
		} else {
			allPage = allRecord / pageRecord + 1;
		}
		int startPosition = currentPage * pageRecord;// 开始位置

		Map<String, Object> map = new HashMap<String, Object>();// 分页查询条件
		map.put("news", news);
		map.put("startPosition", startPosition);
		map.put("pageRecord", pageRecord);
		List<News> pageList = newsMapper.findNewsCurrentPageList(map);// 分页查询新闻当前页记录列表

		PageBean<News> pageBean = new PageBean<News>();
		pageBean.setAllPage(allPage);
		pageBean.setAllRecord(allRecord);
		pageBean.setCurrentPage(currentPage);
		pageBean.setPageRecord(pageRecord);
		pageBean.setStartPosition(startPosition);
		pageBean.setPageList(pageList);

//		//调试
		System.out.println("allRecord：" + allRecord);
		System.out.println("currentPage:"+currentPage);
		System.out.println("pageList.size()"+pageList.size());
		return pageBean;
	}
	
	//分页查询新闻列表 [12条记录]
	@Override
	public PageBean<News> findNewsList2(News news, Integer currentPage) {//封装分页Bean
		if (currentPage == null) {
			currentPage = 0;
		}

		int pageRecord = 12;// 每页记录数
		int allRecord = newsMapper.findNewsCount(news);// 查询新闻总记录数
		
		int allPage = 0;// 总页数
		if (allRecord % pageRecord == 0) {
			allPage = allRecord / pageRecord;
		} else {
			allPage = allRecord / pageRecord + 1;
		}
		int startPosition = currentPage * pageRecord;// 开始位置

		Map<String, Object> map = new HashMap<String, Object>();// 分页查询条件
		map.put("news", news);
		map.put("startPosition", startPosition);
		map.put("pageRecord", pageRecord);
		List<News> pageList = newsMapper.findNewsCurrentPageList(map);// 分页查询新闻当前页记录列表

		PageBean<News> pageBean = new PageBean<News>();
		pageBean.setAllPage(allPage);
		pageBean.setAllRecord(allRecord);
		pageBean.setCurrentPage(currentPage);
		pageBean.setPageRecord(pageRecord);
		pageBean.setStartPosition(startPosition);
		pageBean.setPageList(pageList);

//			//调试
		System.out.println("allRecord：" + allRecord);
		System.out.println("currentPage:"+currentPage);
		System.out.println("pageList.size()"+pageList.size());
		return pageBean;
	}
	

	//通过id查询当前新闻信息
	@Override
	public News queryNewsById(Integer nid) {
		return newsMapper.queryNewsById(nid);
	}

	//编辑新闻信息
	@Override
	public void editNews(News news) {
		newsMapper.editNews(news);
	}

	//删除新闻信息
	@Override
	public void deleteNews(int nid) {
		newsMapper.deleteNews(nid);
	}

	//查询当前所有新闻记录数
	@Override
	public int countNews() {
		return newsMapper.countNews();
	}

	//查出8条财务新闻，通过录入时间 和  访问量的多少来决定显示
	@Override
	public List<News> findNewsEightList() {
		return newsMapper.findNewsEightList();
	}
}
