package cn.zhku.jsj144.zk.financialManage.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.zhku.jsj144.zk.financialManage.pojo.User;
import cn.zhku.jsj144.zk.financialManage.service.ShouzhiCategoryService;
import cn.zhku.jsj144.zk.financialManage.service.ShouzhiRecordService;
import cn.zhku.jsj144.zk.financialManage.service.UserService;

@Controller
@RequestMapping("/user")   //访问路径是  /user/xxx
public class UserController {
	@Autowired
	private UserService userService;
	
	@Autowired
	private ShouzhiCategoryService shouzhiCategoryService;
	
	//用户登录
	@RequestMapping("login.action")
	public String login(User user,HttpServletRequest request){
		System.out.println("用户名和密码："+user.getUsername()+"::"+user.getPassword());
		//获得用户名和密码，判断是否存在
		User findUser=userService.queryUserByUser(user);
		
		if(findUser!=null){
			System.out.println("查找的用户名和密码："+findUser.getUsername()+"::"+findUser.getPassword());
		}
		System.out.println("");
		//1.存在，保存到session中  ； 然后   跳转到主页面
		if(findUser!=null){
			HttpSession session = request.getSession();
			session.setAttribute("user", findUser);
//			System.out.println("id----------------------"+findUser.getUid());
			
			//通过父类型，从而查询出该父类型的所有子类型，从而进行显示
			//List<String> son=shouzhiCategoryService.findSonCategoryByParent(parent_category);
			
			//查询账单明细
			return "redirect:/shouzhiRecord/findShouzhiRecord.action";
			
			//return "/jsp/main.jsp";//跳转到主页
		}
		
		//2.不存在，返回登录失败信息
		String msg="用户名或者密码输入错误，请重新输入";
		request.setAttribute("msg", msg);
		return "/index.jsp";//跳转到登录页面
	}
	
	//通过用户名   判断用户是否存在
	@RequestMapping(value="findUserByNameAndAjax.action",method=RequestMethod.POST)
	public @ResponseBody String findUserByNameAndAjax(@RequestBody User user){
		//@ResponseBody 返回将java对象转为json格式的数据
		//@RequestBody 获得json格式的数据转为java对象
		
		//通过用户名查询用户是否存在
		User findUser=userService.queryUserByUsername(user.getUsername());
		if(findUser!=null){
			System.out.println("{\"name\":\"exit\"}");
			//存在
			return "{\"name\":\"exit\"}";//json格式
		}
		else{
			System.out.println("{\"name\":\"notexit\"}");
			return "{\"name\":\"notexit\"}";//不存在
		}
	}
	
	//修改密码（找回密码）
	@RequestMapping("updatePasswordByUsername.action")
	public  String updatePasswordByUsername(User user,HttpServletRequest request){
		userService.updatePasswordByUsername(user);
		request.setAttribute("msg", "密码修改成功，请登录");
		return "/index.jsp";
	}
	
	//用户注册（添加用户）
	@RequestMapping("regist.action")
	public String regist(User user,String repassword,HttpServletRequest request){
		//判断是否存在
		//通过用户名查询用户是否存在
		User findUser=userService.queryUserByUsername(user.getUsername());
		if(findUser!=null){
			//存在
			request.setAttribute("msg", "当前用户已经存在，请重新输入用户名");
			request.setAttribute("user", user);//保存原来的输入数据
			request.setAttribute("repassword", repassword);
			return"/regist.jsp";//json格式
		}
		
		//插入时，添加自增主键，所以此时的User中是有主键id的，即：有完整的user表的信息
		userService.insertUser(user);
		//直接跳转到主页面【自动登录】
		//注册完，之后保存登录信息
		HttpSession session = request.getSession();
		session.setAttribute("user", user);//保存登录信息
		
		//return "/jsp/main.jsp";//用户主页
		
		//跳转到   去查询    查询账单明细
		return "redirect:/shouzhiRecord/findShouzhiRecord.action";
	}

	
	//到用户信息设置页面
	@RequestMapping("/toUserSetting.action")
	public String toUserSetting(HttpServletRequest request){
		User user=(User) request.getSession().getAttribute("user");
		request.setAttribute("user", user);
		return "/jsp/userSetting.jsp";
	}
		
		
		
	//用户信息设置
	@RequestMapping("/editUser.action")
//	@ResponseBody
	public String editUser(HttpServletRequest request,User user,String oldusername){
		
		//判断用户名是否修改后的已经存在
		String username = user.getUsername();//修改后的名字
		System.out.println("当前用户名："+username);
		System.out.println("之前的用户名："+oldusername);
		if(username!=""&&username!=null){
			System.out.println("用户名不为空。。。。。。。。。。。。。。");
			
//			if(username!=oldusername){//比较的是地址？？？？
			if(!username.equals(oldusername)){
				//判断是否已经存在与数据库中
				User findUser = userService.queryUserByUsername(username);
				if(findUser==null){
					System.out.println("用户名不存在，是新的用户。。。。。。。。。。。。。。");
					//新注册的用户，进行修改
					userService.editUser(user);//用户信息设置
					request.getSession().setAttribute("user", user);//覆盖原来的user
					return  "redirect:/shouzhiRecord/findShouzhiRecord.action";
				}
				else{
					System.out.println("该用户已存在，请修改当前用户名");
					//提醒用户重新输入新的用户名
					user.setUsername(findUser.getUsername());
					request.setAttribute("user", user);
					//因为session的原因，导致信息一致回显失败
//					request.getSession().setAttribute("user", user);//回显信息
					request.setAttribute("msg", "该用户已存在，请修改当前用户名");
					return  "/jsp/userSetting.jsp";
				}
			}
			else{
				System.out.println("是当前用户，只是修改了一些用户的信息");
				//直接修改，出用户名之外的信息
				userService.editUser(user);//用户信息设置
				request.getSession().setAttribute("user", user);//覆盖原来的user
				return  "redirect:/shouzhiRecord/findShouzhiRecord.action";
			}
		}
		else{
			System.out.println("用户名为空，请保证用户名不能为空");
//			user.setUsername(oldusername);
			request.setAttribute("user", user);//回显信息
//			request.getSession().setAttribute("user", user);//回显信息
			request.setAttribute("msg", "用户名不能为空");
			return  "/jsp/userSetting.jsp";
		}
		
		
		
	}
	
	//用户退出登录
	@RequestMapping("/logout.action")
	public String logout(HttpServletRequest request){
		request.getSession().removeAttribute("user");//删除session
		return "/index.jsp";
	}
	
}
