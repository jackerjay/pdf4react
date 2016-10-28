# pdf4react
### 一个简单的可批注pdf的react组件
[![npm](https://img.shields.io/npm/v/pdf4react.svg)](https://www.npmjs.com/package/pdf4react)
[![](http://progressed.io/bar/70?title=progress)](https://github.com/fehmicansaglam/progressed.io)
[![npm](https://img.shields.io/npm/l/express.svg)](https://www.npmjs.com/package/pdf4react)

## 安装组件

    npm install pdf4react --save

## 使用组件

    import React,{Component} from 'react';
    import PDF from 'pdf4react';

    class example extends Component{
        render() {
            return(
                <PDF url="test.pdf" />
            )
        }
    }

## 一些设定项(props)

    url : pdf文件地址(必须，仅支持url方式加载)
    scale : 页面缩放比例，默认为1
    action : 在使用批注(annotation)或批注显示(view)模式时，编辑后保存所发送到或者需要获取数据的Action地址
    model : 显示模式，默认为显示正常'pdf'模式，可选有'annotation'即批注编辑模式和'view'即批注显示模式
    EnableRenderTextDiv : 是否渲染Div文字层(默认关闭，可以用于复制或文字选择)
    AnnotationViewerOpacity : 批注层(canvas)的透明度
    AnnotationLineWidth : 右侧批注Div的偏移量，默认400

## 模式简述
  * 'pdf'模式

  ![](https://github.com/jackerjay/pdf4react/blob/master/img/pdf.png)

  * 'annotation'批注模式

  ![](https://github.com/jackerjay/pdf4react/blob/master/img/annotation.png)

  * 'view'批注显示模式
  
  ![](https://github.com/jackerjay/pdf4react/blob/master/img/annotation.png)

## 数据交互格式
```
{"annotation" : [
  {
    "type": "rect",     //批注类型，目前只有'rect'矩形模式
    "location": {       //批注渲染位置，相对于pdf的渲染区域
      "startX": 271,    //起始X坐标
      "startY": 103,    //起始Y坐标
      "endX": 431,      //终止X坐标
      "endY": 150       //终止Y坐标
      },
      "textId": 0,      //批注编号
      "color": "rgba(0, 128, 0, 0.5)",  //色彩
      "text": "这是一条测试" //批注的内容
    },
    {
      "type": "rect",
      "location": {
        "startX": 105,
        "startY": 276,
        "endX": 278,
        "endY": 298
      },
      "textId": 1,
      "color": "rgba(255, 0, 0, 0.498039)",
      "text": "这是另外一条测试"
    }
]
}
```

## 接下来要做什么

	1）总体评价
  2) 一些优化改进

## 开源协议

<img src="https://opensource.org/files/osi_keyhole_300X300_90ppi_0.png" height="20" width="20"/>[MIT](https://opensource.org/licenses/MIT)
