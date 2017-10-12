# initArea
这是一个封装好的三级联动的下拉列表选择地区的jq函数

**引入文件**
```html
    <script src="js/jquery-1.12.3.min.js"></script>
    <script src="js/areaJsonData.js"></script>
    <script src="js/initArea.js"></script>
```

**初始化地区联动**
```html
    <script type="text/javascript">
        initArea('p',110101);//初始化的时候，如果有默认选中的地区，只需要添加多个参数就好，例如：initProvince('p',100100,100300,100301); 顺序(元素标签)(省)(市)(县)
    </script>
```