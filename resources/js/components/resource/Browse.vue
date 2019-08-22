<style scoped>
#action-btn {
  position: relative;
  right: 20px;
  z-index: 4;
}
#action-btn .btn {
  position: fixed;
  right: 30px;
  bottom: 10%;
}
</style>
<template>
  <div class="content">
    <div class="container">
      <div v-if="userLoadStatus == 2 && user != {}" id="action-btn">
        <router-link :to="'/resources/add'">
          <button class="btn btn-success btn-lg btn-just-icon">
            <i class="fa fa-plus"></i>
          </button>
        </router-link>
      </div>

      <div class="section">
        <div class="info">
          <div class="icon icon-primary">
            <i class="fa fa-file-text"></i>
          </div>
          <div class="description">
            <h4 class="info-title"> Resources </h4>
            <p>
              Spend your time generating new ideas. 
              You don't have to think of implementing anymore.
            </p>
          </div>
        </div>
        <div class="container">
          <action-loader
            class="text-center"
            :loading="resourcesLoadStatus == 1"
            :color="'#4caf50'"
          ></action-loader>
          <table role="table" id="types-table" class="table table-rounded">
            <thead role="group">
              <tr>
                <th role="columnheader">Id</th>
                <th role="columnheader">Name</th>
                <th role="columnheader">File Format</th>
                <th role="columnheader">Date Published</th>
                <th role="columnheader">Action</th>
              </tr>
            </thead>
            <tbody role="rowgroup">
              <tr
                role="row"
                v-for="(resource, index) in resources.data"
                v-bind:key="index"
              >
                <td role="cell">
                  {{ resource.id }}
                </td>
                <td role="cell">
                  {{ resource.title }}
                </td>
                <td role="cell">
                  {{ resource.extension }}
                </td>
                <td role="cell">
                  {{ resource.created_at }}
                </td>
                <td class="td-actions">
                  <a
                    :href="'/storage/' + resource.url"
                    rel="tooltip"
                    class="btn btn-success btn-sm btn-round btn-icon"
                    download
                  >
                    <i class="fa fa-download"></i>
                    download
                  </a>
                  <button
                    v-if="userLoadStatus == 2 && user != {}"
                    @click="deleteResource(resource.id)"
                    type="button"
                    rel="tooltip"
                    class="btn btn-danger btn-sm btn-round btn-icon"
                  >
                    <i class="fa fa-times"></i>
                    delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <nav aria-label="Page navigation">
            <ul class="pagination pagination-success">
              <li
                class="page-item"
                v-bind:class="[{ disabled: !rPagination.prev_page_url }]"
              >
                <a
                  @click="loadResources(rPagination.prev_page_url)"
                  class="page-link"
                >
                  Previous
                </a>
              </li>
              <li
                class="page-item"
                v-bind:class="[{ disabled: !rPagination.next_page_url }]"
              >
                <a
                  @click="loadResources(rPagination.next_page_url)"
                  class="page-link"
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ActionLoader from "vue-spinner/src/ScaleLoader.vue";

export default {
  components: {
    ActionLoader
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("getResources", {
      url: null
    });
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    userLoadStatus() {
      return this.$store.getters.getUserLoadStatus;
    },
    resources() {
      return this.$store.getters.getResources;
    },
    resourcesLoadStatus() {
      return this.$store.getters.getResourcesLoadStatus;
    },
    rPagination() {
      return this.$store.getters.getRPagination;
    },
    deleteResourceLoadStatus() {
      return this.$store.getters.getDeleteResourceLoadStatus;
    },
    deleteResourceResult() {
      return this.$store.getters.getDeleteResourceResult;
    }
  },
  watch: {
    deleteResourceLoadStatus: function() {
      let vm = this;

      if (
        vm.deleteResourceLoadStatus == 3 &&
        vm.deleteResourceResult.success == 0
      ) {
        alert(vm.deleteResourceResult.message);
      } else if (
        vm.deleteResourceLoadStatus == 2 &&
        vm.deleteResourceResult.success == 1
      ) {
        //reload Incident Types
        this.$store.dispatch("getResources", {
          url: null
        });
        alert(vm.deleteResourceResult.message);
      }
    }
  },
  methods: {
    deleteResource(id) {
      if (confirm("Are you sure?")) {
        this.$store.dispatch("deleteResource", {
          id: id
        });
      }
    },
    loadResources(url) {
      this.$store.dispatch("getResources", {
        url: url
      });
    }
  }
};
</script>