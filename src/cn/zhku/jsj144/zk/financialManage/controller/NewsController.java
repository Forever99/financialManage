package cn.zhku.jsj144.zk.financialManage.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.zhku.jsj144.zk.financialManage.pojo.News;
import cn.zhku.jsj144.zk.financialManage.pojo.PageBean;
import cn.zhku.jsj144.zk.financialManage.service.NewsService;

@Controller
@RequestMapping("/news")
public class NewsController {

	@Autowired
	private NewsService newsService;
	
	//通过id，查询新闻信息
	@RequestMapping("/news.action")
	public String toEditPage(Integer nid,Model model){
		News news=newsService.queryNewsById(nid);//通过id查询当前新闻信息
		
		// 根据新闻路径，读取新闻文件内容，显示在页面上
		String thingPath = news.getnContent();//获取文章路径
		
		// 读取文件内容，写到String中
		int len = 0;
		StringBuffer str = new StringBuffer("");
		File file = new File(thingPath);
		try {
			FileInputStream is = new FileInputStream(file);
			InputStreamReader isr = new InputStreamReader(is);
			BufferedReader in = new BufferedReader(isr);
			String line = null;
			while ((line = in.readLine()) != null)
			{
				if (len != 0) // 处理换行符的问题
				{
					str.append(line);
				}
				else
				{
					str.append(line);
				}
				len++;
			}
			in.close();
			is.close();

		} catch (IOException e) {
			e.printStackTrace();
		}
		String content=str.toString();//内容
		System.out.println("content:"+content);//新闻内容
		
		model.addAttribute("content",content);
		model.addAttribute("news", news);//信息
		return "/jsp/news.jsp";// 到编辑页面
	}
	
	

	//新闻列表
	@RequestMapping("/findNewsList.action")
	public String findNewsList(News news,Integer currentPage,Model model){//无条件分页查询+有条件分页查询
		//查询条件：文章标题+文章作者+文章关键字     +  当前页 
		//当前页，默认情况下，currentPage=0   提交过来是第1页  
		
		model.addAttribute("findNews", news);
		
		PageBean<News> pageBean=newsService.findNewsList2(news,currentPage);//分页查询新闻列表
		if(pageBean.getPageList().size()==0){//确保为空
			pageBean.setPageList(null);
		}
		model.addAttribute("pageBean", pageBean);//分页查询结果
		
		return "/jsp/newsList.jsp";//收支分类结果
	}
}
