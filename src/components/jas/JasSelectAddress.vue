<template>
  <el-cascader :value="trueValue" :options="options" @change="change" @active-item-change="handleItemChange" :props="props" style="width:100%;"></el-cascader>
</template>

<script>
  /**
   * @name 选择地址组件
   * @author gf
   * @description 选择地址组件
   * @prop value
   */

  export default {
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: { // 城市的id数组，['省id','市id','县id']
        type: Array,
        default: () => ['']
      }
    },
    data () {
      return {
        selectValue: '',
        options: [],
        props: {
          label: 'label',
          value: 'id',
          children: 'cities'
        }
      };
    },
    computed: {
      trueValue () {
        return this.selectValue || this.value;
      }
    },
    watch: {

    },
    methods: {
      change (val) {
        this.selectValue = val;
        this.$emit('change', val);
      },
      handleItemChange (val) {
        let pId = val[val.length - 1];  // 省id或城市id
        let type = val.length === 1 ? 'city' : 'county';
        let gId = val[0]; // 省id
        this._requestGetPositionList(type, pId, gId);
      },
      _requestGetPositionList (type = 'province', pId = '', gId = '') {
        return this.$jasHttp
          .get('/cloudlink-core-framework/data/dictionary/getTree', {
            businessType: type,
            parentId: pId
          })
          .then(res => {
            if (res.data.success === 1) {
              let arr = res.data.rows;
              if (type === 'province') {
                this.options = arr.map((item) => {
                  let cities;
                  if (item.text.indexOf('香港') >= 0 || item.text.indexOf('澳门') >= 0 || item.text.indexOf('台湾') >= 0) {
                    cities = '';
                  } else {
                    cities = [];
                  }
                  return {
                    label: item.text,
                    id: item.id,
                    cities: cities
                  };
                });
              } else if (type === 'city') {
                let aCity = this.options.filter((item) => {
                  return item.id === pId;
                });
                aCity[0].cities = arr.map((item) => {
                  return {
                    label: item.text,
                    id: item.id,
                    cities: []
                  };
                });
              } else if (type === 'county') {
                let aCity = this.options.filter((item) => {
                  return item.id === gId;
                });
                let aCounty = aCity[0].cities.filter((item) => {
                  return item.id === pId;
                });
                aCounty[0].cities = arr.map((item) => {
                  return {
                    label: item.text,
                    id: item.id
                  };
                });
              }
            } else {
              this.$notify({
                message: res.data.msg || '网络故障请，您稍后再试',
                type: 'error'
              });
            }
          })
          .catch(err => {
            this.$notify({
              message: '网络故障请，您稍后再试',
              type: 'error'
            });
            console.log('err', err);
          });
      }
    },
    mounted () {
      this._requestGetPositionList()
        .then(() => {
          if (this.value.length > 1) {
            return this._requestGetPositionList('city', this.value[0]);
          }
        })
        .then(() => {
          if (this.value.length > 2) {
            return this._requestGetPositionList('county', this.value[1], this.value[0]);
          }
        });
    }
  };
</script>

<style lang="scss" scoped>

</style>
