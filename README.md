# 12show

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### h5 json 格式
```
    h5Json: {
      // 默认背景音乐
      defaultMusic: {
        url: '',
        name: ''
      },
      // 设置
      setting: {
        coverImage: '',
        title: '',
        description: ''
      },
      // 页面
      pages: [{
        pageId: 1,
        title: '页面标题',
        // 这一页的背景图片
        background: {
          image: '',
          color: ''
        },
        music: {
          url: '',
          name: ''
        },
        items: [
          {
            id: 1,
            type: 'text',
            content: '这是内容',
            positionSize: {
              top: 200,
              left: 100,
              width: 200,
              height: 100
            },
            // 基本样式属性
            text: {
              padding: 0,
              borderWidth: 0,
              borderRadius: 0,
              borderColor: '#000',
              borderStyle: 'solid',
              backgroundColor: '',
              opacity: 1,
              fontFamily: 'none',
              fontSize: 16,
              color: '',
              textAlign: 'left',
              lineHeight: 1,
              letterSpacing: 0
            },
            transform: {
              rotate: 0
            },
            boxShadow: {
              hShadow: 0,
              vShadow: 0,
              blur: 0,
              spread: 0,
              color: ''
            },
            // 动画类型
            animate: [
              {
                animationName: 'fadeIn',
                animationDuration: 2,
                animationDelay: 0.4,
                animationIterationCount: 1,
                isInfinite: false
              }
            ]
          },
          {
            id: 2,
            type: 'img',
            content: 'http://d-pic-image.yesky.com/1080x-/uploadImages/2019/044/59/1113V6L3Q6TY.jpg',
            positionSize: {
              top: 100,
              left: 100,
              width: 100,
              height: 100
            },
            // 基本样式属性
            text: {
              backgroundColor: '#000',
              opacity: 100,
              padding: 0,
              borderWidth: 0,
              borderRadius: 0,
              borderColor: '#000',
              borderStyle: 'solid',
              fontSize: 16
            },
            transform: {
              rotate: 0
            },
            boxShadow: {
              hShadow: 0,
              vShadow: 0,
              blur: 0,
              spread: 0,
              color: ''
            },
            // 动画类型
            animate: [
              {
                animationName: 'fadeIn',
                animationDuration: 2,
                animationDelay: 0.4,
                animationIterationCount: 1,
                isInfinite: false
              }
            ],
            backgroundImage: ''
          }
        ]
      }
      ]
    }
```
