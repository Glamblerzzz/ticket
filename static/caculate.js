(function (window, document) {
    'use strict'
  
    // 给hotcss开辟个命名空间，别问我为什么，我要给你准备你会用到的方法，免得用到的时候还要自己写。
    var hotcss = {};
  
    (function () {
      console.log()
      // 根据devicePixelRatio自定计算scale
      // 可以有效解决移动端1px这个世纪难题。
      var viewportEl = document.querySelector('meta[name="viewport"]') // 声明meta移动端的窗口
      var hotcssEl = document.querySelector('meta[name="hotcss"]') // 声明hotcss
      var dpr = window.devicePixelRatio || 1 // 获取页面的设备像素比
      var maxWidth = 540 // 移动端适配最大的宽度为540px
      var designWidth = 0 // 图纸宽度
      /**
       * 像素比大于3都为3
       * 2与3之间取2，其余取1
       */
      dpr = dpr >= 4 ? 4 : (dpr >= 3 ? 3 : dpr >= 2 ? 2 : 1)
  
      /**
       *允许通过自定义name为hotcss的meta头，通过initial-dpr来强制定义页面缩放
       */
      if (hotcssEl) {
      //   var hotcssCon = hotcssEl.getAttribute('content')
      //   if (hotcssCon) {
      //     var initialDprMatch = hotcssCon.match(/initial\-dpr=([\d\.]+)/)
      //     if (initialDprMatch) {
      //       dpr = parseFloat(initialDprMatch[1])
      //     }
      //     var maxWidthMatch = hotcssCon.match(/max\-width=([\d\.]+)/)
      //     if (maxWidthMatch) {
      //       maxWidth = parseFloat(maxWidthMatch[1])
      //     }
      //     var designWidthMatch = hotcssCon.match(/design\-width=([\d\.]+)/)
      //     if (designWidthMatch) {
      //       designWidth = parseFloat(designWidthMatch[1])
      //     }
      //   }
      }
      document.documentElement.setAttribute('data-dpr', dpr) // 页面dom设置data-dpr
      hotcss.dpr = dpr // hotcss对象中设置dpr属性
  
      document.documentElement.setAttribute('max-width', maxWidth) // 页面dom设置max-width
      hotcss.maxWidth = maxWidth // hotcss对象中设置maxWidth属性
  
      // 假设存在设计图纸的宽度
      if (designWidth) {
        document.documentElement.setAttribute('design-width', designWidth)
        hotcss.designWidth = designWidth
      }
      var scale = 1 / dpr // 缩放比例为1/页面的设备像素比
      // 设置content属性的值
      var content = 'width=device-width, initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=' + scale + ', user-scalable=no'
      // 如果存在viewportEl则设置content属性
      if (viewportEl) {
        viewportEl.setAttribute('content', content)
      } else {
        // 不存在的话添加viewport的meta标签
        viewportEl = document.createElement('meta')
        viewportEl.setAttribute('name', 'viewport')
        viewportEl.setAttribute('content', content)
        document.head.appendChild(viewportEl)
      }
    })()
  
    hotcss.px2rem = function (px, designWidth) {
      // 预判你将会在JS中用到尺寸，特提供一个方法助你在JS中将px转为rem。就是这么贴心。
      if (!designWidth) {
        // 如果你在JS中大量用到此方法，建议直接定义 hotcss.designWidth 来定义设计图尺寸;
        // 否则可以在第二个参数告诉我你的设计图是多大。
        designWidth = parseInt(hotcss.designWidth, 10)
      }
  
      return parseInt(px, 10) * 150 / designWidth / 20
    }
  
    hotcss.rem2px = function (rem, designWidth) {
      // 新增一个rem2px的方法。用法和px2rem一致。
      if (!designWidth) {
        designWidth = parseInt(hotcss.designWidth, 10)
      }
      // rem可能为小数，这里不再做处理了
      return rem * 20 * designWidth / 150
    }
  
    // 对，这个就是核心方法了，给HTML设置font-size。
    hotcss.mresize = function () {
      // 设置实际使用的宽度并获取屏幕的宽度
      var innerWidth = document.documentElement.getBoundingClientRect().width || window.innerWidth
      /**
       *如果实际使用的宽度除以像素比大于设定的最大的适配宽度
       *设置实际使用的实际宽度为(最大宽度*屏幕像素比)
       */
      if (hotcss.maxWidth && (innerWidth / hotcss.dpr > hotcss.maxWidth)) {
        innerWidth = hotcss.maxWidth * hotcss.dpr
      }
      // 不存在实际使用的宽度结束函数
      if (!innerWidth) {
        return false
      }
      // 根据实际的需求进行fontsize的设置
      document.documentElement.style.fontSize = (innerWidth * 20 / 150) + 'px'
  
      hotcss.callback && hotcss.callback()
    }
  
    hotcss.mresize()
    // 直接调用一次
  
    window.addEventListener('resize', function () {
      clearTimeout(hotcss.tid)
      hotcss.tid = setTimeout(hotcss.mresize, 33)
    }, false)
    // 绑定resize的时候调用
  
    window.addEventListener('load', hotcss.mresize, false)
    // 防止不明原因的bug。load之后再调用一次。
  
    setTimeout(function () {
      hotcss.mresize()
      // 防止某些机型怪异现象，异步再调用一次
    }, 333)
  
    window.hotcss = hotcss
    // 命名空间暴露给你，控制权交给你，想怎么调怎么调。
  })(window, document)