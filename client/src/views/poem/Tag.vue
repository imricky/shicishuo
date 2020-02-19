<template>
  <div>
    <div>
      <TopBar />
    </div>
    <div class="all-container">
      <el-container>
        <el-aside class="aside-container">

          <el-card class="one-card website-info">
            <div slot="header">
              <span>当前选择标签</span>
            </div>
            <div class="current-tag">
              <span class="current-tag-name">{{currentTag}}</span>
            </div>
          </el-card>

          <el-card class="one-card website-info">
            <div slot="header">
              <span>相关标签</span>
            </div>
            <div class="other-tag-container">
              <el-tag
                v-for="(item,index) in tagList"
                :key="index"
                size="medium"
                effect="plain"
                class="other-tag"
                @click="changeTag(item)">
                {{ item }}
              </el-tag>
            </div>
            <el-pagination
              small
              layout="prev, pager, next"
              :total="totalTagCount"
              :page-size = "20"
              @current-change="changeTagPage"
              :current-page="currentTagPage">
            </el-pagination>
          </el-card>
        </el-aside>
        <el-main class="main-container">
          <div><i class="el-icon-price-tag"></i> 最是江南好风景，落花时节又逢君❤️</div>
          <el-table
            :data="poemList"
            style="width: 100%"
            ref="tagList">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item class="paragraph-table">
                    <!--                  // TODO: 增加样式-->
                    <div v-for="paragraph in props.row.paragraphs" :key="paragraph" >
                      {{ paragraph }}
                    </div>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              label="标题"
              prop="title">
            </el-table-column>
            <el-table-column
              label="作者"
              prop="author">
            </el-table-column>
            <el-table-column
              label="标签🏷"
              width="180">
              <template slot-scope="scope">
                <!--              :type="scope.row.tag === '家' ? 'primary' : 'success'"-->
                <el-tag type="success" v-for="tag in scope.row.tags" :key="tag" @click="changeTag(tag)" class="list-tag">
                  {{ tag }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
          <el-divider></el-divider>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="totalCount"
            @current-change="changePage"
            :current-page="currentPage">
          </el-pagination>
        </el-main>
      </el-container>
    </div>

    <div class="mobile-all">
      <div class="mobile-top">
        <el-card class="one-card website-info">
          <div slot="header">
            <span>当前选择标签</span>
          </div>
          <div class="current-tag">
            <span class="current-tag-name mobile-current-tag-name">{{currentTag}}</span>
          </div>
        </el-card>

        <el-card class="one-card website-info relation-tag">
          <div slot="header">
            <span>相关标签</span>
          </div>
          <div class="other-tag-container mobile-other-tag-container">
            <el-tag
              v-for="(item,index) in tagList"
              :key="index"
              size="medium"
              effect="plain"
              class="other-tag mobile-other-tag"
              @click="changeTag(item)">
              {{ item }}
            </el-tag>
          </div>
          <el-pagination
            small
            layout="prev, pager, next"
            :total="totalTagCount"
            :page-size = "20"
            @current-change="changeTagPage"
            :current-page="currentTagPage">
          </el-pagination>
        </el-card>
      </div>
      <div class="mobile-main ">
        <el-table
          :data="poemList"
          style="width: 100%"
          v-if="poemList.length !== 0">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item class="paragraph-table">
                  <!--                  // TODO: 增加样式-->
                  <div v-for="paragraph in props.row.paragraphs" :key="paragraph" >
                    {{ paragraph }}
                  </div>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="标题"
            prop="title">
          </el-table-column>
          <el-table-column
            label="作者"
            prop="author">
          </el-table-column>
          <el-table-column
            label="标签🏷"
            width="180">
            <template slot-scope="scope">
              <!--              :type="scope.row.tag === '家' ? 'primary' : 'success'"-->
              <el-tag type="success" v-for="tag in scope.row.tags" :key="tag" @click="changeTag(tag)" class="list-tag">
                {{ tag }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
        <div class="mobile-paging-bar">
          <el-pagination
            small
            background
            layout="prev, pager, next"
            :total="totalCount"
            @current-change="changePage"
            :current-page="currentPage">
          </el-pagination>
        </div>
      </div>

    </div>
    <div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Http from '@/api/http';
import TopBar from '@/components/TopBar.vue';
import Footer from '@/components/Footer.vue';
import TagButton from '@/components/TagButton.vue';

export default {
  name: 'Tag',
  components: {
    TopBar,
    Footer,
    // eslint-disable-next-line vue/no-unused-components
    TagButton,
  },
  data() {
    return {
      // 诗词列表相关
      poemList: [], // 右侧诗词的列表
      totalCount: 100, // 分页条的总数量
      currentPage: 1, // 当前页数
      // 标签相关
      currentTag: '', // 当前点击的标签
      tagList: [], // 左侧标签的列表
      currentTagPage: 1, // 当前左侧标签的页数
      totalTagCount: 200, // 左侧标签的分页条的总数量
    };
  },
  computed: {},
  methods: {
    // 其他标签的点击事件
    changeTag(id) {
      const tagListEl = this.$refs.tagList.$el;
      const loading = this.$loading({
        target: tagListEl,
        lock: true,
        text: '正在加载中...',
      });
      this.$router.push({ path: `/tag/${id}` }); // -> /user/123
      this.currentTag = id; // 当前选中的tag，用于分页的时候带上
      this.currentPage = 1; // 切换标签的时候，将分页条设置为1
      Http.getPoemsByTags(id).then(((res) => {
        this.poemList = res.data.data.res;
        this.totalCount = res.data.data.totalCount;
        loading.close();
      }));
    },
    changePage(page) {
      Http.getPoemsByTags(this.currentTag, page).then(((res) => {
        this.poemList = res.data.data.res;
        this.totalCount = res.data.data.totalCount;
        this.currentPage = page; // 将分页条的页数等于当前页
      }));
    },

    changeTagPage(page) {
      // TODO: 边界条件判断，防御性编程
      Http.getAllTags(page).then(((res) => {
        this.tagList = res.data.data.AllTags.reduce((total, curValue, curIndex, arr) => {
          total.push(curValue._id);
          return total;
        }, []);

        this.currentTagPage = page; // 将分页条的页数等于当前页
      }));
    },
  },
  created() {
    const loading = this.$loading({
      lock: true,
      text: '正在加载中...',
    });
    // 当前标签赋值：
    this.currentTag = this.$route.params.tagName;
    // 获取当前标签对应的诗词
    Http.getPoemsByTags(this.currentTag).then((res) => {
      this.poemList = res.data.data.res;
      this.totalCount = res.data.data.totalCount;
    });

    // 获取所有的标签
    Http.getAllTags().then((res) => {
      const tempTags = res.data.data.AllTags;
      const tempTagsArr = tempTags.reduce((total, curValue, curIndex, arr) => {
        total.push(curValue._id);
        return total;
      }, []);
      this.tagList = tempTagsArr;
      this.totalTagCount = res.data.data.totalTagCount;
      loading.close();
    });
  },
  mounted() {

  },
};
</script>

<style scoped lang="scss">
  .aside-container{
    .one-card{
      margin-bottom: 20px;
    }
    .current-tag{
      display: flex;
      justify-content: center;
      text-align: center;
      margin: 20px 0;
      font-size: 40px;
      /*border: 1px solid red;*/
      .current-tag-name{
        padding: 0 10px;
        /*background-color: #409EFF;*/
        /*border: 1px solid #409EFF;*/
        border-radius: 6px;
        color: #F56C6C;
      }
    }
    .other-tag-container{
      margin: 0 auto;
      .other-tag{
        margin: 10px 8px;
        cursor:pointer;
        &:hover{
          background-color: #B3D9FF;
        }
      }
    }

  }

  .main-container{
    /*border: 1px solid #409EFF;*/
    /*margin-left: 20px;*/
  }
  .paragraph-table{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .list-tag{
    cursor:pointer;
    margin: 5px 8px;
    &:hover{
      background-color: darken(#BBE3A9,5%);
    }
  }

  /*移动端显示*/
  .mobile-all{
    display: none;
  }

  @media screen and (min-width: 768px) and (max-width: 979px) {
  }

  /* 横向放置的手机和竖向放置的平板之间的分辨率 */
  @media screen and (max-width: 767px) {

  }

  /* 横向放置的手机及分辨率更小的设备 */
  @media screen and (max-width: 480px) {
    .all-container{
      display: none;
    }

    .mobile-all{
      display: block;
      /*border: 1px solid rebeccapurple;*/
      width: 100%;
      .mobile-top{
        /*border: 1px solid #AA314D;*/
        margin: 0 auto;
      }
      .mobile-tip{
        margin: 0 auto;
        text-align: center;
        margin-top: 5px;
        margin-bottom: 5px;
      }

      .mobile-main{
        border: 1px solid #EBEEF5;
        margin: 0 auto;
      }
      .mobile-current-tag-name{
        padding: 0 10px;
        /*border: 1px solid #F56C6C;*/
        border-radius: 6px;
        color: #F56C6C;
      }
      .relation-tag{
        margin-top: 10px;
      }
      .mobile-other-tag-container{
        margin-bottom: 10px;
      }
      .mobile-other-tag{
        margin: 5px 10px;
      }


      .mobile-aside-type{
        > :nth-child(n){
          font-size: 14px;
          width: 80px;
          padding: 5px 10px;
          float: left;
        }
      }

      .paragraph-table{
        margin: 0 auto;
        > :nth-child(n){
          text-align: center;
        }
      }

      .mobile-paging-bar{
        display: block;
        margin: 0 auto;
        width: 100%;
        margin-top: 10px;
      }
    }

  }
</style>
