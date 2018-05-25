package cn.zhku.jsj144.zk.financialManage.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.zhku.jsj144.zk.financialManage.pojo.Memorandum;
import cn.zhku.jsj144.zk.financialManage.pojo.PageBean;
import cn.zhku.jsj144.zk.financialManage.pojo.User;
import cn.zhku.jsj144.zk.financialManage.pojo.WishList;
import cn.zhku.jsj144.zk.financialManage.service.MemorandumService;

@Controller
@RequestMapping("/memorandum")
public class MemorandumController {

	@Autowired
	private MemorandumService memorandumService;

	@RequestMapping("/addMemorandum.action")
	// @ResponseBody
	public String addMemorandum(HttpServletRequest request, String editvalue)
			throws IOException {// 添加备忘

		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return "/index.jsp";// 重新登录
		}
		int uid = user.getUid();
		// 编辑器不为空时，才可以上传
		// System.out.println("editvalue:"+editvalue);//纯文本内容
		String topFont = null;
		if (editvalue.length() > 80) {
			topFont = editvalue.substring(0, 80);// 前83个字符的内容
													// --》前82个字符的内容--》前80个字符的内容
		} else {
			topFont = editvalue;
		}
		// System.out.println("topFont:"+topFont);
		// 拿到编辑器的内容
		String content = request.getParameter("editorValue");// 带有格式的内容
		// 当前时间 formatDate
		Date dt = new Date();
		String recordTime = null;
		DateFormat dFormat = new SimpleDateFormat("yyyy-MM-dd"); // HH表示24小时制；
		recordTime = dFormat.format(dt);

		// 将编辑器的内容写进文件里面 存储路径为：
		String realPath = "d:/upload"; // d盘的upload下
		// 生成唯一的文件名
		String filename = generateUUIDName();
		// 生成随机文件夹
		String savePath = generateSavePath(realPath, filename);

		// 最终的文件路径名 d:/upload/ 1/2 / xxx.txt
		String thingPath = savePath + filename + ".txt";

		// 创建文件对象
		File fileText = new File(thingPath);// 创建文件
		FileWriter fileWriter = new FileWriter(fileText);// 向文件写入对象写入信息
		fileWriter.write(content);// 向文件中写入String字符串的内容
		fileWriter.close();// 关闭

		// 调试
		// System.out.println("content:"+content);//带有格式的内容
		// System.out.println("topFont:"+topFont);//文章的头80个字符
		// System.out.println("recordTime:"+recordTime);
		// System.out.println("thingPath:"+thingPath);

		Memorandum me = new Memorandum();// 对象
		me.setRecordTime(recordTime);
		me.setThingPath(thingPath);
		me.setTopFont(topFont);
		me.setUser_id(uid);

		memorandumService.addMemorandum(me);// 添加备忘

		// request.setAttribute("content", content);//显示内容
		// request.setAttribute("editvalue", editvalue);

		// return "ok";
		return "/memorandum/listMemorandum.action";// 查询页面
	}

	@RequestMapping("/listMemorandum.action")
	public String listMemorandum(HttpServletRequest request,Integer currentPage, Model model) {// 显示所有备忘录[分页查询]

		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return "/index.jsp";// 重新登录
		}
		int uid = user.getUid();
		
		PageBean<Memorandum> pageBean = memorandumService.listMemorandum(uid,currentPage);// 显示所有备忘录[分页查询]
		if(pageBean.getPageList().size()==0){//确保为空
			pageBean.setPageList(null);
		}
		model.addAttribute("pageBean", pageBean);//分页查询结果
		
//		model.addAttribute("memorandumlist", memorandumlist);

		return "/jsp/memorandum/memorandum.jsp";
	}

	// 去编辑页面
	@RequestMapping("/oneMemorandum.action")
	public String oneMemorandum(HttpServletRequest request,int mid, Model model,Integer currentPage) {// 当前备忘录
																			// -->去编辑页面

		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return "/index.jsp";// 重新登录
		}
		int uid = user.getUid();
		
		Memorandum me=new Memorandum();//查询条件
		me.setUser_id(uid);
		me.setMid(mid);
		
		// 备忘录信息
		Memorandum memorandum = memorandumService.oneMemorandum(me);// 当前备忘录

		// 根据备忘录路径，读取备忘录文件内容，显示在页面上
		String thingPath = memorandum.getThingPath();// 备忘录路径
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
//					str.append("\r\n" + line);
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
//		System.out.println("content:"+content);
		
		model.addAttribute("content",content);
		model.addAttribute("memorandum",memorandum);//信息
		model.addAttribute("currentPage",currentPage);//记住当前页
		
		return "/jsp/memorandum/editmemorandum.jsp";// 到编辑页面
	}

	// 编辑备忘录
	@RequestMapping("/editMemorandum.action")
	public String editMemorandum(HttpServletRequest request,Memorandum memorandum,String editvalue, Model model,Integer currentPage) throws IOException {
		// 需要修改    【1】文件的内容：覆盖原来的文件     【2】文件的头80个字符
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return "/index.jsp";// 重新登录
		}
		int uid = user.getUid();
		
		// 编辑器不为空时，才可以上传
		String topFont = null;
		if (editvalue.length() > 80) {
			topFont = editvalue.substring(0, 80);// 前83个字符的内容    // --》前82个字符的内容--》前80个字符的内容
		} else {
			topFont = editvalue;
		}
		
		// 拿到编辑器的内容
		String content = request.getParameter("editorValue");// 带有格式的内容
		//写文件，到那个路径
		String thingPath = memorandum.getThingPath();//将编辑器的内容写到原来文件中，覆盖原来的文件
		//重写文件------------------------------------------------------------------------
		// 创建文件对象
		File fileText = new File(thingPath);// 创建文件
		FileWriter fileWriter = new FileWriter(fileText);// 向文件写入对象写入信息
		fileWriter.write(content);// 向文件中写入String字符串的内容
		fileWriter.close();// 关闭
		//修改-----------------------------------------------------------------------------
		memorandum.setTopFont(topFont);//修改的内容  字符
		memorandum.setUser_id(uid);
		//覆盖内容
		memorandumService.editMemorandum(memorandum);// 编辑备忘录
		
		return "/memorandum/listMemorandum.action?currentPage="+currentPage;// 查询页面
	}

	// 删除备忘录
	@RequestMapping("/deleteMemorandum.action")
//	@ResponseBody
	public String deleteMemorandum(HttpServletRequest request,int mid,Integer currentPage) {
		memorandumService.deleteMemorandum(mid);// 删除备忘录
		
		
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return "/index.jsp";// 重新登录
		}
		int uid = user.getUid();
		
		//查询数据库，现在又多少也数据，如果少了一页，则显示上一页的数据
		int pageRecord = 6;// 每页记录数
		
		int allPage = 0;// 总页数
		int allRecord = memorandumService.findMemorandumCount(uid);// 查询备忘录总记录数
		if (allRecord % pageRecord == 0) {
			allPage = allRecord / pageRecord;
		} else {
			allPage = allRecord / pageRecord + 1;
		}
		
		//当前页  vs  总页数
		if(currentPage>allPage-1){
			currentPage=currentPage-1;
		}
//		return "ok";
		return "/memorandum/listMemorandum.action?currentPage="+currentPage;// 查询页面
	}

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
