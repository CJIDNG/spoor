<style scoped>
</style>
<template>
  <div class="section">
    <div class="container">
      <div class="row">
        <div class="col-md-8 ml-auto mr-auto">
          <h1 class="title text-center">
            New Resource
          </h1>
          <hr />
          <form action="">
            <div class="form-group">
              <label for="">
                Title
                <sup>
                  (required)
                </sup>
              </label>
              <input
                type="text"
                class="form-control"
                v-model="resource.title"
              />
              <small
                v-show="!validations.title.is_valid"
                class="form-text text-muted text-danger"
              >
                {{ validations.title.text }}
              </small>
            </div>
            <div class="form-group">
              <label for="site_logo">File</label><br /><br />
              <el-upload
                ref="upload"
                action="undefined"
                :auto-upload="false"
                :on-change="processFile"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="1"
                accept="image/*,application/pdf,text/*,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.template,application/vnd.ms-powerpoint"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">
                  Click to upload
                </el-button>
                <div slot="tip" class="el-upload__tip">
                  jpg/png files with a size less than 2mb
                </div>
              </el-upload>
              <small
                v-show="!validations.file.is_valid"
                class="form-text text-muted text-danger"
              >
                {{ validations.file.text }}
              </small>
            </div>
            <button
              v-loading="addResourceLoadStatus == 1"
              @click="addResource(resource)"
              type="button"
              class="btn btn-success"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HELPERS } from "../../helpers.js";
import ActionLoader from "vue-spinner/src/ClipLoader.vue";
export default {
  components: {
    ActionLoader
  },
  data() {
    return {
      resource: {
        title: "",
        file: ""
      },
      validations: {
        title: {
          is_valid: true,
          text: ""
        },
        file: {
          is_valid: true,
          text: ""
        }
      },
      fileList: []
    };
  },
  components: {},
  created() {},
  mounted() {},
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    userLoadStatus() {
      return this.$store.getters.getUserLoadStatus;
    },
    addResourceLoadStatus() {
      return this.$store.getters.getAddResourceLoadStatus;
    },
    addResourceResponse() {
      return this.$store.getters.getAddResourceResult;
    }
  },
  watch: {
    addResourceLoadStatus: function(val) {
      if (val == 2 && this.addResourceResponse.success == 1) {
        this.$message({
          title: "Success",
          message: "resource Added Successfully",
          type: "success"
        });

        this.$router.push("/resources");
      } else if (val == 3 || this.addResourceResponse.success == 0) {
        this.$message({
          title: "Warning",
          message: "Something went wrong. Try again!",
          type: "warning"
        });
      }
    }
  },
  methods: {
    processFile(file) {
      let checkSize = size => {
        if (size > 2000000) {
          this.$refs.upload.clearFiles();
          this.$message({
            title: "Warning",
            message: "image file can not be more than 2mb",
            type: "warning"
          });
          return false;
        }
        return true;
      };

      console.log(file);

      this.resource.file = file.raw;
    },
    handleRemove(file, fileList) {
      this.resource.file = "";
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `The limit is 1, you selected ${
          files.length
        } files this time, add up to ${files.length + fileList.length} totally`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`are you sure you want to delete ${file.name}？`);
    },
    validateFields(data) {
      let valid = true;
      let validations = this.validations;

      if (!data.title) {
        valid = false;
        validations.title.is_valid = false;
        validations.title.text = "full name cant be empty";
      }

      if (!data.file) {
        valid = false;
        validations.file.is_valid = false;
        validations.file.text = "file cant be empty";
      }

      return valid;
    },
    addResource(data) {
      if (this.validateFields(data)) {
        this.$store.dispatch("addResource", data);
      }
    }
  }
};
</script>
