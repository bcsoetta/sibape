<template>
  <v-select
    :options="lokasiRef"
    label="kode"
    v-on="$listeners"
    v-bind="$attrs"
  >
    <template #option="opt">
      <strong>{{ opt.kode }}</strong> - {{ opt.nama }}
    </template>
    <template #selected-option="opt">
      <strong>{{ opt.kode }}</strong> - {{ opt.nama }}
    </template>
  </v-select>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex';
import axiosErrorHandler from '../mixins/axiosErrorHandler'
import vSelect from 'vue-select'

export default {
    inheritAttrs: false,

    mixins: [
      axiosErrorHandler
    ],

    components: {
      vSelect
    },

    methods: {
      ...mapMutations(['setRefDataLokasi'])
    },

    computed: {
      ...mapGetters(['api', 'lokasiRef']),
    },

    created: function () {
      if (!this.lokasiRef.length) {
        // fetch for first time
        this.api.getLokasi()
        .then(e => {
          this.setRefDataLokasi(e.data.data)
        })
        .catch(e => {
          this.handleError(e)
        })
      }
    }
}
</script>