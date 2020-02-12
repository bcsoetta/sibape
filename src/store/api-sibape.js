const axios = require('axios').default

/**
 * apiSibape : class merepresentasikan api-backend sibape
 * @param {*} url : url backend
 * @param {*} timeout : timeout per request (jgn ngandelin kecepatan server, gunakan akal sehat)
 */
class ApiSibape {
    // private instance. made when initialized I guess
    constructor(url, timeout) {
        this.instance = axios.create({
            baseURL: url,
            timeout: timeout
        })
    }

    //===================GENERIC SECTION========================================
    // setToken (token) : ngeset semua access token tiap request    
    setToken (token) {
        this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    //==================RESOURCE : KURS========================================
    // getKurs (param) : GET /kurs. param = data, e.g. { q:'CNY', tanggal:'2019-01-01' }
    getKurs (param) {
        return this.instance.get('/kurs', {
            params: param
        })
    }

    // getKursById (id) : GET /kurs/:id
    getKursById (id) {
        return this.instance.get('/kurs/' + id)
    }

    // deleteKurs (id) : DELETE /kurs/:id
    deleteKurs (id) {
        return this.instance.delete('/kurs/' + id)
    }

    // grabKurs () : POST /kurs/bkf
    grabKurs () {
        return this.instance.post('/kurs/bkf')
    }

    //=================RESOURCE : PENUMPANG====================================
    // getPenumpang (param) : GET /penumpang. param = search data
    getPenumpang (param) {
        return this.instance.get('/penumpang', {
            params: param
        })
    }

    // getPenumpangById (id) : GET /penumpang/:id
    getPenumpangById (id) {
        return this.instance.get('/penumpang/' + id)
    }

    // createPenumpang (data) : POST /penumpang. data = json of penumpang data
    createPenumpang (data) {
        return this.instance.post('/penumpang', data)
    }

    // updatePenumpang (id, data) : PUT /penumpang/:id. data = json of penumpang data
    updatePenumpang (id, data) {
        return this.instance.put('/penumpang/' + id, data)
    }

    // deletePenumpang (id) : DELETE /penumpang/:id
    deletePenumpang (id) {
        return this.instance.delete('/penumpang/' + id)
    }

    //===================RESOURCE : COMMON======================================================
    // getAirline () : GET /airline
    getAirline () {
        return this.instance.get('/airline')
    }

    // getAirlineByKode () : GET /airline/{kode}
    getAirlineByKode (kode) {
        return this.instance.get('/airline/' + kode)
    }

    // getNegara () : GET /negara
    getNegara () {
        return this.instance.get('/negara')
    }

    // createNegara (data) : POST /negara
    createNegara (data) {
        return this.instance.post('/negara', data)
    }

    // getKategori () : GET /kategori
    getKategori () {
        return this.instance.get('/kategori')
    }

    // createKategori (data) : POST /kategori
    createKategori (data) {
        return this.instance.post('/kategori', data)
    }

    // getHS (param) : GET /hs
    getHS (param) {
        return this.instance.get('/hs', {
            params: param
        })
    }

    // getPelabuhan (param) : GET /pelabuhan
    getPelabuhan (param) {
        return this.instance.get('/pelabuhan', {
            params: param
        })
    }

    // getPelabuhanByKode (kode) : GET /pelabuhan/:kode
    getPelabuhanByKode (kode) {
        return this.instance.get('/pelabuhan/' + kode)
    }

    // getKemasan (param) : GET /kemasan
    getKemasan (param) {
        return this.instance.get('/kemasan', {
            params: param
        })
    }

    // getKemasanByKode (kode) : GET /kemasan/:kode
    getKemasanByKode (kode) {
        return this.instance.get('/kemasan/' + kode)
    }

    // getSatuan (param) : GET /satuan
    getSatuan (param) {
        return this.instance.get('/satuan', {
            params: param
        })
    }

    // getSatuanByKode (kode) : GET /satuan/:kode
    getSatuanByKode (kode) {
        return this.instance.get('/satuan/' + kode)
    }

    // getJenisDetailSekunder () : GET /jenis-detail-sekunder
    getJenisDetailSekunder () {
        return this.instance.get('/jenis-detail-sekunder')
    }

    //==================RESOURCE : CD===========================================================
    // getCd () : GET /cd
    getCd (param) {
        return this.instance.get('/cd', {
            params: param
        })
    }

    // getCdById (id) : GET /cd/{id}
    getCdById (id) {
        return this.instance.get('/cd/' + id, {
            params: {
                include: 'pelabuhan_asal,pelabuhan_tujuan'
            }
        })
    }

    // createCd (data) : POST /cd
    createCd (dataCd) {
        return this.instance.post('/cd', dataCd)
    }

    // updateCd (dataCd) : PUT /cd/{id}
    updateCd (id, dataCd) {
        return this.instance.put('/cd/' + id, dataCd)
    }

    // deleteCd (id) : DELETE /cd/{id}
    deleteCd (id) {
        return this.instance.delete('/cd/' + id)
    }

    // getCdDetails (id, param) : GET /cd/:id/details?param
    getCdDetails (id, param) {
        return this.instance.get(`/cd/${id}/details`, {
            params: param
        })
    }

    // getCdDetailById (id, param) : GET /cd/details/:id?param
    getCdDetailById (id, param) {
        return this.instance.get('/cd/details/' + id, {
            params: param
        })
    }

    // createCdDetail (id, data) : POST /cd/:id/details
    createCdDetail (id, data) {
        return this.instance.post(`/cd/${id}/details`, data)
    }

    // updateCdDetail (id, data) : PUT /cd/details/:id
    updateCdDetail (id, data) {
        return this.instance.put('/cd/details/' + id, data)
    }

    // deleteCdDetail (id) : DELETE /cd/details/:id
    deleteCdDetail (id) {
        return this.instance.delete('/cd/details/' + id)
    }

    // getPerhitunganCd (id) : GET /cd/:id/simulasi
    getPerhitunganCd (id) {
        return this.instance.get(`/cd/${id}/simulasi`)
    }

    // createPenetapanCd (id) : POST /cd/:id/penetapan
    createPenetapanCd (id, data) {
        return this.instance.post(`/cd/${id}/penetapan`, data)
    }

    //==================RESOURCE : BPJ===========================================================
    // getBpj () : GET /bpj
    getBpj (param) {
        return this.instance.get('/bpj', {
            params: param
        })
    }

    // getBpjById () : GET /bpj/{id}
    getBpjById (id) {
        return this.instance.get('/bpj/' + id, {
            params: {
                include: 'guaranteeable,status'
            }
        })
    }

    // createBpj (dataBpj) : POST /bpj
    createBpj (dataBpj) {
        return this.instance.post('/bpj', dataBpj)
    }

    // updateBpj (dataBpj) : PUT /bpj/{id}
    updateBpj (id, dataBpj) {
        return this.instance.put('/bpj/' + id, dataBpj)
    }

    // deleteBpj (id) : DELETE /bpj/{id}
    deleteBpj (id) {
        return this.instance.delete('/bpj/' + id)
    }

    //===================RESOURCE : PDF======================================================
    getPdf (doctype, id, param) {
        return this.instance.get('/pdf', {
            headers: {
                'Content-Type' : 'text/html'
            },
            params: {
                doc: doctype,
                id: id,
                ...param
            }
        })
    }

    // this one generate accessible url (supposedly) to download pdf
    generatePdfUrl (doctype, id, param) {
        var url = this.instance.defaults.baseURL + 'pdf' + `?doc=${doctype}&id=${id}`
        // dynamically add more to param
        if (param) {
            for (var k in param) {
                url += `&${k}=${param[k]}`
            }
        }

        return url
    }

    // this one attach resource to a specific endpoints
    attachFile (doctype, id, data, progressFn) {
        var url = `/${doctype}/${id}/lampiran`

        return this.instance.post(url, data.blob, {
            onUploadProgress: progressFn,
            headers: {
                ...this.instance.defaults.headers,

                'Content-Type'      : data.type,
                // 'Content-Length'    : data.blobsize,
                'X-Content-Filesize': data.filesize,
                'X-Content-Filename': data.filename
            }
        })
    }
}

export {
    ApiSibape
}
