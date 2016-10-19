# pdf4react
### 一个简单的可批注pdf的react组件
[![npm](https://img.shields.io/npm/v/pdf4react.svg)](https://www.npmjs.com/package/pdf4react)
[![](http://progressed.io/bar/50?title=progress)](https://github.com/fehmicansaglam/progressed.io)
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

    

    url : pdf文件地址(必须)
    scale : 页面缩放比例，默认为1
    EnableAnnotation : 开启批注(默认关闭)
    EnableRenderTextDiv : 是否渲染Div文字层(默认关闭，可以用于复制或文字选择)
    AnnotationViewerOpacity : 批注层(canvas)的透明度
    AnnotationLineWidth : 右侧批注Div的偏移量，默认400

    

## 接下来要做什么

1) 增加数据保存，设定交互数据格式
2）总体评价
3）直线标注
4）修正标注删除时对画布上其他标注的影响

## 开源协议

<img src="https://opensource.org/files/osi_keyhole_300X300_90ppi_0.png" height="20" width="20"/>[MIT](https://opensource.org/licenses/MIT)