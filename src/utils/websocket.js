import store from '@/store'
class WebSocketClient {
    constructor(config = {}) {
        const defaultConfig = {
            url: '127.0.0.1',
            port: '3001',
            protocol: 'ws'
        }
        const finalConfig = {
            ...defaultConfig,
            ...config
        }
        this.ws = {}
        this.port = finalConfig.port
        this.url = finalConfig.url
        this.protocol = finalConfig.protocol
    }

    init() {
        this.ws = new WebSocket(`${this.protocol}://${this.url}:${this.port}`)
        this.ws.onopen = this.onOpen
        this.ws.onmessage = this.onMessage
        this.ws.onclose = this.onClose
        this.ws.onerror = this.onError
    }

    send(msg) {
        this.ws.send(msg)
    }

    onOpen() {
        // 连接成功之后发起鉴权请求
        this.send(
            JSON.stringify({
                event: 'auth',
                message: `Bearer ${store.state.token}`
            })
        )
    }
    onMessage(event) {
        // 如果当前客户端未进入聊天室，则不接收任何消息
        if (this.isEnterChat) {
            return
        }
        // 接收服务端发过来的消息
        var obj = JSON.parse(event.data)

        switch (obj.event) {
            case 'noauth':
                // 鉴权失败
                // 路由跳转到 /login，重新获取token
                break
            case 'heartbeat':
                this.checkServer()
                this.ws.send(
                    JSON.stringify({
                        event: 'heartbeat',
                        message: 'pong'
                    })
                )
                break
            default:
                store.dispatch(obj.event, obj)
        }
    }
    onClose() {
        // 当连接主动断开的时候触发close事件
        console.log('close', this.ws.readyState)
        console.log('已关闭websocket')
        this.ws.close()
    }
    onError() {
        // 当连接失败时，触发error事件
        console.log('error', this.ws.readyState)
        setTimeout(() => {
            this.initWebSocket()
        }, 1000)
    }
}

export default WebSocketClient