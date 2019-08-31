<style scoped>
</style>

<template>
  <div class="wrapper">
    <div class="page-header" style="background-image: url('/img/pattern.jpg')">
        <div class="filter"></div>
        <div class="content-center">
          <div class="col-md-8 ml-auto mr-auto">
            <div class="card card-raised page-carousel">
              <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                  <li v-for="(post, index) in featured_posts" :key="index" data-target="#carouselExampleIndicators" :data-slide-to="index" class=""></li>
                </ol>
                <div class="carousel-inner" role="listbox">
                  <div v-for="(post, index) in featured_posts" :key="index" 
                    class="carousel-item" v-bind:class="{ active: index === 0 }">
                    <img class="d-block img-fluid" :src="post.featured_image" alt="First slide">
                    <div class="carousel-caption mb-5 mr-auto ml-auto">
                      <p>
                        <a :href="'/blog/'+post.slug" class="carousel-caption btn btn-info btn-sm">Read Story</a>
                      </p>
                    </div>
                  </div>
                </div>
                <a class="left carousel-control carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                  <span class="fa fa-angle-left"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="right carousel-control carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                  <span class="fa fa-angle-right"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </div>
    </div>
    <div class="main">
      <!-- <form action="">
        <div class="form-group">
          <label for="exampleInputEmail1">
            Subscribe Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="newsletterEmail"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model="newsletterEmail"
          />
          <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
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
      </form>-->


      <div class="section text-center landing-section">
      <div class="container">
        <div class="row">
          <div class="col-md-8 ml-auto mr-auto">
            <h2 class="title">Let's talk product</h2>
            <h5>This is the paragraph where you can write more details about your product. Keep you user engaged by providing meaningful information. Remember that by this time, the user is curious, otherwise he wouldn't scroll to get here. Add a button if you want the user to see more.</h5>
            <br>
            <a href="#paper-kit" class="btn btn-danger btn-fill btn-round">See Details</a>
          </div>
        </div>
        <br>
        <br>
        <div class="row">
          <div class="col-md-3">
            <div class="info">
              <div class="icon icon-danger">
                <i class="nc-icon nc-palette"></i>
              </div>
              <div class="description">
                <h4 class="info-title">Beautiful Gallery</h4>
                <p class="description">Spend your time generating new ideas. You don't have to think of implementing.</p>
                <a href="#pkp" class="btn btn-link btn-danger">See more</a>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="info">
              <div class="icon icon-danger">
                <i class="nc-icon nc-bulb-63"></i>
              </div>
              <div class="description">
                <h4 class="info-title">New Ideas</h4>
                <p>Larger, yet dramatically thinner. More powerful, but remarkably power efficient.</p>
                <a href="#pkp" class="btn btn-link btn-danger">See more</a>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="info">
              <div class="icon icon-danger">
                <i class="nc-icon nc-chart-bar-32"></i>
              </div>
              <div class="description">
                <h4 class="info-title">Statistics</h4>
                <p>Choose from a veriety of many colors resembling sugar paper pastels.</p>
                <a href="#pkp" class="btn btn-link btn-danger">See more</a>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="info">
              <div class="icon icon-danger">
                <i class="nc-icon nc-sun-fog-29"></i>
              </div>
              <div class="description">
                <h4 class="info-title">Delightful design</h4>
                <p>Find unique and handmade delightful designs related items directly from our sellers.</p>
                <a href="#pkp" class="btn btn-link btn-danger">See more</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      <div
        class="features-5 section-image"
        style="background-image: url('/img/spoor_bg_1.jpg')">
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


      <div class="subscribe-line subscribe-line-black">
        <div class="container">
          <div class="row">
            <div class="col-lg-9 col-md-8 col-sm-8">
              <form class="">
                <div class="form-group">
                  <input type="text" v-model="newsletterEmail" class="form-control" placeholder="Enter your email...">
                </div>
              </form>
            </div>
            <div class="col-md-3 col-sm-4">
              <button @click="subscribeNewsletter(newsletterEmail)" type="button" class="btn btn-neutral btn-block btn-lg">Join Newsletter</button>
            </div>
          </div>
        </div>
      </div>


      <div class="social-line" id="sharing">
        <div class="container">
          <div class="row">
            <div class="col-md-4 col-sm-12">
              <h4 class="title">Follow Us</h4>
            </div>
            <div class="col-md-2 col-sm-3">
              <a :href="config.facebook_url" target="_blank" class="btn btn-link btn-just-icon btn-facebook">
                <i class="fa fa-facebook" aria-hidden="true"></i> Facebook
              </a>
            </div>
            <div class="col-md-2 col-sm-3">
              <a :href="config.twitter_url" target="_blank" class="btn btn-link btn-just-icon btn-twitter">
                <i class="fa fa-twitter" aria-hidden="true"></i> Twitter
              </a>
            </div>
            <div class="col-md-2 col-sm-3">
              <a :href="config.instagram_url" target="_blank" class="btn btn-link btn-just-icon btn-instagram">
                <i class="fa fa-instagram" aria-hidden="true"></i> Instagram
              </a>
            </div>
            <div class="col-md-2 col-sm-3">
              <a :href="config.linkedin_url" target="_blank" class="btn btn-link btn-just-icon btn-linkedin">
                <i class="fa fa-linkedin" aria-hidden="true"></i> Linkedin
              </a>
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
  data () {
    return {
      newsletterEmail: "",
      message: "",
      featured_posts: null
    };
  },
  created () {
    this.$store.dispatch("loadConfig");
    this.$store.dispatch("loadMembers", {
      url: null
    });
    this.$store.dispatch('getPosts', {
      limit: 3,
      url: null
    })
  },
  computed: {
    config () {
      return this.$store.getters.getConfig;
    },
    configLoadStatus () {
      return this.$store.getters.getConfigLoadStatus;
    },
    members () {
      return this.$store.getters.getMembers;
    },
    membersLoadStatus () {
      return this.$store.getters.getMembersLoadStatus;
    },
    memberPagination () {
      return this.$store.getters.getMemberPagination;
    },
    subscribeNewsletterLoadStatus () {
      return this.$store.getters.getSubscribeNewsletterLoadStatus;
    },
    subscribeNewsletterResponse () {
      return this.$store.getters.getSubscribeNewsletterResult;
    },
    unsubscribeNewsletterLoadStatus () {
      return this.$store.getters.getUnsubscribeNewsletterLoadStatus;
    },
    unsubscribeNewsletterResponse () {
      return this.$store.getters.getUnsubscribeNewsletterResult;
    },
    newsletter () {
      return this.$store.getters.getNewsletter;
    },
    posts () {
      return this.$store.getters.getPosts;
    },
    postsLoadStatus () {
      return this.$store.getters.getPostsLoadStatus;
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
    postsLoadStatus: function (val) {
      if(val == 2) {
        this.featured_posts = this.posts;
      }
    },
    subscribeNewsletterLoadStatus: function(val) {
      if (val == 2 && this.subscribeNewsletterResponse.success == 1) {
        this.$message({
          title: "Success",
          message: this.newsletterEmail + " subscribed Successfully",
          type: "success"
        });

        this.newsletterEmail = "";
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
