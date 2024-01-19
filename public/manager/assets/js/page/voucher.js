const View = {
    table: {
        __generateDTRow(data){ 
            return [
                `<div class="id-order">${data.id}</div>`,
                data.name, 
                data.discount + " %",
                data.time,
                `<div class="view-data modal-control" style="cursor: pointer" atr="Delete" data-id="${data.id}"><i class=" feather-trash "></i></div>`
            ]
        },
        init(){
            var row_table = [
                    {
                        title: 'ID',
                        name: 'id',
                        orderable: true,
                        width: '5%',
                    },
                    {
                        title: 'Mã',
                        name: 'name',
                        orderable: true,
                    }, 
                    {
                        title: 'Giảm giá',
                        name: 'name',
                        orderable: true,
                    }, 
                    {
                        title: 'Ngày kết thúc',
                        name: 'name',
                        orderable: true,
                    }, 
                    {
                        title: 'Hành động',
                        name: 'Action',
                        orderable: true,
                        width: '10%',
                    },
                ];
            ViewIndex.table.init("#data-table", row_table);
        }
    },  
    modals: {
        onControl(name, callback){
            $(document).on('click', '.modal-control', function() {
                var id = $(this).attr('data-id');
                if($(this).attr('atr').trim() == name) {
                    callback(id);
                }
            });
        },
        launch(resource, modalTitleHTML, modalBodyHTML, modalFooterHTML){
            $(`${resource} .modal-title`).html(modalTitleHTML);
            $(`${resource} .modal-body`).html(modalBodyHTML);
            $(`${resource} .modal-footer .close-modal`).html(modalFooterHTML[0]);
            $(`${resource} .modal-footer .push-modal`).html(modalFooterHTML[1]);
        },
        onShow(resource){
            $(resource).modal('show');
            $(document).off('click', `${resource} .push-modal`);
        },
        onHide(resource){
            $(resource).modal('hide');
        },
        onClose(resource){
            $(document).on('click', '.close-modal', function() {
                $(resource).modal('hide');
            });
        },
        Create: {
            resource: '#modal-create',
            setDefaul(){ this.init();  },
            setVal(data){  
            },
            generateKey(){
                var number_data = Math.floor(Math.random() * (999 - 100 + 1) ) + 100;
                var char_data = this.makeid(10);
                return number_data + char_data;
            },
            makeid(length) {
                var result           = '';
                var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for ( var i = 0; i < length; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
               return result;
            },
            random(name, callback){
                var resource = this.resource;
                $(document).on('click', `${this.resource} .random-action`, function() {
                    if($(this).attr('atr').trim() == name) { 
                        callback();
                    }
                });
            },
            getVal(){
                var resource = this.resource;
                var fd = new FormData();
                var required_data = [];
                var onPushData = true;

                var data_name      = $(`${resource}`).find('.data-name').val();
                var data_discount  = $(`${resource}`).find('.data-discount').val();
                var data_time      = $(`${resource}`).find('.data-time').val();

                if (data_name       == "") { required_data.push('Hãy nhập mã giảm giá.'); onPushData = false }
                if (data_discount   == "") { required_data.push('Hãy nhập giá trị giảm giá.'); onPushData = false }
                if (data_time       == "") { required_data.push('Hãy chọn ngày kết thúc.'); onPushData = false }

                if (onPushData) {
                    fd.append('data_name', data_name);
                    fd.append('data_discount', data_discount);
                    fd.append('data_time', data_time);
                    return fd;
                }else{
                    $(`${resource}`).find('.error-log .js-errors').remove();
                    var required_noti = ``;
                    for (var i = 0; i < required_data.length; i++) { required_noti += `<li class="error">${required_data[i]}</li>`; }
                    $(`${resource}`).find('.error-log').prepend(` <ul class="js-errors">${required_noti}</ul> `)
                    return false;
                }
            },
            onPush(name, callback){
                var resource = this.resource;
                $(document).on('click', `${this.resource} .push-modal`, function() {
                    if($(this).attr('atr').trim() == name) {
                        var data = View.modals.Create.getVal();
                        if (data) callback(data);
                    }
                });
            },
            init() {
                var modalTitleHTML  = `Tạo mới`;
                var modalBodyHTML   = Template.Voucher.Create();
                var modalFooterHTML = ['Đóng', 'Tạo mới'];
                View.modals.launch(this.resource, modalTitleHTML, modalBodyHTML, modalFooterHTML);
                View.modals.onClose("#modal-create"); 
            }
        }, 
        Delete: {
            resource: '#modal-delete',
            setDefaul(){ this.init(); },
            textDefaul(){ },
            setVal(data){ },
            getVal(){
            },
            onPush(name, callback){
                var resource = this.resource;
                $(document).on('click', `${this.resource} .push-modal`, function() {
                    if($(this).attr('atr').trim() == name) {
                        callback();
                    }
                });
            },
            init() {
                var modalTitleHTML = `Xóa`;
                var modalBodyHTML  = Template.Voucher.Delete();
                var modalFooterHTML = ['Đóng', 'Xóa'];
                View.modals.onClose("#modal-delete");
                View.modals.launch(this.resource, modalTitleHTML, modalBodyHTML, modalFooterHTML);
            }
        },
        init() {
            this.Create.init(); 
            this.Delete.init();
        }
    },
    formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    },
    isNumberKey(evt){
        var charCode = (evt.which) ? evt.which : event.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    },
    init(){
        View.table.init();
        View.modals.init();
    }
};
(() => {
    View.init();

    View.modals.Create.random("random", () => {
        $(".data-name").val(View.modals.Create.generateKey())
    })


    View.modals.onControl("Create", () => {
        var resource = View.modals.Create.resource;
        View.modals.onShow(resource); 
        View.modals.Create.onPush("Push", (fd) => {
            ViewIndex.helper.showToastProcessing('Processing', 'Đang tạo!');
            Api.Voucher.Store(fd)
                .done(res => {
                    ViewIndex.helper.showToastSuccess('Success', 'Tạo thành công !');
                    getData(); 
                })
                .fail(err => { ViewIndex.helper.showToastError('Error', 'Có lỗi sảy ra'); })
                .always(() => { });
            View.modals.onHide(resource)
            View.modals.Create.setDefaul();
        })
    }) 
    View.modals.onControl("Delete", (id) => {
        var resource = View.modals.Delete.resource;
        View.modals.onShow(resource);
        View.modals.Delete.onPush("Push", () => {
            ViewIndex.helper.showToastProcessing('Processing', 'Đang xóa!');
            Api.Voucher.Delete(id)
                .done(res => {
                    ViewIndex.helper.showToastSuccess('Success', 'Xóa thành công !');
                    getData();
                })
                .fail(err => { ViewIndex.helper.showToastError('Error', 'Có lỗi sảy ra'); })
                .always(() => { });
            View.modals.onHide(resource)
            View.modals.Delete.setDefaul();
        })
    })


    function init(){
        getData();
    }

    function getData(){
        Api.Voucher.GetAll()
            .done(res => {
                ViewIndex.table.clearRows();
                Object.values(res.data).map(v => {
                    ViewIndex.table.insertRow(View.table.__generateDTRow(v));
                    ViewIndex.table.render();
                })
                ViewIndex.table.render();
            })
            .fail(err => { ViewIndex.helper.showToastError('Error', 'Có lỗi sảy ra'); })
            .always(() => { });
    }
    function debounce(f, timeout) {
        let isLock = false;
        let timeoutID = null;
        return function(item) {
            if(!isLock) {
                f(item);
                isLock = true;
            }
            clearTimeout(timeoutID);
            timeoutID = setTimeout(function() {
                isLock = false;
            }, timeout);
        }
    }
    init();
})();
