function divClick(){    
       var show="";    
       var apm = document.getElementsByName("hyzk");    
       for(var i=0;i<apm.length;i++){    
       if(apm[i].checked)    
        show = apm[i].value;    
       }    
       switch (show){       
           case '2':    
               document.getElementById("hy-s").style.display="block";      
               break;    
           case '3':    
               document.getElementById("hy-s").style.display="block";      
               break;  
		   case '4':    
               document.getElementById("hy-s").style.display="block";      
               break; 
		   case '5':    
               document.getElementById("hy-s").style.display="block";      
               break;   
           default:    
               document.getElementById("hy-s").style.display="none";    
               break;                                                                  
       }    
	}  
///

function divClick1(){    
       var show="";    
       var apm = document.getElementsByName("gxy");    
       for(var i=0;i<apm.length;i++){    
       if(apm[i].checked)    
        show = apm[i].value;    
       }    
       switch (show){       
           case '2':    
               document.getElementById("gxyBox").style.display="block";      
               break;    
           default:    
               document.getElementById("gxyBox").style.display="none";    
               break;                                                                  
       }    
	}  


//糖尿病
function divClick2(){    
       var show="";    
       var apm = document.getElementsByName("tnb");    
       for(var i=0;i<apm.length;i++){    
       if(apm[i].checked)    
        show = apm[i].value;    
       }    
       switch (show){       
           case '2':    
               document.getElementById("tnbBox").style.display="block";      
               break;    
           default:    
               document.getElementById("tnbBox").style.display="none";    
               break;                                                                  
       }    
	}  

//心脏病
function divClick3(){    
       var show="";    
       var apm = document.getElementsByName("xzb");    
       for(var i=0;i<apm.length;i++){    
       if(apm[i].checked)    
        show = apm[i].value;    
       }    
       switch (show){       
           case '2':    
               document.getElementById("xzbBox").style.display="block";      
               break;    
           default:    
               document.getElementById("xzbBox").style.display="none";    
               break;                                                                  
       }    
	}  
//脑中风
function divClick4(){    
       var show="";    
       var apm = document.getElementsByName("nzf");    
       for(var i=0;i<apm.length;i++){    
       if(apm[i].checked)    
        show = apm[i].value;    
       }    
       switch (show){       
           case '2':    
               document.getElementById("nzfBox").style.display="block";      
               break;    
           default:    
               document.getElementById("nzfBox").style.display="none";    
               break;                                                                  
       }    
	} 



//脑中风
function clickXyjl(){    
       var show="";    
       var apm = document.getElementsByName("xyjl");    
       for(var i=0;i<apm.length;i++){    
       if(apm[i].checked)    
        show = apm[i].value;    
       }    
       switch (show){       
           case '2':    
               document.getElementById("xyjlBox").style.display="block";      
               break;    
           default:    
               document.getElementById("xyjlBox").style.display="none";    
               break;                                                                  
       }    
	} 

//感冒
function clickGm(){    
       var show="";    
       var apm = document.getElementsByName("gm1");    
       for(var i=0;i<apm.length;i++){    
       if(apm[i].checked)    
        show = apm[i].value;    
       }    
       switch (show){       
           case '2':    
               document.getElementById("gmBox").style.display="block";      
               break;    
           default:    
               document.getElementById("gmBox").style.display="none";    
               break;                                                                  
       }    
	} 


//感冒
function clickGm4(){    
       var show="";    
       var apm = document.getElementsByName("gm4");    
       for(var i=0;i<apm.length;i++){    
       if(apm[i].checked)    
        show = apm[i].value;    
       }    
       switch (show){       
           case '2':    
               document.getElementById("gmBox4").style.display="block";      
               break;    
           default:    
               document.getElementById("gmBox4").style.display="none";    
               break;                                                                  
       }    
	} 

//二手烟
function clickEsy(){    
       var show="";    
       var apm = document.getElementsByName("esx");    
       for(var i=0;i<apm.length;i++){    
       if(apm[i].checked)    
        show = apm[i].value;    
       }    
       switch (show){       
           case '3':    
               document.getElementById("esxBox").style.display="block";      
               break;
		  case '4':    
               document.getElementById("esxBox").style.display="block";      
               break;   
		  case '5':    
               document.getElementById("esxBox").style.display="block";      
               break;    
           default:    
               document.getElementById("esxBox").style.display="none";    
               break;                                                                  
       }    
	} 

//有毒物质
function clickYdwz(){    
       var show="";    
       var apm = document.getElementsByName("ydwz");    
       for(var i=0;i<apm.length;i++){    
       if(apm[i].checked)    
        show = apm[i].value;    
       }    
       switch (show){       
           case '2':    
               document.getElementById("ydwzBox").style.display="block";      
               break;    
           default:    
               document.getElementById("ydwzBox").style.display="none";    
               break;                                                                  
       }    
	} 

//哮喘病
function clickXcb(){    
       var show="";    
       var apm = document.getElementsByName("xcb");    
       for(var i=0;i<apm.length;i++){    
       if(apm[i].checked)    
        show = apm[i].value;    
       }    
       switch (show){       
           case '2':    
               document.getElementById("xcbBox").style.display="block";      
               break;    
           default:    
               document.getElementById("xcbBox").style.display="none";    
               break;                                                                  
       }    
	} 
//
//

;(function($){
	$.fn.hcheckbox=function(options){
		$(':checkbox+label',this).each(function(){
			$(this).addClass('checkbox');
            if($(this).prev().is(':disabled')==false){
                if($(this).prev().is(':checked'))
				    $(this).addClass("checked");
            }else{
                $(this).addClass('disabled');
            }
		}).click(function(event){
				if(!$(this).prev().is(':checked')){
				    $(this).addClass("checked");
                    $(this).prev()[0].checked = true;
                }
                else{
                    $(this).removeClass('checked');			
                    $(this).prev()[0].checked = false;
                }
                event.stopPropagation();
			}
		).prev().hide();
	}

    $.fn.hradio = function(options){
        var self = this;
        return $(':radio+label',this).each(function(){
            $(this).addClass('hRadio');
            if($(this).prev().is("checked"))
                $(this).addClass('hRadio_Checked');
        }).click(function(event){
            $(this).siblings().removeClass("hRadio_Checked");
            if(!$(this).prev().is(':checked')){
				$(this).addClass("hRadio_Checked");
                $(this).prev()[0].checked = true;
            }
               
            event.stopPropagation();
        })
        .prev().hide();
    }
})(jQuery)



///全选
$(function () {
	$(".chc").click(function(){   
    	if(this.checked){   
        	$(".hc :checkbox").prop("checked", false);  
    	}
 	}); 
	$(".hc :checkbox").click(function(){
		allchk();
	});
}); 
function allchk(){
	var chknum = $(".hc :checkbox").size();
	var chk = 0;
	$(".hc :checkbox").each(function () {  
        if($(this).prop("checked")==true){
			chk++;
		}
    });
	if(chknum==chk){
		$(".chc").prop("checked",false);
	}else{
		$(".chc").prop("checked",false);
	}
}





//////
$(function () {
	$(".chc1").click(function(){   
    	if(this.checked){   
        	$(".hc1 :checkbox").prop("checked", false);  
    	}
 	}); 
	$(".hc1 :checkbox").click(function(){
		allchk1();
	});
}); 


function allchk1(){
	var chknum = $(".hc1 :checkbox").size();
	var chk = 0;
	$(".hc1 :checkbox").each(function () {  
        if($(this).prop("checked")==true){
			chk++;
		}
    });
	if(chknum==chk){
		$(".chc1").prop("checked",false);
	}else{
		$(".chc1").prop("checked",false);
	}
}

//////
$(function () {
	$(".chc2").click(function(){   
    	if(this.checked){   
        	$(".hc2 :checkbox").prop("checked", false);  
    	}
 	}); 
	$(".hc2 :checkbox").click(function(){
		allchk2();
	});
}); 


function allchk2(){
	var chknum = $(".hc2 :checkbox").size();
	var chk = 0;
	$(".hc2 :checkbox").each(function () {  
        if($(this).prop("checked")==true){
			chk++;
		}
    });
	if(chknum==chk){
		$(".chc2").prop("checked",false);
	}else{
		$(".chc2").prop("checked",false);
	}
}