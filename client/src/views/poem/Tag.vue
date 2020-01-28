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
                <el-tag type="success" v-for="tag in scope.row.tags" :key="tag">
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
    <div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Http from '@/api/http';
import TopBar from '@/components/TopBar.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Tag',
  components: {
    TopBar,
    Footer,
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
      this.$router.push({ path: `/tag/${id}` }); // -> /user/123
      this.currentTag = id; // 当前选中的tag，用于分页的时候带上
      this.currentPage = 1; // 切换标签的时候，将分页条设置为1
      Http.getPoemsByTags(id).then(((res) => {
        this.poemList = res.data.data.res;
        this.totalCount = res.data.data.totalCount;
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
        border: 1px solid #409EFF;
        border-radius: 6px;
        color: #409EFF;
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
    border: 1px solid #409EFF;
    margin-left: 20px;
  }
  .paragraph-table{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
