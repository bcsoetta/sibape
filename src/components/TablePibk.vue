<template>
    <b-table
        responsive="sm"
        table-class="shadow"
        head-variant="dark"
        bordered
        outlined
        striped
        small
        hover
        primary-key="id"
        :fields="fields"
        v-bind="$attrs"
        v-on="$listeners">

        <!-- lokasi -->
        <template #cell(lokasi)="{ value }">
            <div v-if="value">
                <b-badge :variant="badgeVariant(value.data.kode)">{{ value.data.kode }}</b-badge>
            </div>
        </template>

        <!-- Pemberitahu -->
        <template #cell(pemberitahu)="{ value }">
            <div v-if="value">
                <div>
                    <b-badge 
                    :variant="badgeVariant(value.data.nama)"
                    >{{ value.data.nama }}</b-badge>
                </div>
            </div>
        </template>

        <!-- no_flight -->
        <template #cell(no_flight)="{ value }">
            <b-badge :variant="badgeVariant(value)">{{ value }}</b-badge>
        </template>

        <!-- status terakhir -->
        <template #cell(last_status)="{ value }">
            <!-- <pre>{{ value }}</pre> -->
            <div v-if="value">
                <b-badge :variant="badgeVariant(value.status)">{{ value.status }}</b-badge>
            </div>
        </template>

        <!-- <template v-slot:cell(showDetail)="row">
            <b-button size="sm" variant="dark" @click="row.toggleDetails">
                <font-awesome-icon :icon="row.detailsShowing ? 'minus-square' : 'plus-square'">
                </font-awesome-icon>
            </b-button>
        </template> -->

        <!-- Detail Row -->
        <!-- <template v-slot:row-details="row">
            <pre>{{ row.item }}</pre>
        </template> -->

        <!-- dok sumber -->
        <template #cell(source_type)="{ item }">
            <b-button
                v-if="item.source_type"
                size="sm"
                :variant="badgeVariant('src'+item.source_type)"
                class="shadow"
                :to="item.source_uri"
            >
                <font-awesome-icon icon="eye"/>
                {{ item.source_type }}
            </b-button>
        </template>

        <template v-slot:cell(is_locked)="data">
            <b-badge :variant="data.item.is_locked ? 'danger' : 'primary'">
                {{ data.item.is_locked ? 'Locked' : 'Open' }}
                <font-awesome-icon :icon="data.item.is_locked ? 'lock' : 'lock-open'">
                </font-awesome-icon>
            </b-badge>
        </template>

        <template v-slot:cell(action)="data">
            <!-- Edit Cd -->
            <b-button variant="primary" size="sm" :to="`/pibk/${data.item.id}`">
                <font-awesome-icon icon="pencil-alt"/>
            </b-button>
            <!-- Delete Cd -->
            <!-- show bomb button if document is locked already, no matter who we are -->
            <b-button v-if="data.item.is_locked && canDelete(data.item.is_locked)" variant="warning" size="sm"
                @click="onNuke(data.item.id, data.item.nomor_lengkap)">
                <font-awesome-icon icon="radiation"/>
            </b-button>
            <b-button v-else variant="danger" size="sm" :disabled="!canDelete(data.item.is_locked)"
                @click="onDelete(data.item.id, data.item.nomor_lengkap)">
                <font-awesome-icon icon="trash-alt"/>
            </b-button>
        </template>
    </b-table>
</template>

<script>
import userChecker from '../mixins/userChecker'
import niceties from '../mixins/niceties'
import CardViewCd from '@/components/CardViewCd'

export default {
    inheritAttrs: false,
    mixins: [ userChecker, niceties ],
    components: {
        CardViewCd
    },
    methods: {
        async onDelete (id, nomor) {
            var msg = nomor ? nomor : 'Tanpa Nomor'
            var result = await this.$bvModal.msgBoxConfirm(`Yakin mau menghapus data PIBK ini? (${msg})`, {
                title: `Menghapus PIBK #${id}`,
                size: 'md',
                buttonSize: 'md',
                okVariant: 'danger',
                okTitle: 'YES',
                cancelTitle: 'NO',
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true
            })

            if (result) {
                // alert("Hapuuus")
                // emit delete event
                this.$emit('delete', id)
            }
        },

        onNuke (id, nomor) {
            this.$emit('cancel', 'pibk', id)
        }
    },
    data () {
        return {
            fields: [
                // { label: '', key: 'showDetail' }, 
                { label: 'Dok Sumber', key: 'source_type', class: 'text-center' },
                { key: 'nomor_lengkap', class: 'text-center' }, 
                'tgl_dok', 
                { key: 'lokasi', class: 'text-center' }, 
                { label: 'Importir', key: 'importir.data.nama' }, 
                { label: 'Pemberitahu', key: 'pemberitahu', class: 'text-center' }, 
                { key: 'no_flight', class: 'text-center'},
                { label: 'Terkunci', key: 'is_locked', class: 'text-center' },
                { label: 'Status Terakhir', key: 'last_status', class: 'text-center' },
                'action'
            ]
        }
    }
}
</script>