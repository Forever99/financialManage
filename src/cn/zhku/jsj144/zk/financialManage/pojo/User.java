package cn.zhku.jsj144.zk.financialManage.pojo;

//import java.io.Serializable;

public class User{//  implements Serializable没有序列化接口，重启tomcat会导致session消失
	private int uid;//用户编号
	private String username;//用户名称
	private String password;//密码
	private String sex;//性别
	private String email;//密码
	private String phone;//手机
	
	public int getUid() {
		return uid;
	}
	public void setUid(int uid) {
		this.uid = uid;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
}
