import {
    getCode
} from "@/api/login";

import uuid from "uuid/v4";

export default {

    data() {
        return {
            code: '',
            svg: ''
        }
    },

    mounted() {
        let sid = ''
        if (localStorage.getItem('sid')) {
            sid = localStorage.getItem('sid')
        } else {
            sid = uuid()
            localStorage.setItem('sid', sid)
        }
        this.$store.commit('setSid', sid)
        this._getCode()
    },

    methods: {
        _getCode() {
            let sid = this.$store.state.sid
            getCode(sid).then(res => {
                if (res.code === 200) {
                    this.svg = res.data
                }
            })
        },
        resetForm(ruleForm) {
            this.$refs[ruleForm].resetFields();
        },
    }
}