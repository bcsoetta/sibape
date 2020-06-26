export default {
    methods: {
        docHasLink(doc, rel) {
            if (doc.links) {
                // check by filtering it
                return doc.links.filter(e => e.rel == rel).length > 0
            }
            return false
        },

        // grab link detail
        docGetLinkDetails: function (doc, rel) {
            if (doc.links) {
                var filtered = doc.links.filter(e => e.rel == rel)

                if (filtered.length) {
                    var link = filtered[0]
                    return {
                        doctype: link.rel,
                        id: link.uri.match(/^\/.+\/(\d+)$/i)[1]
                    }
                }
            }
            return false
        },

        // check if doc has lhp (that is ready)
        getLhp: function (doc, lockedOnly) {
            if (doc.instruksi_pemeriksaan && doc.instruksi_pemeriksaan && doc.instruksi_pemeriksaan.data.lhp) {
                if (lockedOnly) {
                    return doc.instruksi_pemeriksaan.data.lhp.data.is_locked ? doc.instruksi_pemeriksaan.data.lhp.data : null
                }
                return doc.instruksi_pemeriksaan.data.lhp.data
            }
            return null
        },

        // check if lhp is locked
        lhpIsLocked: function (doc) {
            const lhp = this.getLhp(doc, false)
            if (lhp) {
                return lhp.is_locked
            }
            return false
        }
    }
}