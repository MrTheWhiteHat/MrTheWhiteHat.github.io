function onRightClick() {
     
    var container = document.getElementById('bd');  
    var menu = document.getElementById('menu');
    
    /*返回鼠标位置值*/
    function mousePosition(event) {
        if (event.pageX || event.pageY) { //firefox、chrome等浏览器
            return {
                x: event.pageX,
                y: event.pageY
            };
        }
        return { // IE浏览器
            x: event.clientX + document.body.scrollLeft - document.body.clientLeft, // scrollLeft:设置或获取位于对象左边界和窗口中目前可见内容的最左端之间的距离
            // 如果元素是可以滚动的,可以通过这俩个属性得到元素在水平和垂直方向上滚动了多远,单位是象素. 对于不可以滚动的元素,这些值总是0.
            y: event.clientY + document.body.scrollTop - document.body.clientTop
                // clientLeft,clientTop 这两个返回的是元素周围边框的厚度,如果不指定一个边框或者不定位改元素,他的值就是0.
        };
    }
    
    /*显示菜单*/
    function showMenu() {
 
        var evt = window.event || arguments[0];

        var mousePos = mousePosition(evt);

        //console.log(mousePos.x)
        //console.log(mousePos.y)
        /*获取当前鼠标右键按下后的位置，据此定义菜单显示的位置*/
        var rightedge = container.clientWidth - mousePos.x; // 光标距离container对象的距离
        //console.log(container.clientWidth) //container对象的宽度
        //console.log(rightedge); 
        /*clientHeight, clientWidth: 
        这两个属性大体上显示了元素内容的象素高度和宽度.理论上说这些测量不考虑任何通过样式表加入 
        元素中的页边距,边框等. 是对象可见的宽度，不包滚动条等边线，会随窗口的显示大小改变。
        */
        var bottomedge = Math.abs(container.offsetHeight - mousePos.y); // 光标距离container对象底边的距离
        
        //console.log(container.offsetHeight); // container.clientHeight: 就是对象可以看见的窗口高度，不是实际窗口高度
        //console.log(bottomedge);

        //console.log(menu.offsetWidth) // 菜单的宽度 209px
        //console.log(menu.offsetHeight) // 菜单的高度 409px

        /*如果从鼠标位置到容器右边的空间小于菜单的宽度，就定位菜单的左坐标（Left）为当前鼠标位置向左一个菜单宽度*/
        if (rightedge < menu.offsetWidth) {//  offsetHeight 是自身元素的宽度            
            menu.style.left = /*container.scrollLeft + */mousePos.x - menu.offsetWidth + 5 + "px"; 
            // console.log(container.scrollLeft) // container对象左边距窗口左边的距离
        }   else {
        /*否则，就定位菜单的左坐标为当前鼠标位置*/
            menu.style.left = /*container.scrollLeft + */mousePos.x - 5 + "px";
        }    
        /*如果从鼠标位置到容器下边的空间小于菜单的高度，就定位菜单的上坐标（Top）为当前鼠标位置向上一个菜单高度*/
        if (bottomedge < menu.offsetHeight)
            menu.style.top = /*container.scrollLeft + */mousePos.y  - menu.offsetHeight + 5 + "px";
        else
        /*否则，就定位菜单的上坐标为当前鼠标位置*/
            menu.style.top =  mousePos.y - 5 + "px";
             
        /*设置菜单可见*/
        menu.style.visibility = "visible";             
        LTEvent.addListener(menu,"contextmenu",LTEvent.cancelBubble);
    }
    /*隐藏菜单*/
    function hideMenu() {
        menu.style.visibility = 'hidden';
    } 

    LTEvent.addListener(container,"contextmenu",LTEvent.cancelBubble);
    LTEvent.addListener(container,"contextmenu",showMenu);
    LTEvent.addListener(menu,"mouseleave",hideMenu); // 给元素增加事件的监听             
}
