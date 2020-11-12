<template>
  <div id="merchantInformation">
    <div class="upData">
      <label class="btn btn-orange" for="uploads">上传LOGO</label>
      <input type="file" id="uploads" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImgg($event, 1)">
      <div class="line">
        <div class="cropper-content">
          <div class="cropper">
            <vueCropper ref="cropper" :img="option.img" :outputSize="option.size" :outputType="option.outputType" :info="true" :full="option.full" :canMove="option.canMove" :canMoveBox="option.canMoveBox" :original="option.original" :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" :fixedBox="option.fixedBox" @realTime="realTime" @imgLoad="imgLoad"></vueCropper>
          </div>
          <div style="margin-left:20px;">
            <div class="show-preview" :style="{'width': '150px', 'height':'155px',  'overflow': 'hidden', 'margin': '5px'}">
              <div :style="previews.div" class="preview">
                <img :src="previews.url" :style="previews.img">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { VueCropper } from 'vue-cropper'
export default {
  data () {
    return {
      crap: false,
      previews: {},
      option: {
        img: '',
        outputSize: 1, // 剪切后的图片质量（0.1-1）
        full: false, // 输出原图比例截图 props名full
        outputType: 'png',
        canMove: true,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        autoCropWidth: 132,
        autoCropHeight: 132,
        fixedBox: true,
        fixedNumber: [1, 1]
      },
      fileName: '', // 本机文件地址
      imgFile: '',
      imgurl: ''
    }
  },
  components: {
    VueCropper
  },
  methods: {
    AddImg () {
      this.$refs.cropper.getCropBlob(data => { // 把裁剪后的数据上传给后台
        console.log(data)
      })
    },
    // 实时预览函数
    realTime (data) {
      this.previews = data
      console.log(this.previews)
    },
    // 选择本地图片
    uploadImgg (e, num) {
      console.log('uploadImg')
      var _this = this
      // 上传图片
      var file = e.target.files[0]
      _this.fileName = file.name
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        this.$message({
          message: '图片类型必须是.gif,jpeg,jpg,png,bmp中的一种',
          type: 'warning'
        })
        return false
      }
      var reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        if (num === 1) {
          _this.option.img = data
        } else if (num === 2) {
          _this.example2.img = data
        }
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file)
    },
    imgLoad (msg) {
      console.log('imgLoad')
      console.log(msg)
    }
  }
}
</script>
<style lang="less">
.input_text .el-cascader .el-input .el-input__inner {
  width: 477px;
  height: 40px;
  border: 1px solid #f1f1f1;
}

.input_text .el-select .el-input .el-input__inner {
  width: 477px;
  height: 40px;
  border: 1px solid #f1f1f1;
}

#merchantInformation .upload-demo {
  display: flex;
}

#merchantInformation .upload-demo li {
  width: 100px;
  height: 113px;
  margin-top: 0px;
  display: inline-block;
}

#merchantInformation .el-date-editor.el-input,
.el-date-editor .el-input__inner {
  width: 477px;
  height: 40px;
}

#merchantInformation .upload-demo .el-upload-list {
  display: none;
}

</style>
<style lang="less" scoped>
#merchantInformation {
  height: 925px;
  width: 890px;
  box-shadow: 0px 0px 1px #dfdddd;
  background: #fff;
  overflow: hidden;
}

.uploadingLogo {
  margin-right: 80px;
}

// .uploadingLogoa{margin-right: 70px;}
.logoUrl {
  max-width: 300px;
  border-radius: 10px;
}

.propagandaUrl {
  width: 265px;
  height: 177px;
}

.amendd {
  position: absolute;
  right: 90px;
  top: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #1c8cfa;
}

.uploadImga {
  width: 100px;
  height: 90px;
  margin-top: 10px;
}

.perfect {
  color: #1c8cfa;
  font-size: 14px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  p {
    cursor: pointer;
    width: 100%;
    text-align: center;
    margin-top: 10px;
  }
}

.logo_I {
  width: 100px;
  height: 100px;
}

.UploadPictures_IMG {
  width: 120px;
  height: 100px;
  margin-left: 20px;
}

.hintsize {
  font-size: 12px;
  color: #343435;
}

.info {
  width: 720px;
  margin: 0 auto;

  .oper-dv {
    height: 20px;
    text-align: right;
    margin-right: 100px;

    a {
      font-weight: 500;

      &:last-child {
        margin-left: 30px;
      }
    }
  }

  .info-item {
    margin-top: 15px;

    label {
      display: inline-block;
      width: 100px;
      text-align: right;
    }

    .sel-img-dv {
      position: relative;

      .sel-file {
        position: absolute;
        width: 90px;
        height: 30px;
        opacity: 0;
        cursor: pointer;
        z-index: 2;
      }

      .sel-btn {
        position: absolute;
        cursor: pointer;
        z-index: 1;
      }
    }
  }
}

.cropper-content {
  display: flex;

  .cropper {
    width: 200px;
    height: 200px;
  }

  .show-preview {
    width: 132px !important;
    height: 135px !important;
    flex: 1;
    -webkit-flex: 1;
    display: flex;

    .preview {
      overflow: hidden;
      border-radius: 20px;
      border: 1px solid #cccccc;
      background: #cccccc;
      margin-left: 40px;
    }
  }
}

.cropper-content .show-preview .preview {
  margin-left: 0;
}

.btn-orange {
  width: 100px;
  height: 40px;
  display: block;
  line-height: 40px;
  background: #1c8cfa;
  color: #fff;
  text-align: center;
  border-radius: 10px;
  margin-right: 30px;
}

.upData {
  display: flex;
  align-items: center;
  margin-top: 20px;

}

.line {
  margin-left: 21px;
}

</style>
