<style scoped>
</style>

<template>
  <div class="wrapper">
    <!--<div class="page-header" style="background-image: url('/img/pattern.jpg')">
            <div class="filter"></div>
            <div class="content-center">
                <div class="motto">
                    <h1 class="text-center">Paper Kit 2 Pro</h1>
                    <h3 class="text-center">Components</h3>
                </div>
            </div>
        </div>-->
    <div class="main">
      <div class="container">
        <form action="">
          <div class="form-group">
            <label for="exampleInputEmail1">Subscribe Email address</label>
            <input
              type="email"
              class="form-control"
              id="newsletterEmail"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              v-model="newsletterEmail"
            />
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else.</small
            >
          </div>
          <button
            @click="subscribeNewsletter(newsletterEmail)"
            type="button"
            class="btn btn-primary"
          >
            Subscribe
          </button>

          <button
            @click="unsubscribeNewsletter(newsletterEmail)"
            type="button"
            class="btn btn-primary"
          >
            Unsubscribe
          </button>

          <button
            @click="loadNewsletter(newsletterEmail)"
            type="button"
            class="btn btn-primary"
          >
            Get Members
          </button>
        </form>
      </div>

      <div
        class="features-5 section-image"
        style="background-image: url('/img/sections/the-how-photographer.jpg')"
      >
        <div class="container">
          <div class="row">
            <div class="ml-auto mr-auto">
              <h2 class="title text-center">Who We Are</h2>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-5 ml-auto">
              <div class="info">
                <div class="icon">
                  <i class="nc-icon nc-atom" aria-hidden="true"></i>
                </div>
                <h4 class="title">For Developers</h4>
                <p>
                  While everyone technically has the feature now, that doesn’t
                  mean you’ll see it all the time. But in this case, the feature
                  wasn’t just randomly A/B tested.
                </p>
              </div>
            </div>
            <div class="col-sm-5 mr-auto">
              <div class="info">
                <div class="icon">
                  <i class="nc-icon nc-ruler-pencil" aria-hidden="true"></i>
                </div>
                <h4 class="title">For Designers</h4>
                <p>
                  Loveflutter has actually been around for a while, pivoting
                  from matches based on shared interests (innovative!) to now
                  focus on analyzing.
                </p>
              </div>
            </div>
          </div>
          <div class="row bottom-line">
            <div class="col-sm-5 ml-auto">
              <div class="info">
                <div class="icon">
                  <i class="nc-icon nc-paper" aria-hidden="true"></i>
                </div>
                <h4 class="title">Example Pages Included</h4>
                <p>
                  As for the user backlash, it comes to the challenges faces in
                  building features to aid newcomers, which can impact its
                  growth and bottom line.
                </p>
              </div>
            </div>
            <div class="col-sm-5 mr-auto">
              <div class="info">
                <div class="icon">
                  <i class="nc-icon nc-time-alarm" aria-hidden="true"></i>
                </div>
                <h4 class="title">Save Time</h4>
                <p>
                  The feature itself had been developed via experimental
                  account, where it had tested how to better personalize its
                  service to end users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      newsletterEmail: "",
      message: ""
    };
  },
  created() {
    this.$store.dispatch("loadConfig");
    this.$store.dispatch("loadMembers", {
      url: null
    });
  },
  computed: {
    config() {
      return this.$store.getters.getConfig;
    },
    configLoadStatus() {
      return this.$store.getters.getConfigLoadStatus;
    },
    members() {
      return this.$store.getters.getMembers;
    },
    membersLoadStatus() {
      return this.$store.getters.getMembersLoadStatus;
    },
    memberPagination() {
      return this.$store.getters.getMemberPagination;
    },
    subscribeNewsletterLoadStatus() {
      return this.$store.getters.getSubscribeNewsletterLoadStatus;
    },
    subscribeNewsletterResponse() {
      return this.$store.getters.getSubscribeNewsletterResult;
    },
    unsubscribeNewsletterLoadStatus() {
      return this.$store.getters.getUnsubscribeNewsletterLoadStatus;
    },
    unsubscribeNewsletterResponse() {
      return this.$store.getters.getUnsubscribeNewsletterResult;
    },
    newsletter() {
      return this.$store.getters.getNewsletter;
    }
  },
  methods: {
    loadNewsletter() {
      this.$store.dispatch("getNewsletter");
    },
    subscribeNewsletter(data) {
      if (1) {
        this.$store.dispatch("subscribeNewsletter", data);
        console.log("subscribing: " + data);
      }
    },
    unsubscribeNewsletter(data) {
      if (1) {
        this.$store.dispatch("unsubscribeNewsletter", data);
        console.log("unsubscribing: " + data);
      }
    }
  },
  watch: {
    subscribeNewsletterLoadStatus: function(val) {
      if (val == 2 && this.subscribeNewsletterResponse.success == 1) {
        this.$message({
          title: "Success",
          message: this.newsletterEmail + " subscribed Successfully",
          type: "success"
        });
      } else if (val == 3 || this.subscribeNewsletterResponse.success == 0) {
        this.$message({
          title: "Warning",
          message: "Something went wrong. Try again!",
          type: "warning"
        });
      }
    },
    unsubscribeNewsletterLoadStatus: function(val) {
      if (val == 2 && this.unsubscribeNewsletterResponse.success == 1) {
        this.$message({
          title: "Success",
          message: this.newsletterEmail + " unsubscribed Successfully",
          type: "success"
        });
      } else if (val == 3 || this.unsubscribeNewsletterResponse.success == 0) {
        this.$message({
          title: "Warning",
          message: "Something went wrong. Try again!",
          type: "warning"
        });
      }
    }
  }
};
</script>


