package cn.zhku.jsj144.zk.financialManage.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;

import cn.zhku.jsj144.zk.financialManage.pojo.News;
import cn.zhku.jsj144.zk.financialManage.pojo.PageBean;
import cn.zhku.jsj144.zk.financialManage.pojo.News;
import cn.zhku.jsj144.zk.financialManage.pojo.User;
import cn.zhku.jsj144.zk.financialManage.service.NewsService;
@Controller
@RequestMapping("/newsManage")
public class NewsManageController { 

	@Autowired
	private NewsService newsService;
	
	//新闻列表
	@RequestMapping("/findNewsList.action")
	public String findNewsList(News news,Integer currentPage,Model model){//无条件分页查询+有条件分页查询
		//查询条件：文章标题+文章作者+文章关键字     +  当前页 
		//当前页，默认情况下，currentPage=0   提交过来是第1页  
		
		model.addAttribute("findNews", news);
		
		PageBean<News> pageBean=newsService.findNewsList(news,currentPage);//分页查询新闻列表
		if(pageBean.getPageList().size()==0){//确保为空
			pageBean.setPageList(null);
		}
		model.addAttribute("pageBean", pageBean);//分页查询结果
		
		return "/admin/newsManage.jsp";//收支分类结果
	}
	
	//添加新闻
	@RequestMapping("/addNews.action")
	public String addNews(News news, MultipartFile file,String editvalue,HttpServletRequest request) throws IllegalStateException, IOException{//上传文件
		
		//判断逻辑，方式二的文件名不为空，则以方式的形式进行上传文件，否则，以方式一的形式进行上传文件
		
		String nContent=null;//上传的文件路径
		
		String realPath = "d:/upload/news"; // d盘的upload下的news下
		String uuidName = generateUUIDName();// 生成唯一的文件名
		String savePath = generateSavePath(realPath, uuidName);// 生成随机文件夹  --d:/upload/news/1/2/
//		System.out.println(file==null);//false
		//方式二：
		if(file.getOriginalFilename()!=""&&file.getOriginalFilename()!=null){//上传文件名不为空
			System.out.println("方式二：上传文件");
			String oriName = file.getOriginalFilename();// 获取文件名(xxx.xxx)
			String extName = oriName.substring(oriName.lastIndexOf("."));// 获取文件后缀
			nContent=savePath + uuidName + extName;//上传的文件名
			file.transferTo(new File(nContent));//springmvc上传文件
		}
		else{
			System.out.println("方式一：上传文件");
			// 拿到编辑器的内容
			//方式一：
			String content = request.getParameter("editorValue");// 获得输入编辑框的内容【带有格式的内容】    
			// 最终的文件路径名 d:/upload/news/1/2/ xxx.txt
			nContent = savePath + uuidName + ".txt";
			// 创建文件对象
			File fileText = new File(nContent);// 创建文件
			FileWriter fileWriter = new FileWriter(fileText);// 向文件写入对象写入信息
			fileWriter.write(content);// 向文件中写入String字符串的内容
			fileWriter.close();// 关闭
		}
	
		//添加新闻
		news.setnContent(nContent);//设置文件路径
		news.setVisitCount(0);//设置访问次数
		newsService.addNews(news);//添加新闻
		
		return "/newsManage/findNewsList.action";//上传成功   列表页面
	}
	
	
	//编辑新闻页面
	@RequestMapping("/toEditPage.action")
	public String toEditPage(Integer nid,Model model,Integer currentPage){
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
		System.out.println("content:"+content);
		
		model.addAttribute("content",content);
		model.addAttribute("news", news);//信息
		model.addAttribute("currentPage", currentPage);//保存当前页数
		return "/admin/news/editnews.jsp";// 到编辑页面
	}
	
	//编辑新闻信息
	@RequestMapping("/editNews.action")      //  修改文件内容！！！！！！！！！
	public String editNews(News news,String editvalue,HttpServletRequest request,Integer currentPage2) throws IOException{
		
		System.out.println("修改-------------------------");
		System.out.println(news.getAuthor()+"::"+news.getKeyword()+":::"+news.getnTitle()+":::"+news.getRecordTime());
		System.out.println("路径:"+news.getnContent());
		
		// 拿到编辑器的内容
		String content = request.getParameter("editorValue");// 带有格式的内容
		System.out.println("编辑器内容：--"+editvalue);
		//写文件，到那个路径
		String thingPath =news.getnContent();//将编辑器的内容写到原来文件中，覆盖原来的文件
		//重写文件
		File fileText = new File(thingPath);// 创建文件
		FileWriter fileWriter = new FileWriter(fileText);// 向文件写入对象写入信息
		fileWriter.write(content);// 向文件中写入String字符串的内容
		fileWriter.close();// 关闭
		
		//编辑新闻信息
		newsService.editNews(news); 
		return "redirect:/newsManage/findNewsList.action?currentPage="+currentPage2;//当前页，在分页的时候进行了保存
	}	
	
	//删除新闻信息
	@RequestMapping("/deleteNews.action")
	public String deleteNews(int  nid,Integer currentPage2){
		newsService.deleteNews(nid);//删除新闻信息
		
		//如果当前页，只有一条记录，删除后，应该返回上一页
		//每页记录是是10条，查询新闻的总记录数
		int pageRecord=10;
		int count=newsService.countNews();//查询当前所有新闻记录数
		int allPage=0;//当前总页数
		if(count%pageRecord==0){
			allPage=count/pageRecord;
		}
		else{
			allPage=count/pageRecord+1;
		}
		allPage=allPage-1;
		
		if(currentPage2>allPage){
			currentPage2=currentPage2-1;//上一页
		}
//		"/newsManage/findNewsList.action
		return "redirect:/newsManage/findNewsList.action?currentPage="+currentPage2;//当前页，在分页的时候进行了保存
	}
	
	
	//新闻详情页
	
	
	// 生成唯一的文件名
	private static String generateUUIDName() {
		return UUID.randomUUID().toString();
	}

	// 生成随机文件夹
	private static String generateSavePath(String realPath, String filename) {

		int hashCode = filename.hashCode();
		// 通过位运算，计算出一级和二级目录的数字
		int first = hashCode & (0xf);// 以及目录
		int second = (hashCode >> 4) & (0xf);// 二级目录
		String savePath = realPath + "/" + first + "/" + second + "/";
		File f = new File(savePath);
		if (!f.exists()) {
			f.mkdirs();// 创建多级目录
		}
		return savePath;// 保存路径
	}
}
