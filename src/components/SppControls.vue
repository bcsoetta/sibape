<template>
  <div class="text-right flex-grow-1 my-2">
    
    <!-- buatkan / lihat pibk -->
    <b-button variant="success" class="shadow my-2 my-md-0" size="sm" @click="data.pibk ? $emit('view-pibk') : $emit('create-pibk')">
      <font-awesome-icon icon="money-check-alt"></font-awesome-icon>
      <template v-if="data.pibk">Lihat PIBK</template>
      <template v-else>Buatkan PIBK</template>
    </b-button>

    <!-- buka kembali cd -->
    <b-button variant="warning" class="shadow my-2 my-md-0" size="sm" v-if="!data.pibk" @click="$emit('restore-cd')">
      <font-awesome-icon icon="money-check-alt"/>
      Selesaikan Customs Declaration
    </b-button>

    <span class="mx-1">
    </span>

    <!-- slot -->
    <slot>
    </slot>

    <!-- apabila dijadikan impor sementara -->
    <b-button variant="dark" @click="$emit('printSpp')" class="shadow my-auto" size="sm">
      <font-awesome-icon icon="print"/>
      Cetak
    </b-button>
  </div>
</template>

<script>
import docMethod from '../mixins/docMethod'

export default {
    mixins: [ docMethod ],
    props: {
        data: Object
    }
}
</script>