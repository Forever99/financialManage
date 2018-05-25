$(function() {

	//格式化日期
	function myformatter(date) {
	    //获取年份
	    var y = date.getFullYear();
	    //获取月份
	    var m = date.getMonth() + 1;
	    return y + '-' + m;
	}
	
   $('#attYearMonth').datebox({
       //显示日趋选择对象后再触发弹出月份层的事件，初始化时没有生成月份层
       onShowPanel: function () {
          //触发click事件弹出月份层
          span.trigger('click'); 
          if (!tds)
            //延时触发获取月份对象，因为上面的事件触发和对象生成有时间间隔
            setTimeout(function() { 
                tds = p.find('div.calendar-menu-month-inner td');
                tds.click(function(e) {
                   //禁止冒泡执行easyui给月份绑定的事件
                   e.stopPropagation(); 
                   //得到年份
                   var year = /\d{4}/.exec(span.html())[0] ,
                   //月份
                   //之前是这样的month = parseInt($(this).attr('abbr'), 10) + 1; 
                   month = parseInt($(this).attr('abbr'), 10);  

         //隐藏日期对象                     
         $('#attYearMonth').datebox('hidePanel') 
           //设置日期的值
           .datebox('setValue', year + '-' + month); 
                        });
                    }, 0);
            },
            //配置parser，返回选择的日期
            parser: function (s) {
                if (!s) return new Date();
                var arr = s.split('-');
                return new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, 1);
            },
            //配置formatter，只返回年月 之前是这样的d.getFullYear() + '-' +(d.getMonth()); 
            formatter: function (d) { 
                var currentMonth = (d.getMonth()+1);
                var currentMonthStr = currentMonth < 10 ? ('0' + currentMonth) : (currentMonth + '');
                return d.getFullYear() + '-' + currentMonthStr; 
            }
        });

        //日期选择对象
        var p = $('#attYearMonth').datebox('panel'), 
        //日期选择对象中月份
        tds = false, 
        //显示月份层的触发控件
        span = p.find('span.calendar-text'); 
        //var curr_time = new Date();

        //设置前当月
        //$("#attYearMonth").datebox("setValue", myformatter(curr_time));
        
});