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
            <span>网站信息</span>
          </div>
          <div>
            <p class="all-poetry">本网站共收录：<span class="poem-count">20000</span>首诗词</p>
            <p>本网站共收录：<span class="author-count">3000</span>位诗人</p>
          </div>
        </el-card>
        <el-card class="one-card top-ten-poet">
          <div slot="header">
            <span>十大高产诗人</span>
          </div>
          <div>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="商品名称">
                      <span>{{ props.row.name }}</span>
                    </el-form-item>
                    <el-form-item label="所属店铺">
                      <span>{{ props.row.shop }}</span>
                    </el-form-item>
                    <el-form-item label="商品 ID">
                      <span>{{ props.row.id }}</span>
                    </el-form-item>
                    <el-form-item label="店铺 ID">
                      <span>{{ props.row.shopId }}</span>
                    </el-form-item>
                    <el-form-item label="商品分类">
                      <span>{{ props.row.category }}</span>
                    </el-form-item>
                    <el-form-item label="店铺地址">
                      <span>{{ props.row.address }}</span>
                    </el-form-item>
                    <el-form-item label="商品描述">
                      <span>{{ props.row.desc }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                label="商品 ID"
                prop="id">
              </el-table-column>
              <el-table-column
                label="商品名称"
                prop="name">
              </el-table-column>
            </el-table>
          </div>
        </el-card>
        <el-card class="one-card popular-words">
          <div slot="header">
            <span>热门词语</span>
          </div>
          <div>
            <el-tag
              v-for="item in items"
              :key="item.label"
              :type="item.type"
              effect="plain">
              {{ item.label }}
            </el-tag>
          </div>
        </el-card>
      </el-aside>
      <el-main class="main-container">
        <el-table
          :data="tableData1"
          stripe
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>

        <el-divider></el-divider>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
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
import TopBar from '@/components/TopBar.vue';
import Footer from '@/components/Footer.vue';
export default {
  components: {
    TopBar,
    Footer,
  },
  name: 'Library',
  data() {
    return {
      tableData: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333',
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333',
      }, {
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333',
      }, {
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333',
      }],
      items: [
        { type: '', label: '标签一' },
        { type: 'success', label: '标签二' },
        { type: 'info', label: '标签三' },
        { type: 'danger', label: '标签四' },
        { type: 'warning', label: '标签五' },
      ],
      tableData1: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }],
    };
  },
  computed: {},
  methods: {},
  created() {

  },
  mounted() {

  },
};
</script>

<style scoped lang="scss">

  .one-card{
    margin-bottom: 20px;
  }
  .all-poetry{
    margin-bottom: 10px;
    .poem-count{
      font-weight: bold;
      color: #AA314D;
    }
    /*border-bottom: 1px solid gray;*/
  }
  .author-count{
    font-weight: bold;
    /*TODO: 各种颜色需要调整*/
    color: aquamarine;
  }

  .main-container{
    border: 1px solid #409EFF;
    margin-left: 20px;
  }
</style>
