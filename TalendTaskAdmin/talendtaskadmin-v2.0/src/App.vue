<template>
<div id="app">
    <el-container>
        <el-header style="text-align: center; font-size: 12px">
            <el-upload ref="upload" :show-file-list="true" :action="uploadApi" :multiple="false" :limit="1" :auto-upload="false" :on-change="fileOnChange">
                <el-button slot="trigger" size="small" type="primary" @click="selFile">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            </el-upload>
        </el-header>

        <el-main>

        </el-main>
    </el-container>

</div>
</template>

<script>
import {
    apitest
} from "./js/api";

export default {
    name: "app",
    components: {

    },
    data() {
        return {
            uploadApiURL: 'http://localhost:8099/api/My/PostUpload?guid=',
            uploadFileName: ''
        };
    },
    mounted() {
        // this.getApiTest();
    },
    computed: {
        uploadApi() {
            return this.uploadApiURL + this.uploadFileName;
        }
    },
    methods: {
        getApiTest() {
            apitest({
                    city: 'b'
                })
                .then(res => {
                    if (res.status == 200) {

                        console.log(res.data.result);
                    }
                })
                .catch(error => {
                    console.log(error);

                });
        },
        selFile() {
            this.$refs.upload.clearFiles();

        },
        submitUpload() {
            // console.log('YCQ日志记录:标识->',this.$refs.upload);
            this.$refs.upload.submit();

        },
        fileOnChange(file, fileList) {
            let filename = file.name.split('.')[0];
            this.uploadFileName = filename;
        }
    }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}
</style>
